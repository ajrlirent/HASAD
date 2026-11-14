"use client"
import { EditCategory } from "@/components/machine-categories/edit-category"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <EditCategory id={Number(params.id)} machineType={"vehicle"} />
  )
}