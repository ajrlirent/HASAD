import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { MachineOrderTypePlural, Order } from "@/types";

export function useGetMachineOrders<M extends Order>(accessToken: string, machineOrderTypePlural: MachineOrderTypePlural) {
  const query = useQuery({
    queryKey: [machineOrderTypePlural, accessToken],
    queryFn: async () => {
      const response = await axios.get<M[]>(`/api/admin/${machineOrderTypePlural}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}