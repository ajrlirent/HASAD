import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useDeleteMachineSubCategory(accessToken: string, id: number, machineType: "vehicle" | "equipment") {
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`/api/admin/${machineType}-sub-categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response
        }
    })

    return mutation
}