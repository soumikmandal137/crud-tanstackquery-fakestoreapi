import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { productbyid } from '../../../hook/react-query/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddproduct, useUpdateProduct } from '../../../hook/react-query/useProduct';
import { toast } from 'sonner';





const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("category is required"),
  
});




const AddProduct = () => {
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
      title: "",
      price:"",
      description: "",
      category:"",
      image: "",
    },
  });



    const { data, isLoding } = productbyid(id);
  console.log("data==========", data);


    useEffect(() => {
    if (id && data) {
      const { title, description, image } = data?.data || {};
      reset({ title, description, image: null });

      if (image) {
        const imageurl = `${
          import.meta.env.VITE_IMAGE_BASE_URL
        }/uploads/product/${image}`;
        console.log("rfygurhyj image", image);
        
        setPhotoURL(imageurl);
      }
    }
  }, [id, data, reset]);








  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };


  const onSubmit = async (data) => {
    setLoading(true);
    try {
    

if(id){
  const formData = new FormData();
  formData.append ("id",id)
      formData.append("title", data.title);
      formData.append("description", data.description);
       formData.append("description", data.price);
        formData.append("description", data.category);
      if (photo) {
        formData.append("image", photo);
      }
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
}else{
  const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (photo) {
        formData.append("image", photo);
      }


      const response = await API.post("/products", formData, {
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
          navigate("/admin/list");
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
          fullWidth
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

  </Box>

        <Box sx={{ display: "flex", gap: 4,marginTop:4 }}>

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

     

    

      <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
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
            onChange={(e)=>{
              const file = e.target.files[0];
              setValue("image", file);
              setPhotoURL(URL.createObjectURL(file))
            }}
          />
        </Button>
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

  )
}

export default AddProduct