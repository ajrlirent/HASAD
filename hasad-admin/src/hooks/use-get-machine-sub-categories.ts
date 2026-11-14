import axios from "@/lib/axios"
import { SubCategory } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function useGetMachineSubCategories(accessToken: string, machineType: "vehicle" | "equipment") {
  const query = useQuery({
    queryKey: [`${machineType}-sub-categories`, accessToken],
    queryFn: async () => {
      const response = await axios.get<SubCategory[]>(`/api/admin/${machineType}-sub-categories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}