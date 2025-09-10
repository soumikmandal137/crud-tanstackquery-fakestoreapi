import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../../api/Api";

export const useSignup = ()=>{
    return useMutation({
        mutationFn: async(data)=>{
            const response = await API.post("/users", data);
            return response;
        }
    })
}

export const useLogin = ()=>{
    return useMutation({
        mutationFn: async(data)=>{
            const response = await API.post("/auth/login", data);
            return response;
        }
    })
};