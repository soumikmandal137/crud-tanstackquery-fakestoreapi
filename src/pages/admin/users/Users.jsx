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

import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useRemoveusers, userslist } from "../../../hook/react-query/useuser";



const User = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = userslist();
   const queryclient = useQueryClient();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const products = data?.data;
  const users = data?.data;
  console.log("users", users);

     

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
  field: "name",
  headerName: "Name",
  width: 300,
  renderCell: (params) => (
    <span>{params.row.name.firstname} {params.row.name.lastname}</span>
  )
},
    { field: "email", headerName: "Email", width: 330 },
    {
      field: "username",
      headerName: "Username",
      type: "number",
      width: 150,
    },
    {
      field: "password",
      headerName: "Password",
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
        onClick={() => navigate(`/admin/main/useredit/${params.row.id}`)}
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

  const { mutate: removeusers, isLoading: isDeleting } = useRemoveusers();

  const handleDelete = async () => {
    removeusers(deleteId, {
      onSuccess: (response) => {
        toast("Deleted Successfully");
         queryclient.invalidateQueries(["userlist"]);
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
          rows={users}
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

export default User;
