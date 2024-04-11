import { Layout } from 'antd'
import { BillOfLadingPage } from '../components/pages/billOfLading'
// import { ShipmentsList } from '../components/pages/shipments/shipments-list'
import { redirectIfNotLogged } from '../services/auth/checkAuth'
import { AppHeadLayout } from '../components/layout/app-head-layout'
import { AppHeader } from '../components/layout/AppHeader'
import TaskilityPageHeader from '../components/layout/taskility-page-header/taskilityPageHeader'
import { ShipmentList } from '../components/pages/shipments/shipments-list'
import { SideMenu } from '../components/layout/SideMenu'
import { useContext, useState, useEffect } from 'react'
import { CurrentUserContext } from '../components/contexts/currentUser'
import dayjs from 'dayjs'
import { i18n } from '../services/i18n'
import { ShipmentDashboard } from '../components/pages/shipments/dashboards/shipmentDashboard'
import { Mapbox, MapboxMultiple } from '../components/pages/maps/Mapbox'

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
}

// export default ShipmentsList

export const ShipmentsListPage = () => {
  const currentUser = useContext(CurrentUserContext)
  const defaultDateRange = [dayjs().subtract(30, 'days'), dayjs()] // Before: [moment().startOf('month'), moment().endOf('month')]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [cfdiType, setCfdiType] = useState('')
  const [cfdiStatus, setCfdiStatus] = useState('')

  const [shipmentNumber, setShipmentNumber] = useState('')
  const [shipmentName, setShipmentName] = useState('')
  const [shipmentLocation, setShipmentLocation] = useState('')
  const [shipmentCurrency, setShipmentCurrency] = useState('')
  const [shipmentTags, setShipmentTagss] = useState('')

  const [shipmentCompanies, setShipmentCompanies] = useState('')
  const [shipmentTeams, setShipmentTeams] = useState('')
  const [shipmentUsers, setShipmentUsers] = useState('')
  const [shipmentProjects, setShipmentProjects] = useState('')
  const [shipmentClients, setShipmentClients] = useState('')
  const [shipmentProviders, setShipmentProviders] = useState('')

  const [shipmentOperationStatus, setShipmentOperationStatus] = useState('')
  const [shipmentCollectStatus, setShipmentCollectStatus] = useState('')
  const [shipmentSupplierStatus, setshipmentSupplierStatus] = useState('')
  const [shipmentPendingTasks, setShipmentPendingTasks] = useState('')
  const [shipmentAlarms, setShipmentAlarms] = useState('')
  const [shipmentOnWatch, setShipmentOnWatch] = useState('')

  const [shipmentLoad, setShipmentLoad] = useState('')
  const [shipmentTrip, setShipmentTrip] = useState('')
  const [shipmentMode, setShipmentMode] = useState('')
  const [shipmentService, setShipmentService] = useState('')
  const [shipmentRecurrence, setShipmentRecurrence] = useState('')
  const [shipmentUrgency, setShipmentUrgency] = useState('')

  const [collapsedMenu, setCollapsedMenu] = useState(true)

  const [isShipmentAuthorized, setIsShipmentAuthorized] = useState(false)
  const [loggedEmail, setLoggedEmail] = useState()
  const [companyProfile, setCompanyProfile] = useState()
  const [loggedUserProfile, setLoggedUserProfile] = useState()
  const [loggedUserIdData, setLoggedUserIdData] = useState()
  const [selectedView, setSelectedView] = useState('table')

  useEffect(() => {
    setIsShipmentAuthorized(currentUser.isHubAuthorized || false)
    setLoggedEmail(currentUser.loggedUserIdData?.email || '')
    setCompanyProfile(currentUser.companyProfile || {})
    setLoggedUserProfile(currentUser.loggedUserProfile || {})
    setLoggedUserIdData(currentUser.loggedUserIdData || {})
  }, [currentUser])
  // useEffect(() => {
  //   post('/api/logged-user/get-authorizations')
  //     .then(({ ok, loggedUserLicenses, loggedUserEmail, loggedUserProfile, companyProfile, error, loggedUserIdData }) => {
  //       if (loggedUserLicenses) {
  //         // console.log('loggedUserLicences', loggedUserLicenses)
  //         loggedUserLicenses.map(license => {
  //           if (license.licenseName === 'shipmentub') {
  //             // console.log('licenseName', license.licenseName, 'license.active', license.active)
  //             setIsShipmentAuthorized(license.active)
  //             // console.log('isShipmentAuthorized', isShipmentAuthorized)
  //           }
  //           return null
  //         })
  //       }
  //       if (loggedUserEmail) setLoggedEmail(loggedUserEmail)
  //       // console.log('loggedUserEmail', loggedUserEmail)
  //       // if (!error) setFinished('signed')
  //       // setApiError(error, details?.message || '')
  //       if (companyProfile) setCompanyProfile(companyProfile)
  //       if (loggedUserProfile) setLoggedUserProfile(loggedUserProfile)
  //       if (loggedUserIdData) setLoggedUserIdData(loggedUserIdData)
  //       console.log({ loggedUserProfile })
  //     })
  //     // eslint-disable-next-line no-console
  //     .catch(error => console.log(error))
  // }, [])

  const onDateRangeChange = dates => {
    setDateRange(dates ? [dates[0].startOf('day'), dates[1].endOf('day')] : defaultDateRange)
    console.log({ dateRange })
  }

  const toggleMenu = () => {
    setCollapsedMenu(!collapsedMenu)
  }

  const [page, setPage] = useState('bill-of-lading')
  // console.log({currentUser})

  useEffect(() => {
    console.log({ shipmentName })
  }, [shipmentName])

  console.log('BillOfLadingPage', { loggedUserIdData })
  return (
    <Layout className="min-h-screen" hasSider>
      <AppHeadLayout tabTitle={i18n('shipment.title')} />
      <Layout>
        <AppHeader toggleMenu={toggleMenu} collapsed={collapsedMenu} />
        <Layout.Content className="p-4">
          <TaskilityPageHeader
            dateRange={dateRange}
            cfdiType={cfdiType}
            onShipmentNumberChange={setShipmentNumber}
            onShipmentNameChange={setShipmentName}
            onShipmentLocationChange={setShipmentLocation}
            onShipmentCurrencyChange={setShipmentCurrency}
            onShipmentTagsChange={setShipmentTagss}
            onShipmentCompaniesChange={setShipmentCompanies}
            onShipmentTeamsChange={setShipmentTeams}
            onShipmentUsersChange={setShipmentUsers}
            onShipmentProjectsChange={setShipmentProjects}
            onShipmentClientsChange={setShipmentClients}
            onShipmentProvidersChange={setShipmentProviders}
            onShipmentOperationStatusChange={setShipmentOperationStatus}
            onShipmentCollectStatusChange={setShipmentCollectStatus}
            onShipmentSupplierStatusChange={setshipmentSupplierStatus}
            onShipmentAlarmsChange={setShipmentAlarms}
            onShipmentPendingTasksChange={setShipmentPendingTasks}
            onShipmentOnWatchChange={setShipmentOnWatch}
            onShipmentLoadChange={setShipmentLoad}
            onShipmentTripChange={setShipmentTrip}
            onShipmentModeChange={setShipmentMode}
            onShipmentServiceChange={setShipmentService}
            onShipmentRecurrenceChange={setShipmentRecurrence}
            onShipmentUrgencyChange={setShipmentUrgency}
            // onCfdiStatusChange={setCfdiStatus}
            // onCfdiTypeChange={setCfdiType}
            onDateRangeChange={onDateRangeChange}
            // cfdiStatus={cfdiStatus}
            shipmentNumber={shipmentNumber}
            shipmentName={shipmentName}
            shipmentLocation={shipmentLocation}
            shipmentCurrency={shipmentCurrency}
            shipmentTags={shipmentTags}
            shipmentCompanies={shipmentCompanies}
            shipmentTeams={shipmentTeams}
            shipmentUsers={shipmentUsers}
            shipmentProjects={shipmentProjects}
            shipmentClients={shipmentClients}
            shipmentProviders={shipmentProviders}
            shipmentOperationStatus={shipmentOperationStatus}
            shipmentCollectStatus={shipmentCollectStatus}
            shipmentSupplierStatus={shipmentSupplierStatus}
            shipmentPendingTasks={shipmentPendingTasks}
            shipmentAlarms={shipmentAlarms}
            shipmentOnWatch={shipmentOnWatch}
            shipmentLoad={shipmentLoad}
            shipmentTrip={shipmentTrip}
            shipmentMode={shipmentMode}
            shipmentService={shipmentService}
            shipmentRecurrence={shipmentRecurrence}
            shipmentUrgency={shipmentUrgency}
            isShipmentAuthorized={isShipmentAuthorized}
            loggedUserProfile={loggedUserProfile}
            companyProfile={companyProfile}
            setSelectedView={setSelectedView}
            selectedView={selectedView}
          />
          {selectedView === 'table' ? (
            <ShipmentList
              dateRange={dateRange}
              shipmentNumber={shipmentNumber}
              shipmentName={shipmentName}
              shipmentLocation={shipmentLocation}
              shipmentCurrency={shipmentCurrency}
              shipmentTags={shipmentTags}
              shipmentCompanies={shipmentCompanies}
              shipmentTeams={shipmentTeams}
              shipmentUsers={shipmentUsers}
              shipmentProjects={shipmentProjects}
              shipmentClients={shipmentClients}
              shipmentProviders={shipmentProviders}
              shipmentOperationStatus={shipmentOperationStatus}
              shipmentCollectStatus={shipmentCollectStatus}
              shipmentSupplierStatus={shipmentSupplierStatus}
              shipmentPendingTasks={shipmentPendingTasks}
              shipmentAlarms={shipmentAlarms}
              shipmentOnWatch={shipmentOnWatch}
              shipmentLoad={shipmentLoad}
              shipmentTrip={shipmentTrip}
              shipmentMode={shipmentMode}
              shipmentService={shipmentService}
              shipmentRecurrence={shipmentRecurrence}
              shipmentUrgency={shipmentUrgency}
              loggedUserProfile={loggedUserProfile}
              isShipmentAuthorized={isShipmentAuthorized}
              loggedUserIdData={loggedUserIdData}
            />
          ) : null}
          {selectedView === 'dashboard' ? <ShipmentDashboard /> : null}
          {selectedView === 'map' ? (
            <div className="mt-2">
              <MapboxMultiple
                initialZoom={10}
                height={1000}
                width="100%"
                originLatitude={20.5888}
                originLongitude={-100.3899}
                centerMarker
                navigation
                styleCtrl
              />
            </div>
          ) : null}
        </Layout.Content>
      </Layout>
      <SideMenu collapsed={collapsedMenu} page={page} />
    </Layout>
  )
}

export default ShipmentsListPage

export async function getServerSideProps(context) {
  redirectIfNotLogged(context)
  // TODO: Fetch with redux action and build redux initial state.
  //  How to load to redux Provider???
  // TODO: redirect to login on expired token.
  return { props: { redirected: false, hello: 'Hello' } }
}
