"use client";
import { Avatar, Button, Divider, Typography } from "@mui/material";
import {
  UserCheck,
  CalendarRange,
  Clock5,
  ChartColumnStacked,
  SendHorizontal,
  Check,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { notFound } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useCourse } from "@/app/context/CourseContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { useCallback, useState, useEffect } from "react";

interface DetailProps {
  courseId: number;
}

interface Course {
  id: number;
  resuser: number;
  background: string;
  desc: string;
  profile: string;
  instructor: string;
  title: string;
  category: string;
  registrationDate: string;
  trainingDate: string;
  maxuser: number;
  time: string;
}

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

function Detail({ courseId }: DetailProps) {
  const { regisCourse, registeredCourseId } = useCourse();
  const { role } = useAuth();
  const router = useRouter();
  const course = courses.find((c) => c.id === courseId) as Course;
  if (!course) return notFound();

  const [isClient, setIsClient] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onFileAccepted = useCallback((file: File) => {
    setUploadedFile(file);
    alert(`ไฟล์ PDF ที่อัปโหลด: ${file.name}`);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });



  const hadleSubmit = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-blue-700 rounded-md p-2 mr-2 text-white",
        cancelButton: "bg-red-500 rounded-md p-2 mr-2 text-white",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "ลงทะเบียน",
        text: `คุณต้องการลงทะเบียนคอร์สเรียน ${course.title} หรือ ไม่`,
        icon: "question",
        imageUrl: course.background,
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonText: "ยืนยันการลงทะเบียน",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          regisCourse(course.id);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "ลงทะเบียนสำเร็จ",
            text: "คุณได้ลงทะเบียนเรียบร้อยเเล้ว",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "ยกเลิก",
            text: "คุณได้ยกเลิกการลงทะเบียน!!!",
          });
        }
      });
  };

  return (
    <div className="flex justify-center">
      <div className=" p-8  w-full  min-h-[700px] lg:w-4/5">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Typography variant="h5" className="font-bold text-3xl">
              {course.title}
            </Typography>
            <Typography variant="body2" className="text-gray-600 line-clamp-2">
              {course.desc}
            </Typography>
            <div className="flex items-center mt-2">
              <Avatar
                src={course?.profile}
                alt={course?.instructor}
                className="mr-2"
              />
              <div>
                <Typography variant="subtitle2" className="font-semibold">
                  {course.instructor}
                </Typography>
                <Button size="small" color="primary">
                  ข้อมูลผู้จัด
                </Button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 flex justify-center md:justify-end">
            <div className="relative w-96 h-64 rounded-md">
              <Image
                src={course.background}
                alt="background Course"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <Divider className="my-4" />

        {/* ส่วนเนื้อหา */}
        <div className=" bg-white rounded-xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <div className="flex items-center mb-2">
              <div className="mr-3">
                <SendHorizontal />
              </div>
              <Typography variant="subtitle1" className="font-semibold">
                เกี่ยวกับ
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-600">
              {course.desc}
            </Typography>

            <div className="flex items-center mt-4 mb-2">
              <div className="mr-3">
                <SendHorizontal />
              </div>
              <Typography variant="subtitle1" className="font-semibold">
                สิ่งที่จะได้รับ
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-600">
              {course.desc}
            </Typography>

            <div className="flex items-center mt-4 mb-2">
              <div className="mr-3">
                <SendHorizontal />
              </div>
              <Typography variant="subtitle1" className="font-semibold">
                เนื้อหาในคอร์ส
              </Typography>
            </div>
            {isClient && registeredCourseId === course.id ? (
              <AccordionGroup sx={{ maxWidth: 600 }}>
                <Accordion>
                  <AccordionSummary>สไลด์การสอน</AccordionSummary>
                  <AccordionDetails>
                    <iframe
                      loading="lazy"
                      src="https://www.canva.com/design/DAGhI5XvW_o/x6TcqKJTEaxvZ1n5f9KwQA/view?embed"
                      allow="fullscreen"
                    ></iframe>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>การส่งงาน</AccordionSummary>
                  <AccordionDetails>
                    <div
                      {...getRootProps()}
                      className={`p-4 border-2 border-dashed rounded-lg text-center ${
                        isDragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>วางไฟล์ PDF ที่นี่...</p>
                      ) : (
                        <p>ลากและวางไฟล์ PDF ที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                      )}
                    </div>
                    {uploadedFile && <p>ไฟล์ที่อัปโหลด: {uploadedFile.name}</p>}{" "}
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            ) : (
              <Typography variant="body2" className="text-gray-600">
                สำหรับผู้ลงทะเบียน
              </Typography>
            )}
          </div>

          <div>
            <div className=" p-4 rounded-lg text-center">
              <Typography variant="h6" className="text-sm text-black ">
                <span className="text-3xl font-bold mr-2 text-blue-700">
                  Free
                </span>
                ไม่มีค่าใช้จ่าย
              </Typography>
              <Typography variant="body2" className="text-amber-500">
                หลักสูตรเรียนฟรีไม่มีค่าใช้จ่าย
              </Typography>
              {isClient && role === "" ? (
                <Button
                  variant="contained"
                  className="mt-4 w-full  bg-red-700"
                  onClick={() => router.push("/aunth/login")}
                >
                  กรุณาเข้าสู่ระบบ
                </Button>
              ) : isClient && registeredCourseId === course.id ? (
                <div className="flex flex-row justify-center  mt-4 opacity-50 text-2xl ">
                  <span className="mr-3 ">คุณได้ลงทะเบียนเรียบร้อยเเล้ว </span>
                  <Check />
                </div>
              ) : (
                <Button
                  variant="contained"
                  className="mt-4 w-full  bg-blue-700"
                  onClick={hadleSubmit}
                >
                  ลงทะเบียน
                </Button>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 border-2 border-solid  rounded-full flex items-center justify-center mr-3">
                  <ChartColumnStacked />
                </div>
                <Typography variant="subtitle2" className="font-semibold">
                  หมวดหมู่: {course.category}
                </Typography>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-10 h-10 border-2 border-solid  rounded-full flex items-center justify-center mr-3">
                  <UserCheck />
                </div>
                <Typography variant="subtitle2" className="font-semibold">
                  จำนวนที่รับ:{" "}
                  {isClient && registeredCourseId === course.id
                    ? course.resuser + 1
                    : course.resuser}
                  /{course.maxuser} คน
                </Typography>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 border-2 border-solid  rounded-full flex items-center justify-center mr-3">
                  <CalendarRange />
                </div>
                <Typography variant="subtitle2" className="font-semibold">
                  กำหนดสิ้นสุดการลงทะเบียน : {course.registrationDate}
                </Typography>
              </div>

              <div className="flex items-center mb-2">
                <div className="w-10 h-10 border-2 border-solid  rounded-full flex items-center justify-center mr-3">
                  <CalendarRange />
                </div>
                <Typography variant="subtitle2" className="font-semibold">
                  วันที่อบรม : {course.trainingDate}
                </Typography>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 border-2 border-solid  rounded-full flex items-center justify-center mr-3">
                  <Clock5 />
                </div>
                <Typography variant="subtitle2" className="font-semibold">
                  เวลาอบรม: {course.time} น.
                </Typography>
              </div>
              <Button
                variant="contained"
                className="mt-4 w-full  bg-amber-500"
                onClick={() => router.push("https://www.zoom.com/")}
              >
                เข้าอบรมที่นี่
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;