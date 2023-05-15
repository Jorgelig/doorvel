"use client"
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "doorvel.main",
      }}
    >
      <img src="/doorvel-logo.png" alt="Logo" style={{ height: '50px' }} />
    </Box>
  );
};

export default Loading;
