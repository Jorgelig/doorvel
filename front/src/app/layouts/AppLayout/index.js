"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@/app/theme';
import TopNavHeader from '@/app/components/molecule/TopNavHeader';

const AppLayout = ({ children }) => {
  const theme = createTheme();

  return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            bgcolor: "#f5f5f5",
          }}
        >
          <Container maxWidth="md" sx={{ paddingX: 40, paddingBottom: 10 }}>
            <TopNavHeader />
            {children}
          </Container>

        </Box>
      </ThemeProvider>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
