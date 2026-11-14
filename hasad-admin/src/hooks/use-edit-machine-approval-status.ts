import axios from "@/lib/axios";
import { EditApprovalStatusInput, MachineType } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useEditMachineApprovalStatus(id: number, accessToken: string, machineType: MachineType) {
  const mutation = useMutation({
    mutationFn: async (data: EditApprovalStatusInput) => {
      const newData = {
        approval_status: data.approvalStatus
      }
      const response = await axios.put(`/api/admin/edit-${machineType}-approval-status/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    }
  })

  return mutation
}