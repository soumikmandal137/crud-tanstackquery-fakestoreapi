import React from 'react'

const AddProduct = () => {
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
          {...register("Price")}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

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