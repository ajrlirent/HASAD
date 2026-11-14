import { ResourceType } from "@/types"
import Link from "next/link"

type Props = {
  id: number
  resourceType: ResourceType
}

export function Details({ id, resourceType }: Props) {
  return (
    <Link href={`/dashboard/${resourceType}/${id}`} className="text-hasad-600 font-medium hover:text-hasad-900">
      Details<span className="sr-only">, {id}</span>
    </Link>
  )
}
