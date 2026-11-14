"use client"
import { Details } from "@/components/details-link"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachineOrderMatches } from "@/hooks/use-get-machine-order-matches"
import { ConstructionVehicleOrderMatch } from "@/types/construction-vehicle-order-match"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<ConstructionVehicleOrderMatch>()

const columns = [
    columnHelper.display({
        id: 'machine',
        cell: info => info.row.original.order.sub_category.label,
        header: 'Machine',
    }),
    columnHelper.display({
        id: 'provider',
        cell: info => `${info.row.original.provider.first_name} ${info.row.original.provider.last_name}`,
        header: 'Provider',
    }),
    columnHelper.display({
        id: 'renter',
        cell: info => `${info.row.original.order.user.first_name} ${info.row.original.order.user.last_name}`,
        header: 'Renter',
    }),
    columnHelper.display({
        id: 'edit',
        cell: info => <Details resourceType={"construction-vehicle-order-matches"} id={info.row.original.id} />,
    }),
]


export default function Page() {
    const accessToken = useGetAccessToken()

    const query = useGetMachineOrderMatches<ConstructionVehicleOrderMatch>(accessToken, "construction-vehicle-order-matches")

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
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Construction vehicle order matches</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the construction vehicle order matches found.
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
                            <div>no matches were found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}