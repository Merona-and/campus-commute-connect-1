import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "driver" | "admin";

interface User {
  name: string;
  email?: string;
  role: UserRole;
  studentId?: string;
  busNumber: string;
  route?: string;
  password?: string;
}

export interface SosAlert {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  busNumber: string;
  timestamp: string;
  status: "active" | "resolved";
}

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  registerUser: (name: string, id: string, password: string, role: UserRole) => boolean;
  students: User[];
  drivers: User[];
  sosAlerts: SosAlert[];
  triggerSos: () => void;
  resolveSos: (alertId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hardcoded admin accounts — only these two admins exist
const ADMIN_USERS: User[] = [
  {
    name: "S.PRIYA",
    role: "admin",
    studentId: "CCA-001",
    password: "CAMPUS-CCA1",
    busNumber: "",
  },
  {
    name: "A.ANU",
    role: "admin",
    studentId: "CCA-002",
    password: "CAMPUS-CCA2",
    busNumber: "",
  },
];

const MOCK_USERS: Record<"student" | "driver", User> = {
  student: {
    name: "Arun Kumar",
    email: "arun@gmail.com",
    role: "student",
    studentId: "STU-2024-0142",
    busNumber: "TN-01-1234",
    route: "Central Campus -> Sector 5 -> Main Gate",
  },
  driver: {
    name: "Rajesh M",
    email: "rajesh@gmail.com",
    role: "driver",
    studentId: "DRV-101",
    busNumber: "TN-01-1234",
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("registeredUsers");
    if (saved) return JSON.parse(saved);
    // Migration: check old registeredStudents
    const oldStudents = localStorage.getItem("registeredStudents");
    if (oldStudents) {
      const parsed = JSON.parse(oldStudents);
      localStorage.setItem("registeredUsers", oldStudents);
      localStorage.removeItem("registeredStudents");
      return parsed;
    }
    return [];
  });

  const [sosAlerts, setSosAlerts] = useState<SosAlert[]>(() => {
    const saved = localStorage.getItem("sosAlerts");
    return saved ? JSON.parse(saved) : [];
  });

  const registerUser = (name: string, id: string, password: string, role: UserRole) => {
    const newUser: User = {
      name,
      role,
      studentId: id,
      password,
      busNumber: role === "driver" ? "TN-01-1234" : "Not Assigned",
      route: "Not Assigned"
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    return true;
  };

  const login = (id: string, password: string, role: UserRole) => {
    // Admin override: Allow specified admins to log in as ANY role
    const adminUser = ADMIN_USERS.find(
      (u) => u.studentId === id && u.password === password
    );

    if (adminUser) {
      // Create a user object with the requested role but admin's name/ID
      const userWithRequestedRole: User = {
        ...adminUser,
        role: role // Use the role they selected at login
      };
      setUser(userWithRequestedRole);
      localStorage.setItem("currentUser", JSON.stringify(userWithRequestedRole));
      return true;
    }

    // Student / Driver: check registered users pool
    const foundUser = registeredUsers.find(
      (u) => u.role === role && u.studentId === id && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }

    // Fallback to mock users (student / driver demo accounts)
    const mockUser = MOCK_USERS[role as "student" | "driver"];
    if (mockUser && mockUser.studentId === id) {
      const mockPass = role === "student" ? "pass" : role;
      if (password === mockPass || (mockUser as any).password === password) {
        setUser(mockUser);
        localStorage.setItem("currentUser", JSON.stringify(mockUser));
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const triggerSos = () => {
    if (!user) return;

    const newAlert: SosAlert = {
      id: `SOS-${Date.now()}`,
      userId: user.studentId || "unknown",
      userName: user.name,
      userRole: user.role,
      busNumber: user.busNumber || "Not Assigned",
      timestamp: new Date().toLocaleTimeString(),
      status: "active",
    };

    const updatedAlerts = [newAlert, ...sosAlerts];
    setSosAlerts(updatedAlerts);
    localStorage.setItem("sosAlerts", JSON.stringify(updatedAlerts));
  };

  const resolveSos = (alertId: string) => {
    const updatedAlerts = sosAlerts.map(alert =>
      alert.id === alertId ? { ...alert, status: "resolved" as const } : alert
    );
    setSosAlerts(updatedAlerts);
    localStorage.setItem("sosAlerts", JSON.stringify(updatedAlerts));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      registerUser,
      students: registeredUsers.filter(u => u.role === "student"),
      drivers: [
        MOCK_USERS.driver,
        ...registeredUsers.filter(u => u.role === "driver")
      ],
      sosAlerts,
      triggerSos,
      resolveSos
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
