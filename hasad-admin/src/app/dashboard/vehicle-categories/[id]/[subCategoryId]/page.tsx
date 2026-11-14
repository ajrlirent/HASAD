"use client"

import { EditSubCategory } from "@/components/machine-sub-categories/edit-sub-category"

export default function Page({ params }: { params: { subCategoryId: string } }) {
  return (
    <EditSubCategory machineType={"vehicle"} id={Number(params.subCategoryId)} />
  )
}