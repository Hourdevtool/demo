import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function loading() {
  return (
    <Backdrop
      sx={{ color: "#037bfc", zIndex: 9999, background: "#fff" }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default loading;
