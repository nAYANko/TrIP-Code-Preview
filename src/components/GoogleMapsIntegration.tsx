
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapsIntegrationProps {
  onLocationSelect: (location: {
    name: string;
    lat: number;
    lng: number;
    placeId: string;
  }) => void;
  className?: string;
}

const GoogleMapsIntegration = ({ onLocationSelect, className = "" }: GoogleMapsIntegrationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
          
          const input = document.getElementById('pac-input') as HTMLInputElement;
          if (input) {
            const searchBoxInstance = new google.maps.places.SearchBox(input);
            mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            
            mapInstance.addListener('bounds_changed', () => {
              searchBoxInstance.setBounds(mapInstance.getBounds() as google.maps.LatLngBounds);
            });
            
            searchBoxInstance.addListener('places_changed', () => {
              const places = searchBoxInstance.getPlaces();
              if (places && places.length > 0) {
                const place = places[0];
                if (place.geometry && place.geometry.location) {
                  onLocationSelect({
                    name: place.name || '',
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    placeId: place.place_id || '',
                  });
                  
                  mapInstance.setCenter(place.geometry.location);
                  mapInstance.setZoom(15);
                }
              }
            });
            
            setSearchBox(searchBoxInstance);
          }
          
          setMap(mapInstance);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [onLocationSelect]);

  return (
    <div className={className}>
      <input
        id="pac-input"
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
        type="text"
        placeholder="Search for places"
      />
      <div ref={mapRef} className="w-full h-64 rounded-md" />
    </div>
  );
};

export default GoogleMapsIntegration;
