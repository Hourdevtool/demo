"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Autoplay } from "swiper/modules";
import { useAuth } from "@/app/context/AuthContext";
import dynamic from "next/dynamic";
import Image from 'next/image';

const Btn = dynamic(() => import("@/components/ui/Btn"), { ssr: false });
function Slide() {
  const courses = [
    {
      id: 1,
      resuser: 20,
      background: "/React.png",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis omnis voluptatum nobis eos iusto veritatis cupiditate sed, esse optio repudiandae ea perferendis. Obcaecati, ullam! Minus inventore nisi eum ab asperiores!",
      profile: "https://via.placeholder.com/50",
      instructor: "John Doe",
      title: "React for Beginners",
      category: "การศึกษา",
      registrationDate: "26 มี.ค. 2568",
      trainingDate: "1 เม.ย. 2568",
      maxuser: 120,
      time: "08:00-09:00",
    },
    {
      id: 2,
      resuser: 80,
      background: "/AdvancedJS.png",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis omnis voluptatum nobis eos iusto veritatis cupiditate sed, esse optio repudiandae ea perferendis. Obcaecati, ullam! Minus inventore nisi eum ab asperiores!",
      profile: "https://via.placeholder.com/50",
      instructor: "Jane Smith",
      title: "Advanced JavaScript",
      category: "เทคโนโลยีและไอที",
      registrationDate: "5 มี.ค. 2568",
      trainingDate: "7 มี.ค. 2568",
      maxuser: 90,
      time: "08:00-09:00",
    },
  ];

  const { role } = useAuth();
  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[500px]  flex items-center bg-[url('/background.svg')] bg-cover bg-center">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        className="container"
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-md shadow-md overflow-hidden flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 aspect-w-16 aspect-h-9">
                <Image
                  src={course.background}
                  alt="รูปภาพ 1"
                  width={500} height={500}
                  className="w-full h-full object-contain rounded-t-md lg:rounded-l-md lg:rounded-t-none"
                />
              </div>
              <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">{course.desc}</p>
                </div>
                {role === "" ? (
                  <Btn
                    Style="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    name="เข้าสู่ระบบ"
                    path="/aunth/login"
                  />
                ) : course.trainingDate === "7 มี.ค. 2568" ? (
                  <Btn
                    Style="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    name="อบรมเสร็จสิ้น"
                    path="/course"
                  />
                ) : (
                  <Btn
                    Style="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    name="ลงทะเบียนที่นี่"
                    path={`/course/course-detail/${course?.id}`}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slide;
