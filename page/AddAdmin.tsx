import Managebar from '@/components/ui/Managebar'
import React from 'react'

function AddAdmin() {
  return (
    <>
    <Managebar
          Title="ข้อมูลผู้ดูแลระบบ"
          subPopUp="เพิ่มผู้ดูแลระบบ"
          path="/admin/Addadmin/AddAdminForm"
    />
    </>
  )
}

export default AddAdmin