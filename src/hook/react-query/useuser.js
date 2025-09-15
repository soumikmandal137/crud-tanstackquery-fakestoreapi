import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../../api/Api";

export const userslist = () => {
  return useQuery({
    queryKey: ["userslist"],
    queryFn: async () => {
      const response = await API.get("/users");
      return response;
    },
    keepPreviousData: true,
  });
};

export const useAddusers = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/users", data);
      return response;
    },
  });
};

export const usersbyid = (id) => {
  return useQuery({
    queryKey: ["usersbyid", id],
    queryFn: async () => {
      const response = await API.get(`/users/${id}`);

      return response;
    },

    enabled: !!id,
  });
};

export const useUpdateusers = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await API.put(`/users/${id}`, data);
      return response;
    },
  });
};

export const useRemoveusers = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await API.delete(`/users/${id}`);
      return response.data;
    },
  });
};
