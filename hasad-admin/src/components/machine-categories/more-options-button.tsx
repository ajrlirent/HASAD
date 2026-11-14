import { useDeleteMachineCategory } from "@/hooks/use-delete-machine-category"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { onError } from "@/lib/utils"
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Fragment } from "react"
import toast from "react-hot-toast"

export function MoreOptions({
    id,
    machineType
}: {
    id: number,
    machineType: "vehicle" | "equipment"
}) {
    const accessToken = useGetAccessToken()

    const mutation = useDeleteMachineCategory(accessToken, id, machineType)

    const queryClient = useQueryClient()

    function deleteCategory() {
        mutation.mutate(undefined, {
            onError: (error) => onError(error),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [`${machineType}-categories`, accessToken] })
                toast.success('Category deleted successfully!')
            }
        })
    }

    return (
        <Menu as="div" className="relative ml-auto">
            <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-28 z-10 mt-0.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <MenuItem>
                        <Link
                            href={`/dashboard/${machineType}-categories/${id}`}
                            className={'block px-3 py-1 text-sm leading-6 text-gray-900'}
                        >
                            View sub categories<span className="sr-only">, view sub categories</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={`/dashboard/${machineType}-categories/${id}/edit`}
                            className={'block px-3 py-1 text-sm leading-6 text-gray-900'}
                        >
                            Edit<span className="sr-only">, edit</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <button
                            onClick={deleteCategory}
                            className={'block px-3 py-1 text-sm leading-6 text-gray-900'}
                        >
                            Delete<span className="sr-only">, delete</span>
                        </button>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    )
}