import { ApprovalStatus } from "@/types"

export function DisplayApprovalStatus({ value }: { value: ApprovalStatus }) {
  if (value === "approved") {
    return (
      <span
        className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20"
      >
        Approved
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20"
    >
      Not Approved
    </span>
  );
}