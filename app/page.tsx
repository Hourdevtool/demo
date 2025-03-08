
import React from "react";
import Navbar from "@/components/Navbar";
import Slide from "@/components/Slide";
import Footer from "@/components/Footer";
import Index from "@/components/Index";
import Guildpage from "@/components/Guildpage";
function page() {
  return (
    <>
      <Navbar />
      <Slide />
      <Index />
      <Guildpage />
      <Footer />
    </>
  );
}

export default page;
