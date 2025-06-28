
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTrips } from "@/hooks/useTrips";
import { toast } from "sonner";
import { PrebuiltDestination } from "@/data/destinations";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TripsList } from "@/components/dashboard/TripsList";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { DestinationSelectorView } from "@/components/dashboard/DestinationSelectorView";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { trips, isLoading, isCreating, deleteTrip, isDeleting } = useTrips();
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDestinationSelect = async (destination: PrebuiltDestination | null, usePrebuilt: boolean) => {
    if (!destination || !user) {
      toast.error("Please ensure you're logged in and select a destination");
      return;
    }

    // Create the trip first
    const tripData = {
      name: `${destination.name} Adventure`,
      destination: `${destination.name}, ${destination.country}`,
      start_date: new Date().toISOString().split('T')[0], // Today
      end_date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      preferences: ['sightseeing', 'culture', 'food'],
    };

    try {
      const { data: newTrip, error } = await supabase
        .from('trips')
        .insert({ ...tripData, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error('Error creating trip:', error);
        throw error;
      }

      if (usePrebuilt && newTrip) {
        // Add prebuilt activities
        const activities = [];
        for (const [dayStr, dayActivities] of Object.entries(destination.itinerary)) {
          const dayNumber = parseInt(dayStr);
          for (const activity of dayActivities) {
            activities.push({
              trip_id: newTrip.id,
              day_number: dayNumber,
              title: activity.title,
              location: activity.location,
              start_time: activity.startTime,
              end_time: activity.endTime,
              notes: activity.notes,
              latitude: activity.latitude || null,
              longitude: activity.longitude || null,
            });
          }
        }

        if (activities.length > 0) {
          const { error: activitiesError } = await supabase
            .from('activities')
            .insert(activities);

          if (activitiesError) {
            console.error('Error creating activities:', activitiesError);
            throw activitiesError;
          }
        }

        toast.success("Trip created with prebuilt itinerary!");
      } else if (newTrip) {
        toast.success("Trip created! Start adding your activities.");
      }
      
      setShowDestinationSelector(false);
      navigate(`/trip/${newTrip.id}`);
    } catch (error) {
      console.error('Error creating trip:', error);
      toast.error("Failed to create trip. Please try again.");
    }
  };

  const handleCustomTrip = async (tripData: any) => {
    if (!user) {
      toast.error("Please ensure you're logged in");
      return;
    }

    // Set default values for custom trip
    const customTripData = {
      name: tripData.name || "My Custom Trip",
      destination: tripData.destination || "Custom Destination",
      start_date: tripData.start_date || new Date().toISOString().split('T')[0],
      end_date: tripData.end_date || new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      preferences: Array.isArray(tripData.preferences) ? tripData.preferences : [],
    };

    try {
      const { data: newTrip, error } = await supabase
        .from('trips')
        .insert({ ...customTripData, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error('Error creating custom trip:', error);
        throw error;
      }

      if (newTrip) {
        toast.success("Custom trip created!");
        setShowDestinationSelector(false);
        navigate(`/trip/${newTrip.id}`);
      }
    } catch (error) {
      console.error('Error creating custom trip:', error);
      toast.error("Failed to create custom trip. Please try again.");
    }
  };

  const handleTripClick = (tripId: string) => {
    navigate(`/trip/${tripId}`);
  };

  const handleDeleteTrip = (tripId: string) => {
    deleteTrip(tripId);
    toast.success("Trip deleted successfully!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-trip-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (showDestinationSelector) {
    return (
      <DestinationSelectorView
        onBack={() => setShowDestinationSelector(false)}
        onSignOut={handleSignOut}
        onDestinationSelect={handleDestinationSelect}
        onCustomTrip={handleCustomTrip}
        isCreating={isCreating}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-trip-dark">
      <DashboardHeader onSignOut={handleSignOut} />

      <div className="flex-1 px-6 pb-6">
        {/* Create Trip Button */}
        <div className="mb-8">
          <button 
            onClick={() => setShowDestinationSelector(true)}
            className="trip-button flex items-center gap-2"
            disabled={isCreating || isDeleting}
          >
            <MapPin className="h-5 w-5" />
            {isCreating ? "Creating Trip..." : "Plan New Trip"}
          </button>
        </div>

        <TripsList 
          trips={trips} 
          onTripClick={handleTripClick} 
          onDeleteTrip={handleDeleteTrip}
        />
        
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
