import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "driver" | "admin";

interface User {
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  busNumber: string;
  route?: string;
  password?: string; // Added for admin view requirement
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  registerUser: (userData: { name: string; identifier: string; password: string; role: UserRole }) => { success: boolean; message?: string };
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
    busNumber: "TN-01-1234",
    password: "Driver@123!",
  },
  admin: {
    name: "Dr. Priya S",
    email: "admin@gmail.com",
    role: "admin",
    busNumber: "",
    password: "Admin@123!",
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

  const validatePassword = (pass: string) => {
    const hasUppercase = /[A-Z]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return hasUppercase && hasSpecial;
  };

  const GMAIL_DOMAIN = "@gmail.com";

  const registerUser = (userData: { name: string; identifier: string; password: string; role: UserRole }) => {
    const { name, identifier, password, role } = userData;

    if (!validatePassword(password)) {
      console.error("Password too weak.");
      return { success: false, message: "Password must contain one uppercase and one special character." };
    }

    if (role !== "student" && !identifier.endsWith(GMAIL_DOMAIN)) {
      return { success: false, message: `Only ${GMAIL_DOMAIN} addresses are authorized for this role.` };
    }

    const newUser: User = {
      name,
      email: role === "student" ? "not-set@gmail.com" : identifier,
      role,
      studentId: role === "student" ? identifier : undefined,
      password,
      busNumber: "Not Assigned",
      route: role === "student" ? "Not Assigned" : undefined
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    return { success: true };
  };

  const login = (identifier: string, password: string, role: UserRole) => {
    // 1. Check registered users
    const foundUser = registeredUsers.find(u =>
      u.role === role &&
      (role === "student" ? u.studentId === identifier : u.email === identifier) &&
      u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }

    // 2. Check MOCK_USERS
    if (role === "student") {
      if (identifier === "student" && password === "pass") {
        const mock = MOCK_USERS["student"];
        setUser(mock);
        localStorage.setItem("currentUser", JSON.stringify(mock));
        return true;
      }
    } else {
      if (!identifier.endsWith(GMAIL_DOMAIN)) {
        console.error(`Access denied: Only ${GMAIL_DOMAIN} email addresses are allowed.`);
        return false;
      }

      const mockUser = MOCK_USERS[role];
      if (mockUser.email === identifier && mockUser.password === password) {
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
