
import { MapPin } from "lucide-react";

export const EmptyTripsState = () => {
  return (
    <div className="bg-gray-800/75 backdrop-blur-sm border border-gray-500/20 shadow-xl rounded-2xl text-center py-12">
      <div className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-blue-500/20 rounded-full">
            <MapPin className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">No trips yet</h3>
            <p className="text-gray-300 mb-4">Create your first trip to start planning your adventure!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
