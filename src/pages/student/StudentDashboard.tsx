import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import StudentHome from "./StudentHome";
import MapScreen from "./MapScreen";
import PaymentScreen from "./PaymentScreen";
import ProfileScreen from "./ProfileScreen";

const StudentDashboard = () => {
  const [tab, setTab] = useState("home");

  const renderTab = () => {
    switch (tab) {
      case "home": return <StudentHome />;
      case "map": return <MapScreen />;
      case "payment": return <PaymentScreen />;
      case "profile": return <ProfileScreen />;
      default: return <StudentHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {renderTab()}
      <BottomNav active={tab} onNavigate={setTab} />
    </div>
  );
};

export default StudentDashboard;
