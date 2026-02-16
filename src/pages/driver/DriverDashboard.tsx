import { useAuth } from "@/contexts/AuthContext";
import { Bus, Play, Square, MapPin, LogOut } from "lucide-react";
import { useState } from "react";

const DriverDashboard = () => {
  const { user, logout } = useAuth();
  const [tripActive, setTripActive] = useState(false);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto px-5 pt-6 pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-2xl font-extrabold">{user?.name} 🚌</h1>
        </div>
        <button onClick={logout} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <LogOut className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Bus Info */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-md mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Assigned Bus</p>
            <p className="font-bold text-xl">{user?.busNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Central Campus → Sector 5 → Main Gate</span>
        </div>
      </div>

      {/* Trip Status */}
      <div className={`rounded-2xl p-6 mb-5 text-center ${tripActive ? "bg-success/10 border-2 border-success" : "bg-muted border-2 border-border"}`}>
        <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${tripActive ? "bg-success" : "bg-muted-foreground/20"}`}>
          {tripActive ? (
            <Bus className="w-8 h-8 text-success-foreground" />
          ) : (
            <Bus className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <p className="text-xl font-bold">{tripActive ? "Trip Active" : "Trip Stopped"}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {tripActive ? "GPS is broadcasting your location" : "Start trip to begin broadcasting"}
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setTripActive(true)}
          disabled={tripActive}
          className="flex items-center justify-center gap-2 py-4 rounded-xl bg-success text-success-foreground font-bold text-base transition-all hover:opacity-90 disabled:opacity-40"
        >
          <Play className="w-5 h-5" />
          Start Trip
        </button>
        <button
          onClick={() => setTripActive(false)}
          disabled={!tripActive}
          className="flex items-center justify-center gap-2 py-4 rounded-xl bg-destructive text-destructive-foreground font-bold text-base transition-all hover:opacity-90 disabled:opacity-40"
        >
          <Square className="w-5 h-5" />
          End Trip
        </button>
      </div>

      {/* Trip log */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Today's Log</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-card rounded-xl p-4 border border-border">
            <span className="text-sm font-medium">Morning Trip</span>
            <span className="status-badge status-active text-xs">Completed</span>
          </div>
          <div className="flex items-center justify-between bg-card rounded-xl p-4 border border-border">
            <span className="text-sm font-medium">Afternoon Trip</span>
            <span className={`status-badge ${tripActive ? "status-active" : "bg-muted text-muted-foreground"} text-xs`}>
              {tripActive ? "In Progress" : "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
