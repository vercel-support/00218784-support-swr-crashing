import React, { useEffect, useReducer, useState, useRef, useContext } from 'react'
import useSWR from 'swr'
import { Typography, Button, Layout, Alert, Drawer, notification, message, Table, Collapse, Affix, Space } from 'antd'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import Router, { useRouter } from 'next/router'
// import { ObjectId } from 'mongodb'
// import { ObjectId } from 'bson'
import useEffectExceptOnMount from '../../hooks/useEffectExceptOnMount.ts'
import { i18n } from '../../../services/i18n/index.js'
import { post } from '../../../services/fetch/index.js'
import { ShareWithTeam } from './shareWithTeam.jsx'
// import { NewLocation } from './newLocation'//TODO:REVISAR
// import { RouteTimeline } from './routeTimeline'//TODO:REVISAR
// import { GeneralShipmentInfo } from './generalShipmentInfo'//TODO:REVISAR
import { numberFormat } from '../../../services/helpers/mathHelp.js'
import { validateBoLHub } from '../../../services/sat/validateBoLHub.js'
// import { GoodsList } from './goodsList'//TODO:REVISAR
import { LandTransport } from './landTransport.jsx'
// import { TransportDetail } from './transportDetail'//TODO:REVISAR
// import { NewTransport } from './newTransport'//TODO:REVISAR
// import { NewTag } from './newTag//TODO:REVISAR'
// import { NewItem } from '../products/newItem.jsx'//TODO:REVISAR
import { BoLHBenefits } from './marketingMessages.js'
import { generateCartaPorte2ToStamp } from '../../../services/sat/generateCartaPorte2JsonToStamp.js'
import { filterUsersByViewPermission, filterUsersByViewPermissionOnlyMail } from '../users/filterUsersByPermission.js'
import { extractGoodsFromXml } from './xmlParser.js'
import { AppHeadLayout } from '../../layout/app-head-layout/index.js'
// import { ShipmentActionsMenu } from './shipmentActionsMenu'//TODO: REVISAR
import { Mapbox } from '../maps/Mapbox.jsx'
import { IdentificationSectionOperator } from './sections/IdentificationSectionOperator.jsx'
import { whatsAppSender } from '../../../services/whatsApp/whatsAppSender.js'
import { ShipmentStatusOperator } from './sections/shipmentStatusOperator.jsx'
import { TabTitle } from './sections/tabTitle.jsx'
import { ShipmentPrices } from './sections/shipmentPrices.jsx'
import { ShipmentCosts } from './sections/shipmentCosts.jsx'
import { ShipmentGeneralInfo } from './sections/shipmentGeneralInfo.jsx'
import { ShipmentLocations } from './sections/shipmentLocations.jsx'
import { ShipmentLoad } from './sections/shipmentLoad.jsx'
import { ShipmentCarriers } from './sections/shipmentCarriers.jsx'
import { ShipmentSatisfactionSurvey } from './sections/shipmentSatisfactionSurvey.jsx'
import { ShipmentQuotes } from './sections/shipmentQuotes.jsx'
import { DetailTabAnchor } from './sections/detailSectionAnchor.jsx'
import { ShipmentApprovals } from './sections/shipmentApprovals.jsx'
import { ShipmentDocuments } from './sections/shipmentDocuments.jsx'
import { ShipmentSummary } from './sections/shipmentSummary.jsx'
import { EventsTab } from './sections/eventsTab.jsx'
import { TasksTab } from './sections/tasksTab.jsx'
import { CommentsTab } from './sections/commentsTabs.jsx'
import { TeamTab } from './sections/teamTab.jsx'
import { dateFormat } from '../../../services/helpers/dateFormat.js'
import { CurrentUserContext } from '../../contexts/currentUser.jsx'
import { HubDispatchContext, HubStateContext } from '../../contexts/shipmentHub.jsx'
import objectId from '../../../services/helpers/idGenerator.js'
import { saveChangeInDB, newComment, newLog, sendNotifications } from './actions/shipmentActions.jsx'
import { LoadInsuranceForm } from './loadInsuranceForm.jsx'
import { LoggedUserMenu } from '../../layout/AppHeader.jsx'

const { Title, Text, Paragraph } = Typography
const { Header, Content, Footer, Sider } = Layout
const { Panel } = Collapse

export const OperativeManagerView = () => {
  const router = useRouter()
  const currentUser = useContext(CurrentUserContext)
  const emailInputRef = useRef(null)
  const { id } = router.query
  // const { data, error } = useSWR(`/api/shipment/get-bill-of-lading-hub-data?id=${id}`, post, {
  const { data, error } = useSWR(`/api/shipment/get-shipment-data?id=${id}`, post, {
    dedupingInterval: 3000,
  }) //TODO:HACER UNA NUEVA RUTA api/shipment/shipment-data?id=${id}`, post, {dedupingInterval: 3000,}

  const [api, contextHolder] = notification.useNotification()
  const [BoLId, setBoLId] = useState(id)
  const { control, handleSubmit, errors, watch } = useForm()
  const [isShareVisible, setIsShareVisible] = useState(false)
  const [isTagVisible, setIsTagVisible] = useState(false)
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  const [isLocationVisible, setIsLocationVisible] = useState(false)
  const [isRouteComplete, setIsRouteComplete] = useState(false)
  const [isLoadComplete, setIsLoadComplete] = useState(false)
  const [isCustomsComplete, setIsCustomsComplete] = useState(false)
  const [isFreightPriceComplete, setIsFreightPriceComplete] = useState(false)
  const [isDocumentsComplete, setIsDocumentsComplete] = useState(false)
  const [isTransferBoL, setIsTransferBoL] = useState(false)
  const [isInternational, setIsInternational] = useState(false)
  const [locationIndex, setLocationIndex] = useState(undefined)
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [isDisabledSearchPlaces, setIsDisabledSearchPlaces] = useState(false)
  const [isTransportVisible, setIsTransportVisible] = useState(false)
  const [transportIndex, setTransportIndex] = useState(undefined)
  const [isEditingTransport, setIsEditingTransport] = useState(false)
  const [isItemVisible, setIsItemVisible] = useState(false)
  const [itemIndex, setItemIndex] = useState(undefined)
  const [isEditingItem, setIsEditingItem] = useState(false)
  const [tagIndex, setTagIndex] = useState(undefined)
  const [isEditingTag, setIsEditingTag] = useState(false)
  const [isDeletingTag, setIsDeletingTag] = useState(false)
  const [isDisabledSearchItems, setIsDisabledSearchItems] = useState(false)
  const [isBoLHAuthorized, setIsBoLHAuthorized] = useState(false)
  const [loggedEmail, setLoggedEmail] = useState()
  const [companyProfile, setCompanyProfile] = useState()
  const [loggedUserProfile, setLoggedUserProfile] = useState()
  const [loggedUserIdData, setLoggedUserIdData] = useState()
  const [companyLogo, setCompanyLogo] = useState()
  const [hubErrors, setHubErrors] = useState([])
  const [isReadyToAction, setIsReadyToAction] = useState(data?.status?.isReadyToAction)
  const [creatingCfdi, setCreatingCfdi] = useState(false)
  const [finishedCfdi, setFinishedCfdi] = useState(false)
  const [apiError, setApiError] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [totalMargin, setTotalMargin] = useState(0)
  const [top, setTop] = useState(0)
  const [currentTab, setCurrentTab] = useState('details')
  const [isBuyInsuranceVisible, setIsBuyInsuranceVisible] = useState(false)
  const [isPart, setIsPart] = useState('')

  useEffect(() => {
    setIsReadyToAction(data?.status?.isReadyToAction)
  }, [data])

  useEffect(() => {
    setLoggedEmail(currentUser.loggedUserIdData?.email || '')
    setLoggedUserProfile(currentUser.loggedUserProfile || {})
    setLoggedUserIdData(currentUser.loggedUserIdData || {})
    setCompanyProfile(currentUser.companyProfile)
    setCompanyLogo(currentUser?.companyLogo || '/taskility-logo.svg')
    console.log({ currentUser })
  }, [currentUser])

  //TODO: REVISAR
  // console.log('BillOfLadingHub', { loggedUserIdData })

  // useEffect(() => {}, [isBoLHAuthorized, loggedEmail])

  //   useEffect(() => {
  //     window.onbeforeunload = function() {
  //         return true;
  //     };

  //     return () => {
  //         window.onbeforeunload = null;
  //     };
  // }, []);

  // useEffect(() => {
  //   post('/api/logged-user/get-authorizations')
  //     .then(({ ok, loggedUserLicenses, loggedUserEmail, error, companyProfile, loggedUserProfile, loggedUserIdData }) => {
  //       if (loggedUserLicenses) {
  //         // console.log('loggedUserLicences', loggedUserLicenses)
  //         loggedUserLicenses.map(license => {
  //           if (license.licenseName === 'BoLHub') {
  //             // console.log('licenseName', license.licenseName, 'license.active', license.active)
  //             setIsBoLHAuthorized(license.active)
  //             // console.log('isBoLHAuthorized', isBoLHAuthorized)
  //           }
  //           if (companyProfile) setCompanyProfile(companyProfile)
  //           if (loggedUserProfile) setLoggedUserProfile(loggedUserProfile)
  //           return null
  //         })
  //       }
  //       if (loggedUserEmail) setLoggedEmail(loggedUserEmail)
  //       if (loggedUserIdData) setLoggedUserIdData(loggedUserIdData)
  //       // if (!error) setFinished('signed')
  //       // setApiError(error, details?.message || '')
  //     })
  //     // eslint-disable-next-line no-console
  //     .catch(error => console.log(error))
  // }, [])
  const BoLHInitialState = {
    status: {
      generalInfoComplete: false,
      loadComplete: false,
      goodsComplete: false,
      customsComplete: false,
      transportsComplete: false,
      pricesComplete: false,
      documentsComplete: false,
    },

    internationalTransport: 'No',
    locations: {
      locations: [],
    },
    goods: {
      totalWeight: 0, // Peso Bruto total en KG del total de itemancías
      weightUnit: 'KGM',
      totalGoods: 0, // El valor de este campo debe ser igual al número de secciones good que se registren en el complemento.
      good: [],
    },
    transports: {
      transports: [],
    },

    share: {
      userToSendInvitation: {
        preferedLanguage: 'es',
      },
    },
  }

  const isCurrentUserAdmin = (users, loggedEmail) => {
    // console.log('isCurrentUserAdmin', { users, loggedEmail })
    const adminUser = users?.find(user => user.hubManager === true)
    // console.log('isCurrentUserAdmin result:', adminUser?.email === loggedEmail)
    if (adminUser) return adminUser.email === loggedEmail
    return false
  }

  const isBoLComplete = () => {
    if (isRouteComplete && isLoadComplete && isCustomsComplete && isFreightPriceComplete && isDocumentsComplete) {
      return true
    }
    return false
  }

  const selectARandomBenefit = () => {
    const randomBenefit = BoLHBenefits[Math.floor(Math.random() * BoLHBenefits.length)]
    return randomBenefit
  }

  const sendEmailInvitation = (userToInvite, initialState) => {
    const adminUser = initialState.share.users.find(user => user.hubManager === true)
    const benefit = selectARandomBenefit()
    const currentTime = new Date()
    const templateModel = {
      emailSubject: `${initialState.folio} | ${initialState.name}`,
      receiverName: userToInvite?.name ? userToInvite.name : '',
      BoLHName: initialState.name,
      BoLHLink: `https://app.taskility.com/shipment-hub/${initialState._id}`,
      BoLHFolio: initialState.folio,
      benefitTitle: benefit?.title,
      benefitDescription: benefit?.description,
      benefitLinkUrl: benefit?.linkUrl,
      benefitLinkText: benefit?.linkText,
      createUserLink: 'https://app.taskility.com/signup',
      adminUserEmail: adminUser?.email,
      adminUserName: `${adminUser?.name} ${adminUser?.lastName}`,
      year: currentTime.getFullYear(),
      headText: 'headText_Value',
      linkText: 'linkText_Value',
    }
    post('/api/shipment-hub/send-invitation', {
      body: { templateModel: templateModel, preferedLanguage: userToInvite.preferedLanguage, emailToSend: userToInvite.email },
    })
      .then(({ error }) => {
        if (error) {
          // dispatch(userLoginError(error))
        } else {
          // dispatch(userLoginSuccess(userDetails))
          // Cookie expiration must match the token expiration.
          // Router.push('/billing') // TODO: Redirect to a user selected initial page.
        }
      })
      .catch(error => {
        // log('error', error.message)
        // dispatch(userLoginError('login.errors.unexpected'))
      })
  }
  const calculateHubsCompletitionPercentage = (action, initialState) => {
    // Caluclate Hub's current % of completition
    const generalInfoValue = initialState?.status?.generalInfoComplete ? 1 : 0
    const locationsValue = initialState?.status?.locationsComplete ? 1 : 0
    const goodsValue = initialState?.status?.goodsComplete ? 1 : 0
    const transportsValue = initialState?.status?.transportsComplete ? 1 : 0
    const pricesValue = initialState?.status?.pricesComplete ? 1 : 0
    let BoLHStatus = (100 * (generalInfoValue + locationsValue + goodsValue + transportsValue + pricesValue)) / 5
    if (action === 'completed') BoLHStatus += 20
    if (action === 'opened to edit') BoLHStatus -= 20
    return BoLHStatus
  }

  const sendEmailUpdate = (action, section, initialState) => {
    const adminUser = initialState.share.users.find(user => user.hubManager === true)
    const benefit = selectARandomBenefit()
    const currentTime = new Date()

    const BoLHStatus = calculateHubsCompletitionPercentage(action, initialState)

    const templateModel = {
      emailSubject: `${initialState.folio} | ${initialState.name}`,
      action: action,
      section: section,
      BoLHName: initialState.name,
      BoLHLink: `https://app.taskility.com/shipment-hub/${initialState._id}`,
      BoLHFolio: initialState.folio,
      status: BoLHStatus,
      benefitTitle: benefit?.title,
      benefitDescription: benefit?.description,
      benefitLinkUrl: benefit?.linkUrl,
      benefitLinkText: benefit?.linkText,
      createUserLink: 'https://app.taskility.com/signup',
      adminUserEmail: adminUser?.email,
      adminUserName: `${adminUser?.name} ${adminUser?.lastName}`,
      year: currentTime.getFullYear(),
      headText: 'headText_Value',
      linkText: 'linkText_Value',
    }
    post('/api/shipment-hub/send-update-notification', { body: { templateModel: templateModel, initialState: initialState } })
      .then(({ error }) => {
        if (error) {
          // dispatch(userLoginError(error))
        } else {
          // dispatch(userLoginSuccess(userDetails))
          // Cookie expiration must match the token expiration.
          // Router.push('/billing') // TODO: Redirect to a user selected initial page.
        }
      })
      .catch(error => {
        // log('error', error.message)
        // dispatch(userLoginError('login.errors.unexpected'))
      })
  }

  const sendHubDataByEmail = hubState => {
    const adminUser = hubState.share.users.find(user => user.hubManager === true)
    const benefit = selectARandomBenefit()
    const currentTime = new Date()

    const templateModel = {
      emailSubject: `${hubState.folio} | ${hubState.name}`,
      BoLHName: hubState.name,
      BoLHLink: `https://app.taskility.com/shipment-hub/${hubState._id}`,
      BoLHFolio: hubState.folio,
      benefitTitle: benefit?.title,
      benefitDescription: benefit?.description,
      benefitLinkUrl: benefit?.linkUrl,
      benefitLinkText: benefit?.linkText,
      createUserLink: 'https://app.taskility.com/signup',
      adminUserEmail: adminUser?.email,
      adminUserName: `${adminUser?.name} ${adminUser?.lastName}`,
      year: currentTime.getFullYear(),
      headText: 'headText_Value',
      linkText: 'linkText_Value',
      hubData: hubState,
    }
    console.log('templateModel.hubData', templateModel.hubData)
    post('/api/shipment-hub/send-hub-data', { body: { templateModel: templateModel, hubState: hubState } })
      .then(({ error }) => {
        if (error) {
          // dispatch(userLoginError(error))
        } else {
          // dispatch(userLoginSuccess(userDetails))
          // Cookie expiration must match the token expiration.
          // Router.push('/billing') // TODO: Redirect to a user selected initial page.
        }
      })
      .catch(error => {
        // log('error', error.message)
        // dispatch(userLoginError('login.errors.unexpected'))
      })
  }

  // const getCfdiFields = (BoLHState, BoLHSection = 'Main') => {
  //   Router.push({
  //     pathname: '/new-cfdi',
  //     query: {
  //       issuerId: BoLHState.companyId,
  //       receiverId: BoLHState.clientId,
  //       BoLHId: BoLHState._id,
  //       requestedFrom: 'BillOfLadingHub', //TODO: REVISAR
  //       BoLHSection: BoLHSection,
  //     },
  //   })
  // }

  const createCfdiWithComplementBoLH2 = state => {
    let cfdi = {}
    if (state?.cfdiDrafts[0] && state) {
      cfdi = { ...state.cfdiDrafts[0], BoLHState: state }
      // eslint-disable-next-line no-console
      console.log('cfdi to send to API: ', cfdi)
    }
    setCreatingCfdi('signed')
    post('/api/billing/create-cfdi', { body: cfdi })
      .then(({ error, details }) => {
        if (!error) setFinishedCfdi('signed')
        // eslint-disable-next-line no-console
        console.log({ error, details: details?.message || 'unknown error in /api/billing/create-cfdi' })
        setApiError({ error, details: details?.message || 'unknown error in /api/billing/create-cfdi' })
      })
      .catch(setApiError)
      .finally(() => setCreatingCfdi(false))
  }
  // console.log(cfdi)
  const finishMessages = { draft: 'newCfdi.messages.cfdiDraftCreated', signed: 'newCfdi.messages.cfdiCreated' }

  const shouldTaskilityTakeAnAction = (section, hubCompletitionPercentage, taskilityBoLHObjective, status) => {
    switch (taskilityBoLHObjective) {
      case 'Stamp BoL': {
        if (hubCompletitionPercentage === 100) return true
        return false
      }
      case 'Send BoL Data': {
        if (section === 'prices') return false
        if (section === 'transports') return false
        if (section === 'customs') return false
        const sectionGeneralInfo = section === 'generalInfo'
        const sectionLocations = section === 'locations'
        const sectionGoods = section === 'goods'
        const isReady =
          (status?.generalInfoComplete || sectionGeneralInfo) &&
          (status?.locationsComplete || sectionLocations) &&
          (status?.goodsComplete || sectionGoods)
        console.log('shouldTaskilityTakeAnAction.SendHubData', isReady)
        return isReady
      }
      default:
        return false
    }
  }

  const taskilityHubAction = state => {
    const objective = state?.taskilityBoLHObjective
    if (objective === 'Stamp BoL') {
      // eslint-disable-next-line no-console
      console.log('taskility Hub Action Stamp BoL')
      createCfdiWithComplementBoLH2(state)
    }
    if (objective === 'Send BoL Data') {
      // eslint-disable-next-line no-console
      console.log('taskility Hub Action Send BoL Data')
      sendHubDataByEmail(state)
    }
  }

  // eslint-disable-next-line consistent-return
  const BoLHReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'Initialize State':
        return { ...data }
      case 'Update Hub Name':
        saveChangeInDB(state._id, 'Update', { name: action.payload })
        return { ...state, name: action.payload }
      case 'General Info Complete': {
        saveChangeInDB(state._id, 'Update', { 'status.generalInfoComplete': true })
        // sendEmailUpdate('completed', i18n('newBillOfLadingHub.generalInfo.title'), state)
        // Validate the Hub information
        const { isValid, BoLHErrors } = validateBoLHub(state)
        setHubErrors(BoLHErrors)
        // Check State Status and Validation to proceed to Taskility's Hub Action
        const BoLHStatusPercentage = calculateHubsCompletitionPercentage('completed', state)
        if (
          shouldTaskilityTakeAnAction('generalInfo', BoLHStatusPercentage, state.taskilityBoLHObjective, state.status) &&
          isValid &&
          isReadyToAction
        ) {
          taskilityHubAction(state)
        }
        setIsReadyToAction(false)
        return { ...state, status: { ...state.status, generalInfoComplete: true } }
      }
      case 'General Info Edit': {
        saveChangeInDB(state._id, 'Update', { 'status.generalInfoComplete': false })
        // sendEmailUpdate('opened to edit', i18n('newBillOfLadingHub.generalInfo.title'), state)
        setIsReadyToAction(true)
        return { ...state, status: { ...state.status, generalInfoComplete: false } }
      }
      case 'Locations Complete': {
        saveChangeInDB(state._id, 'Update', { 'status.locationsComplete': true })
        // sendEmailUpdate(''completed, i18n('newBillOfLadingHub.locations.title'), state)
        // Validate the Hub information
        const { isValid, BoLHErrors } = validateBoLHub(state)
        setHubErrors(BoLHErrors)
        // Check State Status and Validation to proceed to Taskility's Hub Action
        const BoLHStatusPercentage = calculateHubsCompletitionPercentage('completed', state)
        if (
          shouldTaskilityTakeAnAction('locations', BoLHStatusPercentage, state.taskilityBoLHObjective, state.status) &&
          isValid &&
          isReadyToAction
        ) {
          taskilityHubAction(state)
        }
        setIsReadyToAction(false)
        return { ...state, status: { ...state.status, locationsComplete: true } }
      }
      case 'Locations Edit': {
        saveChangeInDB(state._id, 'Update', { 'status.locationsComplete': false })
        // sendEmailUpdate('opened to edit', i18n('newBillOfLadingHub.locations.title'), state)
        setIsReadyToAction(true)
        return { ...state, status: { ...state.status, locationsComplete: false } }
      }
      case 'Goods Complete': {
        saveChangeInDB(state._id, 'Update', { 'status.goodsComplete': true })
        // sendEmailUpdate('completed', i18n('newBillOfLadingHub.goods.title'), state)
        // Validate the Hub information
        const { isValid, BoLHErrors } = validateBoLHub(state)
        setHubErrors(BoLHErrors)
        // Check State Status and Validation to proceed to Taskility's Hub Action
        const BoLHStatusPercentage = calculateHubsCompletitionPercentage('completed', state)
        if (
          shouldTaskilityTakeAnAction('goods', BoLHStatusPercentage, state.taskilityBoLHObjective, state.status) &&
          isValid &&
          isReadyToAction
        ) {
          taskilityHubAction(state)
        }
        setIsReadyToAction(false)
        return { ...state, status: { ...state.status, goodsComplete: true } }
      }
      case 'Goods Edit': {
        saveChangeInDB(state._id, 'Update', { 'status.goodsComplete': false })
        // sendEmailUpdate('opened to edit', i18n('newBillOfLadingHub.goods.title'), state)
        setIsReadyToAction(true)
        return { ...state, status: { ...state.status, goodsComplete: false } }
      }
      case 'Customs Complete': {
        saveChangeInDB(state._id, 'Update', { 'status.customsComplete': true })
        // sendEmailUpdate('completed', i18n('newBillOfLadingHub.customs.title'), state)
        // Validate the Hub information
        const { isValid, BoLHErrors } = validateBoLHub(state)
        setHubErrors(BoLHErrors)
        // Check State Status and Validation to proceed to Taskility's Hub Action
        const BoLHStatusPercentage = calculateHubsCompletitionPercentage('completed', state)
        if (
          shouldTaskilityTakeAnAction('customs', BoLHStatusPercentage, state.taskilityBoLHObjective, state.status) &&
          isValid &&
          isReadyToAction
        ) {
          taskilityHubAction(state)
        }
        setIsReadyToAction(false)
        return { ...state, status: { ...state.status, customsComplete: true } }
      }
      case 'Customs Edit': {
        saveChangeInDB(state._id, 'Update', { 'status.customsComplete': false })
        // sendEmailUpdate('opened to edit', i18n('newBillOfLadingHub.customs.title'), state
        setIsReadyToAction(true)
        return { ...state, status: { ...state.status, customsComplete: false } }
      }
      case 'Transports Complete': {
        saveChangeInDB(state._id, 'Update', { 'status.transportsComplete': true })
        // sendEmailUpdate('completed', i18n('newBillOfLadingHub.transport.title'), state)
        // Validate the Hub information
        const { isValid, BoLHErrors } = validateBoLHub(state)
        setHubErrors(BoLHErrors)
        // Check State Status and Validation to proceed to Taskility's Hub Action
        const BoLHStatusPercentage = calculateHubsCompletitionPercentage('completed', state)
        if (
          shouldTaskilityTakeAnAction('transports', BoLHStatusPercentage, state.taskilityBoLHObjective, state.status) &&
          isValid &&
          isReadyToAction
        ) {
          taskilityHubAction(state)
        }
        setIsReadyToAction(false)
        return { ...state, status: { ...state.status, transportsComplete: true } }
      }
      case 'Transports Edit': {
        saveChangeInDB(state._id, 'Update', { 'status.transportsComplete': false })
        // sendEmailUpdate('opened to edit', i18n('newBillOfLadingHub.transport.title'), state)
        setIsReadyToAction(true)
        return { ...state, status: { ...state.status, transportsComplete: false } }
      }
      case 'Prices Complete': {
        // console.log('priceCompleteStarts')
        saveChangeInDB(state._id, 'Update', { 'status.pricesComplete': true, 'status.isReadyToAction': false })
        // sendEmailUpdate('completed', i18n('newBillOfLadingHub.prices.title'), state)
        // Validate the Hub information
        const { isValid, BoLHErrors } = validateBoLHub(state)
        setHubErrors(BoLHErrors)
        // Check State Status and Validation to proceed to Taskility's Hub Action
        const BoLHStatusPercentage = calculateHubsCompletitionPercentage('completed', state)
        // console.log(BoLHStatusPercentage, isValid, isReadyToAction)
        if (
          shouldTaskilityTakeAnAction('prices', BoLHStatusPercentage, state.taskilityBoLHObjective, state.status) &&
          isValid &&
          isReadyToAction
        ) {
          taskilityHubAction(state)
        }
        setIsReadyToAction(false)
        // console.log('priceCompleteEnds', isReadyToAction)
        return { ...state, status: { ...state.status, pricesComplete: true, isReadyToAction: false } }
      }
      case 'Prices Edit': {
        saveChangeInDB(state._id, 'Update', { 'status.pricesComplete': false, 'status.isReadyToAction': true })
        // sendEmailUpdate('opened to edit', i18n('newBillOfLadingHub.prices.title'), state)
        setIsReadyToAction(true)
        // console.log(isReadyToAction)
        return { ...state, status: { ...state.status, pricesComplete: false, isReadyToAction: true } }
      }
      case 'Documents Complete':
        return { ...state, status: { ...state.status, documentsComplete: true } }
      case 'Documents Edit':
        return { ...state, status: { ...state.status, documentsComplete: false } }
      case 'Is International':
        // console.log(state)
        if (action.payload === 'Si') {
          saveChangeInDB(state._id, 'Update', { 'generalInfo.internationalTransport': action.payload })
          return {
            ...state,
            generalInfo: { ...state.generalInfo, internationalTransport: action.payload },
          }
        }
        // eslint-disable-next-line no-param-reassign
        delete state.generalInfo.inOutGoods
        // eslint-disable-next-line no-param-reassign
        delete state.generalInfo.countryOfOrigin
        // eslint-disable-next-line no-param-reassign
        delete state.generalInfo.wayInOut
        saveChangeInDB(state._id, 'Update', { 'generalInfo.internationalTransport': action.payload })
        saveChangeInDB(state._id, 'Delete', {
          'generalInfo.inOutGoods': '',
          'generalInfo.countryOfOrigin': '',
          'generalInfo.wayInOut': '',
        })
        return {
          ...state,
          generalInfo: {
            ...state.generalInfo,
            internationalTransport: action.payload,
          },
        }
      case 'Import or Export':
        saveChangeInDB(state._id, 'Update', { 'generalInfo.inOutGoods': action.payload })
        return {
          ...state,
          generalInfo: { ...state.generalInfo, inOutGoods: action.payload },
        }
      case 'Country Origin or Destination':
        saveChangeInDB(state._id, 'Update', { 'generalInfo.countryOfOrigin': action.payload })
        return {
          ...state,
          generalInfo: { ...state.generalInfo, countryOfOrigin: action.payload },
        }
      case 'Via Entry or Exit':
        saveChangeInDB(state._id, 'Update', { 'generalInfo.wayInOut': action.payload })
        return {
          ...state,
          generalInfo: { ...state.generalInfo, wayInOut: action.payload },
        }
      case 'Add a Location': {
        const currentLocations = state?.locations?.locations || []
        saveChangeInDB(state._id, 'Update', { 'locations.locations': [...currentLocations, action.payload] })
        return {
          ...state,
          locations: {
            ...state.locations,
            locations: [...currentLocations, action.payload],
          },
        }
      }
      case 'Update a Location':
        state.locations.locations.splice(action.payload.index, 1, action.payload.location)
        saveChangeInDB(state._id, 'Update', { 'locations.locations': [...state.locations.locations] })
        return { ...state }
      case 'Edit Location':
        // console.log('edit location', state.locations[action.payload.index])
        setLocationIndex(action.payload.index)
        setIsEditingLocation(true)
        setIsDisabledSearchPlaces(true)
        setIsLocationVisible(true)
        // console.log('isEditingLocation', isEditingLocation)
        // console.log('isDisabledSearchPlaces', isDisabledSearchPlaces)
        return {
          ...state,
        }
      case 'Delete Location':
        // console.log('index:', action.payload.index)
        // console.log('size', action.payload.size)
        // console.log('deleted element:', state.locations[action.payload.index])
        if (action.payload.size === state.locations.locations.length) {
          const locationsUpdated = state.locations.locations
          // console.log('locationsUpdated before:', locationsUpdated)
          locationsUpdated.splice(action.payload.index, 1)
          // console.log('locationsUpdated after:', locationsUpdated)
          saveChangeInDB(state._id, 'Update', { 'locations.locations': locationsUpdated })
          return {
            ...state,
            locations: {
              ...state.locations,
              locations: locationsUpdated,
            },
          }
        }
        return {
          ...state,
        }
      case 'Add an Item': {
        const { good } = state.goods
        // console.log('good in Add Item: ', good)
        // console.log('good.length in Add Item: ', good.length)
        const totalWeight =
          good.length !== 0
            ? good.map(item => (item.weightInKg !== undefined ? item.weightInKg : null)).reduce((a, b) => a + b) + action.payload.weightInKg
            : action.payload.weightInKg
        const arrayOfSatProductCodes = good.length !== 0 ? state.goods.good.map(item => item.satProductCode) : []
        arrayOfSatProductCodes.push(action.payload.satProductCode)
        const numberOfUniqueSatProductCodes = [...new Set(arrayOfSatProductCodes)].length

        saveChangeInDB(state._id, 'Update', {
          'goods.totalWeight': totalWeight,
          'goods.totalGoods': numberOfUniqueSatProductCodes,
          'goods.good': [...state.goods.good, action.payload],
        })
        return {
          ...state,
          goods: {
            ...state.goods,
            totalWeight: totalWeight,
            totalGoods: numberOfUniqueSatProductCodes,
            good: [...state.goods.good, action.payload],
          },
        }
      }
      case 'Add Item from XML': {
        const { good } = state.goods
        // console.log('good in Add Item: ', good)
        // console.log('good.length in Add Item: ', good.length)
        // const totalWeight =
        //   good.length !== 0
        //     ? good.map(item => (item.weightInKg !== undefined ? item.weightInKg : null)).reduce((a, b) => a + b) + action.payload.weightInKg
        //     : action.payload.weightInKg
        const arrayOfSatProductCodes = good.length !== 0 ? state.goods.good.map(item => item.satProductCode) : []
        arrayOfSatProductCodes.push(action.payload.satProductCodeArray)
        const numberOfUniqueSatProductCodes = [...new Set(arrayOfSatProductCodes)].length
        saveChangeInDB(state._id, 'Update', {
          // 'goods.totalWeight': totalWeight,
          'goods.totalGoods': numberOfUniqueSatProductCodes,
          'goods.good': [...state.goods.good, ...action.payload.goodsArray],
        })
        return {
          ...state,
          goods: {
            ...state.goods,
            // totalWeight: totalWeight,
            totalGoods: numberOfUniqueSatProductCodes,
            good: [...state.goods.good, ...action.payload.goodsArray],
          },
        }
      }
      case 'Update an Item': {
        state.goods.good.splice(action.payload.index, 1, action.payload.item)
        const { good } = state.goods
        const totalWeight = good.map(item => item.weightInKg).reduce((a, b) => a + b)
        const arrayOfSatProductCodes = state.goods.good.map(item => item.satProductCode)
        const numberOfUniqueSatProductCodes = [...new Set(arrayOfSatProductCodes)].length
        saveChangeInDB(state._id, 'Update', {
          'goods.totalWeight': totalWeight,
          'goods.totalGoods': numberOfUniqueSatProductCodes,
          'goods.good': [...state.goods.good],
        })
        return {
          ...state,
          goods: {
            ...state.goods,
            totalWeight: totalWeight,
            totalGoods: numberOfUniqueSatProductCodes,
          },
        }
      }
      case 'Update Item Authorization': {
        const goodEdited = { ...state?.goods?.good[action.payload.itemIndex], authorizedUsers: action.payload.usersEmails }
        const goodArray = state?.goods?.good
        state?.goods?.good.splice(action.payload.itemIndex, 1, goodEdited)
        saveChangeInDB(state._id, 'Update', {
          'goods.good': [...state.goods.good],
        })
        return {
          ...state,
        }
      }
      case 'Update Transport Authorization': {
        const transportEdited = {
          ...state?.transports?.transports[action.payload.itemIndex],
          authorizedUsers: action.payload.usersEmails,
        }
        const transportsArray = state?.transports?.transports
        state?.transports?.transports.splice(action.payload.itemIndex, 1, transportEdited)
        saveChangeInDB(state._id, 'Update', {
          'transports.transports': [...state.transports.transports],
        })
        return {
          ...state,
        }
      }
      case 'Update Location Authorization': {
        const locationEdited = { ...state?.locations.locations[action.payload.itemIndex], authorizedUsers: action.payload.usersEmails }
        const locationsArray = state?.locations.locations
        state?.locations.locations.splice(action.payload.itemIndex, 1, locationEdited)
        saveChangeInDB(state._id, 'Update', {
          'locations.locations': [...state.locations.locations],
        })
        return {
          ...state,
        }
      }
      case 'Edit Item': {
        // console.log('edit item', state.goods.good[action.payload.index])
        setItemIndex(action.payload.index)
        setIsEditingItem(true)
        setIsItemVisible(true)
        // console.log('isEditingItem', isEditingItem)
        // console.log('isDisabledSearchPlaces', isDisabledSearchPlaces)

        return {
          ...state,
        }
      }
      case 'Delete Item': {
        // console.log('good', state.goods.good)
        console.log('index:', action.payload.index)
        console.log('size', action.payload.size)
        console.log('deleted element:', state.goods.good[action.payload.index])
        if (action.payload.size === state.goods.good.length) {
          const goodsUpdated = state.goods.good
          // console.log('locationsUpdated before:', locationsUpdated)
          goodsUpdated.splice(action.payload.index, 1)
          // console.log('goodsUpdated after:', goodsUpdated)
          // console.log('goodsUpdated length:', goodsUpdated.length)

          const totalWeight = goodsUpdated.length !== 0 ? goodsUpdated.map(item => item.weightInKg).reduce((a, b) => a + b) : 0
          const arrayOfSatProductCodes = goodsUpdated.length !== 0 ? goodsUpdated.map(item => item.satProductCode) : []
          const numberOfUniqueSatProductCodes = [...new Set(arrayOfSatProductCodes)].length
          // console.log('totalWeight in Delete Item:', totalWeight)
          // console.log('numberOfUniqueSatProductCodes in Delete Item:', numberOfUniqueSatProductCodes)

          saveChangeInDB(state._id, 'Update', {
            'goods.totalWeight': totalWeight,
            'goods.totalGoods': numberOfUniqueSatProductCodes,
            'goods.good': goodsUpdated,
          })
          return {
            ...state,
            goods: {
              ...state.goods,
              totalWeight: totalWeight,
              totalGoods: numberOfUniqueSatProductCodes,
              good: goodsUpdated,
            },
          }
        }
        return {
          ...state,
        }
      }
      case 'Add a Transport': {
        // TODO: Trabajar para agregar a un array
        const currentTransports = state?.transports?.transports || []
        saveChangeInDB(state._id, 'Update', { 'transports.transports': [...currentTransports, action.payload] })
        return {
          ...state,
          transports: {
            ...state.transports,
            transports: [...currentTransports, action.payload],
          },
        }
      }
      case 'Edit a Transport': {
        // console.log('edit transport', state.transports[action.payload.index])
        setTransportIndex(action.payload.index)
        setIsEditingTransport(true)
        setIsTransportVisible(true)
        // console.log('isEditingTransport', isEditingTransport)
        return {
          ...state,
        }
      }
      case 'Delete a Transport': {
        state.transports.transports.splice(action.payload.index, 1)
        saveChangeInDB(state._id, 'Update', { 'transports.transports': [...state.transports.transports] })
        return { ...state }
      }
      case 'Update a Transport': {
        // TODO: Trabajar para agregar index a un array
        state.transports.transports.splice(action.payload.index, 1, action.payload.transport)
        saveChangeInDB(state._id, 'Update', { 'transports.transports': [...state.transports.transports] })
        return { ...state }
      }
      // Share actions
      case 'Add a Tag':
        // TODO: Trabajar para agregar a un array
        if (state.tags) {
          saveChangeInDB(state._id, 'Update', { tags: [...state.tags, action.payload] })
          return {
            ...state,
            tags: [...state.tags, action.payload],
          }
        }
        saveChangeInDB(state._id, 'Update', { tags: [action.payload] })
        return {
          ...state,
          tags: [action.payload],
        }
      case 'Edit a Tag': {
        // console.log('edit transport', state.transports[action.payload.index])
        setTagIndex(action.payload.index)
        setIsEditingTag(true)
        setIsTagVisible(true)
        // console.log('isEditingTransport', isEditingTransport)
        return {
          ...state,
        }
      }
      case 'Delete a Tag': {
        state.tags.splice(action.payload, 1)
        saveChangeInDB(state._id, 'Update', { tags: [...state.tags] })
        setIsDeletingTag(false)
        return { ...state }
      }
      case 'Update a Tag':
        // TODO: Trabajar para agregar index a un array
        state.tags.splice(action.payload.index, 1, action.payload.tag)
        saveChangeInDB(state._id, 'Update', { tags: [...state.tags] })
        return { ...state }
      // Share actions
      case 'Change Type of Access':
        // console.log('Change Type of Access', action.payload)
        saveChangeInDB(state._id, 'Update', { 'share.typeOfAccess': action.payload })
        return {
          ...state,
          share: {
            ...state.share,
            typeOfAccess: action.payload,
          },
        }
      case 'Email Update': {
        const initials = typeof action.payload === 'string' ? action.payload.substring(0, 2).toUpperCase() : ''
        return {
          ...state,
          share: {
            ...state.share,
            userToSendInvitation: {
              ...state.share.userToSendInvitation,
              userId: '',
              name: '',
              lastName: '',
              initials: initials || '',
              notify: true,
              preferedLanguage: 'es',
              writePermissions: ['share', 'generalInfo', 'locations', 'goods', 'transports'],
              viewPermissions: ['share', 'generalInfo', 'locations', 'goods', 'transports'],
              email: action.payload,
              mobile: '',
              companyId: '',
              companyName: '',
              telegramAutenticationToken: '',
              telegramChatId: '',
              hubManager: false,
            },
          },
        }
      }
      case 'Update Prefered Language UserToSendInvitation': {
        return {
          ...state,
          share: {
            ...state.share,
            userToSendInvitation: {
              ...state.share.userToSendInvitation,
              preferedLanguage: action.payload,
            },
          },
        }
      }
      case 'Send Invitation': {
        sendEmailInvitation(state.share.userToSendInvitation, state)
        // console.log('state en sendEmalInvitaiton', state)
        const newUser = state.share.userToSendInvitation
        // console.log('emailInputRef value: ', emailInputRef.current)
        saveChangeInDB(state._id, 'Update', { 'share.users': [...state.share.users, newUser] })
        emailInputRef.current.value = ''
        emailInputRef.current.input.value = ''
        emailInputRef.current.state.value = ''
        return { ...state, share: { ...state.share, userToSendInvitation: {}, users: [...state.share.users, newUser] } }
      }
      case 'Update Notify User': {
        const usersUpdated = state.share.users
        // const userToUpdate = state.share.users[action.payload.index]
        // userToUpdate.notify = action.payload.value
        // usersUpdated.splice(action.payload.index, 1, userToUpdate)
        usersUpdated[action.payload.index].notify = action.payload.value
        saveChangeInDB(state._id, 'Update', { 'share.users': usersUpdated })
        return { ...state, share: { ...state.share, users: usersUpdated } }
      }
      case 'Update Write Permissions User': {
        const usersUpdated = state.share.users
        // const userToUpdate = state.share.users[action.payload.index]
        // userToUpdate.notify = action.payload.value
        // usersUpdated.splice(action.payload.index, 1, userToUpdate)
        usersUpdated[action.payload.index].writePermissions = action.payload.value
        saveChangeInDB(state._id, 'Update', { 'share.users': usersUpdated })
        return { ...state, share: { ...state.share, users: usersUpdated } }
      }
      case 'Update View Permissions User': {
        const usersUpdated = state.share.users
        // const userToUpdate = state.share.users[action.payload.index]
        // userToUpdate.notify = action.payload.value
        // usersUpdated.splice(action.payload.index, 1, userToUpdate)
        usersUpdated[action.payload.index].viewPermissions = action.payload.value
        saveChangeInDB(state._id, 'Update', { 'share.users': usersUpdated })
        return { ...state, share: { ...state.share, users: usersUpdated } }
      }
      case 'Delete User': {
        const usersUpdated = state.share.users
        usersUpdated.splice(action.payload, 1)
        saveChangeInDB(state._id, 'Update', { 'share.users': usersUpdated })
        return { ...state, share: { ...state.share, users: usersUpdated } }
      }
      case 'Update Prefered Language User': {
        const usersUpdated = state.share.users
        usersUpdated[action.payload.index].preferedLanguage = action.payload.value
        saveChangeInDB(state._id, 'Update', { 'share.users': usersUpdated })
        return { ...state, share: { ...state.share, users: usersUpdated } }
      }
      case 'Stamp': {
        const testBillingState = {
          currency: 'MXN',
          exchangeRate: 1,
          subTotal: 1.0, // Not in 'T'
          total: 1.12,
          paymentForm: '99', // Not in 'T'
          paymentMethod: 'PPD', // Not in 'T'
          cfdiType: 'I',
          expeditionPlace: '78000',
          issuer: {
            rfc: 'ALO110913N98',
            fiscalRegime: '601',
            name: 'A1A Logistics S de RL de CV',
          },
          receiver: {
            rfc: 'SME751021B90',
            cfdiUse: 'G03',
            name: 'FREUDENBERG-NOK SEALING TECHNOLOGIES DE MEXICO SA DE CV',
            foreignFiscalID: '',
            countryOfResidence: '',
          },
          items: [
            {
              satProductCode: '78101802',
              // "NoIdentificacion": "01",
              quantity: 1,
              satUnitCode: 'E48',
              satUnitCodeDescription: 'SERVICIO',
              description: 'Flete',
              unitPrice: 1.0,
              subtotal: 1.0,
              total: 1.12,
              haveTax: true,
              haveRetention: true,
            },
          ],
        }
        const jsonToStamp = generateCartaPorte2ToStamp(state, testBillingState, action.payload.transports[action.payload.index])
        // eslint-disable-next-line no-console
        console.log('jsonToStamp', jsonToStamp)
        return { ...state }
      }
      case 'Change Hub Objective': {
        saveChangeInDB(state._id, 'Update', { taskilityBoLHObjective: action.payload })
        return { ...state, taskilityBoLHObjective: action.payload }
      }
      case 'Add Documents': {
        // TODO: Trabajar para agregar index a un array
        const currentTransports = state?.transports?.transports || []
        // eslint-disable-next-line dot-notation
        const transport = state?.transports?.transports[action.payload.index]
        const allDocuments = transport.documents ? [...transport.documents, ...action.payload.documents] : [...action.payload.documents]
        // eslint-disable-next-line dot-notation
        // const documentsWithNoDuplicates = [... new Set(allDocuments.map(document => document.fileId))]
        const documentsWithNoDuplicates = []

        const unique = allDocuments.filter(document => {
          const isDuplicate = documentsWithNoDuplicates.includes(document.fileId)

          if (!isDuplicate) {
            documentsWithNoDuplicates.push(document.fileId)
            return true
          }
          return false
        })

        const editedTransport = { ...transport, documents: [...unique] }
        state?.transports?.transports?.splice(action.payload.index, 1, editedTransport)
        saveChangeInDB(state._id, 'Update', { 'transports.transports': [...state?.transports?.transports] })
        return { ...state }
      }
      case 'Add Costs': {
        const formerCosts = state?.costs?.costs ? state?.costs?.costs : []
        // console.log(action.payload.cost)
        const newCosts = [...formerCosts, { ...action.payload.cost, transportIndex: action.payload.index }]
        saveChangeInDB(state._id, 'Update', { 'costs.costs': newCosts })
        return { ...state, costs: { ...state.costs, costs: newCosts } }
      }
      case 'Add Goods Object Extracted From XML': {
        if (state?.goods?.good === undefined) return { ...state }
        const totalWeight = action.payload.totalWeight + (state?.goods?.totalWeight || 0)
        const totalGoods = action.payload.totalGoods + (state?.goods?.totalGoods || 0)
        saveChangeInDB(state._id, 'Update', {
          'goods.totalWeight': totalWeight,
          'goods.totalGoods': action.payload.weightUnit,
          // eslint-disable-next-line no-unsafe-optional-chaining
          'goods.good': [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...(state?.goods?.good !== undefined ? state?.goods?.good : []),
            ...action.payload.good,
          ],
        })
        return {
          ...state,
          goods: {
            totalWeight: totalWeight,
            weightUnit: action.payload.weightUnit,
            totalGoods: totalGoods,
            // eslint-disable-next-line no-unsafe-optional-chaining
            good: [...state?.goods?.good, ...action.payload.good],
          },
        }
      }
      case 'Update Status Menu': {
        saveChangeInDB(state._id, 'Update', {
          status: { ...state.status, ...action.payload.shipmentState },
          lastComment: action.payload.lastComment,
        })
        newComment({ hubId: state._id, ...action.payload.lastComment })
        newLog(
          { name: 'shipmentHub.statusChanged', category: 'operative' },
          { hubId: state._id, ...action?.payload?.log },
          loggedUserIdData
        )
        sendNotifications(state._id, state.share, api)
        return { ...state, status: { ...state.status, ...action.payload.shipmentState }, lastComment: action.payload.lastComment }
      }
      case 'Add Comment to Section': {
        let section = ''
        switch (action.payload.section) {
          case 'cargo': {
            section = 'goods'
            break
          }
          case 'carrier': {
            section = 'transpors'
            break
          }
          case 'operativeStatus': {
            section = 'operative'
            break
          }
          case 'collectStatus': {
            section = 'collect'
            break
          }
          case 'suppliersStatus': {
            section = 'suppliers'
            break
          }
          default: {
            section = action.payload.section
            break
          }
        }

        const lastComment = {
          user: loggedUserIdData,
          date: new Date(),
          text: action.payload.text,
          section: action.payload.section,
        }

        if (section === 'operative' || section === 'collect' || section === 'suppliers') {
          saveChangeInDB(state._id, 'Update', {
            lastComment,
            status: {
              ...state.status,
              [section]: {
                ...state.status[section],
                lastComment,
              },
            },
          })
          newComment({ hubId: state._id, ...lastComment })
          sendNotifications(state._id, state.share, api)
          return {
            ...state,
            lastComment,
            status: {
              ...state.status,
              [section]: {
                ...state.status[section],
                lastComment,
              },
            },
          }
        }

        saveChangeInDB(state._id, 'Update', {
          lastComment,
          [section]: { ...state[section], lastComment },
        })
        newComment({ hubId: state._id, ...lastComment })
        sendNotifications(state._id, state.share, api)
        return { ...state, [section]: { ...state[section], lastComment }, lastComment }
      }
      case 'Change Active Sections': {
        saveChangeInDB(state._id, 'Update', { activeSections: action.payload })
        return { ...state, activeSections: action.payload }
      }
      case 'addAdditionalItem': {
        const {
          id,
          productCode,
          unit,
          quantity,
          unitValue,
          subtotal,
          haveTax,
          haveIvaRet,
          tax,
          ivaRet,
          total,
          description,
          taxObject,
          currency,
        } = action.payload
        const itemId = id || objectId()
        const taxes = []
        if (haveTax) taxes.push({ name: 'iva', rate: 0.16, isRetention: false, value: tax })
        if (haveIvaRet) taxes.push({ name: 'iva', rate: 0.04, isRetention: true, value: ivaRet })
        const newItem = {
          id: itemId,
          productCode,
          unit,
          quantity,
          unitValue,
          subtotal,
          total,
          taxes,
          tax,
          ivaRet,
          haveTax,
          haveIvaRet,
          description,
          taxObject,
          currency,
        }
        // console.log({ newItem })
        const quotations =
          id !== null
            ? state.prices.quotations.map((item, index) => (item.id !== id ? item : { ...item, ...newItem }))
            : [...(state.prices.quotations || []), newItem]
        saveChangeInDB(state._id, 'Update', { 'prices.quotations': quotations })
        return { ...state, prices: { ...state.prices, quotations }, errors: {} }
      }
      case 'removeAdditionalItem': {
        const quotationsUpdated = state.prices.quotations.filter((quotation, index) => {
          console.log({ quotation, index })
          return quotation.id !== action.payload
        })
        console.log('removeAdditionalItem', { payload: action.payload, quotationsUpdated })

        // if (action.payload.size === state.prices.quotations.length) {

        saveChangeInDB(state._id, 'Update', {
          'prices.quotations': quotationsUpdated,
        })
        return {
          ...state,
          prices: {
            ...state.prices,
            quotations: quotationsUpdated,
          },
        }
      }
      case 'setSelectedAdditionalItem':
        console.log('setSelectedAdditionalItem', { payload: action.payload })
        return {
          ...state,
          prices: {
            ...state.prices,
            selectedAdditionalItem: action.payload,
          },
        }
      case 'Algo Raro':
        // console.log('algo raro', action.payload)
        return { ...state }
      default:
        return state
    }
  }

  const [BoLHState, dispatch] = useReducer(BoLHReducer, BoLHInitialState)

  useEffect(() => {
    dispatch({ type: 'Initialize State', payload: null })
  }, [data])
  // console.log('BoLHState', BoLHState)

  const onSubmitTeam = teamData => {
    // console.log(data)
  }
  const onSubmitGeneral = generalData => {
    // console.log(data)
  }
  const onSubmitRoute = routeData => {
    setIsRouteComplete(true)
  }
  const onSubmitLoad = loadData => {
    // console.log(data)
  }
  const onSubmitPrices = pricesData => {
    // console.log(data)
  }
  const onSubmitCustoms = customsData => {
    // console.log(data)
  }
  const onSubmitDocuments = documentsData => {
    // console.log(data)
  }
  const onCloseShare = () => {
    // setIsShareVisible(false)
  }

  const onCloseTag = () => {
    setIsTagVisible(false)
  }
  const onClickTag = () => {
    setIsTagVisible(true)
  }
  const onClickSettings = () => {
    setIsSettingsVisible(true)
  }

  const onCloseSettings = () => {
    setIsSettingsVisible(false)
  }
  const onCloseBuyInsurance = () => {
    setIsBuyInsuranceVisible(false)
  }
  const onClickBuyInsurance = () => {
    setIsBuyInsuranceVisible(true)
  }

  const updateName = value => {
    // console.log('value', value)
    dispatch({ type: 'Update Hub Name', payload: value })
  }

  const getWritingPermissions = cardName => {
    if (BoLHState?.share?.users) {
      const currentUser = BoLHState?.share?.users.filter(user => {
        return user.email === loggedEmail
      })
      if (currentUser[0]) return currentUser[0].writePermissions.includes(cardName)
      return false
    }
    return false
  }

  const getViewPermissions = cardName => {
    if (BoLHState?.share?.users) {
      const currentUser = BoLHState?.share?.users.filter(user => {
        return user.email === loggedEmail
      })
      if (currentUser[0]) return currentUser[0].viewPermissions.includes(cardName)
      return false
    }
    return false
  }

  const createTransportsCards = BoLHState?.transports?.transports
    ? BoLHState?.transports?.transports?.map((transport, index) => {
        // console.log('transport', transport)
        // console.log('index', index)
        // console.log('transport.transportType', transport.transportType)

        if (transport.transportType === '01')
          return (
            <LandTransport
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${transport.company._id}`}
              transports={BoLHState.transports.transports}
              index={index}
              parentDispatch={dispatch}
              isEditing={isEditingTransport}
              disabled={getWritingPermissions('transports') && !BoLHState?.status?.transportsComplete}
              usersList={filterUsersByViewPermission(BoLHState?.share?.users, 'transports')}
              loggedEmail={loggedEmail}
              sharePermission={getViewPermissions('share')}
              companyProfile={companyProfile}
            />
          )
        return null
      })
    : []

  const pendingActions = `${BoLHState?.status?.generalInfoComplete ? '' : i18n('newShipment.pendingActions.generalInfoIncomplete')}\n
  ${BoLHState?.status?.locationsComplete ? '' : i18n('newShipment.pendingActions.locationsIncomplete')}\n
  ${BoLHState?.status?.goodsComplete ? '' : i18n('newShipment.pendingActions.goodsIncomplete')}\n
  ${BoLHState?.status?.transportsComplete ? '' : i18n('newShipment.pendingActions.transportsIncomplete')}` //TODO: REVISAR

  const isBoLHComplete =
    BoLHState?.status?.generalInfoComplete &&
    BoLHState?.status?.locationsComplete &&
    BoLHState?.status?.goodsComplete &&
    BoLHState?.status?.transportsComplete

  const extractGoodFromXmlFromInvoice = async fileHandle => {
    const fileData = await fileHandle.getFile()
    const text = await fileData.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(text, 'text/xml')
    // console.log('text', text)

    // Get company information (issuer)
    const issuerDOM = xmlDoc.getElementsByTagName('cfdi:Emisor')
    const issuer = {
      rfc: issuerDOM[0].getAttribute('Rfc'),
      name: issuerDOM[0].getAttribute('Nombre'),
    }
    const currency = xmlDoc.getElementsByTagName('cfdi:Comprobante')[0].getAttribute('Moneda')
    const conceptos = xmlDoc.getElementsByTagName('cfdi:Concepto')
    const mercancias = xmlDoc.getElementsByTagName('cce11:Mercancia')
    // console.log('conceptos', conceptos)
    // console.log('mercancias', mercancias)

    // Get goods attributes
    let conceptosIndex = 0
    const newGoodsArray = []
    const satProductCodeArray = []
    for (conceptosIndex = 0; conceptosIndex < conceptos.length; conceptosIndex += 1) {
      const newGood = {
        company: issuer,
        currency: currency,
      }
      if (conceptos[conceptosIndex].getAttribute('ClaveProdServ')) {
        newGood.satProductCode = conceptos[conceptosIndex].getAttribute('ClaveProdServ')
        satProductCodeArray.push(conceptos[conceptosIndex].getAttribute('ClaveProdServ'))
      }
      if (conceptos[conceptosIndex].getAttribute('NoIdentificacion'))
        newGood.productIdNumber = conceptos[conceptosIndex].getAttribute('NoIdentificacion')
      if (conceptos[conceptosIndex].getAttribute('Unidad'))
        newGood.satUnitKey = conceptos[conceptosIndex].getAttribute('Unidad').substring(0, 3)
      if (conceptos[conceptosIndex].getAttribute('Descripcion')) newGood.description = conceptos[conceptosIndex].getAttribute('Descripcion')
      if (conceptos[conceptosIndex].getAttribute('Cantidad')) newGood.quantity = conceptos[conceptosIndex].getAttribute('Cantidad')
      if (conceptos[conceptosIndex].getAttribute('Importe')) newGood.value = conceptos[conceptosIndex].getAttribute('Importe')

      // Get FraccionArancelaria
      if (mercancias) {
        const noIdentificacion = conceptos[conceptosIndex].getAttribute('NoIdentificacion')
        const selector = `[NoIdentificacion="${noIdentificacion}"]`
        const selectorResult = xmlDoc.querySelectorAll(selector)
        newGood.tariffCode = selectorResult[1].getAttribute('FraccionArancelaria')
      }

      // Add it to Array
      newGoodsArray.push(newGood)
    }

    // Add it to BoLHStatus and DB
    dispatch({ type: 'Add Item from XML', payload: { satProductCodeArray: satProductCodeArray, goodsArray: newGoodsArray } })
    // console.log('newGoodsArray', newGoodsArray)

    const good = {
      _id: '61ce63e3c0a011153633d8a6',
      company: {
        // OK
        _id: 'Xy9B4Tcdk9eviyPxq',
        name: 'REHAU SA DE CV', // OK
        rfc: 'REH930611FA8', // OK
      },
      companyId: 'Xy9B4Tcdk9eviyPxq',
      currency: 'USD', // OK
      dangerousMaterial: 'Sí',
      dangerousMaterialCode: '77382883928',
      description: 'Sellos de Goma Nuevos', // OK
      dimensions: {
        depth: 22,
        height: 23,
        unitMeasure: 'cm',
        width: 123,
      },
      packagingCode: '4G',
      packagingDescription: 'Cajas de Cartón',
      pedimento: '20039302930',
      productCode: 'PN 7777 New',
      quantity: 2,
      satProductCode: '88473849', // OK
      satUnitKey: 'E48', // OK
      tariffCode: '7738273',
      value: 0, // OK
      weightInKg: 370,
    }
    return newGoodsArray
  }

  const loadXMLFileToParse = async () => {
    const fileHandleArray = await window.showOpenFilePicker({
      types: [{ description: 'XML File', accept: { 'application/xml': ['.xml'] } }],
      multiple: true,
    })
    const newGoods = []
    let countGoods = 0
    await fileHandleArray.map(fileHandle => {
      extractGoodFromXmlFromInvoice(fileHandle).then(goodArray => {
        goodArray.map(item => {
          newGoods.push(item)
          countGoods += 1
          return null
        })
      })
      return null
      // console.log('goodArray', newGoods)
    })
    message.success(`${i18n('newShipment.goods.itemsAddedSuccessfullyFromXML')}`)
  }

  const loadXMLFileToParse2 = async () => {
    const fileHandleArray = await window.showOpenFilePicker({
      types: [{ description: 'XML File', accept: { 'application/xml': ['.xml'] } }],
      multiple: true,
    })
    const newGoods = []
    let countGoods = 0
    await fileHandleArray.map(fileHandle => {
      extractGoodsFromXml(fileHandle).then(goodArray => {
        goodArray.map(item => {
          newGoods.push(item)
          countGoods += 1
          return null
        })
      })
      return null
      // console.log('goodArray', newGoods)
    })
    message.success(`${i18n('newShipment.goods.itemsAddedSuccessfullyFromXML')}`)
  }

  const handleCloseTag = removedTag => {
    console.log(removedTag)
    const index = BoLHState?.tags?.findIndex(tag => {
      return tag?.type === removedTag?.type && tag?.value === removedTag?.value
    })
    console.log('index', index)
    dispatch({ type: 'Delete a Tag', payload: index })
    setIsDeletingTag(true)
  }

  const getCfdiDraftByBoLHSection = sectionName => {
    const cfdiDraft = BoLHState?.cfdiDrafts?.find(({ BoLHSection }) => BoLHSection === sectionName)
    // console.log('getCfdiDraftByBoLHSection', cfdiDraft, sectionName)
    return cfdiDraft
  }

  const getTotalCost = costs => {
    let subtotal = 0
    if (costs)
      costs?.map(cost => {
        if (typeof cost.subtotal === 'undefined') return null
        subtotal += Number(cost?.subtotal)
        return null
      })
    return subtotal
  }

  const costsData = costs => {
    const costsRows = costs.map(cost => {
      const row = {
        key: `${cost?.folio}-${cost?.total}`,
        companyName: cost?.company?.name,
        folio: cost?.folio,
        currency: cost?.currency ? cost?.currency : '',
        subtotal: numberFormat(cost?.subtotal),
        tax: numberFormat(cost?.tax) || 0,
        taxRet: numberFormat(cost?.taxRetention) || 0,
        total: numberFormat(cost?.total),
      }
      return row
    })
    return costsRows
  }
  const costItemsColumns = [
    {
      title: i18n('newShipment.costs.company'),
      dataIndex: 'companyName',
      key: 'company.name',
    },
    {
      title: i18n('newShipment.costs.folio'),
      dataIndex: 'folio',
      key: 'folio',
    },
    {
      title: i18n('newShipment.costs.currency'),
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: i18n('newShipment.costs.subtotal'),
      dataIndex: 'subtotal',
      key: 'subtotal',
      responsive: ['sm'],
    },
    {
      title: i18n('newShipment.costs.tax'),
      dataIndex: 'tax',
      key: 'tax',
      responsive: ['sm'],
    },
    {
      title: i18n('newBillOfLadingHub.costs.taxRetention'),
      dataIndex: 'taxRet',
      key: 'taxRet',
      responsive: ['sm'],
    },
    {
      title: i18n('newBillOfLadingHub.costs.total'),
      dataIndex: 'total',
      key: 'total',
    },
  ]

  const costsTotals = pageData => {
    let totalSubtotal = ''
    let totalTax = ''
    let totalTaxRetention = ''
    let totalTotal = ''
    pageData.forEach(({ subtotal, tax, taxRet, total }) => {
      totalSubtotal += subtotal
      totalTax += tax
      totalTaxRetention += taxRet
      totalTotal += total
    })
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell index={0}>{i18n('newBillOfLadingHub.costs.total')}</Table.Summary.Cell>
        <Table.Summary.Cell index={1} />
        <Table.Summary.Cell index={2} />
        <Table.Summary.Cell index={3} responsive={['sm']}>
          <Text>{numberFormat(totalSubtotal)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={4} responsive={['sm']}>
          <Text>{numberFormat(totalTax)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={5} responsive={['sm']}>
          <Text>{numberFormat(totalTaxRetention)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={6}>
          <Text>{numberFormat(totalTotal)}</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    )
  }

  const isBoLCompleteToStamp = () => {
    if (BoLHState?.status) {
      if (
        BoLHState?.status?.generalInfoComplete &&
        BoLHState?.status?.locationsComplete &&
        BoLHState?.status?.goodsComplete &&
        BoLHState?.status?.transportsComplete &&
        BoLHState?.status?.pricesComplete
      ) {
        return true
      }
      return false
    }
    return false
  }

  // console.log('BoLH authorizedUsers Goods', BoLHState?.share?.users?.filter(user => user?.viewPermissions?.includes('goods')))

  // useEffectExceptOnMount(() => {
  //   // console.log('useEffectStarted, isReadyToAction: ', isReadyToAction)
  //   const { validation, errors } = validateHub()
  //   const isComplete = isBoLCompleteToStamp()
  //   // console.log('validation', validation, 'isComplete', isComplete)
  //   if (validation && isComplete) {
  //     setIsReadyToAction(true)
  //   } else {
  //     setIsReadyToAction(false)
  //   }
  //   setHubErrors(errors)
  //   // console.log('useEffectFinished, isReadyToAction: ', isReadyToAction)
  // }, [BoLHState.status])

  const shipmentHubActionMenuItems = [
    {
      key: 'edit',
      label: i18n('shipmentHub.menu.editGroup'),
      type: 'group',
      children: [
        {
          key: 'cancel',
          label: i18n('buttons.cancel'),
        },
        {
          key: 'copyHub',
          label: i18n('shipmentHub.menu.copyHub'),
        },
        {
          key: 'createTemplateFromHub',
          label: i18n('shipmentHub.menu.createTemplateFromHub'),
        },
      ],
    },
    {
      key: 'send',
      label: i18n('shipmentHub.menu.sendGroup'),
      type: 'group',
      children: [
        {
          key: 'notification',
          label: i18n('shipmentHub.menu.notification'),
        },
        {
          key: 'satisfactionSurvey',
          label: i18n('shipmentHub.menu.satisfactionSurvey'),
        },
      ],
    },
    {
      key: 'request',
      label: i18n('shipmentHub.menu.requestGroup'),
      type: 'group',
      children: [
        {
          key: 'driverStatus',
          label: i18n('shipmentHub.menu.driverStatus'),
        },
        {
          key: 'cargoInformation',
          label: i18n('shipmentHub.menu.cargoInformation'),
        },
        {
          key: 'proofOfDelivery',
          label: i18n('shipmentHub.menu.proofOfDelivery'),
        },
        {
          key: 'authorization',
          label: i18n('shipmentHub.menu.authorization'),
        },
      ],
    },
    {
      key: 'audit',
      label: i18n('shipmentHub.menu.auditGroup'),
      type: 'group',
      children: [
        {
          key: 'bolInformation',
          label: i18n('shipmentHub.menu.bolInformation'),
        },
      ],
    },
    {
      key: 'addSection',
      label: i18n('shipmentHub.menu.addSectionGroup'),
      type: 'group',
      children: [
        {
          key: 'tags',
          label: i18n('shipmentHub.menu.tags'),
        },
        {
          key: 'prices',
          label: i18n('shipmentHub.menu.prices'),
        },
        {
          key: 'costs',
          label: i18n('shipmentHub.menu.costs'),
        },
        {
          key: 'generalInfo',
          label: i18n('shipmentHub.menu.generalInfo'),
        },
        {
          key: 'transports',
          label: i18n('shipmentHub.menu.transports'),
        },
        {
          key: 'goods',
          label: i18n('shipmentHub.menu.goods'),
        },
        {
          key: 'documents',
          label: i18n('shipmentHub.menu.documents'),
        },
        {
          key: 'map',
          label: i18n('shipmentHub.menu.map'),
        },
        {
          key: 'comments',
          label: i18n('shipmentHub.menu.comments'),
        },
        {
          key: 'authorizations',
          label: i18n('shipmentHub.menu.authorizations'),
        },
      ],
    },
  ]

  // const partSwitch= partId =>{
  //   switch (partId) {
  //     case 'summary':
  //       return()
  //     case 'mexicanPart':
  //       return()
  // }

  const tabSwitch = tabId => {
    // console.log('tab title', {loggedEmail})
    switch (tabId) {
      case 'details':
        return (
          <>
            {/* <DetailTabAnchor /> */}
            {/* <Alert
              className="mt-2 mb-8"
              message="Asegura tu carga por tan solo USD $433.55"
              description="Con Riskmanagment asegura tu carga en un solo click. Sin complicaciones y en caso de siniestro con la mejor experiencia de ajuste del mercado"
              type="success"
              showIcon
              action={
                <Button size="small" type="primary" classNames="bg-emerald border-none" onClick={onClickBuyInsurance}>
                  Asegurar mi Carga
                </Button>
              }
            /> */}
            <Drawer
              width="80%"
              onClose={onCloseBuyInsurance}
              open={isBuyInsuranceVisible}
              styles={{
                body: {
                  paddingBottom: 80,
                },
              }}
              // eslint-disable-next-line prettier/prettier
              // extra={
              //   <Space>
              //     <Button onClick={onCloseBuyInsurance}>Cancelar</Button>
              //     <Button onClick={onCloseBuyInsurance} type="primary">
              //       Pagar
              //     </Button>
              //   </Space>
              // }
              key="drawerBuyInsurance"
              destroyOnClose
            >
              <LoadInsuranceForm hubState={BoLHState} />
            </Drawer>
            {/* <TabTitle
              section={tabId}
              buttonType="settings"
              // hubDispatch={dispatch}
              // activeSections={BoLHState?.activeSections || []}
              // settingsVisible={isCurrentUserAdmin(BoLHState?.share?.users, loggedEmail)}
            /> */}
            {/* <ShipmentSummary hubState={BoLHState} hubDispatch={dispatch} loggedUserProfile={loggedUserIdData} /> */}
            <ShipmentStatusOperator hubState={BoLHState} hubDispatch={dispatch} loggedUserProfile={loggedUserIdData} />
            {/* {BoLHState?.activeSections?.includes('generalInfo') ? (
              <ShipmentGeneralInfo
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('prices') ? (
              <ShipmentPrices
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('costs') ? (
              <ShipmentCosts
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('locations') ? (
              <ShipmentLocations
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('cargo') ? (
              <ShipmentLoad
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('carriers') ? (
              <ShipmentCarriers
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
                companyProfile={companyProfile}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('quotes') ? (
              <ShipmentQuotes
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
                companyProfile={companyProfile}
              />
            ) : null} */}
            {/* {BoLHState?.activeSections?.includes('approvals') ? (
              <ShipmentApprovals
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
                companyProfile={companyProfile}
              />
            ) : null} */}

            {/* <ShipmentDocuments
              hubState={BoLHState}
              hubDispatch={dispatch}
              getViewPermissions={getViewPermissions}
              getWritingPermissions={getWritingPermissions}
              handleSubmit={handleSubmit}
              onSubmitRoute={onSubmitRoute}
              loggedEmail={loggedEmail}
              companyProfile={companyProfile}
            /> */}
            {/* {BoLHState?.activeSections?.includes('customerSatisfaction') ? (
              <ShipmentSatisfactionSurvey
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
                companyProfile={companyProfile}
              />
            ) : null} */}
          </>
        )
      // case 'generalInfo':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentGeneralInfo
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //       />
      //     </>
      //   )
      // case 'prices':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentPrices
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //       />
      //     </>
      //   )
      // case 'costs':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentCosts
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //       />
      //     </>
      //   )
      // case 'locations':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentLocations
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //       />
      //     </>
      //   )
      // case 'cargo':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentLoad
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //       />
      //     </>
      //   )
      // case 'carriers':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentCarriers
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
      // case 'quote':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentQuotes
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
      // case 'approvals':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <ShipmentApprovals
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
      // case 'team':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <TeamTab
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
      // case 'tasks':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <TasksTab
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
      // case 'events':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <EventsTab
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
      // case 'comments':
      //   return (
      //     <>
      //       {/* <TabTitle section={tabId} buttonType="settings" /> */}
      //       <CommentsTab
      //         hubState={BoLHState}
      //         hubDispatch={dispatch}
      //         getViewPermissions={getViewPermissions}
      //         getWritingPermissions={getWritingPermissions}
      //         handleSubmit={handleSubmit}
      //         onSubmitRoute={onSubmitRoute}
      //         loggedEmail={loggedEmail}
      //         companyProfile={companyProfile}
      //       />
      //     </>
      //   )
        case 'instructions':
          return (
            <>
              {/* <TabTitle section={tabId} buttonType="settings" /> */}
              <ShipmentLocations
                hubState={BoLHState}
                hubDispatch={dispatch}
                getViewPermissions={getViewPermissions}
                getWritingPermissions={getWritingPermissions}
                handleSubmit={handleSubmit}
                onSubmitRoute={onSubmitRoute}
                loggedEmail={loggedEmail}
              />
            </>
          )
        case 'documents':
        return (
          <>
            {/* <TabTitle section={tabId} buttonType="settings" /> */}
            <ShipmentDocuments
              hubState={BoLHState}
              hubDispatch={dispatch}
              getViewPermissions={getViewPermissions}
              getWritingPermissions={getWritingPermissions}
              handleSubmit={handleSubmit}
              onSubmitRoute={onSubmitRoute}
              loggedEmail={loggedEmail}
              companyProfile={companyProfile}
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <Layout className="min-h-screen" hasSider>
      <AppHeadLayout tabTitle={`Hub: ${BoLHState?.folio}`} />
      <Layout style={{ minHeight: '100vh' }}>
        {contextHolder}
        <Affix offsetTop={top}>
          <Header className="bg-white pl-4 pr-4 ">
            {BoLHState?.companyName ? (
              <div className="h-12 max-w-full my-2 text-white float-left mr-4">
                <img
                  // src="/logo_camex.jpeg"
                  // src="/logo_w1s.jpeg"
                  src={companyLogo}
                  alt={`${BoLHState?.companyName} Logo`}
                  height="30"
                  className="float-left object-cover h-12"
                />
              </div>
            ) : null}
            <Text className="text-base font-medium">{i18n('operatorView')}</Text>
            <Space className="float-right">
              <LoggedUserMenu />
            </Space>
            {/* {BoLHState?.companyName !== undefined ? (
            <Text ellipsis>{BoLHState?.companyName}</Text>
          ) : null} */}
            {/* <Space className="float-right  ">
            {getViewPermissions('share') ? (
              <>
                <Button type="link" onClick={onClickShare}>
                  <a href="#top">{i18n(`newBillOfLadingHub.team.share`)}</a>
                </Button>
                {/* <Button onClick={onClickSettings}>{i18n('tasks')}</Button> */}
            {/* <Dropdown
                  menu={{items: shipmentHubActionMenuItems, selectable: true}}
                >
                  <Button type="primary" onClick={onClickSettings}>
                    <MoreOutlined />
                  </Button>
                </Dropdown>
              </>
            ) : null}
          </Space> */}
          </Header>
        </Affix>
        <HubDispatchContext.Provider value={dispatch}>
          <HubStateContext.Provider value={BoLHState}>
            <IdentificationSectionOperator
              hubState={BoLHState}
              hubDispatch={dispatch}
              isHubAuthorized
              getViewPermissions={getViewPermissions}
              getWritingPermissions={getWritingPermissions}
              emailInputRef={emailInputRef}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              setIsPart={setIsPart}
              isPart={isPart}
            />
            <Content className="site-layout py-5 pl-5 pr-5 w-full lg:w-3/4 mx-auto " style={{ minHeight: '100vh' }}>
             {tabSwitch(currentTab)}
              {/* <Drawer
                width="80%"
                onClose={onCloseShare}
                open={isShareVisible}
                styles={{
                  body: {
                    paddingBottom: 80,
                  },
                }}
                // eslint-disable-next-line prettier/prettier
                // extra={
                //   <Space>
                //     <Button onClick={() => setIsLocationVisible(false)}>Cancel</Button>
                //     {/* <Button onClick={() => setIsLocationVisible(false)} type="primary">
                //       {i18n('buttons.submit')}
                //     </Button> 
                //   </Space>
                //   // eslint-disable-next-line prettier/prettier
                // }
                key={1}
                destroyOnClose
              >
                <ShareWithTeam
                  initialState={BoLHState?.share}
                  BoLHFolio={BoLHState?.folio}
                  BoLHName={BoLHState?.name}
                  BoLHId={BoLHState?._id}
                  parentDispatch={dispatch}
                  emailInputRef={emailInputRef}
                  disabled={!getWritingPermissions('share')}
                />
              </Drawer> */}
              <Drawer
                width="80%"
                onClose={onCloseSettings}
                open={isSettingsVisible}
                styles={{
                  body: {
                    paddingBottom: 80,
                  },
                }}
                // eslint-disable-next-line prettier/prettier
                // extra={
                //   <Space>
                //     <Button onClick={() => setIsLocationVisible(false)}>Cancel</Button>
                //     {/* <Button onClick={() => setIsLocationVisible(false)} type="primary">
                //       {i18n('buttons.submit')}
                //     </Button> */}
                //   </Space>
                //   // eslint-disable-next-line prettier/prettier
                // }
                key="drawerSettings"
                destroyOnClose
              >
                {/* <BoLSettings
              initialState={BoLHState.share}
              BoLHFolio={BoLHState.folio}
              BoLHName={BoLHState.name}
              BoLHId={BoLHState._id}
              parentDispatch={dispatch}
              emailInputRef={emailInputRef}
            /> */}
              </Drawer>
            </Content>
          </HubStateContext.Provider>
        </HubDispatchContext.Provider>
        <Affix offsetBottom={0}>
          <div
            style={{
              textAlign: 'center',
            }}
            className="py-2 bg-tkyBlue-darkest text-white text-xs"
          >
            {new Date().getFullYear()} Powered by <Link href="https://www.taskility.com">Taskility</Link>
          </div>
        </Affix>
      </Layout>
    </Layout>
  )
}
