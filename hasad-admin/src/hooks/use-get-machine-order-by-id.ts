import axios from "@/lib/axios";
import { MachineOrderType, MachineOrderTypePlural, Order } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetMachineOrderById<M extends Order>(id: number, accessToken: string, machineOrderTypePlural: MachineOrderTypePlural, machineOrderType: MachineOrderType) {
  const query = useQuery({
    queryKey: [machineOrderType, id, accessToken, machineOrderTypePlural],
    queryFn: async () => {
      const response = await axios.get<M>(`/api/admin/${machineOrderTypePlural}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}