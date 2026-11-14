"use client"
import { EditApprovalStatus } from "@/components/edit-approval-status"
import { Vehicle } from "@/types/vehicle"

export default function Page() {
  return (
    <EditApprovalStatus<Vehicle> machineTypePlural={"vehicles"} machineType={"vehicle"} />
  )
}