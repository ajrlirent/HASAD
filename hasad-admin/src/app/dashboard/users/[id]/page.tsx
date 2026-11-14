"use client"
import { DisplayUserDetails } from "@/components/user-details"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetUserById } from "@/hooks/use-get-user-by-id"
import { User } from "@/types/user"

export default function Page({ params }: { params: { id: string } }) {
  const accessToken = useGetAccessToken()
  const query = useGetUserById(Number(params.id), accessToken)
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
        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">User detailed information.</p>
      </div>
      <DisplayUserDetails user={data} />
    </div>
  )
}