import { ActivityStatus } from "@/types"

export function DisplayActivityStatus({ value }: { value: ActivityStatus }) {
  if (value === "active") {
    return (
      <span
        className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20"
      >
        Active
      </span>
    )
  }

  if (value === "in_service") {
    return (
      <span
        className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-yellow-50 text-yellow-700 ring-yellow-600/20"
      >
        In Service
      </span>
    )
  }


  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20"
    >
      Out Service
    </span>
  );
}