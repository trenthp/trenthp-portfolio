import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { BackgroundProvider } from '@/lib/background-context'
import { StarfieldBackground } from '@/components/starfield-background'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://trenthp.com/'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Trent Holms Petersen | Product Design Leader Who Codes',
    template: '%s | Trent Holms Petersen'
  },
  description: 'Product Design Leader who codes. 12+ years building B2C/B2B products with an AI-native approach to strategy, design, and development. View case studies on app turnarounds and AI-powered workflows.',
  icons: {
    icon: '/images/favicon.svg',
  }
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} tracking-tight antialiased`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
          themes={['light', 'dark', 'sepia', 'blue']}
        >
          <BackgroundProvider>
            <StarfieldBackground />
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
              <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </BackgroundProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
