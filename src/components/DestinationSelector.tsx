
import { useState } from "react";
import { MapPin, Calendar, Star, Plus } from "lucide-react";
import { popularDestinations, PrebuiltDestination } from "@/data/destinations";
import { toast } from "sonner";

interface DestinationSelectorProps {
  onDestinationSelect: (destination: PrebuiltDestination | null, usePrebuilt: boolean) => void;
  onCustomTrip: (tripData: any) => void;
  isCreating: boolean;
}

const DestinationSelector = ({ onDestinationSelect, onCustomTrip, isCreating }: DestinationSelectorProps) => {
  const [selectedDestination, setSelectedDestination] = useState<PrebuiltDestination | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customFormData, setCustomFormData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    preferences: "",
  });

  const handlePrebuiltSelect = (destination: PrebuiltDestination) => {
    setSelectedDestination(destination);
  };

  const handleUsePrebuilt = () => {
    if (selectedDestination) {
      onDestinationSelect(selectedDestination, true);
    }
  };

  const handleCustomizePrebuilt = () => {
    if (selectedDestination) {
      onDestinationSelect(selectedDestination, false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customFormData.name || !customFormData.destination || !customFormData.startDate || !customFormData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const preferences = customFormData.preferences ? customFormData.preferences.split(",").map(p => p.trim()) : [];
    
    onCustomTrip({
      name: customFormData.name,
      destination: customFormData.destination,
      start_date: customFormData.startDate,
      end_date: customFormData.endDate,
      preferences,
    });
    
    setShowCustomForm(false);
    setCustomFormData({ name: "", destination: "", startDate: "", endDate: "", preferences: "" });
  };

  if (selectedDestination) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedDestination(null)} 
          className="trip-button-outline mb-4"
        >
          ← Back to Destinations
        </button>
        
        <div className="bg-gray-800/75 backdrop-blur-sm border border-gray-500/20 shadow-xl rounded-2xl">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">{selectedDestination.name}</h2>
                <div className="flex items-center gap-1 mt-2 text-lg text-gray-300">
                  <MapPin className="h-4 w-4" />
                  {selectedDestination.country}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-gray-600/30 text-gray-300 border border-gray-500/30 px-2 py-1 rounded text-sm">
                <Star className="h-3 w-3" />
                Popular
              </div>
            </div>
            <p className="text-gray-300 mt-4">{selectedDestination.description}</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  7-Day Prebuilt Itinerary
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  We've carefully crafted a complete 7-day itinerary with the best attractions, 
                  dining, and experiences {selectedDestination.name} has to offer.
                </p>
                <div className="grid gap-2 text-sm">
                  {Object.keys(selectedDestination.itinerary).slice(0, 3).map((day) => (
                    <div key={day} className="flex items-center gap-2">
                      <span className="text-xs bg-gray-600/30 text-gray-300 border border-gray-500/30 px-2 py-1 rounded">Day {day}</span>
                      <span className="text-gray-300">
                        {selectedDestination.itinerary[parseInt(day)][0]?.title || 'Activities planned'}
                      </span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-400 mt-1">...and more!</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleUsePrebuilt} 
                  className="trip-button flex-1"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Use Prebuilt Itinerary"}
                </button>
                <button 
                  onClick={handleCustomizePrebuilt} 
                  className="trip-button-outline flex-1"
                  disabled={isCreating}
                >
                  Customize Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Plan Your Next Adventure</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Choose from our curated popular destinations with ready-made itineraries, 
          or create a completely custom trip to anywhere in the world.
        </p>
      </div>

      {/* Popular Destinations */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-gray-400" />
          Popular Destinations
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((destination) => (
            <div 
              key={destination.id} 
              className="bg-gray-800/75 backdrop-blur-sm border border-gray-500/20 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-200 cursor-pointer group"
              onClick={() => handlePrebuiltSelect(destination)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-gray-300">
                      <MapPin className="h-3 w-3" />
                      {destination.country}
                    </div>
                  </div>
                  <span className="text-xs bg-gray-600/30 text-gray-300 border border-gray-500/30 px-2 py-1 rounded">7 Days</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-sm text-gray-300 mb-3">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-400 font-medium">Prebuilt Itinerary</span>
                  <span className="text-xs bg-gray-600/30 text-gray-300 border border-gray-500/30 px-2 py-1 rounded">
                    {Object.keys(destination.itinerary).reduce(
                      (total, day) => total + destination.itinerary[parseInt(day)].length, 0
                    )} Activities
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Trip Option */}
      <div className="border-t border-gray-600 pt-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-400" />
          Create Custom Trip
        </h3>
        <div className="bg-gray-800/75 backdrop-blur-sm border border-gray-500/20 shadow-xl rounded-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white mb-2">Plan Your Own Adventure</h4>
                <p className="text-gray-300 text-sm">
                  Going somewhere unique? Create a custom itinerary for any destination worldwide.
                </p>
              </div>
              <button 
                onClick={() => setShowCustomForm(true)} 
                className="trip-button ml-4"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Custom Trip"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Trip Form Modal */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Create Custom Trip</h3>
              <p className="text-gray-300 text-sm">
                Plan your own adventure by creating a custom trip itinerary.
              </p>
            </div>
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Trip Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="My Amazing Adventure"
                  value={customFormData.name}
                  onChange={(e) => setCustomFormData({ ...customFormData, name: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-white text-sm font-medium mb-2">Destination</label>
                <input
                  id="destination"
                  type="text"
                  placeholder="Bali, Indonesia"
                  value={customFormData.destination}
                  onChange={(e) => setCustomFormData({ ...customFormData, destination: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-white text-sm font-medium mb-2">Start Date</label>
                  <input
                    id="startDate"
                    type="date"
                    value={customFormData.startDate}
                    onChange={(e) => setCustomFormData({ ...customFormData, startDate: e.target.value })}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-white text-sm font-medium mb-2">End Date</label>
                  <input
                    id="endDate"
                    type="date"
                    value={customFormData.endDate}
                    onChange={(e) => setCustomFormData({ ...customFormData, endDate: e.target.value })}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="preferences" className="block text-white text-sm font-medium mb-2">Preferences (comma-separated)</label>
                <textarea
                  id="preferences"
                  placeholder="beaches, temples, local food, nightlife"
                  value={customFormData.preferences}
                  onChange={(e) => setCustomFormData({ ...customFormData, preferences: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowCustomForm(false)}
                  className="trip-button-outline flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="trip-button flex-1" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Custom Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationSelector;
