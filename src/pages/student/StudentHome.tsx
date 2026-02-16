import { useAuth } from "@/contexts/AuthContext";
import { Bus, MapPin, Clock, CheckCircle2 } from "lucide-react";

const StudentHome = () => {
  const { user } = useAuth();

  return (
    <div className="px-5 pt-6 pb-24 space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-muted-foreground text-sm">Good morning</p>
        <h1 className="text-2xl font-extrabold">{user?.name} 👋</h1>
      </div>

      {/* Bus Status Card */}
      <div className="bg-card rounded-2xl p-5 shadow-md border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bus Number</p>
              <p className="font-bold text-lg">{user?.busNumber}</p>
            </div>
          </div>
          <span className="status-badge status-active">
            <span className="w-2 h-2 rounded-full bg-success-foreground animate-pulse-dot" />
            On Time
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{user?.route}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <Clock className="w-5 h-5 text-primary mb-2" />
          <p className="text-2xl font-extrabold">5 min</p>
          <p className="text-xs text-muted-foreground">ETA to your stop</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <MapPin className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-extrabold">2.3 km</p>
          <p className="text-xs text-muted-foreground">Distance away</p>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Subscription Status</p>
            <p className="text-xl font-bold mt-1">Active</p>
          </div>
          <CheckCircle2 className="w-10 h-10 opacity-80" />
        </div>
        <div className="mt-3 pt-3 border-t border-primary-foreground/20 text-sm opacity-80">
          Expiry: 15 June 2027
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
