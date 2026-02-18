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
        alert("Invalid credentials! If you are a student, please ensure you are registered.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative h-60 overflow-hidden">
        <img src={splashBg} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/70 via-purple-950/85 to-[hsl(240,15%,6%)] flex flex-col items-center justify-center text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 shadow-lg" style={{ boxShadow: '0 0 32px hsl(262 83% 65% / 0.4)' }}>
            <Bus className="w-8 h-8 text-violet-300" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Campus Commute</h1>
          <p className="text-sm text-violet-300 mt-1 font-medium">Track • Pay • Ride</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 -mt-6 rounded-t-3xl px-6 pt-8 pb-6" style={{ background: 'hsl(240 15% 6%)', borderTop: '1px solid hsl(262 30% 22%)' }}>
        <h2 className="text-xl font-bold mb-2 text-foreground">Welcome back</h2>
        <p className="text-sm text-muted-foreground mb-6">Sign in to your account</p>

        {/* Role selector */}
        <div className="flex gap-2 mb-6">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${role === r.value
                ? "border-violet-500 bg-violet-500/15 text-violet-300"
                : "border-border text-muted-foreground hover:border-violet-500/40 hover:text-violet-400"
                }`}
              style={role === r.value ? { boxShadow: '0 0 12px hsl(262 83% 65% / 0.2)' } : {}}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              {role === "student" ? "Roll Number / Student ID" : "Email"}
            </label>
            <input
              type={role === "student" ? "text" : "email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "student" ? "RA21..." : "your@college.edu"}
              className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/60 transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/60 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-60 text-white mt-2"
            style={{ background: 'linear-gradient(135deg, hsl(262 83% 60%), hsl(280 70% 55%))', boxShadow: '0 4px 20px hsl(262 83% 65% / 0.35)' }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Forgot password? <span className="text-violet-400 font-medium cursor-pointer hover:text-violet-300">Reset here</span>
          </p>

          {role === "student" && (
            <div className="pt-3 border-t border-border mt-2">
              <p className="text-center text-sm text-muted-foreground">
                New Student?{" "}
                <Link to="/register" className="text-amber-400 font-bold cursor-pointer hover:text-amber-300 hover:underline">
                  Register Now
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
