"use client";

import React, { useState, useEffect } from "react";
import AppLayout from "@/app/layouts/AppLayout";

import {
  Alert, Box, Typography, Grid, Card,
  TextField, FormControl, InputLabel, Input, Link, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Snackbar,
} from "@mui/material";
import TableComponent from "@/app/components/molecule/table";
import apiService from "@/app/services/api";

const CatalogsPage = () => {
  const api = apiService({ baseHost: process.env.NEXT_PUBLIC_API_URL });

  const [searchItems, setSearchItems] = useState(null);
  const [settlements, setSettlements] = useState(null);
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [propertyCategoryNames, setPropertyCategoryNames] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [subAmenities, setSubAmenities] = useState([]);
  const [hasPostalCode, setHasPostalcode] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  
  const [error, setError] = useState('');

  const propertyCategoryColumns = [
    {
      headerName: 'ID',
      field: 'id',
    },
    {
      headerName: 'Nombre',
      field: 'category',
    },
    {
      headerName: 'Familia',
      parentField: 'family',
      field: 'family_name',
    },
  ];

  const onChangePostalCode = (value) => {
    setPostalCode(value);
  };

  const onSearchPostalCode = () => {
    api.getSettelemntsByPostalCode({ postalCode })
      .then(data => {
        if (data.message) {
          setError(`El codigo postal ${postalCode} no se encontró`);
          setSearchItems(null);
          setSettlements(null);
          return;
        };
        const settlementItems = data.settlements.map(item => {
          return { id: item.key, name: item.name };
        })
        setSearchItems(data);
        setSettlements(settlementItems);
      });
  };

  const handleCloseSnackbar = () => {
    setError('');
  }

  const getNextPageNumber = (queryString) => {
    const pageNumber = queryString ? queryString.split("=")[1] : "";
    return pageNumber;
  };

  const formatDate = dateString => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    api.getAmenities()
      .then(data => {
        setAmenities(data);
      });

    api.getPropertyCategories()
      .then(data => {
        const { results, previous, next, count } = data;
        const nextPageNumber = getNextPageNumber(next);

        const categoryNameDict = results.reduce((acc, { id, category }) => {
          acc[id] = category;
          return acc;
        }, {});

        setPropertyCategoryNames(categoryNameDict);
        setPropertyCategories(results);
      });

    api.getSubAmenities({ propertyCategoryId: 2 })
      .then(data => {
        const { results, previous, next, count } = data;
        const nextPageNumber = getNextPageNumber(next);

        setSubAmenities(results);
      });
  }, [])

  return (
    <AppLayout>
      <Box sx={{ pt: 10, mb: 3 }}>
        <Typography color={'green.main'} variant="h5" >Busqueda de colonias por codigo postal</Typography>
        <Typography color={'neutral.500'}>Busca por codigo postal en la base de datos y muestra el estado, municipio y colonias encontradas con ese codigo postal.</Typography>
      </Box>
      <Card>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Codigo postal"
                variant="outlined"
                value={postalCode}
                onChange={(e) => onChangePostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined" onClick={onSearchPostalCode}
                sx={{ bgcolor: 'doorvel.main' }}
              >
                Buscar
              </Button>
            </Grid>
            {searchItems && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Input value={searchItems.locality} disabled />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Municipio</InputLabel>
                    <Input value={searchItems.municipality.name} disabled />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID Colonia</TableCell>
                          <TableCell>Nombre Colonia</TableCell>
                          <TableCell>Municipio</TableCell>
                          <TableCell>Estado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {settlements.map((settlement) => (
                          <TableRow key={settlement.id}>
                            <TableCell>{settlement.id}</TableCell>
                            <TableCell>{settlement.name}</TableCell>
                            <TableCell>{searchItems.municipality.name}</TableCell>
                            <TableCell>{searchItems.locality}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Card>
      <Divider sx={{ marginY: 2 }} />
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography color={'green.main'} variant="h5">
            Catalogo de categoria de propiedades
          </Typography>
        </Box>
        <Card>
          <Box>
            <Grid item xs={12}>
              <TableComponent data={propertyCategories} columns={propertyCategoryColumns} />
            </Grid>
          </Box>
        </Card>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography color={'green.main'} variant="h5">Catalogo de amenidades</Typography>
        </Box>
        <Card>
          <Box>

            <Grid item xs={12}>
              <TableContainer component={Paper} variant="elevation">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Activo</TableCell>
                      <TableCell>Categoria de propiedad</TableCell>
                      <TableCell>Creado por</TableCell>
                      <TableCell>Creado</TableCell>
                      <TableCell>Actualizado</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {amenities.map((amenity) => (
                      <TableRow key={amenity.id}>
                        <TableCell>{amenity.id}</TableCell>
                        <TableCell>{amenity.name}</TableCell>
                        <TableCell>{amenity.active_record ? 'Si' : 'No'}</TableCell>
                        <TableCell>{`${propertyCategoryNames[amenity.property_category_id]}`}</TableCell>
                        <TableCell>{amenity.created_by}</TableCell>
                        <TableCell>{formatDate(amenity.created_at)}</TableCell>
                        <TableCell>{formatDate(amenity.updated_at)}</TableCell>
                        <TableCell><Link variant="body2" href={`/catalogs/amenities/${amenity.id}`}>Ver detalle</Link></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        </Card>
      </Box>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </AppLayout>
  );

};

export default CatalogsPage;