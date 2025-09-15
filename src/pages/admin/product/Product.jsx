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

const Products = () => {
  const navigate = useNavigate();
    const queryclient = useQueryClient();
  const { data, isLoading, isError, error } = productList();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const products = data?.data;


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 300,
      renderCell: (params) => (
        <Box>
          <img
            src={params?.row?.image}
            alt=""
            srcset=""
            width="200px"
            height="200px"
          />
        </Box>
      ),
    },
    { field: "title", headerName: "Title", width: 330 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
    },
    {
      field: "category",
      headerName: "category",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
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
    {
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setOpenDialog(true);
            setDeleteId(params?.row?.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const { mutate: removeproduct, isLoading: isDeleting } = useRemoveproduct();

  const handleDelete = async () => {
    removeproduct(deleteId, {
      onSuccess: (response) => {
        toast("Deleted Successfully");
         queryclient.invalidateQueries(["productList"]);
      },
      onError: (error) => {
        toast(error?.response?.data?.message);
      },
    });
  };

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

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setDeleteId(null);
        }}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleDelete();
              setOpenDialog(false);
              setDeleteId(null);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
