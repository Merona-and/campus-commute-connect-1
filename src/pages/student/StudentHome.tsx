import { useAuth } from "@/contexts/AuthContext";
import { Bus, MapPin, Clock, CheckCircle2, Bell, ChevronRight } from "lucide-react";

const StudentHome = () => {
  const { user } = useAuth();

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="px-6 pt-10 pb-28 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm font-medium tracking-tight opacity-80 uppercase">{greeting}</p>
          <h1 className="text-3xl font-black text-foreground tracking-tighter glow-text">
            {user?.name ?? "Student"}
          </h1>
        </div>
        <button className="w-12 h-12 rounded-2xl flex items-center justify-center relative glass-premium transition-all duration-300 hover:scale-110 hover:shadow-primary/20 active:scale-95">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-background animate-pulse" />
        </button>
      </div>

      {/* Bus Status Card */}
      <div className="rounded-[2rem] p-6 glass-premium glow-border-premium relative overflow-hidden group transition-all duration-500 hover:translate-y-[-4px]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[64px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-500" />

        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20 shadow-inner">
              <Bus className="w-8 h-8 text-primary glow-text" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.1em] mb-0.5 opacity-60">Live Tracking</p>
              <p className="font-black text-xl text-foreground tracking-tight">{user?.busNumber ?? "TN-01-1234"}</p>
            </div>
          </div>
          <span className="status-badge status-active text-[10px] px-3 py-1 scale-90 origin-right">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            Active
          </span>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3 text-sm text-foreground/80 bg-white/5 py-3 px-4 rounded-xl border border-white/5">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate font-medium">{user?.route ?? "SRM Campus → Kattankulathur"}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 opacity-50">Next Stop</p>
              <p className="text-sm font-bold text-foreground truncate">Guduvanchery</p>
            </div>
            <div className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1 opacity-50">ETA</p>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-emerald-400" />
                <p className="text-sm font-bold text-foreground">5 min</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest transition-all hover:brightness-110 active:scale-[0.98] shadow-lg shadow-primary/20">
          Live Track Vehicle
        </button>
      </div>

      {/* Stats and Info Section */}
      <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 mt-8 mb-2 opacity-50">Overview</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[1.5rem] p-5 glass-premium border border-white/5 space-y-3 group hover:border-primary/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <Clock className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground leading-none">5 min</p>
            <p className="text-[10px] text-muted-foreground mt-1.5 font-bold uppercase tracking-wider opacity-60">To your stop</p>
          </div>
        </div>
        <div className="rounded-[1.5rem] p-5 glass-premium border border-white/5 space-y-3 group hover:border-amber-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <MapPin className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground leading-none">2.3 km</p>
            <p className="text-[10px] text-muted-foreground mt-1.5 font-bold uppercase tracking-wider opacity-60">Total distance</p>
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl shadow-primary/20 group" style={{ background: 'linear-gradient(135deg, hsl(262 83% 45%), hsl(280 75% 40%))' }}>
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-150" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-black/20 blur-2xl" />

        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/20 border border-white/10 backdrop-blur-md mb-2">
              <div className="w-1 h-1 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-wider">Plan Active</span>
            </div>
            <p className="text-xl font-black tracking-tight leading-tight">Yearly Premium Commute</p>
            <div className="flex items-center gap-1.5 text-white/60">
              <Clock className="w-3 h-3" />
              <p className="text-[10px] font-bold">Expires 15 Jun 2027</p>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-300">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-50">Quick Services</h2>
        <div className="rounded-[1.5rem] glass-premium overflow-hidden divide-y divide-white/5">
          {[
            { label: "View bus schedule", sub: "Daily arrival & departure timings" },
            { label: "Report an issue", sub: "Instant feedback for delays or issues" },
            { label: "Download pass", sub: "Official biometric-ready bus pass" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/5 transition-all text-left group">
              <div>
                <p className="text-sm font-black text-foreground mb-0.5 tracking-tight group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-xs text-muted-foreground opacity-60 font-medium">{item.sub}</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/5 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
