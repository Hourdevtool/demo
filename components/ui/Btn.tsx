'use client'
import Link from "next/link";
import React from "react";
interface BtnProps {
  name: string;
  Style: string;
  path: string;
}
function Btn({ name, Style, path }: BtnProps) {
  return (
    <Link href={path}>
        <button className={Style}>{name}</button>
    </Link>
  );
}

export default Btn;
