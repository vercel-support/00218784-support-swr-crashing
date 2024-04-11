import React, { useState, useEffect } from 'react'
import App from 'next/app'
import { ConfigProvider } from 'antd'
import { useFormContext } from 'react-hook-form'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { useAuthSync } from '../components/hooks/useAuthSync'
import { defaultTheme } from '../components/ui-elements/themes'
import { i18nInit } from '../services/i18n'
import configureStore from '../state/configureStore'
import '../components/ui-elements/styles/main.css'
import { CurrentUserContext } from '../components/contexts/currentUser'
import { post } from '../services/fetch'
import appTheme from '../theme/themeConfig'
import { Open_Sans } from 'next/font/google'
 
const openSans = Open_Sans({
  weight: ['300','400', '500','600','700' , '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
}

// import * as serviceWorker from '../services/serviceWorker.ts' // TODO: Add service worker

// eslint-disable-next-line react/prop-types
const TaskilityApp = ({ Component, pageProps, requestedLanguage }) => {
  const [isHubAuthorized, setIsHubAuthorized] = useState()
  const [isBillingAuthorized, setIsBillingAuthorized] = useState()
  const [isBetaAuthorized, setIsBetaAuthorized] = useState()
  const [loggedUserProfile, setLoggedUserProfile] = useState()
  const [loggedEmail, setLoggedEmail] = useState()
  const [loggedUserIdData, setLoggedUserIdData] = useState()
  const [companyProfile, setCompanyProfile] = useState()
  const [loggedUserLicences, setLoggedUserLicences] = useState()
  const [companyLogo, setCompanyLogo] = useState()
  useAuthSync()
  // TODO: Load and pass the real user
  i18nInit({ user: {}, requestedLanguage })
  const store = configureStore({})

  useEffect(() => {
    post('/api/logged-user/get-authorizations')
      .then(({ ok, loggedUserLicenses, loggedUserEmail, error, companyProfile, loggedUserProfile, loggedUserIdData, companyLogo }) => {
        if (loggedUserLicenses) {
          setLoggedUserLicences(loggedUserLicences)
          // console.log('loggedUserLicences', loggedUserLicenses)
          loggedUserLicenses.map(license => {
            if (license.licenseName === 'BoLHub') {
              // console.log('licenseName', license.licenseName, 'license.active', license.active)
              setIsHubAuthorized(license.active)
              // console.log('isBoLHAuthorized', isBoLHAuthorized)
            }
            if (license.licenseName === 'Billing') {
              setIsBillingAuthorized(license.active)
            }
            if (license.licenseName === 'BetaTester') {
              setIsBetaAuthorized(license.active)
            }
            if (companyProfile) setCompanyProfile(companyProfile)
            if (companyLogo) setCompanyLogo(companyLogo)
            if (loggedUserProfile) setLoggedUserProfile(loggedUserProfile)
            return null
          })
        }
        if (loggedUserEmail) setLoggedEmail(loggedUserEmail)
        if (loggedUserIdData) setLoggedUserIdData(loggedUserIdData)
        // if (!error) setFinished('signed')
        // setApiError(error, details?.message || '')
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))
  }, [loggedUserLicences, pageProps])

  const currentUser = {
    loggedUserIdData,
    loggedEmail,
    loggedUserLicences,
    loggedUserProfile,
    companyProfile,
    isHubAuthorized,
    isBillingAuthorized,
    isBetaAuthorized,
    companyLogo,
  }
  return (
    // eslint-disable-next-line
    <main className={openSans}>
    <ConfigProvider theme={appTheme}>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          {/* eslint-disable-next-line */}
          <CurrentUserContext.Provider value={currentUser}>
            <Component {...pageProps} />
          </CurrentUserContext.Provider>
        </ThemeProvider>
      </Provider>
    </ConfigProvider>
    </main>
  )
}

TaskilityApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const requestedLanguage = appContext.ctx.req?.headers['accept-language']
  return { ...appProps, requestedLanguage }
}

export default TaskilityApp
