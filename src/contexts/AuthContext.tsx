import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "driver" | "admin";

interface User {
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  busNumber: string;
  route?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<UserRole, User> = {
  student: {
    name: "Arun Kumar",
    email: "arun@college.edu",
    role: "student",
    studentId: "STU-2024-0142",
    busNumber: "TN-01-1234",
    route: "Central Campus → Sector 5 → Main Gate",
  },
  driver: {
    name: "Rajesh M",
    email: "rajesh@college.edu",
    role: "driver",
    busNumber: "TN-01-1234",
  },
  admin: {
    name: "Dr. Priya S",
    email: "admin@college.edu",
    role: "admin",
    busNumber: "",
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole) => {
    setUser(MOCK_USERS[role]);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
