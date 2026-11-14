"use client"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachineCategories } from "@/hooks/use-get-machine-categories"
import { capitalize } from "@/lib/utils"
import { Category } from "@/types"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { MoreOptions } from "./more-options-button"
import Link from "next/link"

const columnHelper = createColumnHelper<Category>()

function createColumns(machineType: "vehicle" | "equipment") {
    return [
        columnHelper.accessor('label', {
            cell: info => info.getValue(),
            header: 'Name',
        }),
        columnHelper.display({
            id: 'more',
            cell: info => <MoreOptions id={info.row.original.id} machineType={machineType} />,
        }),
    ]
}

type Props = {
    machineType: "vehicle" | "equipment"
}

export function MachineCategoriesTable({
    machineType
}: Props) {
    const accessToken = useGetAccessToken()

    const query = useGetMachineCategories(accessToken, machineType)

    const data = query?.data?.data ?? []

    const columns = createColumns(machineType)

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
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{capitalize(machineType)} categories</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all {machineType} categories available.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        href={`/dashboard/${machineType}-categories/add-category`}
                        className="block rounded-md bg-hasad-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-hasad-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600"
                    >
                        Add category
                    </Link>
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
                            <div>no categories were found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}