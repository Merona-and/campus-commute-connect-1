import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Navigation } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used for notifications

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Default center (can be adjusted to a specific campus location)
const center = {
  lat: 12.9716, // Example: Bangalore coordinates
  lng: 77.5946,
};

const busRoute = [
  { lat: 12.9716, lng: 77.5946 },
  { lat: 12.9720, lng: 77.5950 },
  { lat: 12.9725, lng: 77.5955 },
  { lat: 12.9730, lng: 77.5960 },
  { lat: 12.9735, lng: 77.5965 },
  { lat: 12.9740, lng: 77.5970 },
];

const MapScreen = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [busPosition, setBusPosition] = useState(center);
  const [stopPosition] = useState({ lat: 12.9740, lng: 77.5970 }); // Destination
  const [eta, setEta] = useState("5 minutes");

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Simulate bus movement
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % busRoute.length;
      setBusPosition(busRoute[index]);

      // Update ETA roughly based on distance (mock logic)
      const remainingStops = busRoute.length - 1 - index;
      setEta(`${Math.max(1, remainingStops)} minute${remainingStops !== 1 ? 's' : ''}`);

    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-secondary animate-pulse">
        <p className="text-muted-foreground">Loading Map...</p>
      </div>
    );
  }

  return (
    <div className="h-full pb-20 animate-fade-in flex flex-col">
      {/* Map Container */}
      <div className="relative flex-grow bg-secondary overflow-hidden h-[60vh]">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {/* Student Stop Marker */}
          <Marker
            position={stopPosition}
            label={{
              text: "Stop",
              color: "white",
              className: "bg-accent px-2 py-1 rounded-md text-xs font-bold",
            }}
          />

          {/* Bus Marker */}
          <Marker
            position={busPosition}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#215804", // Primary color (approx)
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
            label={{
              text: "BUS",
              color: "white",
              fontSize: "10px",
              fontWeight: "bold"
            }}
          />
        </GoogleMap>

        {/* Navigation button */}
        <button
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center border border-border hover:bg-muted transition-colors"
          onClick={() => map?.panTo(busPosition)}
        >
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Info Panel */}
      <div className="px-5 py-4 bg-card border-t border-border mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Estimated Arrival</p>
            <p className="text-2xl font-extrabold text-foreground">{eta}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Distance</p>
            <p className="text-2xl font-extrabold text-foreground">2.3 km</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="status-badge status-active">
            <span className="w-2 h-2 rounded-full bg-success-foreground animate-pulse-dot" />
            Bus is moving
          </span>
          <span className="text-xs text-muted-foreground">TN-01-1234</span>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
