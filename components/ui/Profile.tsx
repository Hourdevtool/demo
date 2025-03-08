"use client";
import React, { useState } from "react";
import { Avatar, MenuItem, Menu as MuiMenu, Fade } from "@mui/material";
import { User, Settings, Book, Award, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useLoading } from "@/app/context/LoadingContext";
function Profile() {
  const { firstName, lastName, role, logout } = useAuth();
  const { setLoading } = useLoading();
  const handleLogout = () => {
    setLoading(true);
    try {
      logout();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button
        onClick={handleMenuOpen}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <Avatar src={"/user.png"} className="h-10 w-10 rounded-full" />
        <span className="hidden md:inline text-gray-600">
          {`${firstName} ${lastName}`}
        </span>
      </button>
      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        {role === "user" && (
          <div>
            <MenuItem onClick={handleMenuClose}>
              <Link href={"/user/RegisterCourse"} className="flex">
                <Book className="mr-2" />
                ดูคอร์สเรียนที่ลงทะเบียน
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} >
              <Link href={"/user/Certificate"} className="flex">
              <Award className="mr-2" />
              เกียรติบัตรของฉัน
              </Link> 
            </MenuItem>
          </div>
        )}

        <MenuItem onClick={handleLogout}>
          <LogOut className="mr-2" />
          ออกจากระบบ
        </MenuItem>
      </MuiMenu>
    </>
  );
}

export default Profile;
