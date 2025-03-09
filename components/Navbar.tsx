"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "./ui/Profile";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const { role} = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (role !== undefined) {
      setIsReady(true);
    }
  }, [role]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isReady) {
    return null; // หรือแสดง loading state
  }

  return (
    <>
      <motion.nav
        className="bg-white shadow-md sticky top-0 w-full z-50"
        initial={{ y: 0 }}
        animate={{ y: isNavbarHidden ? -80 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center md:hidden">
              <button
                className="text-gray-600 hover:text-black focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            <div className="flex-shrink-0">
              <Link href="/">
                <div className="hidden h-12 w-12 rounded-full bg-gray-300 md:flex items-center justify-center">
                  {/* <img src="https://via.placeholder.com/24x24" alt="Logo" /> */}
                </div>
              </Link>
            </div>

            <ul className="hidden md:flex space-x-8 text-gray-600 text-lg">
              <li className="hover:text-black">
                <Link href="/">หน้าหลัก</Link>
              </li>
              <li className="hover:text-black">
                <Link href="/course">คอร์สเรียน</Link>
              </li>
              <li className="hover:text-black">
                <Link href="/Schedule">กำหนดการ</Link>
              </li>
            </ul>

            <div className="flex items-center">
              {role === "user" ? (
                <>
                  <Profile />
                </>
              ) : (
                <div className="hidden md:flex space-x-4">
                  <Link
                    href="/aunth/login"
                    className="rounded border border-blue-600 px-4 py-2 hover:bg-gray-100"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/aunth/signup"
                    className="rounded-md bg-gradient-to-r from-blue-500 to-green-300 px-4 py-2 text-white hover:opacity-90"
                  >
                    ลงทะเบียน
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-16 left-0 w-full bg-white shadow-md z-20"
            >
              <ul className="flex flex-col items-center space-y-4 py-4 text-gray-600">
                <li>
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    หน้าหลัก
                  </Link>
                </li>
                <li>
                  <Link href="/course" onClick={() => setIsOpen(false)}>
                    คอร์สเรียน
                  </Link>
                </li>
                <li>
                  <Link href="/Schedule" onClick={() => setIsOpen(false)}>
                    กำหนดการ
                  </Link>
                </li>
                {role === "" && (
                  <div className="flex flex-col space-y-2">
                    <Link href="/aunth/login" onClick={() => setIsOpen(false)}>
                      เข้าสู่ระบบ
                    </Link>
                    <Link href="/aunth/signup" onClick={() => setIsOpen(false)}>
                      ลงทะเบียน
                    </Link>
                  </div>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;