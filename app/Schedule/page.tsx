import React from 'react'
import TableCal from '@/page/TableCal'
import Navbar from '@/components/Navbar'
import Guildpage from '@/components/Guildpage'
import Footer from '@/components/Footer'
function Schedule() {
  return (
    <>
         <Navbar />
         <div className='w-full  mx-auto bg-white drop-shadow-md p-8 rounded-lg'>
        <TableCal />
      </div>
        
         <Guildpage />
        <Footer/>
    </>
   
  )
}

export default Schedule