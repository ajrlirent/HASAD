import axios from "@/lib/axios";
import { MachineType, MachineTypePlural } from "@/types";
import { Attachment } from "@/types/attachment";
import { Equipment } from "@/types/equipment";
import { Vehicle } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";

export function useGetMachineById<M extends Vehicle | Equipment | Attachment>(id: number, accessToken: string, machineTypePlural: MachineTypePlural, machineType: MachineType) {
  const query = useQuery({
    queryKey: [machineType, id, accessToken, machineTypePlural],
    queryFn: async () => {
      const response = await axios.get<M>(`/api/admin/${machineTypePlural}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}