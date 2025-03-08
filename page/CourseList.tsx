"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "@/components/Coursecard";
import FilterComponent from "@/components/Filter";

interface Course {
  id:number;
  resuser:number;
  background: string;
  profile: string;
  instructor: string;
  title: string;
  category: string;
  registrationDate: string;
  trainingDate: string;
  maxuser: number;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          resuser:20,
          background: "/React.png",
          profile: "https://via.placeholder.com/50",
          instructor: "John Doe",
          title: "React for Beginners",
          category: "การศึกษา",
          registrationDate: "26 มี.ค. 2568",
          trainingDate: "1 เม.ย. 2568",
          maxuser: 120,
        },
        {
          id: 2,
          resuser:80,
          background: "/AdvancedJS.png",
          profile: "https://via.placeholder.com/50",
          instructor: "Jane Smith",
          title: "Advanced JavaScript",
          category: "เทคโนโลยีและไอที",
          registrationDate: "5 มี.ค. 2568",
          trainingDate: "7 มี.ค. 2568",
          maxuser: 90,
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  return (
    <>
    
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
        <FilterComponent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
                
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {loading
            ? Array.from(new Array(4)).map((_, index) => (
                <CourseCard key={index} isLoading={true} />
              ))
            : filteredCourses.map((course, index) => (
                <CourseCard key={index} course={course} isLoading={false} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
