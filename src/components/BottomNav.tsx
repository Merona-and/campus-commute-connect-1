import { ReactNode } from "react";
import { Home, Map, CreditCard, User } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const tabs: { id: string; label: string; icon: ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
  { id: "map", label: "Map", icon: <Map className="w-5 h-5" /> },
  { id: "payment", label: "Payment", icon: <CreditCard className="w-5 h-5" /> },
  { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
];

const BottomNav = ({ active, onNavigate }: BottomNavProps) => (
  <nav
    className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md px-4 py-3 flex justify-around items-center z-50 rounded-[2rem] glass-premium shadow-2xl transition-all duration-300 hover:w-[92%]"
  >
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onNavigate(tab.id)}
        className={`bottom-nav-item relative px-4 py-2 rounded-2xl transition-all duration-300 ${active === tab.id ? "active bg-white/5 shadow-inner" : "opacity-60 hover:opacity-100 hover:bg-white/5"}`}
      >
        {active === tab.id && (
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-primary shadow-[0_0_12px_hsl(262,83%,65%)]"
          />
        )}
        <div className={`relative transition-transform duration-300 ${active === tab.id ? "scale-110" : ""}`}>
          {tab.icon}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest mt-1 transition-all duration-300 ${active === tab.id ? "opacity-100" : "opacity-0 scale-75"}`}>
          {tab.label}
        </span>
      </button>
    ))}
  </nav >
);

export default BottomNav;
