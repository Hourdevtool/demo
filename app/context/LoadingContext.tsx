"use client";
import React, { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      <Backdrop sx={{ color: "#037bfc", zIndex: 9999,background:"#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);