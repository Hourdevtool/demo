import React from "react";
import Profile from "@/components/ui/Profile";
import Footer from "@/components/Footer";
import Sidebar from "@/components/ui/Sidebar";
function Dashbord() {
  return (
    <>
    <div className="flex justify-end m-10">
        <Profile />
    </div>
      <Sidebar /> 
      <Footer />
    </>
  );
}

export default Dashbord;
