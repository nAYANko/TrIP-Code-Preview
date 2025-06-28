
import { LogOut } from "lucide-react";
import DestinationSelector from "@/components/DestinationSelector";
import { PrebuiltDestination } from "@/data/destinations";

interface DestinationSelectorViewProps {
  onBack: () => void;
  onSignOut: () => void;
  onDestinationSelect: (destination: PrebuiltDestination | null, usePrebuilt: boolean) => Promise<void>;
  onCustomTrip: (tripData: any) => Promise<void>;
  isCreating: boolean;
}

export const DestinationSelectorView = ({ 
  onBack, 
  onSignOut, 
  onDestinationSelect, 
  onCustomTrip, 
  isCreating 
}: DestinationSelectorViewProps) => {
  return (
    <div className="min-h-screen bg-trip-dark relative">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="trip-button-outline flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        <div className="flex items-center mr-10 gap-4">
          <img 
            src="/more-uploads/c0a41224-f8bb-4974-b751-1401d2545013.png" 
            alt="TriP Logo" 
            className="w-8 h-8"
          />
        </div>
        <div>
          <button onClick={onSignOut} className="trip-button-outline flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <DestinationSelector 
          onDestinationSelect={onDestinationSelect}
          onCustomTrip={onCustomTrip}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
};
