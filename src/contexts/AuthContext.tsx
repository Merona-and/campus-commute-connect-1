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

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  registerUser: (name: string, id: string, password: string, role: UserRole) => boolean;
  students: User[];
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
    // Admin: check against hardcoded admin dataset only
    if (role === "admin") {
      const adminUser = ADMIN_USERS.find(
        (u) => u.studentId === id && u.password === password
      );
      if (adminUser) {
        setUser(adminUser);
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        return true;
      }
      return false;
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

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, students: registeredUsers.filter(u => u.role === "student") }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
