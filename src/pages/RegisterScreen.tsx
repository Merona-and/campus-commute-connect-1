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
        // Simulate network delay
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
            <div className="relative h-48 overflow-hidden">
                <img src={splashBg} alt="Campus" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90 flex flex-col items-center justify-center text-primary-foreground">
                    <Bus className="w-10 h-10 mb-2" />
                    <h1 className="text-xl font-bold tracking-tight">Student Registration</h1>
                    <p className="text-sm opacity-90">Join Campus Commute Connect</p>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 -mt-6 bg-background/85 backdrop-blur-md rounded-t-3xl px-6 pt-8 pb-6">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <User className="w-8 h-8 text-primary" />
                    </div>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">Roll Number (Student ID)</label>
                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="RA211100..."
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

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base transition-all hover:opacity-90 disabled:opacity-60 mt-4"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-primary font-medium cursor-pointer hover:underline">
                            Sign In here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterScreen;
