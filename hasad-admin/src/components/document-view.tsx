import { PaperClipIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

type Props = {
  fileName: string
  url: string
}

export function DocumentView({
  fileName,
  url
}: Props) {
  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">{fileName}</span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <Link target='_blank' href={url} className="font-medium text-hasad-600 hover:text-hasad-500">
          View
        </Link>
      </div>
    </li>
  )
}
