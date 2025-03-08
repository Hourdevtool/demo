import React from 'react'
import Navbar from '@/components/Navbar'
import Guildpage from '@/components/Guildpage'
import Footer from '@/components/Footer'
import RegisCourse from '@/page/RegisCourse'
function RegisterCourse() {
  
  return (
    <>
    <Navbar />
    <div className="w-full  h-[200px] bg-gray-100 flex flex-row justify-center p-10 ">
        <div className="container ">
          <span className=" text-sm text-black mb-5">คอร์สที่ลงทะเบียนเรียน</span>
          <div className="mt-10">
          <h1 className="text-3xl text-black mt -5 font-bold">คอร์สที่ลงทะเบียนเรียน</h1>
          </div>
          
        </div>
      </div>
    <div className="p-10">
    <RegisCourse />
    </div>
    <Guildpage />
    <Footer />
    </>
    
  )
}

export default RegisterCourse