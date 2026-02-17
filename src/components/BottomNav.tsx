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
  <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 flex justify-around z-50">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onNavigate(tab.id)}
        className={`bottom-nav-item ${active === tab.id ? "active text-primary" : ""}`}
      >
        {tab.icon}
        <span>{tab.label}</span>
      </button>
    ))}
  </nav>
);

export default BottomNav;
