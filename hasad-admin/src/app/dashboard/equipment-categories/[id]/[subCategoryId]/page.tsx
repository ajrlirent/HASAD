"use client"

import { EditSubCategory } from "@/components/machine-sub-categories/edit-sub-category"

export default function Page({ params }: { params: { subCategoryId: string } }) {
  return (
    <EditSubCategory machineType={"equipment"} id={Number(params.subCategoryId)} />
  )
}