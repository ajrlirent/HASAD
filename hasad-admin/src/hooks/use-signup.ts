import { useMutation } from '@tanstack/react-query';
import { SignUpInput } from "@/types/auth";
import axios from '@/lib/axios';

export function useSignUp() {
  const mutation = useMutation({
    mutationFn: async (data: SignUpInput) => {

      let profile_picture = null

      if (data.profile_picture && data.profile_picture?.length > 0) {
        profile_picture = data.profile_picture[0]
      }

      const newData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        profile_picture: profile_picture,
        user_type: "admin",
        receive_notifications_from: "none"
      }
      // const csrf = () => axios.get("/sanctum/csrf-cookie")
      // await csrf()

      return axios.post("/api/admin/signup", newData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
  })

  return mutation
}