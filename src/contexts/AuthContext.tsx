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
  registerStudent: (name: string, rollNumber: string, password: string) => boolean;
  students: User[];
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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [students, setStudents] = useState<User[]>(() => {
    const savedStudents = localStorage.getItem("registeredStudents");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const registerStudent = (name: string, rollNumber: string, password: string) => {
    const newStudent: User = {
      name,
      email: rollNumber,
      role: "student",
      studentId: rollNumber,
      password,
      busNumber: "Not Assigned",
      route: "Not Assigned"
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem("registeredStudents", JSON.stringify(updatedStudents));
    return true;
  };

  const login = (identifier: string, password: string, role: UserRole) => {
    if (role === "student") {
      const student = students.find(s => s.studentId === identifier && s.password === password);
      if (student) {
        setUser(student);
        localStorage.setItem("currentUser", JSON.stringify(student));
        return true;
      }

      if (identifier === "student" && password === "pass") {
        const mock = MOCK_USERS["student"];
        setUser(mock);
        localStorage.setItem("currentUser", JSON.stringify(mock));
        return true;
      }
      return false;
    } else {
      const mockUser = MOCK_USERS[role];
      setUser(mockUser);
      localStorage.setItem("currentUser", JSON.stringify(mockUser));
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerStudent, students }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
