import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Bus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import splashBg from "@/assets/splash-bg.jpg";
import { useToast } from "@/components/ui/use-toast";

const roles: { value: UserRole; label: string; icon: React.ReactNode }[] = [
    { value: "student", label: "Student", icon: <User className="w-5 h-5" /> },
    { value: "driver", label: "Driver", icon: <Bus className="w-5 h-5" /> },
];

const RegisterScreen = () => {
    const { registerUser } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<UserRole>("student");
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        if (!name || !id || !password) {
            toast({
                title: "All fields are required",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const success = registerUser(name, id, password, role);
            setLoading(false);

            if (success) {
                toast({
                    title: "Registration Successful",
                    description: "Please login with your credentials",
                });
                navigate("/");
            } else {
                toast({
                    title: "Registration Failed",
                    description: "An error occurred during registration",
                    variant: "destructive",
                });
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-amber-500/30">
            {/* Hero */}
            <div className="relative h-64 overflow-hidden flex-shrink-0">
                <img src={splashBg} alt="Campus" className="w-full h-full object-cover scale-110 blur-[2px] opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8">
                    <div className="w-20 h-20 rounded-[2.5rem] glass-premium flex items-center justify-center mb-6 shadow-2xl relative rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
                        <Bus className="w-10 h-10 text-amber-400 relative z-10" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter glow-text text-center leading-none mb-2 text-white">
                        {role.toUpperCase()}<br />ENROLLMENT
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400/80">Join Campus Commute Connect</p>
                </div>
            </div>

            {/* Form Container */}
            <div className="flex-1 -mt-10 rounded-t-[3rem] px-8 pt-10 pb-12 glass-premium border-t border-white/10 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl font-black text-foreground tracking-tight">Create Identity</h2>
                    <p className="text-sm text-muted-foreground font-medium opacity-60">Initialize your {role} profile</p>
                </div>

                {/* Role selector */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {roles.map((r) => (
                        <button
                            key={r.value}
                            type="button"
                            onClick={() => {
                                setRole(r.value);
                                setId("");
                            }}
                            className={`flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all duration-300 ${role === r.value
                                ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] scale-[1.02]"
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

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1 opacity-60">Legal Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full h-14 px-5 rounded-2xl border border-white/5 bg-white/5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1 opacity-60">Identification ID</label>
                        <input
                            type="text"
                            required
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder={role === "student" ? "RA21..." : "ADM-001..."}
                            className="w-full h-14 px-5 rounded-2xl border border-white/5 bg-white/5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1 opacity-60">Passkey</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-14 px-5 rounded-2xl border border-white/5 bg-white/5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1 opacity-60">Verify Key</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-14 px-5 rounded-2xl border border-white/5 bg-white/5 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 mt-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] text-white shadow-2xl shadow-amber-500/20 bg-gradient-to-r from-amber-500 to-orange-600 disabled:opacity-50"
                    >
                        {loading ? "Registering Sequence..." : "Confirm Enrollment"}
                    </button>

                    <p className="text-center text-sm font-medium text-muted-foreground opacity-60">
                        Already registered?{" "}
                        <Link to="/" className="text-amber-500 font-black hover:underline tracking-tight">
                            SIGN IN HERE
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
