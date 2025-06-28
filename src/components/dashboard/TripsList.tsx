
import { Tables } from "@/integrations/supabase/types";
import { TripCard } from "./TripCard";
import { EmptyTripsState } from "./EmptyTripsState";

type Trip = Tables<'trips'>;

interface TripsListProps {
  trips: Trip[];
  onTripClick: (tripId: string) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const TripsList = ({ trips, onTripClick, onDeleteTrip }: TripsListProps) => {
  if (trips.length === 0) {
    return <EmptyTripsState />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard 
          key={trip.id} 
          trip={trip} 
          onTripClick={onTripClick}
          onDeleteTrip={onDeleteTrip}
        />
      ))}
    </div>
  );
};
