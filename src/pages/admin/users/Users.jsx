import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { Edit, Delete } from '@mui/icons-material';
import { productList, useRemoveproduct } from "../../../hook/react-query/useProduct";
import { toast } from "sonner";
import { QueryClient, useQueryClient } from "@tanstack/react-query";



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





const User = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  // const [productList, setproductList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewDetails, setViewDetails] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page,setPage] = useState(1);
    // const [isDeleting, setIsDeleting] = useState(false);



  const handleEdit = (id) => navigate(`/admin/edit/${id}`);
  


const perpage=5


const { data, isLoading, isError, error } = productList(page, perpage);
const products =data?.data
const totalPages =data?.totalPages
console.log("data",data);
const {mutate: removeproduct, isLoading: isDeleting}= useRemoveproduct();





const columns = [
  { field: "_id", headerName: "ID" },
  { field: "username", headerName: "Username" },
  { field: "email", headerName: "Email" },
  { field: "status", headerName: "Status" },
];


  const handleDelete = async (id) => {

const confirm = window.confirm("Are you sure to delete these product");
if(!confirm) return
removeproduct(id,{
  onSuccess:(response)=>{
    toast(response.message);
    queryclient.invalidateQueries(["productList"]);
  },
  onError:(error)=>{
     toast(error?.response?.data?.message);
  }
})





  };




  const renderActions = (row) => (
    <>
      <Edit
        color="primary"
        style={{ cursor: 'pointer', marginRight: 8 }}
        onClick={() => handleEdit(row._id)}
      />
      <Delete
        color="error"
        // style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
        onClick={() => handleDelete(row._id)}
      />
    </>
  );





  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        user List
      </Typography>

     



<TableComponent
        columns={columns}
        rows={products}
        actions={renderActions}
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
        loading={isDeleting}
      />



      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
        <DialogTitle> Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Username: {viewDetails?.username}</Typography>
            <Typography>Email: {viewDetails?.email}</Typography>
            <Typography>Password: {viewDetails?.password}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
              
              handleDelete(viewDetails?._id);
              setOpenDialog(false);
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
