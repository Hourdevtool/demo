import React from "react";
import Navbar from "@/components/Navbar";
import CourseList from "@/page/CourseList";
import Footer from "@/components/Footer";
import Guildpage from "@/components/Guildpage";

function Course() {
  return (
    <>
      <Navbar />
      <div className="w-full  h-[200px] bg-gray-100 flex flex-row justify-center p-10 ">
        <div className="container ">
          <span className=" text-sm text-black mb-5">คอร์สเรียนทั้งหมด</span>
          <div className="mt-10">
          <h1 className="text-3xl text-black mt -5 font-bold">คอร์สเรียนทั้งหมด</h1>
          </div>
          
        </div>
      </div>
      <div className="p-10">
        <CourseList />
      </div>

      <Guildpage />
      <Footer />
    </>
  );
}

export default Course;
