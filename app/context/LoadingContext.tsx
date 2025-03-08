"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <Backdrop sx={{ color: "#037bfc", zIndex: 9999, background: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};