import { useAuth } from "@/contexts/AuthContext";
import LoginScreen from "@/pages/LoginScreen";
import StudentDashboard from "@/pages/student/StudentDashboard";
import DriverDashboard from "@/pages/driver/DriverDashboard";
import AdminDashboard from "@/pages/admin/AdminDashboard";

const Index = () => {
  const { user } = useAuth();

  if (!user) return <LoginScreen />;

  switch (user.role) {
    case "student": return <StudentDashboard />;
    case "driver": return <DriverDashboard />;
    case "admin": return <AdminDashboard />;
    default: return <LoginScreen />;
  }
};

export default Index;
