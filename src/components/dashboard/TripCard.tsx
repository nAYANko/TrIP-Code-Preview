
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Trash2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Trip = Tables<'trips'>;

interface TripCardProps {
  trip: Trip;
  onTripClick: (tripId: string) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const TripCard = ({ trip, onTripClick, onDeleteTrip }: TripCardProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      onDeleteTrip(trip.id);
    }
  };

  return (
    <div className="bg-gray-800/75 backdrop-blur-sm border border-gray-500/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-200 cursor-pointer group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {trip.name}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              {trip.destination}
            </div>
          </div>
          <button
            onClick={handleDeleteClick}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
            title="Delete trip"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6" onClick={() => onTripClick(trip.id)}>
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
          <Calendar className="h-4 w-4" />
          {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
        </div>
        
        {trip.preferences && trip.preferences.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {trip.preferences.slice(0, 3).map((pref, index) => (
              <span key={index} className="text-xs bg-gray-600/30 text-gray-300 border border-gray-500/30 px-2 py-1 rounded">
                {pref}
              </span>
            ))}
            {trip.preferences.length > 3 && (
              <span className="text-xs border border-gray-500 text-gray-300 px-2 py-1 rounded">
                +{trip.preferences.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
