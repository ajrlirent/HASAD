"use client"
import { DisplayApprovalStatus } from '@/components/display-approval-status'
import { useEditMachineApprovalStatus } from '@/hooks/use-edit-machine-approval-status'
import { useGetAccessToken } from '@/hooks/use-get-access-token'
import { useGetMachineById } from '@/hooks/use-get-machine-by-id'
import { classNames, getMachineApprovalStatus, onError } from '@/lib/utils'
import { EditApprovalStatusSchema } from '@/lib/validations'
import { ApprovalStatus, EditApprovalStatusInput, MachineTypePlural, MachineType } from '@/types'
import { Attachment } from '@/types/attachment'
import { Equipment } from '@/types/equipment'
import { Vehicle } from '@/types/vehicle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const approvalStatusValues: {
  id: ApprovalStatus,
  title: string
}[] = [
    { id: 'approved', title: 'Approved' },
    { id: 'not_approved', title: 'Not approved' },
  ]

type Props = {
  machineTypePlural: MachineTypePlural,
  machineType: MachineType
}

export function EditApprovalStatus<T extends Vehicle | Equipment | Attachment>({ machineTypePlural, machineType }: Props) {
  const router = useRouter()

  function goBack() {
    router.back()
  }

  const pathname = usePathname()

  const segments = pathname.split('/')
  const id = Number(segments[3])

  const queryClient = useQueryClient()

  const accessToken = useGetAccessToken()

  const query = useGetMachineById<T>(id, accessToken, machineTypePlural, machineType)

  const currentApprovalStatus = getMachineApprovalStatus(query)

  const mutation = useEditMachineApprovalStatus(id, accessToken, machineType)

  const {
    handleSubmit,
    register,
    formState,
  } = useForm<EditApprovalStatusInput>({
    resolver: zodResolver(EditApprovalStatusSchema),
    defaultValues: {
      approvalStatus: currentApprovalStatus
    }
  })

  function onSubmit(data: EditApprovalStatusInput) {
    mutation.mutate(data, {
      onError: (error) => onError(error),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [machineTypePlural, accessToken] })
        queryClient.invalidateQueries({ queryKey: [machineType, id, accessToken, machineTypePlural] })
        toast.success('Approval status updated successfully!')
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">Edit approval status</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Edit {machineType}&apos;s approval status.
          </p>

          <div className="mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="flex-grow">
              <fieldset>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {approvalStatusValues.map((value) => (
                    <div key={value.id} className="flex items-center">
                      <input
                        id={value.id}
                        type="radio"
                        value={value.id}
                        className="h-4 w-4 border-gray-300 text-hasad-600 focus:ring-hasad-600"
                        {...register("approvalStatus")}
                      />
                      <label htmlFor={value.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        <DisplayApprovalStatus value={value.id} />
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
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
