import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface Breadcrumb {
  name: string;
  href: string;
  current: boolean;
}

export function Breadcrumbs() {
  const pathname = usePathname()

  const pathParts = pathname.split('/').filter((part) => part)

  const breadcrumbs: Breadcrumb[] = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    return {
      name,
      href,
      current: index === pathParts.length - 1,
    };
  });

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {breadcrumbs.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}