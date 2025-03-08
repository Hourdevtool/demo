"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// กำหนด type สำหรับ context
interface AuthContextType {
  mail: string;
  setmail: (email: string) => void;
  pass: string;
  setPass: (password: string) => void;
  role: string;
  setRole: (role: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  logout: () => void;
}

// สร้าง Context ด้วยค่าเริ่มต้น
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// สร้าง Provider สำหรับ Context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // กำหนด state พร้อมค่าเริ่มต้นจาก session storage
  const [mail, setmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("email") || "";
    }
    return "";
  });
  const [pass, setPass] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("password") || "";
    }
    return "";
  });
  const [role, setRole] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("role") || "";
    }
    return "";
  });
  const [firstName, setFirstName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("firstName") || "";
    }
    return "";
  });
  const [lastName, setLastName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("lastName") || "";
    }
    return "";
  });

  // บันทึกค่า state ลงใน session storage เมื่อ state เปลี่ยนแปลง
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("email", mail);
      sessionStorage.setItem("password", pass);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);
    }
  }, [mail, pass, role, firstName, lastName]);

  const logout = () => {
  
    setTimeout(() => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");
      }

      
      setmail("");
      setPass("");
      setRole("");
      setFirstName("");
      setLastName("");
    }, 1000); 
  };

  return (
    <AuthContext.Provider
      value={{
        mail,
        setmail,
        pass,
        setPass,
        role,
        setRole,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};