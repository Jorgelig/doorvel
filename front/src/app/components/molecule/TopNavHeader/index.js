"use client";

import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { UserNameKey, useStorage } from "@/app/hook/useStorage";

const TopNavHeader = ()  => {
  const [userName, ] = useStorage(UserNameKey);

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'doorvel.main', zIndex: 999 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src="/doorvel-logo.png" alt="Logo" style={{ height: '50px' }} />
        </Box>
        <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '14px' }}>
          {userName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavHeader;
