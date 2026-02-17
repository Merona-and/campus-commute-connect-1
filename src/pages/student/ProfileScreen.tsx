import { useAuth } from "@/contexts/AuthContext";
import { User, CreditCard, Bus, MapPin, LogOut, CheckCircle2 } from "lucide-react";

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const items = [
    { icon: <User className="w-5 h-5" />, label: "Name", value: user?.name },
    { icon: <CreditCard className="w-5 h-5" />, label: "Student ID", value: user?.studentId },
    { icon: <Bus className="w-5 h-5" />, label: "Bus Number", value: user?.busNumber },
    { icon: <MapPin className="w-5 h-5" />, label: "Route", value: user?.route },
  ];

  return (
    <div className="px-5 pt-6 pb-24 space-y-5 animate-fade-in">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-xl font-extrabold">{user?.name}</h1>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      {/* Info */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-5 py-4 ${i < items.length - 1 ? "border-b border-border" : ""}`}
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-medium text-sm">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription status */}
      <div className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
        <CheckCircle2 className="w-6 h-6 text-success" />
        <div>
          <p className="font-semibold text-sm">Subscription Active</p>
          <p className="text-xs text-muted-foreground">Valid until 15 June 2027</p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-destructive text-destructive font-bold transition-all hover:bg-destructive hover:text-destructive-foreground"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default ProfileScreen;
