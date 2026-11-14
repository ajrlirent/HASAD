import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useAddMachineCategory(accessToken: string, machineType: "vehicle" | "equipment") {
    const mutation = useMutation({
        mutationFn: async (data: { label: string }) => {
            const response = await axios.post(`/api/admin/${machineType}-categories`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response
        }
    })

    return mutation
}