"use client"
import { Details } from "@/components/details-link"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachineOrders } from "@/hooks/use-get-machine-orders"
import { ConstructionVehicleOrder } from "@/types/construction-vehicle-order"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<ConstructionVehicleOrder>()

const columns = [
    columnHelper.display({
        id: 'machine',
        cell: info => info.row.original.sub_category.label,
        header: 'Machine',
    }),
    columnHelper.accessor('capacity', {
        cell: info => info.getValue(),
        header: 'Capacity',
    }),
    columnHelper.accessor('quantity', {
        cell: info => info.getValue(),
        header: 'Quantity',
    }),
    columnHelper.display({
        id: 'edit',
        cell: info => <Details resourceType={"construction-vehicle-orders"} id={info.row.original.id} />,
    }),
]


export default function Page() {
    const accessToken = useGetAccessToken()
    const query = useGetMachineOrders<ConstructionVehicleOrder>(accessToken, "construction-vehicle-orders")

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
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Construction vehicle orders</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the construction vehicle orders submitted by renters.
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
                            <div>no orders were submitted</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}