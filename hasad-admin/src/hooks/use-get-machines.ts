import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { MachineTypePlural } from "@/types";
import { VehicleBase } from "@/types/vehicle";
import { EquipmentBase } from "@/types/equipment";
import { AttachmentBase } from "@/types/attachment";

export function useGetMachines<MachineBase extends VehicleBase | EquipmentBase | AttachmentBase>(accessToken: string, machineTypePlural: MachineTypePlural) {
  const query = useQuery({
    queryKey: [machineTypePlural, accessToken],
    queryFn: async () => {
      const response = await axios.get<MachineBase[]>(`/api/admin/${machineTypePlural}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return query
}