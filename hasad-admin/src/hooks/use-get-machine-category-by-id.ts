import axios from "@/lib/axios"
import { Category } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function useGetMachineCategoryById(accessToken: string, machineType: "vehicle" | "equipment", id: number) {
  const query = useQuery({
    queryKey: [`${machineType}-categories`, accessToken, id, `${machineType}-category`],
    queryFn: async () => {
      const response = await axios.get<Category>(`/api/admin/${machineType}-categories/${id}/category`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}