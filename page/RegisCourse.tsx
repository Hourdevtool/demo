"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "@/components/Coursecard";
import FilterComponent from "@/components/Filter";
import { useCourse } from "@/app/context/CourseContext";
import { usePathname } from "next/navigation";
interface Course {
  id: number;
  resuser: number;
  background: string;
  profile: string;
  instructor: string;
  title: string;
  category: string;
  registrationDate: string;
  trainingDate: string;
  maxuser: number;
}
function RegisCourse() {
  const pathname = usePathname();
  const isCertificatePage = pathname === "/user/Certificate";
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { registeredCourseId } = useCourse();
  const categoryValue = registeredCourseId === null || isCertificatePage ? "" : "การศึกษา";
  console.log(categoryValue)
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          resuser: 20,
          background: "/React.png",
          profile: "https://via.placeholder.com/50",
          instructor: "John Doe",
          title: "React for Beginners",
          category:categoryValue ,
          registrationDate: "26 มี.ค. 2568",
          trainingDate: "1 เม.ย. 2568",
          maxuser: 120,
        },
        {
          id: 2,
          resuser: 80,
          background: "/AdvancedJS.png",
          profile: "https://via.placeholder.com/50",
          instructor: "Jane Smith",
          title: "Advanced JavaScript",
          category: "-",
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
    : isCertificatePage ?[]:
      courses.filter((course) => course.id === registeredCourseId)
     ;

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4 ">
      <FilterComponent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {loading ? (
          Array.from(new Array(4)).map((_, index) => (
            <CourseCard key={index} isLoading={true} />
          ))
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} isLoading={false} />
          ))
        ) : (
          <div className=" flex text-center text-gray-500 py-4 items-center justify-center">
              {isCertificatePage ? "คุณยังไม่มีเกียรติบัตร" : "ขณะนี้ยังไม่มีข้อมูลคอร์สเรียนที่ลงทะเบียน"}   
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisCourse;
