import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../../../api/Api";
import TableComponent from "../../../components/Tablecomponents";
import { Edit, Delete } from "@mui/icons-material";
import {
  productList,
  useRemoveproduct,
} from "../../../hook/react-query/useProduct";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const handleDelete = async (id) => {
  console.log("Deleting id:", id);
  try {
    setIsDeleting(true);
    await API.delete(`/products/remove/${id}`);
    QueryClient.invalidateQueries(["products"]);
  } catch (err) {
    console.error("Delete failed:", err);
  } finally {
    setIsDeleting(false);
  }
};

const Product = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = productList();
  const products = data?.data;
  console.log("products", products);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "image", headerName: "Image", width: 300,  
 renderCell: (params) => (
      <Box>
        <img src={params?.row?.image} alt="" srcset="" width="200px" height="200px"/>
      </Box>
 )
  },
    { field: "title", headerName: "Title", width: 130 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 130,
    },
    {
      field: "category",
      headerName: "category",
      width: 130,
    },
    {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => navigate(`/admin/main/productedit/${params.row.id}`)}
      >
        Edit
      </Button>
    ),
  },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={products}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default Product;
