import axios from "@/lib/axios";
import { MachineOrderMatchType, MachineOrderMatchTypePlural, MatchDetailed } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetMachineOrderMatchById<M extends MatchDetailed>(id: number, accessToken: string, machineOrderMatchTypePlural: MachineOrderMatchTypePlural, machineOrderMatchType: MachineOrderMatchType) {
  const query = useQuery({
    queryKey: [machineOrderMatchType, id, accessToken, machineOrderMatchTypePlural],
    queryFn: async () => {
      const response = await axios.get<M>(`/api/admin/${machineOrderMatchTypePlural}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}