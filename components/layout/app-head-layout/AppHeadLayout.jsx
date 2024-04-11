import React from 'react'
import Head from 'next/head'
import { i18n } from '../../../services/i18n'


export const AppHeadLayout = ({ title = '', tabTitle = '', tabDescription = '', tabUrl = '', tabImageUrl = '', tabIcon = '' }) => {
  const pageTitle = tabTitle !== '' ? tabTitle : `Taskility ${title ? ` - ${title}` : ''}`
  const pageDescription = tabDescription !== '' ? tabDescription : `${i18n('page.description')}`
  const pageUrl = tabUrl !== '' ? tabUrl : `https://www.taskility.com`
  const pageImageUrl = tabImageUrl !== '' ? tabImageUrl : 'https://storage.cloud.google.com/taskility-bucket-gcp/Taskility-Media/Taskility%20-%20Mejores%20embarques%201200X1200Taskility%20-%20Mejores%20Embarques%201200x1200.png'
  const pageIcon = tabIcon !== '' ? tabIcon : "/taskility-icon.png"

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="shortcut icon" type="image/png" href={pageIcon} />
      <link rel="manifest" href="/static/manifest.json" />

      {/* Page title and icon data 
      <title>{`${companyData.name || i18n('customers.title')}`}</title>
      <link rel="icon" type="image/x-icon" href="/taskility-icon.png" /> */}
      <meta property={`${pageTitle}`} content={`${pageTitle}`} key={`${pageTitle}`} />

      {/* Metadata for Open Graph (whatsapp, facebook, twitter, linkedIn) */}
      <meta property="og:site_name" content="Taskility" />
      <meta property='og:url' content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta
        property="og:image"
        itemProp="image"
        content={pageImageUrl}
      />
      <meta property="og:type" content="website" />
      {/* <meta property="og:updated_time" content="1440432930" /> */}
    </Head>
  )
}
