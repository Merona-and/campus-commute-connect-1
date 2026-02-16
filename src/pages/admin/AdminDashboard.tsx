import { useAuth } from "@/contexts/AuthContext";
import { Bus, Users, CreditCard, AlertTriangle, CheckCircle2, LogOut, MapPin } from "lucide-react";
import { useState } from "react";

const buses = [
  { id: "101", number: "TN-01-1234", status: "active", driver: "Rajesh M" },
  { id: "102", number: "TN-01-5678", status: "delayed", driver: "Kumar S" },
  { id: "103", number: "TN-01-9012", status: "active", driver: "Anand R" },
  { id: "104", number: "TN-01-3456", status: "active", driver: "Vikram P" },
  { id: "105", number: "TN-01-7890", status: "stopped", driver: "Suresh K" },
];

const students = [
  { name: "Arun Kumar", status: "Active", expiry: "15 Jun 2027" },
  { name: "Priya S", status: "Active", expiry: "15 Jun 2027" },
  { name: "Deepak R", status: "Expired", expiry: "01 Jan 2026" },
  { name: "Kavitha M", status: "Active", expiry: "15 Jun 2027" },
];

const paymentRecords = [
  { name: "Arun Kumar", amount: "₹15,000", date: "12 Jan 2026", status: "Paid" },
  { name: "Priya S", amount: "₹15,000", date: "10 Jan 2026", status: "Paid" },
  { name: "Deepak R", amount: "₹15,000", date: "Pending", status: "Pending" },
  { name: "Kavitha M", amount: "₹15,000", date: "08 Jan 2026", status: "Paid" },
];

type AdminTab = "overview" | "buses" | "students" | "payments";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<AdminTab>("overview");

  const activeBuses = buses.filter((b) => b.status === "active").length;
  const delayedBuses = buses.filter((b) => b.status === "delayed").length;

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Bus className="w-4 h-4" /> },
    { id: "buses", label: "Buses", icon: <MapPin className="w-4 h-4" /> },
    { id: "students", label: "Students", icon: <Users className="w-4 h-4" /> },
    { id: "payments", label: "Payments", icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-5 pt-6 pb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Admin Panel</p>
            <h1 className="text-2xl font-extrabold">{user?.name}</h1>
          </div>
          <button onClick={logout} className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="max-w-4xl mx-auto -mt-4 px-5">
        <div className="flex gap-2 bg-card rounded-xl p-1.5 shadow-md border border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-5">
        {tab === "overview" && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <Bus className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-extrabold">{buses.length}</p>
                <p className="text-xs text-muted-foreground">Total Buses</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-extrabold">{activeBuses}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
                <p className="text-2xl font-extrabold">{delayedBuses}</p>
                <p className="text-xs text-muted-foreground">Delayed</p>
              </div>
            </div>

            <h2 className="text-lg font-bold">Quick Bus Status</h2>
            <div className="space-y-2">
              {buses.slice(0, 3).map((bus) => (
                <div key={bus.id} className="flex items-center justify-between bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <Bus className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Bus {bus.id}</p>
                      <p className="text-xs text-muted-foreground">{bus.number}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${bus.status === "active" ? "status-active" : bus.status === "delayed" ? "status-delayed" : "bg-muted text-muted-foreground"}`}>
                    {bus.status === "active" ? "🟢 On Time" : bus.status === "delayed" ? "🔴 Delayed" : "⚪ Stopped"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "buses" && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="text-lg font-bold">All Buses</h2>
            {buses.map((bus) => (
              <div key={bus.id} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bus className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Bus {bus.id}</p>
                      <p className="text-xs text-muted-foreground">{bus.number}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${bus.status === "active" ? "status-active" : bus.status === "delayed" ? "status-delayed" : "bg-muted text-muted-foreground"}`}>
                    {bus.status === "active" ? "On Time" : bus.status === "delayed" ? "Delayed" : "Stopped"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Driver: {bus.driver}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "students" && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="text-lg font-bold">Student Subscriptions</h2>
            {students.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-card rounded-xl p-4 border border-border">
                <div>
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Expiry: {s.expiry}</p>
                </div>
                <span className={`status-badge ${s.status === "Active" ? "status-active" : "status-delayed"}`}>
                  {s.status === "Active" ? "✅ Active" : "❌ Expired"}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "payments" && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="text-lg font-bold">Payment Records</h2>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-muted text-xs font-semibold text-muted-foreground">
                <span>Student</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Status</span>
              </div>
              {paymentRecords.map((p, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 px-4 py-3 border-t border-border text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span>{p.amount}</span>
                  <span className="text-muted-foreground">{p.date}</span>
                  <span className={`status-badge text-xs ${p.status === "Paid" ? "status-active" : "bg-warning/20 text-warning"}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
