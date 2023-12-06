import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenAI interface',
  description: 'Interface to use openAI API (GPT4, Dall-e 3, ...)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className={inter.className}>{children}</body>
      </CookiesProvider>
    </html>
  )
}
