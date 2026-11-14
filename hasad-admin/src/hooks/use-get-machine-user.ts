import axios from "@/lib/axios";
import { MachineTypePlural } from "@/types";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useGetMachineUser(id: number, accessToken: string, machineTypePlural: MachineTypePlural) {
  const query = useQuery({
    queryKey: ['user', id, accessToken, machineTypePlural],
    queryFn: async () => {
      const response = await axios.get<User>(`/api/admin/${machineTypePlural}/${id}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}