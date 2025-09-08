// import React from 'react'

// const Signup = () => {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup

import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useSignup } from "../../hook/react-query/useAuth";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const mutationSignup = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let newData = {
      username: data.username,
      email: data.email,
      password: data.password,
      name: { firstname: "soumik", lastname: "mondal" },
      address: {
        city: "kilcoole",
        street: "7835 new road",
        number: 3,
        zipcode: "12926-3874",
        geolocation: { lat: "-37.3159", long: "81.1496" },
      },
      phone: "1-570-236-7033",
    };
    setLoading(true);
    try {
      const response = await mutationSignup.mutateAsync(newData);
      console.log("signup", response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
        <Typography variant="h5" gutterBottom>
          Signup
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel>Username</InputLabel>
          <TextField
            fullWidth
            margin="normal"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <InputLabel>Email</InputLabel>
          <TextField
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <InputLabel>Password</InputLabel>
          <TextField
            fullWidth
            type="password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Signup"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/admin/login"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
