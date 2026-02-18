import { useAuth } from "@/contexts/AuthContext";
import { Bus, Play, Square, MapPin, LogOut, Clock, Users } from "lucide-react";
import { useState } from "react";

const DriverDashboard = () => {
  const { user, logout } = useAuth();
  const [tripActive, setTripActive] = useState(false);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const todayLog = [
    { label: "Morning Trip", time: "6:30 AM → 8:15 AM", done: true },
    { label: "Afternoon Trip", time: "12:00 PM → 1:30 PM", done: tripActive ? null : false },
    { label: "Evening Trip", time: "5:00 PM → 6:45 PM", done: false },
  ];

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 pt-6 pb-8" style={{ background: 'hsl(240 15% 6%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <h1 className="text-2xl font-extrabold text-foreground">{user?.name ?? "Driver"} 🚌</h1>
        </div>
        <button
          onClick={logout}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-80"
          style={{ background: 'hsl(240 12% 14%)', border: '1px solid hsl(262 30% 22%)' }}
        >
          <LogOut className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Bus Info */}
      <div className="rounded-2xl p-5 border mb-4" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsl(262 83% 65% / 0.15)', border: '1px solid hsl(262 83% 65% / 0.25)' }}>
            <Bus className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Assigned Bus</p>
            <p className="font-bold text-xl text-foreground">{user?.busNumber ?? "TN-01-1234"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
          <span>SRM Campus → Guduvanchery → Tambaram</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span><span className="text-foreground font-medium">42</span> students on this route today</span>
        </div>
      </div>

      {/* Trip Status */}
      <div
        className="rounded-2xl p-5 mb-4 text-center border-2 transition-all"
        style={{
          background: tripActive ? 'hsl(145 70% 48% / 0.08)' : 'hsl(240 12% 10%)',
          borderColor: tripActive ? 'hsl(145 70% 48% / 0.4)' : 'hsl(262 30% 22%)',
        }}
      >
        <div
          className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center transition-all"
          style={{ background: tripActive ? 'hsl(145 70% 48% / 0.2)' : 'hsl(240 12% 14%)' }}
        >
          <Bus className={`w-8 h-8 ${tripActive ? "text-emerald-400" : "text-muted-foreground"}`} />
        </div>
        <p className="text-xl font-bold text-foreground">{tripActive ? "Trip Active" : "Trip Not Started"}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {tripActive ? "GPS is broadcasting your location to students" : "Tap Start Trip when you're ready to depart"}
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => setTripActive(true)}
          disabled={tripActive}
          className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-40 text-white"
          style={{ background: 'linear-gradient(135deg, hsl(145 70% 40%), hsl(145 60% 35%))', boxShadow: tripActive ? 'none' : '0 4px 16px hsl(145 70% 48% / 0.3)' }}
        >
          <Play className="w-5 h-5" />
          Start Trip
        </button>
        <button
          onClick={() => setTripActive(false)}
          disabled={!tripActive}
          className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-40 text-white"
          style={{ background: 'linear-gradient(135deg, hsl(0 80% 55%), hsl(0 70% 48%))', boxShadow: !tripActive ? 'none' : '0 4px 16px hsl(0 80% 60% / 0.3)' }}
        >
          <Square className="w-5 h-5" />
          End Trip
        </button>
      </div>

      {/* Today's Log */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Today's Schedule</h2>
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
          {todayLog.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-4 py-3.5 ${i < todayLog.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: 'hsl(262 30% 18%)' }}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <span className={`status-badge text-xs ${item.done === true ? "status-active" :
                  item.done === null ? "text-amber-400" :
                    "text-muted-foreground"
                }`}
                style={item.done === null ? { background: 'hsl(35 100% 55% / 0.12)', border: '1px solid hsl(35 100% 55% / 0.3)' } :
                  item.done === false ? { background: 'hsl(240 12% 14%)', border: '1px solid hsl(262 30% 22%)' } : {}}
              >
                {item.done === true ? "Done" : item.done === null ? "In Progress" : "Upcoming"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
