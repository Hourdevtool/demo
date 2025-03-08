"use client";
import { Divider } from "@mui/material";
import React from "react";

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const categories = [
    "การศึกษา",
    "การเงินและบัญชี",
    "ธุรกิจ",
    "ภาษา",
    "เทคโนโลยีและไอที",
  ];

  return (
    <>
      <div className=" flex flex-col">
        <span> ตัวกรอง</span>
        <Divider sx={{ my:3}}/>
        <div className="p-4 border rounded-lg shadow-md min-w-[200px]">
          <h3 className="text-lg font-semibold mb-2">หมวดหมู่</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="mr-2"
              />
              <label>{category}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
