import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../../api/Api";

export const productList = (page = 1, perpage = 5) => {
  return useQuery({
    queryKey: ["productList", page, perpage],
    queryFn: async () => {
      const response = await API.post("/products", { page, perpage });
      console.log("find", response);

      return response?.data;
    },
    keepPreviousData: true,
  });
};

export const useAddproduct = () => {
  return useMutation({
    mutationFn: async (data) => {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("image", data.image);
      const response = await API.post("/produts", formdata, {
        headers: {
          "Contain-Type": "multipart/formdata",
        },
      });
      return response.data;
    },
  });
};

export const useproductbyid = (id) => {
  return useQuery({
    querykey: ["useproductbyid", id],
    queryFn: async () => {
      const response = await API.get(`/products/${id}`);
      return response.data;
    },

    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const formdata = new FormData();
      formdata.append("id", id);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("image", data.image);
      const response = await API.post("/product/update", formdata, {
        headers: {
          "Contain-Type": "multipart/formdata",
        },
      });
      return response.data;
    },
  });
};

export const useRemoveproduct = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await API.post("/product/remove", { id });
      return response.data;
    },
  });
};
