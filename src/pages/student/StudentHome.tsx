import { useAuth } from "@/contexts/AuthContext";
import { Bus, MapPin, Clock, CheckCircle2, Bell, ChevronRight } from "lucide-react";

const StudentHome = () => {
  const { user } = useAuth();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="px-4 pt-6 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{greeting} 👋</p>
          <h1 className="text-2xl font-extrabold text-foreground mt-0.5">{user?.name ?? "Student"}</h1>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: 'hsl(240 12% 14%)', border: '1px solid hsl(262 30% 22%)' }}>
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        </button>
      </div>

      {/* Bus Status Card */}
      <div className="rounded-2xl p-5 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)', boxShadow: '0 4px 24px hsl(262 83% 65% / 0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsl(262 83% 65% / 0.15)', border: '1px solid hsl(262 83% 65% / 0.25)' }}>
              <Bus className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Bus</p>
              <p className="font-bold text-lg text-foreground">{user?.busNumber ?? "TN-01-1234"}</p>
            </div>
          </div>
          <span className="status-badge status-active text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            On Time
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
          <span className="truncate">{user?.route ?? "SRM Campus → Kattankulathur"}</span>
        </div>

        <div className="h-px w-full mb-3" style={{ background: 'hsl(262 30% 18%)' }} />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Next stop: <span className="text-foreground font-medium">Guduvanchery</span></span>
          <span className="text-violet-400 font-medium">Track live →</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-4 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-muted-foreground">ETA</span>
          </div>
          <p className="text-2xl font-extrabold text-foreground">5 min</p>
          <p className="text-xs text-muted-foreground mt-0.5">to your stop</p>
        </div>
        <div className="rounded-xl p-4 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
          <div className="flex items-center justify-between mb-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-muted-foreground">Distance</span>
          </div>
          <p className="text-2xl font-extrabold text-foreground">2.3 km</p>
          <p className="text-xs text-muted-foreground mt-0.5">bus from you</p>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="rounded-2xl p-5 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(262 83% 42%), hsl(280 70% 38%), hsl(240 60% 32%))', boxShadow: '0 8px 32px hsl(262 83% 65% / 0.25)' }}>
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-xs opacity-75 font-medium uppercase tracking-wide">Subscription</p>
            <p className="text-lg font-bold mt-0.5">Active — Yearly Plan</p>
            <p className="text-xs opacity-70 mt-1">Expires 15 Jun 2027</p>
          </div>
          <CheckCircle2 className="w-9 h-9 opacity-80 flex-shrink-0" />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Quick Actions</h2>
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
          {[
            { label: "View bus schedule", sub: "Today's timings" },
            { label: "Report an issue", sub: "Bus late or missing?" },
            { label: "Download pass", sub: "Monthly bus pass PDF" },
          ].map((item, i, arr) => (
            <div key={item.label} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'hsl(262 30% 18%)' }}>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
