import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useDeleteMachineCategory(accessToken: string, id: number, machineType: "vehicle" | "equipment") {
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.delete(`/api/admin/${machineType}-categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response
        }
    })

    return mutation
}