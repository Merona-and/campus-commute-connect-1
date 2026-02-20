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

const paymentRecords = [
  { name: "Arun Kumar", amount: "₹15,000", date: "12 Jan 2026", status: "Paid" },
  { name: "Priya S", amount: "₹15,000", date: "10 Jan 2026", status: "Paid" },
  { name: "Deepak R", amount: "₹15,000", date: "Pending", status: "Pending" },
  { name: "Kavitha M", amount: "₹15,000", date: "08 Jan 2026", status: "Paid" },
];

type AdminTab = "overview" | "buses" | "students" | "payments";

const AdminDashboard = () => {
  const { user, logout, students } = useAuth();
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
    <div className="min-h-screen flex flex-col" style={{ background: 'hsl(240 15% 6%)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-6 relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, hsl(262 83% 30%), hsl(280 70% 25%), hsl(240 60% 20%))', boxShadow: '0 8px 32px hsl(262 83% 65% / 0.25)' }}>
        {/* Decorative orbs */}
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, hsl(262 83% 65%), transparent)' }} />
        <div className="absolute right-20 bottom-0 w-24 h-24 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, hsl(35 100% 55%), transparent)' }} />

        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div>
            <p className="text-sm text-violet-300 font-medium">Admin Panel</p>
            <h1 className="text-2xl font-extrabold text-white">{user?.name}</h1>
          </div>
          <button
            onClick={logout}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:opacity-80"
            style={{ background: 'hsl(0 0% 100% / 0.1)', border: '1px solid hsl(0 0% 100% / 0.2)' }}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="max-w-4xl mx-auto w-full px-5 pt-4 pb-2 flex-shrink-0">
        <div className="flex gap-1.5 rounded-xl p-1.5 shadow-xl" style={{ background: 'hsl(240 12% 10%)', border: '1px solid hsl(262 30% 22%)' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${tab === t.id
                ? "text-white"
                : "text-foreground hover:text-white"
                }`}
              style={tab === t.id
                ? { background: 'linear-gradient(135deg, hsl(262 83% 55%), hsl(280 70% 50%))', boxShadow: '0 2px 12px hsl(262 83% 65% / 0.3)' }
                : { background: 'hsl(240 12% 16%)', border: '1px solid hsl(262 20% 28%)' }}
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
              <div className="rounded-xl p-4 border text-center" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'hsl(262 83% 65% / 0.15)' }}>
                  <Bus className="w-5 h-5 text-violet-400" />
                </div>
                <p className="text-2xl font-extrabold text-foreground">{buses.length}</p>
                <p className="text-xs text-muted-foreground">Total Buses</p>
              </div>
              <div className="rounded-xl p-4 border text-center" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'hsl(145 70% 48% / 0.15)' }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-2xl font-extrabold text-foreground">{activeBuses}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="rounded-xl p-4 border text-center" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: 'hsl(0 80% 60% / 0.15)' }}>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-2xl font-extrabold text-foreground">{delayedBuses}</p>
                <p className="text-xs text-muted-foreground">Delayed</p>
              </div>
            </div>

            <h2 className="text-lg font-bold text-foreground">Quick Bus Status</h2>
            <div className="space-y-2">
              {buses.slice(0, 3).map((bus) => (
                <div key={bus.id} className="flex items-center justify-between rounded-xl p-4 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(262 83% 65% / 0.15)' }}>
                      <Bus className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Bus {bus.id}</p>
                      <p className="text-xs text-muted-foreground">{bus.number}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${bus.status === "active" ? "status-active" : bus.status === "delayed" ? "status-delayed" : "bg-muted text-muted-foreground"}`}>
                    {bus.status === "active" ? "On Time" : bus.status === "delayed" ? "Delayed" : "Stopped"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "buses" && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="text-lg font-bold text-foreground">All Buses</h2>
            {buses.map((bus) => (
              <div key={bus.id} className="rounded-xl p-4 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(262 83% 65% / 0.15)', border: '1px solid hsl(262 83% 65% / 0.25)' }}>
                      <Bus className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Bus {bus.id}</p>
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
            <h2 className="text-lg font-bold text-foreground">Registered Students</h2>
            {students && students.length > 0 ? (
              students.map((s, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-xl p-4 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {s.studentId || s.email}</p>
                    </div>
                    <span className="status-badge status-active">Active</span>
                  </div>

                  <div className="p-2 rounded-lg mt-2 text-xs" style={{ background: 'hsl(240 15% 7%)' }}>
                    <p className="text-muted-foreground mb-1">Credentials:</p>
                    <div className="flex justify-between items-center">
                      <span className="font-mono px-2 py-0.5 rounded border" style={{ background: 'hsl(240 12% 12%)', borderColor: 'hsl(262 30% 22%)' }}>
                        Pass: {s.password}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No students registered yet.</p>
              </div>
            )}
          </div>
        )}

        {tab === "payments" && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="text-lg font-bold text-foreground">Payment Records</h2>
            <div className="rounded-xl border overflow-hidden" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
              <div className="grid grid-cols-4 gap-2 px-4 py-3 text-xs font-semibold text-muted-foreground" style={{ background: 'hsl(240 15% 7%)' }}>
                <span>Student</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Status</span>
              </div>
              {paymentRecords.map((p, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 px-4 py-3 border-t text-sm" style={{ borderColor: 'hsl(262 30% 22%)' }}>
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-foreground">{p.amount}</span>
                  <span className="text-muted-foreground">{p.date}</span>
                  <span className={`status-badge text-xs ${p.status === "Paid" ? "status-active" : "text-amber-400"}`}
                    style={p.status !== "Paid" ? { background: 'hsl(35 100% 55% / 0.15)', border: '1px solid hsl(35 100% 55% / 0.3)' } : {}}>
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
