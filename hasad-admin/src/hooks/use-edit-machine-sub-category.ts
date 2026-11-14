import axios from "@/lib/axios";
import { EditMachineSubCategoryInput } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useEditMachineSubCategory(accessToken: string, machineType: "vehicle" | "equipment", id: number) {
    const mutation = useMutation({
        mutationFn: async (data: EditMachineSubCategoryInput) => {
            let newData = {
                label: data?.label,
                photo: data?.photo ? data.photo[0] : undefined
            }

            console.log("newData: ", newData)

            const response = await axios.post(`/api/admin/${machineType}-sub-categories/${id}`, newData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log("response: ", response)

            return response
        }
    })

    return mutation
}