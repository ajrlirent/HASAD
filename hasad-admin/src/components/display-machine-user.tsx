"use client"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachineUser } from "@/hooks/use-get-machine-user"
import { MachineType, MachineTypePlural } from "@/types"
import { User } from "@/types/user"
import { usePathname } from "next/navigation"
import { DisplayUserDetails } from "./user-details"

type Props = {
  machineTypePlural: MachineTypePlural
  machineType: MachineType
}

export function DisplayMachineUser({ machineTypePlural, machineType }: Props) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const id = segments[3]

  const accessToken = useGetAccessToken()

  const query = useGetMachineUser(Number(id), accessToken, machineTypePlural)
  const data = query?.data?.data as User

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
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Owner Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{machineType} owner information.</p>
      </div>
      <DisplayUserDetails user={data} />
    </div>
  )
}
