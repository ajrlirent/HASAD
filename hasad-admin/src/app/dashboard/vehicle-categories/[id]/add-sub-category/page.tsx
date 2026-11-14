"use client"
import { AddSubCategory } from "@/components/machine-sub-categories/add-sub-category";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathname = usePathname()

    const segments = pathname.split('/')
    const id = Number(segments[3])
  
    return (
        <AddSubCategory categoryId={id} machineType={"vehicle"} />
    )
}