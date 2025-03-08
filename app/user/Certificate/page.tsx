import Footer from "@/components/Footer";
import Guildpage from "@/components/Guildpage";
import Navbar from "@/components/Navbar";
import RegisCourse from "@/page/RegisCourse";
import React from "react";

function Certificate() {
  return (
    <>
      <Navbar />
      <div className="w-full  h-[200px] bg-gray-100 flex flex-row justify-center p-10 ">
        <div className="container ">
          <span className=" text-sm text-black mb-5">
            เกียรติบัตรของฉัน
          </span>
          <div className="mt-10">
            <h1 className="text-3xl text-black mt -5 font-bold">
                เกียรติบัตรของฉัน
            </h1>
          </div>
        </div>
      </div>
      <div className="p-10">
        <RegisCourse />
      </div>
      <Guildpage />
      <Footer />
    </>
  );
}

export default Certificate;
