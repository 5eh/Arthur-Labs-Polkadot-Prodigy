import { Metadata, Viewport } from 'next'
import { PropsWithChildren } from 'react'

import { COMPANY } from '@/marketplaceVariables'
import { Analytics } from '@vercel/analytics/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { ToastConfig } from '@/app/toast-config'
import Footer from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/config/environment'
import { cn } from '@/utils/cn'

import './globals.css'
import ClientProviders from './providers'

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'Arthur Labs',
  description: 'Open sourced boilerplate for this ink! athon',
  metadataBase: new URL(env.url),
  robots: env.isProduction ? 'all' : 'noindex,nofollow',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: env.url,
    siteName: 'Arthur Labs',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cn('dark', GeistSans.variable, GeistMono.variable)}>
      <body>
        <header className="z-1 absolute inset-x-0 top-0 mb-2 mt-10">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{COMPANY}</span>
              </a>
            </div>

            <Navbar />
            <div className="hidden pt-24 lg:flex lg:flex-1 lg:justify-end"></div>
          </nav>
        </header>
        <ClientProviders>
          <TooltipProvider>
            <Header />
            <div className="pl-8 pr-8 pt-8">{children}</div>
          </TooltipProvider>
          <ToastConfig />
        </ClientProviders>
        {!!env.isProduction && <Analytics />}
        <div>
          <Footer />
        </div>{' '}
      </body>
    </html>
  )
}
