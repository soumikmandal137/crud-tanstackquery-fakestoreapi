import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddproduct,
  useUpdateProduct,
} from "../../../hook/react-query/useProduct";
import { toast } from "sonner";

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
  const createProduct = useAddproduct();
  const updateProduct = useUpdateProduct();

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
      category: "",
    },
  });

  // useEffect(() => {
  //   if (id && data) {
  //     const { username, email, password } = data?.data || {};
  //     reset({ username, email, password });
  //   }
  // }, [id, data, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("username", data.username);
        formData.append("email", data.email);
        // if (photo) {
        //   formData.append("image", photo);
        // }
        const response = await API.post("/product/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response", response);
        if (response?.status === 200) {
          toast(response?.data?.message);
          reset();
          setPhoto(null);
          setPhotoURL("");
          setTimeout(() => {
            navigate("/admin/main/userlist");
          }, 2000);
        } else {
          toast(response?.data?.message);
        }
      } else {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);

        // const response = await API.post("/products", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        console.log("response", response);
        if (response?.status === 200) {
          toast(response?.data?.message);
          reset();
          setPhoto(null);
          setPhotoURL("");
          setTimeout(() => {
            navigate("/admin/main/userlist");
          }, 2000);
        } else {
          toast(response?.data?.message);
        }
      }
    } catch (error) {
      toast(error?.response?.data?.message);
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
