import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem { label: string; href: string }

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <li>
          <Link href="/" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium transition-colors">
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            {i === items.length - 1
              ? <span className="text-gray-500 font-medium">{item.label}</span>
              : <Link href={item.href} className="text-green-600 hover:text-green-700 font-medium transition-colors">{item.label}</Link>
            }
          </li>
        ))}
      </ol>
    </nav>
  )
}
