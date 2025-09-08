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
import { useLogin } from "../../hook/react-query/useAuth";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const mutationLogin = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await mutationLogin.mutateAsync(data);
      console.log("login", response);
      if (response?.status === 201) {
        toast.success("Login successful");
        Cookies.set("token", response?.data?.token, {
          expires: 3,
          sameSite: "strict",
        });
        reset();
        setTimeout(() => {
          navigate("/admin/main/productlist");
        }, 1000);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      toast.error(error?.response?.data?.message || "Login failed");
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
          Login
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link
            to="/admin/signup"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
