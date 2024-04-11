/* eslint-disable react/prop-types */
import React, { useState, useReducer, useEffect, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'
import { PageHeader } from '@ant-design/pro-layout'
import { EyeOutlined } from '@ant-design/icons'
import TaskilityPageHeader from '../../layout/taskility-page-header/taskilityPageHeader'
import {
  Layout,
  Space,
  Button,
  Menu,
  Empty,
  Card,
  Row,
  Col,
  Result,
  Tooltip,
  Divider,
  Radio,
  List,
  Spin,
  notification,
  DatePicker,
  Modal,
  Select,
  Form,
  Checkbox,
  InputNumber,
  Drawer,
  Typography,
  Table,
  Progress,
  Dropdown,
  message,
  Tag,
  Tabs,
} from 'antd'
import { LoadingOutlined, PlusOutlined, FilterOutlined, FontSizeOutlined, FileExcelOutlined, CopyOutlined } from '@ant-design/icons'
import { labelValueCurrencies, getCreditTermsCode } from '../../../services/catalogs'
import { num, numberFormat } from '../../../services/helpers/mathHelp'
import { i18n } from '../../../services/i18n'
import { post } from '../../../services/fetch'
import { AppHeader } from '../../layout/AppHeader'
import { SideMenu } from '../../layout/SideMenu'
import { downloadBase64File } from '../../../services/helpers/base64'
import { NewShipment } from './newShipment'
import { AppHeadLayout } from '../../layout/app-head-layout'
import { menuItemFormatter, menuGroupFormatter, menuDivider, subMenuFormatter } from '../../../services/helpers/antdMenuItemFormetter'
import { CommentCard } from './sections/commentCard'
import { datetimeFormat } from '../../../services/helpers/dateFormat'
import { CurrentUserContext } from '../../contexts/currentUser'
import { OperativeStatusDropdown, CollectStatusDropdown, SuppliersStatusDropdown } from './sections/statusDropdowns'
import { saveChangeInDB, newComment, newLog, sendNotifications, useGetHubStatus, useGetHubShare } from './actions/shipmentActions'
import dayjs from 'dayjs'
import { OnWatchToggle } from './onWatchToggle'

const { Option } = Select
const { Paragraph, Text } = Typography

// TODO: i18n "Ha ocurrido un error durante la operación"
const InvoiceListPageErrorState = ({ errorMessage }) => {
  const retryButton = (
    <Button href="/billing" type="primary" key="back">
      {i18n('retry')}
    </Button>
  )
  return <Result status="error" title="Ha ocurrido un error durante la operación" subTitle={i18n(errorMessage)} extra={retryButton} />
}

const InvoiceListPageLoadingState = () => <Empty image={<LoadingOutlined className="p-24 text-6xl" />} description="" />

const InvoiceListPageEmptyState = () => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>{i18n('billing.emptyPageDescription')}</span>} />
)

const CopyHubModal = ({ visible, hubIds, setVisible, originalHubs, hubCounter }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  // post('/api/shipment-hub/get-hubs-and-folio-for-hub-copy', { body: { hubIds }}).then(({ originalHubs, hubCounter }) => {
  //   console.log('originalHubs', originalHubs)
  //   console.log('hubCounter', hubCounter)
  //   setOriginalHubs(originalHubs)
  //   setHubCounter(hubCounter)
  // })

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    // console.log('Clicked cancel button')
    setVisible(false)
  }
  return (
    <Modal title="Title" open={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
      <p>modalText</p>
    </Modal>
  )
}

export const ShipmentList = ({
  dateRange,
  shipmentNumber,
  shipmentName,
  shipmentLocation,
  shipmentCurrency,
  shipmentTags,
  shipmentCompanies,
  shipmentTeams,
  shipmentUsers,
  shipmentProjects,
  shipmentClients,
  shipmentProviders,
  shipmentOperationStatus,
  shipmentCollectStatus,
  shipmentSupplierStatus,
  shipmentPendingTasks,
  shipmentAlarms,
  shipmentOnWatch,
  shipmentLoad,
  shipmentTrip,
  shipmentMode,
  shipmentService,
  shipmentRecurrence,
  shipmentUrgency,
  loggedUserProfile,
  isShipmentAuthorized,
  loggedUserIdData,
}) => {
  const [selectedHubIds, setSelectedHubIds] = useState([])
  const [messageApi, messageContextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [originalHubs, setOriginalHubs] = useState([])
  const [hubCounter, setHubCounter] = useState(1)
  const [copyModalVisible, setCopyModalVisible] = useState(false)
  const [scope, setScope] = useState('internal')
  const [api, contextHolder] = notification.useNotification()
  console.log({ dRBoLHList: dateRange[0].toISOString() })

  const listUrl = `/api/shipment/list?from=${dateRange[0].toISOString()}&to=${dateRange[1].toISOString()}&isInternal=${scope}&shipmentNumber=${shipmentNumber}&shipmentName=${shipmentName}&shipmentLocation=${shipmentLocation}&shipmentCurrency=${shipmentCurrency}&shipmentTags=${shipmentTags}&shipmentCompanies=${shipmentCompanies}&shipmentTeams=${shipmentTeams}&shipmentUsers=${shipmentUsers}&shipmentProjects=${shipmentProjects}&shipmentClients=${shipmentClients}&shipmentProviders=${shipmentProviders}&shipmentLoad=${shipmentLoad}&shipmentTrip=${shipmentTrip}&shipmentMode=${shipmentMode}&shipmentService=${shipmentService}&shipmentRecurrence=${shipmentRecurrence}&shipmentUrgency=${shipmentUrgency}&shipmentOperationStatus=${shipmentOperationStatus}&shipmentCollectStatus=${shipmentCollectStatus}&shipmentSupplierStatus=${shipmentSupplierStatus}&shipmentPendingTasks=${shipmentPendingTasks}&shipmentAlarms=${shipmentAlarms}&shipmentOnWatch=${shipmentOnWatch}`
  const { data, error } = useSWR(listUrl, url => post(url, {}), { refreshInterval: 5000 })

  if (error) return <InvoiceListPageErrorState errorMessage={error} />
  if (!data) return <InvoiceListPageLoadingState />
  if (data.error) return <InvoiceListPageErrorState errorMessage={data.error} />
  if (data?.shipments?.length === 0) return <InvoiceListPageEmptyState />

  // Functions for row selection
  // Start function is only for demonstration purposes
  const start = () => {
    setLoading(true) // ajax request after empty completing
    // console.log('selectedHubIds', selectedHubIds)
    setTimeout(() => {
      setSelectedHubIds([])
      setLoading(false)
    }, 1000)
  }

  console.log({ function: 'shipmentsList', shipmentNumber, scope })

  const onSelectChange = newSelectedHubIds => {
    // console.log('selectedHubIds changed: ', selectedHubIds)
    setSelectedHubIds(newSelectedHubIds)
  }

  const rowSelection = {
    selectedHubIds,
    onChange: onSelectChange,
  }
  const hasSelected = selectedHubIds.length > 0

  // Function to copyHub one row only
  const copyHub = id => {
    post(`/api/shipment-hub/copy-single-hub?id=${id}`)
      // eslint-disable-next-line
      .catch(error => console.log(error))
  }

  // Function to copyWith modal
  const copyMultipleHubWithModal = hubIds => {
    post('/api/shipment-hub/get-hubs-and-folio-for-hub-copy', { body: { hubIds } }).then(({ originalHubs, hubCounter }) => {
      // console.log('originalHubs', originalHubs)
      // console.log('hubCounter', hubCounter)
      setOriginalHubs(originalHubs)
      setHubCounter(hubCounter)
    })
    setCopyModalVisible(true)
  }

  // Function to copy multiple hubs
  const copyMultipleHub = hubIds => {
    setLoading(true)
    // hubIds.map(hubId => {
    //   copyHub(hubId)
    //   return null
    // })
    // console.log('hubIds FrontEnd', hubIds)
    const { result, insertedIds } = post(`/api/shipment-hub/copy-multiple-hubs`, { body: hubIds })
      // eslint-disable-next-line
      .catch(error => console.log(error))
    // console.log('result', result)
    // if (result.ok === 1) {
    // message.success(`${result.n} ${i18n('newBillOfLadingHub.multipleHubsCopiedMessage')}`)
    message.success(`${i18n('newBillOfLadingHub.multipleHubsCopiedMessage')}`)
    setSelectedHubIds([])
    // }
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }

  const onOk = async payload => {
    console.log({ payload, loggedUserIdData })

    const statusResponse = await fetch(payload.hubId ? `api/shipment-hub/get-hub-status?id=${payload.hubId}` : null, {
      method: 'POST',
      headers: { 'content-type': 'aplication/json' },
    }).then(response => response.json())
    const shareResponse = await fetch(payload.hubId ? `api/shipment-hub/get-hub-share?id=${payload.hubId}` : null, {
      method: 'POST',
      headers: { 'content-type': 'aplication/json' },
    }).then(response => response.json())

    // if (!statusResponse && !shareResponse) {
    //   api.open({
    //     key: 'getHubData',
    //     type: 'loading',
    //     content: 'Loading...',
    //   })
    // }
    // if (statusResponse && shareResponse) {
    //   api.open({
    //     key: 'getHubData',
    //     type: 'success',
    //     content: 'Loaded!',
    //     duration: 2,
    //   })
    // }
    const status = { ...statusResponse, ...payload.shipmentState }

    console.log({ statusResponse, shareResponse, status })

    saveChangeInDB(payload.hubId, 'Update', {
      status,
      lastComment: payload.lastComment,
    })
    newComment({ hubId: payload.hubId, ...payload.lastComment })
    newLog({ name: 'shipmentHub.statusChanged', category: 'operative' }, { hubId: payload.hubId, ...payload?.log }, loggedUserIdData)
    sendNotifications(payload.hubId, shareResponse, api)
  }

  console.log()

  // console.log('data', data)
  const columnsForInternalUsers = [
    {
      title: <EyeOutlined />,
      dataIndex: 'onWatch',
      key: 'onWatch',
      width: 40,
      render: (text, record) => <OnWatchToggle  shipmentId={record._id} onWatch={record.onWatch} />
    },
    {
      title: i18n('newShipment.tags.shipment'),
      dataIndex: 'folio',
      key: 'folio',
      width: 120,
      render: (text, record) => (
        <div>
          <Paragraph className="mb-1 text-xs">{record.folio}</Paragraph>
          <Paragraph className="mt-0 text-xs font-medium">
            <a href={`/shipment/${record._id}`}>{record.name || record.folio}</a>
          </Paragraph>
        </div>
      ),
    },
    {
      title: i18n('customer'),
      dataIndex: 'customer',
      key: 'customer',
      width: 120,
      ellipsis: true,
      render: (text, record) => (
        <div>
          <Paragraph className="my-0 text-xs font-medium" ellipsis>
            {record.customerName}
          </Paragraph>
        </div>
      ),
    },

    // {
    //   title: i18n('carrier'),
    //   dataIndex: 'carrier',
    //   key: 'carrier',
    //   render: (text, record) => (
    //     <div>
    //       <Paragraph className="my-0 text-xs font-medium">{record.companyName}</Paragraph>
    //     </div>
    //   ),
    //   responsive: ['lg'],
    // },
    {
      title: i18n('origin'),
      dataIndex: 'origin',
      key: 'origin',
      render: (text, record) => (
        <div>
          <Paragraph className="my-0 text-xs font-semibold">{`${record.origin.city}, ${record.origin.state}`}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.origin.country}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.origin.date}</Paragraph>
        </div>
      ),
      responsive: ['lg'],
    },
    {
      title: i18n('destination'),
      dataIndex: 'destination',
      key: 'destination',
      render: (text, record) => (
        <div>
          <Paragraph className="my-0 text-xs font-semibold">{`${record.destination.city}, ${record.destination.state}`}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.destination.country}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.destination.date}</Paragraph>
        </div>
      ),
      responsive: ['lg'],
    },
    {
      title: i18n('price'),
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (text, record) => (
        <>
          <Paragraph className="my-0 text-xs font-semibold">{numberFormat(record.price) || 'Not available'}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.currency || '---'}</Paragraph>
        </>
      ),
      responsive: ['sm'],
    },
    {
      title: i18n('lastComment'),
      dataIndex: 'lastComment',
      key: 'lastComment',
      width: 280,
      render: (text, record) => {
        // console.log('commentRecord', { record })
        return (
          <div>
            <CommentCard
              avatarContent={record.lastComment?.user?.initials}
              avatarName={record.lastComment?.user?.name}
              avatarSrc={record.lastComment?.user?.profilePhoto}
              dateTime={datetimeFormat(record.lastComment?.date) || ''}
              comment={record.lastComment?.text}
              section={record.lastComment?.section || ''}
              ellipsis={{ rows: 2, expandable: true }}
              style={{ padding: '0px', height: '100%', background: 'rgba(255,255,255,0)' }}
              bodyStyle={{ padding: '0px', marginTop: '0px', background: 'rgba(255,255,255,0)' }}
            />
            {/* <Paragraph className="my-0 text-xs font-medium">{record.lastComment}</Paragraph> */}
          </div>
        )
      },
      responsive: ['lg'],
    },
    {
      title: i18n('operations'),
      dataIndex: 'operations',
      key: 'operations',
      render: (text, record) => (
        <>
          {/* <Tag className="w-full text-center py-1" color={record.operativeStatusColor}>
            {i18n(`shipmentStatusMenu.${record.operativeStatus || 'requested'}`)}
          </Tag> */}
          <OperativeStatusDropdown
            statusColor={record.operativeStatusColor}
            statusText={record.operativeStatus}
            loggedUserProfile={loggedUserIdData}
            onOk={onOk}
            hubId={record._id}
          />
        </>
      ),
    },
    {
      title: i18n('collection'),
      dataIndex: 'collection',
      key: 'collection',
      render: (text, record) => (
        <>
          {/* <Tag className="w-full text-center py-1" color={record.collectStatusColor}>
            {i18n(`shipmentStatusMenu.${record.collectStatus || 'noInvoice'}`)}
          </Tag> */}
          <CollectStatusDropdown
            statusColor={record.collectStatusColor}
            statusText={record.collectStatus}
            loggedUserProfile={loggedUserIdData}
            onOk={onOk}
            hubId={record._id}
          />
        </>
      ),
      responsive: ['sm'],
    },
    {
      title: i18n('suppliers'),
      dataIndex: 'suppliers',
      key: 'suppliers',
      render: (text, record) => (
        <>
          {/* <Tag className="w-full text-center py-1" color={record.supplierStatusColor}>
            {i18n(`shipmentStatusMenu.${record.supplierStatus || 'noInvoice'}`)}
          </Tag> */}
          <SuppliersStatusDropdown
            statusColor={record.supplierStatusColor}
            statusText={record.supplierStatus}
            loggedUserProfile={loggedUserIdData}
            onOk={onOk}
            hubId={record._id}
          />
        </>
      ),
      responsive: ['sm'],
    },
    // {
    //   title: i18n('price'),
    //   dataIndex: 'price',
    //   key: 'price',
    //   render: (text, record) => (
    //     <>
    //       <Paragraph className="my-0 text-xs font-semibold">{numberFormat(record.price) || 'Not available'}</Paragraph>
    //       <Paragraph className="my-1 text-xs">{record.currency || '---'}</Paragraph>
    //     </>
    //   ),
    //   responsive: ['sm'],
    // },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Dropdown overlay={actionsMenu(record._id)} placement="bottomRight">
    //         <Button type="link">
    //           <MoreOutlined />
    //         </Button>
    //       </Dropdown>
    //     </Space>
    //   ),
    // },
  ]

  const columnsForExternalUsers = [
    {
      title: i18n('newShipment.tags.shipment'),
      dataIndex: 'folio',
      key: 'folio',
      render: (text, record) => (
        <div>
          <Paragraph className="mt-1 text-xs">{record.folio}</Paragraph>
          <Paragraph className="my-0 text-xs font-medium">
            <a href={`/shipment/${record._id}`}>{record.name || record.folio}</a>
          </Paragraph>
        </div>
      ),
    },
    {
      title: i18n('carrier'),
      dataIndex: 'carrier',
      key: 'carrier',
      ellipsis: true,
      width: 120,
      render: (text, record) => (
        <div>
          <Paragraph className="my-0 text-xs font-medium">{record.companyName}</Paragraph>
        </div>
      ),
    },
    {
      title: i18n('origin'),
      dataIndex: 'origin',
      key: 'origin',
      render: (text, record) => (
        <div>
          <Paragraph className="my-0 text-xs font-semibold">{`${record.origin.city}, ${record.origin.state}`}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.origin.country}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.origin.date}</Paragraph>
        </div>
      ),
      responsive: ['sm'],
    },
    {
      title: i18n('destination'),
      dataIndex: 'destination',
      key: 'destination',
      render: (text, record) => (
        <div>
          <Paragraph className="my-0 text-xs font-semibold">{`${record.destination.city}, ${record.destination.state}`}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.destination.country}</Paragraph>
          <Paragraph className="my-1 text-xs">{record.destination.date}</Paragraph>
        </div>
      ),
      responsive: ['sm'],
    },
    {
      title: i18n('operations'),
      dataIndex: 'operations',
      key: 'operations',
      render: (text, record) => (
        <Tag className="w-full text-center py-1" color={record.operativeStatusColor}>
          {i18n(`shipmentStatusMenu.${record.operativeStatus || 'requested'}`)}
        </Tag>
      ),
    },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Dropdown overlay={actionsMenu(record._id)} placement="bottomRight">
    //         <Button type="link">
    //           <MoreOutlined />
    //         </Button>
    //       </Dropdown>
    //     </Space>
    //   ),
    // },
  ]

  const dataForTable = data?.shipments?.map(shipment => {
    const generalInfoComplete = shipment?.status?.generalInfoComplete ? 1 : 0
    const locationsComplete = shipment?.status?.locationsComplete ? 1 : 0
    const goodsComplete = shipment?.status?.goodsComplete ? 1 : 0
    const transportsComplete = shipment?.status?.transportsComplete ? 1 : 0
    const pricesComplete = shipment?.status?.pricesComplete ? 1 : 0
    const status = (100 * (generalInfoComplete + locationsComplete + goodsComplete + transportsComplete + pricesComplete)) / 5
    const isHubAndUserFromSameCompany = loggedUserProfile?.companyId === shipment.companyId
    const locations = shipment?.locations?.locations || []
    const origins = locations
      .filter(location => location?.locationType?.print === 'Origen')
      .map(location => {
        return {
          company: location?.company?.name ? location?.company?.name : null,
          date: location?.departureArrivalDateTime?.print ? location?.departureArrivalDateTime?.print : null,
          place: location?.place ? location?.place : null,
        }
      })
    const destinations = locations
      .filter(location => location?.locationType?.print === 'Destino')
      .map(location => {
        return {
          company: location?.company?.name ? location?.company?.name : null,
          date: location?.departureArrivalDateTime?.print ? location?.departureArrivalDateTime?.print : null,
          place: location?.place ? location?.place : null,
        }
      })
    const totalPrice = shipment?.prices?.quotations?.map(item => item.total).reduce((partialSum, a) => partialSum + a, 0)
    console.log({ quotations: shipment?.prices?.quotations?.length > 0 ? shipment?.prices?.quotations[0].currency : null })
    // const priceTotal = shipment?.prices?.quotations ? shipment?.prices?.quotations.map()
    // console.log({ origin: origins[0], destination: destinations[destinations.length-1] }, origins.length, destinations.length )
    if (isHubAndUserFromSameCompany)
      return {
        key: shipment?._id,
        folio: shipment?.folio,
        _id: shipment?._id,
        name: shipment?.name,
        onWatch: shipment?.onWatch || false,
        customerName: shipment?.clientName || '---',
        lastComment: shipment?.lastComment || {},
        companyName: shipment?.companyName || '---',
        origin: {
          city: origins?.length > 0 ? origins[0].place?.satAddress?.locality?.satDescription || origins[0].place?.satAddress?.locality : '',
          state:
            origins?.length > 0
              ? origins[0].place?.satAddress?.politicalState?.satCode || origins[0].place?.satAddress?.politicalState
              : '',
          country: origins?.length > 0 ? origins[0].place?.satAddress?.country : '',
          date: origins?.length > 0 ? origins[0].date : '',
        },
        destination: {
          city:
            destinations?.length > 0
              ? destinations[destinations.length - 1].place?.satAddress?.locality?.satDescription ||
                destinations[destinations.length - 1].place?.satAddress?.locality
              : '',
          state:
            destinations?.length > 0
              ? destinations[destinations.length - 1].place?.satAddress?.politicalState?.satCode ||
                destinations[destinations.length - 1].place?.satAddress?.politicalState
              : '',
          country: destinations?.length > 0 ? destinations[destinations.length - 1].place?.satAddress?.country : '',
          date: destinations?.length > 0 ? destinations[destinations.length - 1].date : '',
        },
        operativeStatus: shipment.operativeStatus?.text || 'requested',
        operativeStatusColor: shipment.operativeStatus?.color || '#bbbbbb',
        collectStatus: shipment.collectStatus?.text || 'noInvoice',
        collectStatusColor: shipment.collectStatus?.color || '#bbbbbb',
        supplierStatus: shipment.suppliersStatus?.text || 'noInvoice',
        supplierStatusColor: shipment.suppliersStatus?.color || '#bbbbbb',
        price: totalPrice || 0,
        currency: shipment?.prices?.quotations?.length > 0 ? shipment?.prices?.quotations[0].currency : '---',
        status: status,
        originCompany: origins?.length > 0 ? origins[0]?.company : undefined,
        originDate: origins?.length > 0 ? origins[0]?.date : undefined,
        originPlace: origins?.length > 0 ? origins[0]?.place : undefined,
        originCountry: origins?.length > 0 ? origins[0]?.satAddress?.country : undefined,
        originState: origins?.length > 0 ? origins[0]?.satAddress?.politicalState : undefined,
        destinationCompany: destinations?.length > 0 ? destinations[destinations.length - 1]?.company : undefined,
        destinationDate: destinations?.length > 0 ? destinations[destinations.length - 1]?.date : undefined,
        destinationPlace: destinations?.length > 0 ? destinations[destinations.length - 1]?.place : undefined,
        destinationCountry: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.country : undefined,
        destinationState: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.politicalState : undefined,
      }
    return {
      key: shipment._id,
      folio: shipment.folio,
      _id: shipment._id,
      name: shipment.name,
      customerName: '---',
      companyName: shipment?.companyName || '---',
      // origin: {
      //   city: origins?.length > 0 ? origins[0]?.satAddress?.locality?.satDescription : '',
      //   state: origins?.length > 0 ? origins[0]?.satAddress?.politicalState?.satCode : '',
      //   country: origins?.length > 0 ? origins[0]?.satAddress?.country : '',
      //   date: origins?.length > 0 ? origins[0]?.date : '',
      // },
      // destination: {
      //   city: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.locality?.satDescription : '',
      //   state: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.politicalState?.satCode : '',
      //   country: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.country : '',
      //   date: destinations?.length > 0 ? destinations[destinations.length - 1]?.date : '',
      // },
      origin: {
        city: origins?.length > 0 ? origins[0].place?.satAddress?.locality?.satDescription || origins[0].place?.satAddress?.locality : '',
        state:
          origins?.length > 0
            ? origins[0].place?.satAddress?.politicalState?.satCode || origins[0].place?.satAddress?.politicalState
            : '',
        country: origins?.length > 0 ? origins[0].place?.satAddress?.country : '',
        date: origins?.length > 0 ? origins[0].date : '',
      },
      destination: {
        city:
          destinations?.length > 0
            ? destinations[destinations.length - 1].place?.satAddress?.locality?.satDescription ||
              destinations[destinations.length - 1].place?.satAddress?.locality
            : '',
        state:
          destinations?.length > 0
            ? destinations[destinations.length - 1].place?.satAddress?.politicalState?.satCode ||
              destinations[destinations.length - 1].place?.satAddress?.politicalState
            : '',
        country: destinations?.length > 0 ? destinations[destinations.length - 1].place?.satAddress?.country : '',
        date: destinations?.length > 0 ? destinations[destinations.length - 1].date : '',
      },
      operativeStatus: shipment.operativeStatus?.text || 'No status',
      operativeStatusColor: shipment.operativeStatus?.color || '#bbbbbb',
      collectStatus: 'No status',
      collectStatusColor: '#bbbbbb',
      supplierStatus: 'No status',
      supplierStatusColor: '#bbbbbb',
      status: status,
      originCompany: origins?.length > 0 ? origins[0]?.company : undefined,
      originDate: origins?.length > 0 ? origins[0]?.date : undefined,
      originPlace: origins?.length > 0 ? origins[0]?.place : undefined,
      destinationCompany: destinations?.length > 0 ? destinations[destinations.length - 1]?.company : undefined,
      destinationDate: destinations?.length > 0 ? destinations[destinations.length - 1]?.date : undefined,
      destinationPlace: destinations?.length > 0 ? destinations[destinations.length - 1]?.place : undefined,
      price: 0,
      currency: '---',
    }
  })

  // Actions Menu for Multiple Hubs at a time
  // const actionsMenuForMultipleHubs = hubIds => {
  //   return (
  //     <Menu>
  //       <Menu.Item key="copyHub" icon={<CopyOutlined />} onClick={() => copyMultipleHub(hubIds)} disabled={selectedHubIds.length === 0}>
  //         <span className="ml-2">{i18n('buttons.copy')}</span>
  //       </Menu.Item>

  //       {/* <Menu.Item key='deleteHub' icon={<DeleteOutlined />}>
  //       <span className="ml-2">{i18n('buttons.cancel')}</span>
  //     </Menu.Item> */}
  //     </Menu>
  //   )
  // }

  const actionsMenuForMultipleHubsItems = [
    menuItemFormatter({
      key: 'copyHubs',
      icon: <CopyOutlined />,
      label: <span className="ml-2">{i18n('buttons.copy')}</span>,
      disabled: selectedHubIds.length === 0,
    }),
  ]

  const tabsItems = [
    {
      key: 'internal',
      label: i18n('shipment.myCompanyShipments'),
      children: (
        <Table
          // rowSelection={rowSelection}
          columns={columnsForInternalUsers}
          dataSource={dataForTable}
          className="mt-0 w-full"
          bordered={false}
          pagination={false}
        />
      ),
    },
    {
      key: 'external',
      label: i18n('shipment.externalShipments'),
      children: (
        <Table
          // rowSelection={rowSelection}
          columns={columnsForExternalUsers}
          dataSource={dataForTable}
          className="mt-0 w-full"
          bordered={false}
          pagination={false}
        />
      ),
    },
  ]

  const handleTabClick = (key, event) => {
    // console.log("tabclick",{ key })
    setScope(key)
  }

  // console.log('dataForTable',dataForTable)
  return (
    // <Row gutter={[16, 16]} className="pt-4 justify-center">
    //   {data.shipments.map(shipment=> (
    //     <Col key={shipment._id}>
    //       <BoLHCard BoLHub={BoLHub} />
    //     </Col>
    //   ))}
    // </Row>
    <div>
      {/*  // TODO: Review what to do with actions on Table. Actions to do when you select several embarques. 
      
      <Space className="mt-4">
        <Dropdown menu={{ items: actionsMenuForMultipleHubsItems, onClick: () => copyMultipleHub(selectedHubIds) }} placement="bottomLeft">
          <Button type="default" disabled={!hasSelected} loading={loading}>
            <MoreOutlined /> {i18n('buttons.actions')}
          </Button>
        </Dropdown>
        {selectedHubIds.length > 0 ? (
          <Text className="text-sm">{`${selectedHubIds.length} ${i18n('newBillOfLadingHub.hubsSelected')}`}</Text>
        ) : null}
      </Space> */}
      <div className="bg-white w-full mb-0 mt-4">
        <Tabs defaultActiveKey={scope} items={tabsItems} className="mx-4 pt-4" onTabClick={handleTabClick} />
      </div>
      {/* <Table
        rowSelection={rowSelection}
        columns={isShipmentAuthorized ? columnsForInternalUsers : columnsForExternalUsers}
        dataSource={dataForTable}
        className="mt-0"
        bordered={false}
        pagination={false}
      /> */}
      <CopyHubModal
        visible={copyModalVisible}
        hubIds={selectedHubIds}
        setVisible={setCopyModalVisible}
        originalHubs={originalHubs}
        hubCounter={hubCounter}
      />
    </div>
  )
}

// export const ShipmentsListPage = () => {
//   const currentUser = useContext(CurrentUserContext)
//   const defaultDateRange = [dayjs().subtract(30, 'days'), dayjs()] // Before: [moment().startOf('month'), moment().endOf('month')]
//   const [dateRange, setDateRange] = useState(defaultDateRange)
//   const [cfdiType, setCfdiType] = useState('')
//   const [cfdiStatus, setCfdiStatus] = useState('')
//   const [BoLHUsers, setBoLHUsers] = useState('')
//   const [BoLHClients, setBoLHClients] = useState('')
//   const [collapsedMenu, setCollapsedMenu] = useState(true)

//   const [isShipmentAuthorized, setIsBoLHAuthorized] = useState(false)
//   const [loggedEmail, setLoggedEmail] = useState()
//   const [companyProfile, setCompanyProfile] = useState()
//   const [loggedUserProfile, setLoggedUserProfile] = useState()
//   const [loggedUserIdData, setLoggedUserIdData] = useState()

//   useEffect(() => {
//     setIsBoLHAuthorized(currentUser.isHubAuthorized || false)
//     setLoggedEmail(currentUser.loggedUserIdData?.email || '')
//     setCompanyProfile(currentUser.companyProfile || {})
//     setLoggedUserProfile(currentUser.loggedUserProfile || {})
//     setLoggedUserIdData(currentUser.loggedUserIdData || {})
//   }, [currentUser])
//   // useEffect(() => {
//   //   post('/api/logged-user/get-authorizations')
//   //     .then(({ ok, loggedUserLicenses, loggedUserEmail, loggedUserProfile, companyProfile, error, loggedUserIdData }) => {
//   //       if (loggedUserLicenses) {
//   //         // console.log('loggedUserLicences', loggedUserLicenses)
//   //         loggedUserLicenses.map(license => {
//   //           if (license.licenseName === 'BoLHub') {
//   //             // console.log('licenseName', license.licenseName, 'license.active', license.active)
//   //             setIsBoLHAuthorized(license.active)
//   //             // console.log('isShipmentAuthorized', isShipmentAuthorized)
//   //           }
//   //           return null
//   //         })
//   //       }
//   //       if (loggedUserEmail) setLoggedEmail(loggedUserEmail)
//   //       // console.log('loggedUserEmail', loggedUserEmail)
//   //       // if (!error) setFinished('signed')
//   //       // setApiError(error, details?.message || '')
//   //       if (companyProfile) setCompanyProfile(companyProfile)
//   //       if (loggedUserProfile) setLoggedUserProfile(loggedUserProfile)
//   //       if (loggedUserIdData) setLoggedUserIdData(loggedUserIdData)
//   //       console.log({ loggedUserProfile })
//   //     })
//   //     // eslint-disable-next-line no-console
//   //     .catch(error => console.log(error))
//   // }, [])

//   const onDateRangeChange = dates => {
//     setDateRange(dates ? [dates[0].startOf('day'), dates[1].endOf('day')] : defaultDateRange)
//     console.log({ dateRange })
//   }

//   const toggleMenu = () => {
//     setCollapsedMenu(!collapsedMenu)
//   }

//   const [page, setPage] = useState('bill-of-lading')
//   // console.log({currentUser})

//   console.log('BillOfLadingPage', { loggedUserIdData })
//   return (
//     <Layout className="min-h-screen" hasSider>
//       <AppHeadLayout tabTitle={i18n('billOfLading.title')} />
//       <Layout>
//         <AppHeader toggleMenu={toggleMenu} collapsed={collapsedMenu} />
//         <Layout.Content className="p-4">
//           <TaskilityPageHeader
//             dateRange={dateRange}
//             cfdiType={cfdiType}
//             onBoLHClientsChange={setBoLHClients}
//             // onCfdiStatusChange={setCfdiStatus}
//             onBoLHUsersChange={setBoLHUsers}
//             // onCfdiTypeChange={setCfdiType}
//             onDateRangeChange={onDateRangeChange}
//             // cfdiStatus={cfdiStatus}
//             BoLHUsers={BoLHUsers}
//             BoLHClients={BoLHClients}
//             isShipmentAuthorized={isShipmentAuthorized}
//             loggedUserProfile={loggedUserProfile}
//             companyProfile={companyProfile}
//           />
//           {/* <BillOfLadingPageHeader
//             dateRange={dateRange}
//             cfdiType={cfdiType}
//             onBoLHClientsChange={setBoLHClients}
//             // onCfdiStatusChange={setCfdiStatus}
//             onBoLHUsersChange={setBoLHUsers}
//             // onCfdiTypeChange={setCfdiType}
//             onDateRangeChange={onDateRangeChange}
//             // cfdiStatus={cfdiStatus}
//             BoLHUsers={BoLHUsers}
//             BoLHClients={BoLHClients}
//             isShipmentAuthorized={isShipmentAuthorized}
//             loggedUserProfile={loggedUserProfile}
//             companyProfile={companyProfile}
//           /> */}
//           <ShipmentList
//             dateRange={dateRange}
//             BoLHClients={BoLHClients}
//             BoLHUsers={BoLHUsers}
//             loggedUserProfile={loggedUserProfile}
//             isShipmentAuthorized={isShipmentAuthorized}
//             loggedUserIdData={loggedUserIdData}
//           />
//         </Layout.Content>
//       </Layout>
//       <SideMenu collapsed={collapsedMenu} page={page} />
//     </Layout>
//   )
// }
