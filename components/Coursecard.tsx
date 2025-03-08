"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Avatar, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCourse } from "@/app/context/CourseContext";
interface Course {
  id: number;
  resuser: number;
  background: string;
  profile: string;
  instructor: string;
  title: string;
  registrationDate: string;
  trainingDate: string;
  maxuser: number;
}

interface CourseCardProps {
  course?: Course;
  isLoading: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isLoading }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/course/course-detail/${course?.id}`);
  };
  const [isClient, setIsClient] = useState(false);
  const style =
    course?.trainingDate === "7 มี.ค. 2568" || isLoading
      ? { cls: "rounded-2xl overflow-hidden shadow-lg ", status: false }
      : {
          cls: "rounded-2xl overflow-hidden shadow-lg hover:-translate-y-4 cursor-pointer",
          status: true,
        };
  const { registeredCourseId } = useCourse();
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-2 w-full  "
      >
        <Card
          className={style.cls}
          {...(style.status && !isLoading ? { onClick: handleClick } : {})}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={160} />
          ) : (
            <img
              src={course?.background}
              alt="Course Background"
              className="w-full h-40 object-fill"
            />
          )}
          <CardContent>
            <div className="flex items-center gap-4">
              {isLoading ? (
                <Skeleton variant="circular" width={50} height={50} />
              ) : (
                <Avatar src={course?.profile} alt={course?.instructor} />
              )}
              <div>
                {isLoading ? (
                  <Skeleton width={120} height={20} />
                ) : (
                  <p className="text-lg font-semibold">{course?.instructor}</p>
                )}
                {isLoading ? (
                  <Skeleton width={100} height={15} />
                ) : (
                  <p className="text-gray-500">{course?.title}</p>
                )}
              </div>
              {!style.status ? (
                <div className="ml-[150px]">
                  {isLoading ? (
                    <Skeleton width={120} height={20} />
                  ) : (
                    <p className="text-lg font-semibold text-blue-500">
                      อบรมเสร็จสิ้น
                    </p>
                  )}
                </div>
              ) : null}
            </div>
            <div className="mt-3">
              {isLoading ? (
                <Skeleton width={150} height={15} />
              ) : (
                <p className="text-sm text-gray-600">
                  เปิดรับลงทะเบียน: {course?.registrationDate}
                </p>
              )}
              {isLoading ? (
                <Skeleton width={150} height={15} />
              ) : (
                <p className="text-sm text-gray-600">
                  อบรม: {course?.trainingDate}
                </p>
              )}
              {isLoading ? (
                <Skeleton width={100} height={15} />
              ) : (
                <p className="text-sm font-semibold text-blue-600">
                  ผู้ลงทะเบียน:{" "}
                  {isClient && registeredCourseId === course?.id
                    ? course?.resuser + 1
                    : course?.resuser}
                  /{course?.maxuser} คน
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default CourseCard;
