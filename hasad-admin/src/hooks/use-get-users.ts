import axios from "@/lib/axios"
import { UserBase } from "@/types/user"
import { useQuery } from "@tanstack/react-query"

export function useGetUsers(accessToken: string) {
  const query = useQuery({
    queryKey: ["users", accessToken],
    queryFn: async () => {
      const response = await axios.get<UserBase[]>("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}