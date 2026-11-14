"use client"
import { DisplayCategorySubCategories } from "@/components/machine-categories/display-category-sub-categories"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <DisplayCategorySubCategories id={Number(params.id)} machineType={"vehicle"} />
  )
}