import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cinematic Visions',
  description: 'Experience cinematic storytelling through vivid prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
