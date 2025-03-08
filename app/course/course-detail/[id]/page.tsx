import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Guildpage from "@/components/Guildpage";
import Detail from "@/components/Detail";


export default async function CourseDetail({
  params,
}: {
  params: { id: string };
}) {
  const courseId = parseInt(params.id, 10);
  if (isNaN(courseId)) return notFound(); 
  return (
    <>
      <Navbar />
      <Detail courseId={courseId}/>
      <Guildpage />
      <Footer />
    </>
  );
}
