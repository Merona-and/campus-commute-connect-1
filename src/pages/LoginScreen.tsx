import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Bus, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import splashBg from "@/assets/splash-bg.jpg";

const roles: { value: UserRole; label: string; icon: React.ReactNode }[] = [
  { value: "student", label: "Student", icon: <User className="w-5 h-5" /> },
  { value: "driver", label: "Driver", icon: <Bus className="w-5 h-5" /> },
  { value: "admin", label: "Admin", icon: <Shield className="w-5 h-5" /> },
];

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password, role);
      setLoading(false);
      if (!success) {
        console.error("Login failed");
        if (role === "student") {
          alert("Invalid Identification Number or Password! Please ensure you are registered.");
        } else {
          if (!email.endsWith("@college.edu")) {
            alert("External email detected. Only @college.edu addresses are authorized for this role.");
          } else {
            alert("Authentication failed. Please check your credentials.");
          }
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden flex-shrink-0">
        <img src={splashBg} alt="Campus" className="w-full h-full object-cover scale-110 blur-[2px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          <div className="w-20 h-20 rounded-[2rem] glass-premium flex items-center justify-center mb-6 shadow-2xl relative group rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <Bus className="w-10 h-10 text-primary relative z-10 glow-text" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter glow-text text-center leading-none mb-2">
            CAMPUS<br />COMMUTE
          </h1>
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Track • Pay • Ride</span>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 -mt-10 rounded-t-[3rem] px-8 pt-10 pb-12 glass-premium border-t border-white/10 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="space-y-1 mb-8">
          <h2 className="text-2xl font-black text-foreground tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground font-medium opacity-60">Authorize to access your dashboard</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => {
                setRole(r.value);
                setEmail(""); // Reset email when switching roles to prevent crossover
                setPassword("");
              }}
              className={`flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all duration-300 ${role === r.value
                ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.02]"
                : "border-white/5 bg-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/10"
                }`}
            >
              <div className={`transition-transform duration-300 ${role === r.value ? "scale-110 rotate-3" : ""}`}>
                {r.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1 opacity-60">
              {role === "student" ? "Identification Number" : `${role.charAt(0).toUpperCase() + role.slice(1)} Email`}
            </label>
            <input
              type={role === "student" ? "text" : "email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "student" ? "RA21..." : "example@college.edu"}
              className="w-full h-14 px-5 rounded-2xl border border-white/5 bg-white/5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all font-medium"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Security Key</label>
              <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline uppercase tracking-wide">Forgot?</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-14 px-5 rounded-2xl border border-white/5 bg-white/5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] text-white shadow-2xl shadow-primary/20 bg-primary disabled:opacity-50"
          >
            {loading ? "Establishing Link..." : "Secure Access"}
          </button>

          {role === "student" && (
            <div className="pt-6 mt-4 border-t border-white/5">
              <p className="text-center text-sm font-medium text-muted-foreground opacity-60">
                New to the system?{" "}
                <Link to="/register" className="text-primary font-black hover:underline tracking-tight">
                  REGISTER NOW
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
