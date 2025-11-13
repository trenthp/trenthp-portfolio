'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/app/data'
import { Home, ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react'

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
      <div className="nav-top-section mb-12 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="no-underline nav-link inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors duration-100 text-zinc-900 hover:bg-[#E8E7E0] hover:text-zinc-900 dark:text-zinc-100 dark:hover:bg-[#2A2A2A] dark:hover:text-zinc-100 sepia:text-amber-900 sepia:hover:bg-[#6B5344] sepia:hover:text-[#FBF0D9] blue:text-blue-100 blue:hover:bg-[#1A47E5] blue:hover:text-[#F7F6F4]"
        >
          <Home className="h-4 w-4 text-zinc-900 dark:text-zinc-100 sepia:text-amber-900 blue:text-blue-100" />
          Return Home
        </Link>

        <button
          onClick={handleScrollToTop}
          className="nav-link inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors duration-100 text-zinc-900 hover:bg-[#E8E7E0] hover:text-zinc-900 dark:text-zinc-100 dark:hover:bg-[#2A2A2A] dark:hover:text-zinc-100 sepia:text-amber-900 sepia:hover:bg-[#6B5344] sepia:hover:text-[#FBF0D9] blue:text-blue-100 blue:hover:bg-[#1A47E5] blue:hover:text-[#F7F6F4]"
        >
          Return to Top
          <ArrowUp className="h-4 w-4 text-zinc-900 dark:text-zinc-100 sepia:text-amber-900 blue:text-blue-100" />
        </button>
      </div>

      {/* Next/Previous Projects */}
      <div className="nav-projects-section flex gap-4 md:gap-12">
        {/* Previous Project */}
        <Link
          href={`/projects/${previousProject.slug}`}
          className="flex-1 group no-underline"
        >
          <div className="nav-project-card flex flex-col gap-1 rounded px-3 py-2 transition-colors duration-100 group-hover:bg-[#E8E7E0] dark:group-hover:bg-[#2A2A2A] sepia:group-hover:bg-[#6B5344] blue:group-hover:bg-[#1A47E5]">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-3 w-3 flex-shrink-0 text-zinc-900 dark:text-zinc-100 sepia:text-amber-900 blue:text-blue-100" />
              <span className="nav-label text-xs font-medium text-zinc-900 dark:text-zinc-100 sepia:text-amber-900 blue:text-blue-100">
                Previous Project
              </span>
            </div>
            <h3 className="nav-title mt-0 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-900 dark:text-zinc-100 dark:group-hover:text-zinc-100 sepia:text-amber-900 sepia:group-hover:text-[#FBF0D9] blue:text-blue-100 blue:group-hover:text-[#F7F6F4]">
              {previousProject.name}
            </h3>
          </div>
        </Link>

        {/* Next Project */}
        <Link
          href={`/projects/${nextProject.slug}`}
          className="flex-1 group flex justify-end no-underline"
        >
          <div className="nav-project-card flex flex-col gap-1 text-right rounded px-3 py-2 transition-colors duration-100 group-hover:bg-[#E8E7E0] dark:group-hover:bg-[#2A2A2A] sepia:group-hover:bg-[#6B5344] blue:group-hover:bg-[#1A47E5]">
            <div className="flex items-center justify-end gap-2">
              <span className="nav-label text-xs font-medium text-zinc-900 dark:text-zinc-100 sepia:text-amber-900 blue:text-blue-100">
                Next Project
              </span>
              <ArrowRight className="h-3 w-3 flex-shrink-0 text-zinc-900 dark:text-zinc-100 sepia:text-amber-900 blue:text-blue-100" />
            </div>
            <h3 className="nav-title mt-0 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-900 dark:text-zinc-100 dark:group-hover:text-zinc-100 sepia:text-amber-900 sepia:group-hover:text-[#FBF0D9] blue:text-blue-100 blue:group-hover:text-[#F7F6F4]">
              {nextProject.name}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
