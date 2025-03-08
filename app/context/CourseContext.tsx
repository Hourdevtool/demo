"use client";

import React, { Children, createContext, useContext, useState } from "react";

interface ContextType {
  registeredCourseId: number | null;
  regisCourse: (courseId: number) => void;
}

const CourseContext = createContext<ContextType>({
  registeredCourseId: null,
  regisCourse: () => {},
});

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [registeredCourseId, setRegisterCourseId] = useState<number | null>(
    () => {
      if (typeof window !== "undefined") {
        const storedCourseId = sessionStorage.getItem("registeredCourseId");
        return storedCourseId ? parseInt(storedCourseId, 10) : null; 
      }
      return null; 
    }
  );

  const regisCourse = (courseId: number) => {
    setRegisterCourseId(courseId);
    sessionStorage.setItem("registeredCourseId", courseId.toString());
  };

  return (
    <CourseContext.Provider value={{ regisCourse, registeredCourseId }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
