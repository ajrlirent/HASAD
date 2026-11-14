import Image from "next/image"

type Props = {
  photo: string | null
  firstName: string
  lastName: string
  email: string
}

export function NameColumn({
  photo,
  firstName,
  lastName,
  email
}: Props) {
  return (
    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
      <div className="flex items-center">
        <div className="h-11 w-11 flex-shrink-0">
          <Image
            className="h-11 w-11 rounded-full"
            width={44}
            height={44}
            src={photo ?? ""}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{firstName} {lastName}</div>
          <div className="mt-1 text-gray-500">{email}</div>
        </div>
      </div>
    </td>
  )
}
