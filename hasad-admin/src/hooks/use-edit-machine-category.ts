import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useEditMachineCategory(accessToken: string, id: number, machineType: "vehicle" | "equipment") {
    const mutation = useMutation({
        mutationFn: async (data: { label: string }) => {
            const response = await axios.put(`/api/admin/${machineType}-categories/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response
        }
    })

    return mutation
}