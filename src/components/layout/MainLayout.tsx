"use client";

import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className="relative left-1/2 -translate-x-1/2 min-h-dvh max-h-dvh max-w-[2000px]">
      <div className="flex min-h-dvh max-h-dvh">
        <SideBar open={open} onClickX={() => setOpen(false)}/>

        {/* MAIN CONTENT */}
        <main className="flex flex-col flex-1">
          <Header onClickMenu={() => setOpen((prev) => !prev)}/>

          {/* PAGE */}
          <div className="flex-1 p-2 md:p-3">
            {children}
          </div>

          <Footer/>
        </main>
      </div>
    </div>
  );
}
