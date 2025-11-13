'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/app/data'
import { ChevronRight, Home, ArrowUp } from 'lucide-react'

export function ProjectNavigation() {
  const pathname = usePathname()

  // Extract slug from pathname (e.g., "/projects/app-store-turnaround" -> "app-store-turnaround")
  const currentSlug = pathname.split('/').pop()

  // Find current project index
  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug)

  if (currentIndex === -1) {
    return null // Not on a project page
  }

  // Calculate next and previous with wrapping
  const previousIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
  const nextIndex = (currentIndex + 1) % PROJECTS.length

  const previousProject = PROJECTS[previousIndex]
  const nextProject = PROJECTS[nextIndex]

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-24 border-t border-gray-200 pt-12 dark:border-zinc-800 sepia:border-amber-200 blue:border-blue-900">
      {/* Return Home and Top Navigation */}
      <div className="mb-12 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sepia:text-amber-700 sepia:hover:text-amber-900 blue:text-blue-300 blue:hover:text-blue-100"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>

        <button
          onClick={handleScrollToTop}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sepia:text-amber-700 sepia:hover:text-amber-900 blue:text-blue-300 blue:hover:text-blue-100"
        >
          Return to Top
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      {/* Next/Previous Projects */}
      <div className="flex gap-4 md:gap-12">
        {/* Previous Project */}
        <Link
          href={`/projects/${previousProject.slug}`}
          className="flex-1 group no-underline"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 sepia:text-amber-600 blue:text-blue-400">
              Previous Project
            </span>
            <h3 className="mt-0 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400 sepia:text-amber-900 sepia:group-hover:text-amber-700 blue:text-blue-100 blue:group-hover:text-blue-300">
              {previousProject.name}
            </h3>
          </div>
        </Link>

        {/* Next Project */}
        <Link
          href={`/projects/${nextProject.slug}`}
          className="flex-1 group flex justify-end no-underline"
        >
          <div className="flex flex-col gap-1 text-right">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 sepia:text-amber-600 blue:text-blue-400">
              Next Project
            </span>
            <h3 className="mt-0 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400 sepia:text-amber-900 sepia:group-hover:text-amber-700 blue:text-blue-100 blue:group-hover:text-blue-300">
              {nextProject.name}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
