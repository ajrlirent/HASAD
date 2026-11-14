"use client"
import { Details } from "@/components/details-link"
import { DisplayActivityStatus } from "@/components/display-activity-status"
import { DisplayApprovalStatus } from "@/components/display-approval-status"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachines } from "@/hooks/use-get-machines"
import { VehicleBase } from "@/types/vehicle"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<VehicleBase>()

const columns = [
  columnHelper.accessor('brand', {
    cell: info => info.getValue(),
    header: 'Brand',
  }),
  columnHelper.accessor('model', {
    cell: info => info.getValue(),
    header: 'Model',
  }),
  columnHelper.accessor('year', {
    cell: info => info.getValue(),
    header: 'Year',
  }),
  columnHelper.accessor('activity_status', {
    cell: info => <DisplayActivityStatus value={info.getValue()} />,
    header: 'Activity Status',
  }),
  columnHelper.accessor('approval_status', {
    cell: info => <DisplayApprovalStatus value={info.getValue()} />,
    header: 'Approval Status',
  }),
  columnHelper.display({
    id: 'edit',
    cell: info => <Details resourceType={"vehicles"} id={info.row.original.id} />,
  }),
]

export default function Page() {
  const accessToken = useGetAccessToken()

  const query = useGetMachines<VehicleBase>(accessToken, "vehicles")

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
          <h1 className="text-base font-semibold leading-6 text-gray-900">Vehicles</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the vehicles submitted by providers.
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
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900" key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>no vehicles were submitted</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}