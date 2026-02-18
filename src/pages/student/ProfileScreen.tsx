import { useAuth } from "@/contexts/AuthContext";
import { User, CreditCard, Bus, MapPin, LogOut, CheckCircle2, Phone, Mail, ChevronRight, Settings } from "lucide-react";

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  // Generate initials for avatar
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "ST";

  return (
    <div className="px-4 pt-6 pb-24 space-y-4">
      {/* Avatar & Name */}
      <div className="flex flex-col items-center py-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-3 text-2xl font-extrabold text-white"
          style={{ background: 'linear-gradient(135deg, hsl(262 83% 55%), hsl(280 70% 50%))', boxShadow: '0 4px 20px hsl(262 83% 65% / 0.35)' }}
        >
          {initials}
        </div>
        <h1 className="text-xl font-extrabold text-foreground">{user?.name ?? "Student"}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{user?.email ?? user?.studentId ?? "—"}</p>
        <span className="mt-2 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'hsl(262 83% 65% / 0.15)', color: 'hsl(262 83% 75%)', border: '1px solid hsl(262 83% 65% / 0.25)' }}>
          Student
        </span>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
        {[
          { icon: <User className="w-4 h-4" />, label: "Full Name", value: user?.name ?? "—" },
          { icon: <CreditCard className="w-4 h-4" />, label: "Student ID", value: user?.studentId ?? "—" },
          { icon: <Bus className="w-4 h-4" />, label: "Bus Number", value: user?.busNumber ?? "—" },
          { icon: <MapPin className="w-4 h-4" />, label: "Route", value: user?.route ?? "—" },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? "border-b" : ""}`}
            style={{ borderColor: 'hsl(262 30% 18%)' }}
          >
            <span className="text-violet-400 flex-shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-medium text-sm text-foreground truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div className="rounded-xl p-4 border flex items-center gap-3" style={{ background: 'hsl(145 70% 48% / 0.08)', borderColor: 'hsl(145 70% 48% / 0.25)' }}>
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">Subscription Active</p>
          <p className="text-xs text-muted-foreground">Valid until 15 June 2027</p>
        </div>
        <span className="text-xs font-bold text-emerald-400">ACTIVE</span>
      </div>

      {/* Settings */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
        {[
          { icon: <Settings className="w-4 h-4" />, label: "Account Settings" },
          { icon: <Phone className="w-4 h-4" />, label: "Contact Support" },
          { icon: <Mail className="w-4 h-4" />, label: "Send Feedback" },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/5 transition-colors ${i < arr.length - 1 ? "border-b" : ""}`}
            style={{ borderColor: 'hsl(262 30% 18%)' }}
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-80"
        style={{ background: 'hsl(0 80% 60% / 0.12)', border: '1px solid hsl(0 80% 60% / 0.3)', color: 'hsl(0 80% 65%)' }}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileScreen;
