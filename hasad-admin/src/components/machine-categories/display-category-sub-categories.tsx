"use client"
import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { useGetMachineCategoryById } from "@/hooks/use-get-machine-category-by-id"
import { useGetMachineSubCategoriesOfCategory } from "@/hooks/use-get-machine-sub-categories-of-category"
import { modifiedUrl } from "@/lib/utils"
import Link from "next/link"
import { GridElement } from "./sub-category-grid-item"

type Props = {
  id: number
  machineType: "vehicle" | "equipment"
}

export function DisplayCategorySubCategories({
  id,
  machineType
}: Props) {
  const accessToken = useGetAccessToken()

  const categoryQuery = useGetMachineCategoryById(accessToken, machineType, id)

  const categoryData = categoryQuery?.data?.data

  const query = useGetMachineSubCategoriesOfCategory(accessToken, machineType, id)

  const data = query?.data?.data ?? []

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
          <h1 className="text-base font-semibold leading-6 text-gray-900">{categoryData?.label}</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all sub categories that belongs to the category: <b>{categoryData?.label}</b>.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href={`/dashboard/${machineType}-categories/${id}/add-sub-category`}
            className="block rounded-md bg-hasad-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-hasad-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600"
          >
            Add sub category
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        {data?.length > 0 ? (
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((item) => (
              <GridElement
                key={item.id}
                photo={modifiedUrl(item.photo)}
                label={item.label}
                machineType={machineType}
                id={item.id}
                categoryId={id}
              />
            ))}
          </ul>
        ) : (
          <div>no sub categories were found</div>
        )}
      </div>
    </div>
  )
}