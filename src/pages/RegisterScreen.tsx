import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Bus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import splashBg from "@/assets/splash-bg.jpg";
import { useToast } from "@/components/ui/use-toast";

const RegisterScreen = () => {
    const { registerStudent } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

        if (!name || !rollNumber || !password) {
            toast({
                title: "All fields are required",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const success = registerStudent(name, rollNumber, password);
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
                    variant: "destructive",
                });
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <div className="relative h-52 overflow-hidden">
                <img src={splashBg} alt="Campus" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-violet-950/70 via-purple-950/85 to-[hsl(240,15%,6%)] flex flex-col items-center justify-center text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3" style={{ boxShadow: '0 0 28px hsl(35 100% 55% / 0.4)' }}>
                        <Bus className="w-7 h-7 text-amber-300" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Student Registration</h1>
                    <p className="text-sm text-amber-300 mt-1">Join Campus Commute Connect</p>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 -mt-6 rounded-t-3xl px-6 pt-8 pb-6" style={{ background: 'hsl(240 15% 6%)', borderTop: '1px solid hsl(262 30% 22%)' }}>
                <div className="flex justify-center mb-6">
                    <div className="p-3 rounded-2xl" style={{ background: 'hsl(35 100% 55% / 0.15)', border: '1px solid hsl(35 100% 55% / 0.3)', boxShadow: '0 0 20px hsl(35 100% 55% / 0.15)' }}>
                        <User className="w-8 h-8 text-amber-400" />
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-1 text-foreground text-center">Create Account</h2>
                <p className="text-sm text-muted-foreground mb-6 text-center">Fill in your details to register</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Roll Number (Student ID)</label>
                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="RA211100..."
                            className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-60 text-white mt-4"
                        style={{ background: 'linear-gradient(135deg, hsl(35 100% 55%), hsl(20 100% 50%))', boxShadow: '0 4px 20px hsl(35 100% 55% / 0.35)' }}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-violet-400 font-medium cursor-pointer hover:text-violet-300 hover:underline">
                            Sign In here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
