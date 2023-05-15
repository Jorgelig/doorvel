"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@/app/theme';

import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";

import useGreeting from "@/app/hook/useGreeting";
import TopNavHeader from "@/app/components/molecule/TopNavHeader";
import { UserNameKey, useStorage } from "@/app/hook/useStorage";

const theme = createTheme();

const LoginPage = () => {
  const router = useRouter();
  const greeting = useGreeting();
  const [userNameInput, setUserNameInput] = useState('');
  const [, setUserName] = useStorage(UserNameKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(userNameInput);
    router.push('/catalogs')
  }

  return (
      <ThemeProvider theme={theme}>
        <TopNavHeader />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h4" sx={{ mb: 2 }}>{greeting}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>¡Bienvenido! Por favor, introduce tu nombre:</Typography>          <form onSubmit={handleSubmit}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onChange={(e) => setUserNameInput(e.target.value)}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="outlined" type="submit" sx={{ bgcolor: 'doorvel.main' }}>Entrar</Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
  );
};

export default LoginPage;
