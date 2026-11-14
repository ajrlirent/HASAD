import axios from "@/lib/axios"
import { SubCategory } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function useGetMachineSubCategoriesOfCategory(accessToken: string, machineType: "vehicle" | "equipment", id: number) {
  const query = useQuery({
    queryKey: [`${machineType}-categories`, accessToken, id, `${machineType}-sub-categories`],
    queryFn: async () => {
      const response = await axios.get<SubCategory[]>(`/api/admin/${machineType}-categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}