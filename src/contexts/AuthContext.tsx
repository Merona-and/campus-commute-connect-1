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

const MOCK_USERS: Record<UserRole, User> = {
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
  admin: {
    name: "Dr. Priya S",
    email: "admin@gmail.com",
    role: "admin",
    studentId: "ADM-001",
    busNumber: "",
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
    // Check registered users pool
    const foundUser = registeredUsers.find(
      (u) => u.role === role && u.studentId === id && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }

    // fallback to Mock users
    const mockUser = MOCK_USERS[role];
    if (mockUser.studentId === id) {
      // For mock roles, password matches role name by default or specific rule
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
