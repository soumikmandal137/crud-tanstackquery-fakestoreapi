import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  productbyid,
  useAddproduct,
  useRemoveproduct,
  useUpdateProduct,
} from "../../../hook/react-query/useProduct";
import { toast } from "sonner";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("category is required"),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const mutationAddProduct = useAddproduct();
  const mutationUpdateProduct = useUpdateProduct();
  const mutationRemoveProduct =useRemoveproduct();

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
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  });

  const { data, isLoding } = productbyid(id);
  console.log("data==========", data);

  useEffect(() => {
    if (id && data) {
      const { title, description, image, price, category } = data?.data || {};
      reset({ title, description, image, price, category });
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
      const response = await mutationUpdateProduct.mutateAsync({ id, data });
      if (response?.status === 200) {
        toast("Product Updated Successfully");
        reset();
        navigate("/admin/main/productlist");
      }
    } else {
      console.log("create mode");
      const response = await mutationAddProduct.mutateAsync(data);
      if (response?.status === 201) {
        toast("Product update Successfully");
        reset();
        navigate("/admin/main/productlist");
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
        {id ? "Edit" : "Add"} Product
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          label="Title"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 4, marginTop: 4 }}>
        <TextField
          label="Description"
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="category"
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
        />
      </Box>
      <TextField
        label="Image URL"
        fullWidth
        {...register("image")}
        error={!!errors.image}
        helperText={errors.image?.message}
      />

      {/* <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
        <Avatar
          src={photoURL}
          alt="Student"
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Button component="label" variant="outlined">
          Upload Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setValue("image", file);
              setPhotoURL(URL.createObjectURL(file));
            }}
          />
        </Button>
      </Box> */}
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

export default AddProduct;
