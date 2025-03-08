import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Guildpage from "@/components/Guildpage";
import Detail from "@/components/Detail";

type Props = { params: Promise<{ id?: string }> }; // ทำให้เป็น Promise

export default async function CourseDetail({ params }: Props) {
  const { id } = await params; // ใช้ await ที่นี่

  if (!id || typeof id !== "string") return notFound();

  const courseId = Number(id);
  if (isNaN(courseId)) return notFound();

  return (
    <>
      <Navbar />
      <Detail courseId={courseId} />
      <Guildpage />
      <Footer />
    </>
  );
}
