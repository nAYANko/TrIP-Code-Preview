
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
  activities: any[];
  tripName: string;
}

const MapView = ({ activities, tripName }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    setIsLoading(true);
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
      libraries: ['places', 'geometry']
    });

    try {
      await loader.load();
      
      // Filter activities that have coordinates
      const activitiesWithCoords = activities.filter(
        activity => activity.latitude && activity.longitude
      );

      if (activitiesWithCoords.length === 0) {
        setIsLoading(false);
        return;
      }

      // Calculate center point
      const bounds = new google.maps.LatLngBounds();
      activitiesWithCoords.forEach(activity => {
        bounds.extend(new google.maps.LatLng(activity.latitude, activity.longitude));
      });

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: bounds.getCenter(),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      // Add markers for each activity
      const markers: google.maps.Marker[] = [];
      const infoWindows: google.maps.InfoWindow[] = [];

      activitiesWithCoords.forEach((activity, index) => {
        const marker = new google.maps.Marker({
          position: { lat: activity.latitude, lng: activity.longitude },
          map: mapInstance,
          title: activity.title,
          label: {
            text: (index + 1).toString(),
            color: 'white',
            fontWeight: 'bold'
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: '#0ea5e9',
            fillOpacity: 1,
            strokeColor: '#0284c7',
            strokeWeight: 2,
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h4 style="margin: 0 0 8px 0; color: #0ea5e9; font-size: 16px;">${activity.title}</h4>
              <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">
                <strong>📍</strong> ${activity.location}
              </p>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                <strong>🕒</strong> ${activity.start_time} - ${activity.end_time}
              </p>
              ${activity.notes ? `<p style="margin: 0; color: #888; font-size: 13px; font-style: italic;">${activity.notes}</p>` : ''}
              <div style="margin-top: 10px;">
                <a href="https://www.google.com/maps/dir/?api=1&destination=${activity.latitude},${activity.longitude}" 
                   target="_blank" 
                   style="color: #0ea5e9; text-decoration: none; font-size: 13px;">
                  🧭 Get Directions
                </a>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          // Close all other info windows
          infoWindows.forEach(iw => iw.close());
          infoWindow.open(mapInstance, marker);
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
      });

      // Fit map to show all markers
      mapInstance.fitBounds(bounds);

      // Add directions between consecutive activities if there are multiple
      if (activitiesWithCoords.length > 1) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true, // We're using custom markers
          polylineOptions: {
            strokeColor: '#0ea5e9',
            strokeWeight: 3,
            strokeOpacity: 0.7,
          }
        });
        directionsRenderer.setMap(mapInstance);

        // Create waypoints for the route
        const waypoints = activitiesWithCoords.slice(1, -1).map(activity => ({
          location: new google.maps.LatLng(activity.latitude, activity.longitude),
          stopover: true
        }));

        const request: google.maps.DirectionsRequest = {
          origin: new google.maps.LatLng(activitiesWithCoords[0].latitude, activitiesWithCoords[0].longitude),
          destination: new google.maps.LatLng(
            activitiesWithCoords[activitiesWithCoords.length - 1].latitude,
            activitiesWithCoords[activitiesWithCoords.length - 1].longitude
          ),
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.WALKING,
          optimizeWaypoints: false
        };

        directionsService.route(request, (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result);
          }
        });
      }

      setMap(mapInstance);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          View on Map
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Map View - {tripName}
          </DialogTitle>
          <DialogDescription>
            Explore your trip locations and get directions between activities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {activities.filter(a => a.latitude && a.longitude).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activities with location coordinates found.</p>
              <p className="text-sm mt-2">Add activities with specific locations to see them on the map.</p>
            </div>
          ) : (
            <>
              <div className="h-96 w-full border rounded-lg overflow-hidden relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
                <div 
                  ref={mapRef} 
                  className="w-full h-full"
                  onClick={initializeMap}
                />
              </div>
              
              {!map && !isLoading && (
                <div className="text-center">
                  <Button onClick={initializeMap} className="travel-button">
                    Load Interactive Map
                  </Button>
                </div>
              )}

              <div className="text-sm text-gray-600 space-y-1">
                <p>• Click on markers to see activity details</p>
                <p>• Blue lines show suggested walking routes between activities</p>
                <p>• Click "Get Directions" in info windows for turn-by-turn navigation</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapView;
