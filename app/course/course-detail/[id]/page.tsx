import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Guildpage from "@/components/Guildpage";
import Detail from "@/components/Detail";

import PageProps from "next/app";

type Props = PageProps & { params: { id: string } };

export default async function CourseDetail({ params }: Props) {
  if (!params || typeof params.id !== "string") return notFound(); 

  const courseId = Number(params.id);
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
