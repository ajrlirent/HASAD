import { useMutation } from '@tanstack/react-query';
import { SignInInput, SignInResponse } from "@/types/auth";
import axios from '@/lib/axios';

export function useSignIn() {
  const mutation = useMutation({
    mutationFn: async (data: SignInInput) => {
      // const csrf = () => axios.get('/sanctum/csrf-cookie')
      // await csrf()
      return axios.post<SignInResponse>("/api/admin/signin", data)
    },
  })

  return mutation
}