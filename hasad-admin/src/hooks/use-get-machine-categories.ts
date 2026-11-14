import axios from "@/lib/axios"
import { Category } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function useGetMachineCategories(accessToken: string, machineType: "vehicle" | "equipment") {
  const query = useQuery({
    queryKey: [`${machineType}-categories`, accessToken],
    queryFn: async () => {
      const response = await axios.get<Category[]>(`/api/admin/${machineType}-categories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}