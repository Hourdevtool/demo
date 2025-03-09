"use client";
import React, { useEffect } from "react";
import { Phone } from "lucide-react";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
const Btn = dynamic(() => import("@/components/ui/Btn"), { ssr: false });
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import AOS from "aos";
function Index() {
  const { role } = useAuth();
  console.log(role);
  useEffect(() => {
    AOS.init();
  }, []);
  interface BannerItem {
    img: string;
    title: string;
    desc: string;
  }
  const banner: BannerItem[] = [
    {
      img: "/question.svg",
      title: "ยกระดับความรู้ของคุณกับคอร์สออนไลน์",
      desc: "พร้อมที่จะเรียนรู้และพัฒนาทักษะของคุณแล้วหรือยังลงทะเบียนคอร์สออนไลน์ ของเราวันนี้และเริ่มต้นการเดินทางสู่ความสำเร็จของคุณคอร์สนี้ออกแบบมาเพื่อให้คุณได้รับความรู้และทักษะที่จำเป็นในการด้วยเนื้อหาที่เข้มข้นและเข้าใจง่าย คุณสามารถเรียนรู้ได้ทุกที่ทุกเวลา ตามที่คุณต้องการ ลงทะเบียนเลย เพื่อไม่พลาดโอกาสในการเรียนรู้",
    },
    {
      img: "/learning.svg",
      title: "เรียนรู้ได้ทุกที่ ทุกเวลา ด้วยระบบ E-Learning",
      desc: "ลงทะเบียนเรียนกับเราวันนี้!คอร์สเรียนออนไลน์ของเราเปิดโอกาสให้คุณเรียนรู้ได้ทุกที่ ทุกเวลาผ่านแพลตฟอร์มออนไลน์ที่ใช้งานง่ายเพื่อพัฒนาทักษะของคุณและเปิดประตูสู่โอกาสในการเรียนรู้ที่ไม่สิ้นสุด!",
    },
    {
      img: "/work.svg",
      title: "ไม่พลาดทุกคอร์สเรียน ด้วยระบบแจ้งเตือน",
      desc: " เตรียมตัวให้พร้อมก่อนเริ่มเรียน!ระบบแจ้งเตือนอัตโนมัติช่วยให้คุณไม่พลาดทุกคอร์สเรียน รับการแจ้งเตือนล่วงหน้าเพื่อวางแผนการเรียนได้อย่างมีประสิทธิภาพ 📅✨",
    },
  ];
  return (
    <>
      <div className="mt-10 flex flex-col items-center space-y-5 w-full">
        <h1 className="text-3xl font-bold text-blue-700 text-center md:text-4xl">
        ระบบนิเวศการเรียนรู้ดิจิทัลสำหรับการนิเทศการศึกษาอาชีวศึกษา
        </h1>
        <div className="flex justify-center">
          <p className="text-lg text-center max-w-[910px] font-thin leading-relaxed md:leading-loose opacity-80 text-gray-500">
            ระบบที่ออกแบบมาเพื่อเสริมทักษะการเรียนรู้ของผู้เรียนโดยเฉพาะ
            สามารถเรียนได้ ทุกที่ ได้เวลา เมื่อเรียนเสร็จ สามารถรับใบ{" "}
            <span className="text-blue-700">Certificate </span>ได้เลย
            และผู้เรียนยังสามารถดูรายละเอียดข้อมูลต่างๆขอผู้สอนได้ก่อนตัดสินใจลงทะเบียนเรียน
            <span className="text-blue-700">สมัครบริการฟรี</span>
            ไม่มีค่าใช้จ่ายใดๆทั้งสิ้น
            <br />
            <b className="text-blue-700">
              &quot;เราพร้อมเป็นส่วนหนึ่งที่อยู่เบื้องหลังความสำเร็จของคุณ&quot;
            </b>
          </p>
        </div>
      </div>

      <div className=" my-4 w-full border border-gray-300"></div>

      <div className=" mt-10 grid  grid-flow-co gird-row-3 gap-4 lg:mx-[300px] mb-10 px-5">
        {banner.map((item, index) => (
          <div
            key={index}
            className={`w-full flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } justify-between items-center px-4 overflow-hidden`}
          >
            <div
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              className="w-full lg:w-3/5 mt-10"
            >
              <h3 className="text-blue-700 text-2xl mb-10 text-center lg:text-left">
                {item.title}
              </h3>
              <p className="text-lg text-center lg:text-left ">{item.desc}</p>
              <div className="mt-4 flex justify-center lg:justify-start">
                {role === "user" ? (
                  <Btn
                    name="เริ่มต้นเรียน"
                    path="/course"
                    Style="w-full md:w-40 text-center rounded-md bg-gradient-to-r from-blue-500 to-green-300 px-4 py-2 md:px-4 md:py-2 text-white hover:opacity-90"
                  />
                ) : (
                  <Btn
                    name="ลงทะเบียน"
                    path="/"
                    Style="w-full md:w-40 text-center rounded-md bg-gradient-to-r from-blue-500 to-green-300 px-4 py-2 md:px-4 md:py-2 text-white hover:opacity-90"
                  />
                )}
              </div>
            </div>

            <div
              data-aos="fade-up-left"
              className="w-full lg:w-2/5 flex justify-end items-center mt-10 lg:mt-0"
            >
              <div className="relative w-full h-96">
                <Image
                  src={item.img}
                  alt={item.img}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full min-h-[600px]  bg-gray-50 px-4 py-8 flex flex-col-reverse lg:flex-row items-center lg:justify-between">
        <div className="w-full lg:w-5/6 flex justify-center mt-6 lg:mt-0">
          <Image
            src="/contact.svg"
            alt="contact.svg"
            width={16}
            height={9}
            layout="responsive"
            objectFit="contain"
            className="max-w-3xl w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-4 text-center lg:text-left">
            สอบถามข้อมูลเพิ่มเติม
          </h3>
          <p className="text-base lg:text-lg text-gray-700 text-center lg:text-left">
            สอบถามข้อมูลเพิ่มเติมเกี่ยวกับตัวระบบรายงานปัญหาต่างๆเเจ้งบัคของระบบเเละสอบถามข้อมูลเพิ่มเติมเกี่ยวกับคอร์สเรียนที่คุณสนใจ
          </p>
          <div className="mt-6 w-full flex justify-start lg:justify-start">
            <button
              className=" flex items-center gap-2 
                          w-96
                          justify-start
                          text-center 
                          rounded-full 
                          bg-gradient-to-r 
                          from-blue-500 
                          to-pink-300 
                          px-6 
                          py-3 
                          text-white 
                          hover:opacity-90"
            >
              <div className="rounded-md border bg-gray-100 p-2 text-black">
                <Phone size={20} />
              </div>
              <span className="font-semibold">
                ติดต่อสอบถามเพิ่มเติมได้ที่นี่
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
