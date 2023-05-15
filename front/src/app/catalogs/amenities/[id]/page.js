'use client';
import React, { useEffect } from "react";
import apiService from "@/app/services/api";
import AppLayout from "@/app/layouts/AppLayout";
import { Box, Button, Card, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableComponent from "@/app/components/molecule/table";

const amenityColumns = [
  {
    headerName: 'ID',
    field: 'id',
  },
  {
    headerName: 'SEO',
    field: 'seo_friendly',
  },
  {
    headerName: 'Property category',
    field: 'property_category',
  },
];

const getSubAmmenity = async ({ api, id }) => {
  return api.getSubAmmenity({ id })
    .then(data => { return data; });
}

const AmenityDetailsPage = async ({ params, searchParams }) => {
  const { id } = params;
  const api = apiService({ baseHost: process.env.NEXT_PUBLIC_API_URL });
  const amenity = await getSubAmmenity({ api, id });

  return (
    <AppLayout>
      <Box sx={{ pt: 10, mb: 3 }}>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
          Atrás
        </Button>
      </Box>

      <Container maxWidth="md">
        <Card sx={{ p: 5 }}>
        <Typography color={'green.main'} variant="h4">
          {amenity.id} - {amenity?.name}
        </Typography>          
        <Typography variant="body2">
            ID: {amenity.id}
          </Typography>
          <Typography variant="body1">
            Nombre SEO: {amenity.seo_friendly}
          </Typography>
          <Typography variant="body1">
            Property category ID: {amenity.property_category}
          </Typography>
          <Typography variant="body1">
            Amenity parent ID: {amenity.amenity_parent}
          </Typography>
          {/* <TableComponent columns={amenityColumns} data={amenity} /> */}

        </Card>
      </Container>



    </AppLayout>
  );
};

export default AmenityDetailsPage;