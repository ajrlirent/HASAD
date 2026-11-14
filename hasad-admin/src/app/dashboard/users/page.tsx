"use client"

import { Details } from "@/components/details-link"
import { NameColumn } from "@/components/users-table/name-column"
import { RegularColumn } from "@/components/users-table/regular-column"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetUsers } from "@/hooks/use-get-users"
import { displayReceiveNotificationsFrom, displayUserType, modifiedUrl } from "@/lib/utils"
import { UserBase } from "@/types/user"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

const columnHelper = createColumnHelper<UserBase>()

const columns = [
  columnHelper.display({
    id: 'name',
    header: 'Name',
    cell: info => <NameColumn
      photo={modifiedUrl(info.row.original.profile_picture ?? "")}
      firstName={info.row.original.first_name}
      lastName={info.row.original.last_name}
      email={info.row.original.email}
    />
  }),
  columnHelper.accessor('phone', {
    cell: info => <RegularColumn value={info.getValue()} />,
    header: 'Phone number',
  }),

  columnHelper.accessor('user_type', {
    cell: info => <RegularColumn value={displayUserType(info.getValue())} />,
    header: 'User type',
  }),
  columnHelper.accessor('receive_notifications_from', {
    cell: info => <RegularColumn value={displayReceiveNotificationsFrom(info.getValue())} />,
    header: 'Receive notifications from',
  }),

  columnHelper.display({
    id: 'edit',
    cell: info => (
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Details resourceType={"users"} id={info.row.original.id} />
      </td>
    )
  }),
]

export default function Page() {
  const accessToken = useGetAccessToken()

  const query = useGetUsers(accessToken)

  const data = query?.data?.data ?? []

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {data?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>no users were found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}