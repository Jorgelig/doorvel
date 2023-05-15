"use client"
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "doorvel.main",
      }}
    >

      <Typography color={'green.main'} variant="body1">
        Cargando detalle....
      </Typography>
      <Box>
        <img src="/doorvel.color.webp" alt="Logo" style={{ height: '50px' }} />
      </Box>
    </Box>
  );
};

export default Loading;
