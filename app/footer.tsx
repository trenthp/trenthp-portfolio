'use client'
import { TextLoop } from '@/components/ui/text-loop'

const QUOTES = [
  '"All generalizations are false, including this one." — Mark Twain',
  '"If I had four hours to chop down a tree I\'d spend three sharpening my axe." — attributed to Lincoln',
  '"Our life is what our thoughts make it." — Marcus Aurelius',
  '"Supposing is good, but finding out is better." — Mark Twain',
  '"Cogito, ergo sum" — René Descartes',
  '"A smooth sea never made a skilled sailor"',
  '"More is lost with indecision than wrong decisions"',
]

const COPYRIGHT = '© 2025 Trent Holms Petersen'

// Create alternating pattern: copyright, quote, copyright, quote, etc.
const FOOTER_ITEMS = QUOTES.flatMap((quote) => [COPYRIGHT, quote])

export function Footer() {
  return (
    <footer className="divider-border mt-24 border-t px-0 py-8">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-2xl px-4">
          <TextLoop
            className="text-xs text-center block whitespace-normal"
            interval={4}
          >
            {FOOTER_ITEMS.map((item, index) => (
              <span key={index} className="block">{item}</span>
            ))}
          </TextLoop>
        </div>
      </div>
    </footer>
  )
}
