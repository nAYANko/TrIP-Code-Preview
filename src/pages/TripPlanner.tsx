
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, ArrowLeft, MapPin, Clock, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useTrips, useActivities } from "@/hooks/useTrips";
import GoogleMapsIntegration from "@/components/GoogleMapsIntegration";
import ShareTrip from "@/components/ShareTrip";
import MapView from "@/components/MapView";

const TripPlanner = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { trips } = useTrips();
  const { activities, createActivity, updateActivity, deleteActivity, isCreating } = useActivities(tripId || "");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<string | null>(null);
  const [showMaps, setShowMaps] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    dayNumber: 1,
    startTime: "",
    endTime: "",
    notes: "",
    latitude: null as number | null,
    longitude: null as number | null,
    googlePlaceId: "",
  });

  const trip = trips.find(t => t.id === tripId);

  useEffect(() => {
    if (!trip && trips.length > 0) {
      navigate("/dashboard");
    }
  }, [trip, trips, navigate]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-trip-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tripDays = Math.ceil((new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const handleLocationSelect = (location: { name: string; lat: number; lng: number; placeId: string }) => {
    setFormData({
      ...formData,
      location: location.name,
      latitude: location.lat,
      longitude: location.lng,
      googlePlaceId: location.placeId,
    });
    setShowMaps(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.startTime || !formData.endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const activityData = {
      title: formData.title,
      location: formData.location,
      day_number: formData.dayNumber,
      start_time: formData.startTime,
      end_time: formData.endTime,
      notes: formData.notes || null,
      latitude: formData.latitude,
      longitude: formData.longitude,
      google_place_id: formData.googlePlaceId || null,
    };

    if (editingActivity) {
      updateActivity({ id: editingActivity, ...activityData });
      setEditingActivity(null);
    } else {
      createActivity(activityData);
    }
    
    setIsDialogOpen(false);
    resetForm();
    toast.success(editingActivity ? "Activity updated!" : "Activity added!");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      dayNumber: 1,
      startTime: "",
      endTime: "",
      notes: "",
      latitude: null,
      longitude: null,
      googlePlaceId: "",
    });
  };

  const handleEdit = (activity: any) => {
    setFormData({
      title: activity.title,
      location: activity.location,
      dayNumber: activity.day_number,
      startTime: activity.start_time,
      endTime: activity.end_time,
      notes: activity.notes || "",
      latitude: activity.latitude,
      longitude: activity.longitude,
      googlePlaceId: activity.google_place_id || "",
    });
    setEditingActivity(activity.id);
    setIsDialogOpen(true);
  };

  // Group activities by day
  const activitiesByDay: { [key: number]: any[] } = {};
  activities.forEach(activity => {
    if (!activitiesByDay[activity.day_number]) {
      activitiesByDay[activity.day_number] = [];
    }
    activitiesByDay[activity.day_number].push(activity);
  });

  return (
    <div className="min-h-screen bg-trip-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/dashboard")} 
              className="trip-button-outline flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{trip.name}</h1>
              <p className="text-blue-400 flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {trip.destination}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <ShareTrip trip={trip} activities={activities} />
            <MapView activities={activities} tripName={trip.name} />
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="trip-button flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Activity
            </button>
          </div>
        </div>

        {/* Modal Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="trip-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {editingActivity ? "Edit Activity" : "Add New Activity"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {editingActivity ? "Update your activity details." : "Add a new activity to your trip itinerary."}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingActivity(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                      Activity Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Visit the Eiffel Tower"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-white mb-1">
                      Location
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="location"
                        type="text"
                        placeholder="Paris, France"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowMaps(!showMaps)}
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 text-white transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                    </div>
                    {showMaps && (
                      <div className="mt-2">
                        <GoogleMapsIntegration
                          onLocationSelect={handleLocationSelect}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="dayNumber" className="block text-sm font-medium text-white mb-1">
                        Day
                      </label>
                      <select
                        id="dayNumber"
                        value={formData.dayNumber}
                        onChange={(e) => setFormData({ ...formData, dayNumber: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {Array.from({ length: tripDays }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Day {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-white mb-1">
                        Start Time
                      </label>
                      <input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-white mb-1">
                        End Time
                      </label>
                      <input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-white mb-1">
                      Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      placeholder="Any additional notes or details..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      className="trip-button" 
                      disabled={isCreating}
                    >
                      {isCreating ? "Saving..." : (editingActivity ? "Update Activity" : "Add Activity")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Activities by Day */}
        <div className="space-y-6">
          {Array.from({ length: tripDays }, (_, i) => {
            const dayNumber = i + 1;
            const dayActivities = activitiesByDay[dayNumber] || [];
            const dayDate = new Date(trip.start_date);
            dayDate.setDate(dayDate.getDate() + i);

            return (
              <div key={dayNumber} className="trip-card">
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      Day {dayNumber}
                      <span className="text-sm font-normal text-gray-300">
                        {dayDate.toLocaleDateString()}
                      </span>
                    </h3>
                    <p className="text-blue-400 text-sm mt-1">
                      {dayActivities.length} {dayActivities.length === 1 ? 'activity' : 'activities'} planned
                    </p>
                  </div>
                  <div>
                    {dayActivities.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No activities planned for this day</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dayActivities
                          .sort((a, b) => a.start_time.localeCompare(b.start_time))
                          .map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 bg-white/10 rounded-lg">
                              <div className="flex-shrink-0 text-sm font-medium text-blue-400 bg-blue-500/20 px-2 py-1 rounded">
                                {activity.start_time} - {activity.end_time}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white">{activity.title}</h4>
                                <p className="text-sm text-gray-300 flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {activity.location}
                                  {activity.latitude && activity.longitude && (
                                    <a
                                      href={`https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:underline ml-2"
                                    >
                                      View on Maps
                                    </a>
                                  )}
                                </p>
                                {activity.notes && (
                                  <p className="text-sm text-gray-300 mt-2">{activity.notes}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(activity)}
                                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    deleteActivity(activity.id);
                                    toast.success("Activity deleted!");
                                  }}
                                  className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
