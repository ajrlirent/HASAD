import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { MachineOrderMatchTypePlural, Match } from "@/types";

export function useGetMachineOrderMatches<M extends Match>(accessToken: string, machineOrderMatchTypePlural: MachineOrderMatchTypePlural) {
  const query = useQuery({
    queryKey: [machineOrderMatchTypePlural, accessToken],
    queryFn: async () => {
      const response = await axios.get<M[]>(`/api/admin/${machineOrderMatchTypePlural}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}