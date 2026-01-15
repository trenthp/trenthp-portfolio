'use client'

export default function PresentationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {children}
    </div>
  )
}
