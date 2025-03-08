import { Facebook } from 'lucide-react'
import React from 'react'

function Guildpage() {
  return (
    <div className="w-full bg-indigo-950 px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="p-4 text-white">
            <h3 className="font-bold">แผนผังเว็บไซต์</h3>
            <p>หน้าหลัก</p>
            <p>คอร์สเรียน</p>
            <p>คุณสมบัติ</p>
            <p>กำหนดการ</p>
          </div>

          <div className="p-4 text-white">
            <h3 className="font-bold">การให้บริการ</h3>
            <p>กําหนดความเป็นส่วนตัว</p>
            <p>บริการออกใบCertificate</p>
            <p>สมัครการเป็นผู้สอน</p>
            <p>ติดต่อสอบถามการพัฒนาระบบ</p>
          </div>

          <div className="p-4 text-white">
            <h3 className="font-bold">เนื้อหาอื่นๆ</h3>
            <p>การลงทะเบียนสมัครสมาชิค</p>
          </div>

          <div className="p-4 text-white">
            <h3 className="font-bold">ติดต่อ</h3>
            <p className="flex items-center my-3">
              <Facebook />
              <span className="ml-2">Facebook</span>
            </p>

            <p className="flex items-center">
              <img src='/line.svg' alt="line.svg"  />
              <span className="ml-2">Line</span>
            </p>
          </div>
        </div>
      </div>
  )
}

export default Guildpage