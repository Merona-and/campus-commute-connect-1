import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
import { Navigation, Bus, MapPin, Clock, AlertCircle } from "lucide-react";

const containerStyle = { width: "100%", height: "100%" };

// SRM Institute of Science and Technology, Kattankulathur
const SRM_CAMPUS = { lat: 12.8231, lng: 80.0444 };

const busRoute = [
  { lat: 12.8180, lng: 80.0380 },
  { lat: 12.8195, lng: 80.0400 },
  { lat: 12.8210, lng: 80.0415 },
  { lat: 12.8220, lng: 80.0428 },
  { lat: 12.8231, lng: 80.0444 }, // SRM Campus
];

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Fallback map UI when no API key is configured
const FallbackMap = ({ eta, busPosition }: { eta: string; busPosition: { lat: number; lng: number } }) => (
  <div className="h-full pb-20 flex flex-col">
    <div className="flex-grow relative overflow-hidden flex items-center justify-center" style={{ background: 'hsl(240 12% 8%)' }}>
      {/* Simulated map grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(hsl(262 83% 65%) 1px, transparent 1px), linear-gradient(90deg, hsl(262 83% 65%) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Route line simulation */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          {/* Stop point */}
          <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-amber-400/20" />
          <div className="w-0.5 h-12 bg-gradient-to-b from-amber-400 to-violet-500" />
          {/* Bus position */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse" style={{ background: 'hsl(262 83% 65% / 0.3)', border: '2px solid hsl(262 83% 65%)' }}>
            <Bus className="w-5 h-5 text-violet-300" />
          </div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-violet-500 to-violet-400/30" />
          {/* Campus */}
          <div className="w-5 h-5 rounded-full border-2 border-violet-400 bg-violet-400/20" />
        </div>

        <div className="mt-4 text-center px-6 py-3 rounded-xl" style={{ background: 'hsl(240 12% 12%)', border: '1px solid hsl(262 30% 22%)' }}>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Live map requires Google Maps API key</span>
          </div>
          <p className="text-xs text-muted-foreground">Set <code className="text-violet-400">VITE_GOOGLE_MAPS_API_KEY</code> in .env</p>
        </div>
      </div>

      {/* Location labels */}
      <div className="absolute top-4 left-4 text-xs text-muted-foreground flex items-center gap-1">
        <MapPin className="w-3 h-3 text-amber-400" />
        <span>Guduvanchery Stop</span>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground flex items-center gap-1">
        <MapPin className="w-3 h-3 text-violet-400" />
        <span>SRM Campus</span>
      </div>
    </div>

    <InfoPanel eta={eta} />
  </div>
);

const InfoPanel = ({ eta }: { eta: string }) => (
  <div className="px-4 py-4 border-t flex-shrink-0" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Estimated Arrival</p>
        <p className="text-2xl font-extrabold text-foreground">{eta}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Distance</p>
        <p className="text-2xl font-extrabold text-foreground">2.3 km</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="status-badge status-active text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Bus is moving
      </span>
      <span className="text-xs text-muted-foreground">TN-01-1234</span>
    </div>
  </div>
);

const MapScreen = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [busPosition, setBusPosition] = useState(busRoute[0]);
  const [eta, setEta] = useState("5 min");
  const [routeIndex, setRouteIndex] = useState(0);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Simulate bus movement along the route
  useEffect(() => {
    const interval = setInterval(() => {
      setRouteIndex((prev) => {
        const next = (prev + 1) % busRoute.length;
        setBusPosition(busRoute[next]);
        const remaining = busRoute.length - 1 - next;
        setEta(remaining === 0 ? "Arrived" : `${remaining * 2} min`);
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Show fallback if no API key
  if (!GOOGLE_MAPS_KEY) {
    return <FallbackMap eta={eta} busPosition={busPosition} />;
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-3" style={{ background: 'hsl(240 15% 6%)' }}>
        <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-full pb-20 flex flex-col">
      <div className="relative flex-grow overflow-hidden" style={{ minHeight: '55vh' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={SRM_CAMPUS}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              { featureType: "road", elementType: "geometry", stylers: [{ color: "#2d2d4e" }] },
              { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
              { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
              { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
            ],
          }}
        >
          <Polyline
            path={busRoute}
            options={{ strokeColor: "#7c3aed", strokeOpacity: 0.7, strokeWeight: 4 }}
          />
          <Marker
            position={SRM_CAMPUS}
            label={{ text: "SRM", color: "white", fontSize: "10px", fontWeight: "bold" }}
          />
          <Marker
            position={busPosition}
            icon={{
              path: (window as any).google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#7c3aed",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
            label={{ text: "BUS", color: "white", fontSize: "9px", fontWeight: "bold" }}
          />
        </GoogleMap>

        <button
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all hover:opacity-80"
          style={{ background: 'hsl(240 12% 12%)', border: '1px solid hsl(262 30% 22%)' }}
          onClick={() => map?.panTo(busPosition)}
        >
          <Navigation className="w-5 h-5 text-violet-400" />
        </button>
      </div>

      <InfoPanel eta={eta} />
    </div>
  );
};

export default MapScreen;
