"use client"

import { useEditMachineCategory } from "@/hooks/use-edit-machine-category"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachineCategoryById } from "@/hooks/use-get-machine-category-by-id"
import { classNames, onError } from "@/lib/utils"
import { EditMachineCategorySchema } from "@/lib/validations"
import { EditMachineCategoryInput } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    id: number
    machineType: "vehicle" | "equipment"
}

export function EditCategory({
    id,
    machineType
}: Props) {
  const router = useRouter()

  function goBack() {
    router.back()
  }

  const queryClient = useQueryClient()

  const accessToken = useGetAccessToken()

  const query = useGetMachineCategoryById(accessToken, machineType, id)

  const currentLabel = query?.data?.data?.label

  const mutation = useEditMachineCategory(accessToken, id, machineType)

  const {
    handleSubmit,
    register,
    formState,
  } = useForm<EditMachineCategoryInput>({
    resolver: zodResolver(EditMachineCategorySchema),
    defaultValues: {
      label: currentLabel
    }
  })

  function onSubmit(data: EditMachineCategoryInput) {
    mutation.mutate(data, {
      onError: (error) => onError(error),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`${machineType}-categories`, accessToken] })
        queryClient.invalidateQueries({ queryKey: [`${machineType}-categories`, id, accessToken, `${machineType}-category`] })
        toast.success('Category updated successfully!')
        goBack()
      }
    })
  }

  const isPending = formState.isSubmitting || mutation.isPending || !formState.isDirty

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  if (query.isPending) {
    return <div>Loading...</div>
  }

  if (query.isError) {
    return <div>Error : {query.error.message}</div>
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Edit category</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Edit {machineType} category.
          </p>

          <div className="mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                autoComplete="given-name"
                className="block w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
                {...register("label")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={goBack} type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className={classNames(isPending ? "bg-gray-300" : "bg-hasad-600 hover:bg-hasad-500", "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600")}
        >
          Save
        </button>
      </div>
    </form>
  )
}