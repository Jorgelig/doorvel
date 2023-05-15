"use client";
import React, { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import apiService from '../../../services/api';


const Search = () => {
  const api = apiService({ baseHost: process.env.NEXT_PUBLIC_API_URL });

  const [settlements, setSettlements] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [subAmenities, setSubAmenities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [postalCode, setPostalCode] = useState('');

  const getCatalogs = (postalCode) => {
    api.getSettelemntsByPostalCode({ postalCode })
      .then(data => {
        setSettlements(data);
      });

    api.getAmenities()
      .then(data => {
        setAmenities()
      })
  }

  useEffect(() => {
    console.log('getData');
    getCatalogs(20210);
  }, []);


  return (
    <Stack>
      <TextField label="Codigo postal" variant="outlined" value={postalCode} />
    </Stack>
  )
}

export default Search;