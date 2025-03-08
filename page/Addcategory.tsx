'use client'
import Categorytable from '@/components/ui/Categorytable'
import Managebar from '@/components/ui/Managebar'
import React,{useState} from 'react'

function Addcategory() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleAddCategory = () => {
        setRefreshKey((prevKey) => prevKey + 1); 
      }

  return (
   <>
         <div className="flex justify-center space-y-4 flex-col w-full max-w-5xl mx-auto px-4 m-10">
        <Managebar
          Title="หมวดหมู่คอร์ส"
          subPopUp="เพิ่มหมวดหมู่หลัก"
          state={{ Categoryname: "" }}
          api="/api/Category/managecategory"
          validationRules={{
            Categoryname: { required: true, message: "กรุณากรอกหมวดหมู่" },
          }}
          onAddCategory={handleAddCategory} 
        />

        <div className="w-full overflow-x-auto">
          <Categorytable  onAddCategory={refreshKey}/>
        </div>
      </div>
   </>
  )
}

export default Addcategory