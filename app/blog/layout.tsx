'use client'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600 sepia:bg-amber-400 blue:bg-blue-400"
        springOptions={{
          bounce: 0,
        }}
      />

      <main className="prose prose-gray mt-24 max-w-none pb-20 prose-h4:prose-base dark:prose-invert sepia:prose-amber blue:prose-blue prose-h1:text-xl prose-h1:font-medium md:prose-h1:text-2xl prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium md:prose-h2:text-xl prose-h3:text-base prose-h3:font-medium md:prose-h3:text-lg prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium md:prose-lg">
        {children}
      </main>
    </>
  )
}
