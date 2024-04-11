import React from 'react'
import { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import Polyglot from 'node-polyglot'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import '../components/ui-elements/styles/main.css'
import { i18nInit } from '../services/i18n'
import { log, logEvents } from '../services/logs'

// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

const onMissingKey = (key: any, options: any, locale: any) => {
  log('warn', logEvents.missingI18nKey({ key, locale }))
  return ''
}

const polyglot = new Polyglot({ onMissingKey })

export const metadata: Metadata = {
  title: {
    template: '%s | Taskility',
    default: 'Taskility',
  },
  description:
    "Taskility is the easiest way to get all your shipment's infromation in one place and coordinate everyone inside and outside your organization.",
  generator: 'Leanflow AI',
  applicationName: 'Taskility',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Shipment Management Software',
    'TMS',
    'Transportation Management System',
    'Logistics Software',
    'Logistics application',
    'Shipment coordination',
    'Shipment management',
  ],
  authors: [{ name: 'Germán Castro Jurado' }],
  // colorScheme: 'light',
  creator: 'Germán Castro Jurado',
  publisher: 'Leanflow AI',
  openGraph: {
    title: 'Taskility',
    description:
      "Taskility is the easiest way to get all your shipment's infromation in one place and coordinate everyone inside and outside your organization.",
    url: 'https://app.taskility.com',
    siteName: 'Taskility',
    images: [
      {
        url: 'https://storage.cloud.google.com/taskility-bucket-gcp/Taskility-Media/Taskility%20-%20Mejores%20embarques%201200X1200Taskility%20-%20Mejores%20Embarques%201200x1200.png',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  requestedLanguage = 'en',
}: {
  children: React.ReactNode,
  requestedLanguage: string,
}) {
  i18nInit({ user: {}, requestedLanguage: 'en' })
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
