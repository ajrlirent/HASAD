import axios from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(id: number, accessToken: string) {
  const query = useQuery({
    queryKey: ['user', id, accessToken],
    queryFn: async () => {
      // const csrf = () => axios.get('/sanctum/csrf-cookie')
      // await csrf()
      const response = await axios.get<User>(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}