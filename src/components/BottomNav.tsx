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
    className="fixed bottom-0 left-0 right-0 px-2 py-2 flex justify-around z-50"
    style={{
      background: 'hsl(240 12% 8% / 0.92)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid hsl(262 30% 20%)',
      boxShadow: '0 -4px 24px hsl(0 0% 0% / 0.4)',
    }}
  >
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onNavigate(tab.id)}
        className={`bottom-nav-item ${active === tab.id ? "active" : ""}`}
      >
        {active === tab.id && (
          <span
            className="absolute -top-0.5 w-8 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(262 83% 65%), hsl(280 70% 60%))' }}
          />
        )}
        <span className="relative">
          {tab.icon}
        </span>
        <span>{tab.label}</span>
      </button>
    ))}
  </nav>
);

export default BottomNav;
