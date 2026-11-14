"use client"
import { EditApprovalStatus } from "@/components/edit-approval-status"
import { Equipment } from "@/types/equipment"

export default function Page() {
  return (
    <EditApprovalStatus<Equipment> machineTypePlural={"equipments"} machineType={"equipment"} />
  )
}