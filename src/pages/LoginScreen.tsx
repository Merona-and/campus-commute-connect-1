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
        // You might want to add a toast here, but for now just console log
        console.error("Login failed");
        alert("Invalid credentials! If you are a student, please ensure you are registered.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src={splashBg} alt="Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90 flex flex-col items-center justify-center text-primary-foreground">
          <Bus className="w-12 h-12 mb-2 animate-bus-move" />
          <h1 className="text-2xl font-extrabold tracking-tight">College Transport</h1>
          <p className="text-sm opacity-90">Track • Pay • Ride</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 -mt-6 bg-background/85 backdrop-blur-md rounded-t-3xl px-6 pt-8 pb-6">
        <h2 className="text-xl font-bold mb-6">Sign In</h2>

        {/* Role selector */}
        <div className="flex gap-2 mb-6">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${role === r.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
                }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">
              {role === "student" ? "Roll Number / Student ID" : "Email"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "student" ? "RA21..." : "your@college.edu"}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base transition-all hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Forgot password? <span className="text-primary font-medium cursor-pointer">Reset here</span>
          </p>

          {role === "student" && (
            <div className="pt-2 border-t border-border mt-2">
              <p className="text-center text-sm text-muted-foreground">
                New Student?{" "}
                <Link to="/register" className="text-primary font-bold cursor-pointer hover:underline">
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
