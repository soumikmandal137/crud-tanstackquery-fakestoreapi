import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../../api/Api";

export const productList = () => {
  return useQuery({
    queryKey: ["productList"],
    queryFn: async () => {
      const response = await API.get("/products");
      return response;
    },
    keepPreviousData: true,
  });
};

export const useAddproduct = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/products", data);
      return response;
    },
  });
};

export const productbyid = (id) => {
  return useQuery({
    queryKey: ["productbyid", id],
    queryFn: async () => {
      const response = await API.get(`/products/${id}`);

      return response;
    },

    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await API.put(`/products/${id}`, data);
      return response;
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
