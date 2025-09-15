import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAddusers, useRemoveusers, usersbyid, useUpdateusers } from "../../../hook/react-query/useuser";


const schema = yup.object().shape({
  username: yup.string().required("Title is required"),
  email: yup.string().required("price is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Adduser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
   const mutationAddusers = useAddusers();
   const mutationUpdateusers = useUpdateusers();
   const mutationRemoveusers =useRemoveusers();
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",

    },
  });

 const { data, isLoding } = usersbyid(id);
   console.log("data==========", data);
 
   useEffect(() => {
     if (id && data) {
       const { username,email,password } = data?.data || {};
       reset({ username,email,password });
     }
   }, [id, data, reset]);
 
   const handlePhotoChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       setPhoto(file);
       setPhotoURL(URL.createObjectURL(file));
     }
   };
 
   const onSubmit = async (data, mode) => {
   setLoading(true);
   try {
     if (mode === "edit" && id) {
       console.log("edit mode");
       const response = await mutationUpdateusers.mutateAsync({ id, data });
       if (response?.status === 200) {
         toast("users Updated Successfully");
         reset();
         navigate("/admin/main/userlist");
       }
     } else {
       console.log("create mode");
       const response = await mutationAddusers.mutateAsync(data);
       if (response?.status === 201) {
         toast("users updated Successfully");
         reset();
         navigate("/admin/main/userlist");
       }
     }
   } catch (error) {
     // toast(error?.response?.data?.message);
     console.error(error);
   } finally {
     setLoading(false);
   }
 };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Edit" : "user"} 
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          label="Username"
          fullWidth
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 4, marginTop: 4,width:580 }}>
        <TextField
        label="password"
            fullWidth
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        
      </Box>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {id ? "UPDATE" : "SAVE"}
      </Button>
    </Box>
  );
};

export default Adduser;
