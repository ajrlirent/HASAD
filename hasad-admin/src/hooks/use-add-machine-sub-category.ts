import axios from "@/lib/axios";
import { AddMachineSubCategoryInput } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useAddMachineSubCategory(accessToken: string, machineType: "vehicle" | "equipment", categoryId: number) {
    const mutation = useMutation({
        mutationFn: async (data: AddMachineSubCategoryInput) => {
            const photo = data?.photo[0]

            const newData = {
                label: data.label,
                category_id: categoryId,
                photo
            }

            const response = await axios.post(`/api/admin/${machineType}-sub-categories`, newData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            return response
        }
    })

    return mutation
}