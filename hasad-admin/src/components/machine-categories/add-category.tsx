"use client"

import { useAddMachineCategory } from "@/hooks/use-add-machine-category"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { classNames, onError } from "@/lib/utils"
import { AddMachineCategorySchema } from "@/lib/validations"
import { AddMachineCategoryInput } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    machineType: "vehicle" | "equipment"
}

export default function AddCategory({
    machineType
}: Props) {
  const router = useRouter()

  function goBack() {
    router.back()
  }

  const queryClient = useQueryClient()

  const accessToken = useGetAccessToken()

  const mutation = useAddMachineCategory(accessToken, machineType)

  const {
    handleSubmit,
    register,
    formState,
  } = useForm<AddMachineCategoryInput>({
    resolver: zodResolver(AddMachineCategorySchema),
  })

  function onSubmit(data: AddMachineCategoryInput) {
    mutation.mutate(data, {
      onError: (error) => onError(error),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`${machineType}-categories`, accessToken] })
        toast.success('Category added successfully!')
        goBack()
      }
    })
  }

  const isPending = formState.isSubmitting || mutation.isPending || !formState.isDirty

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add category</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add {machineType} category.
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