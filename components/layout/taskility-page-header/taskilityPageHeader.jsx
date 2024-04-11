import React, { useEffect, useState } from 'react'
import { i18n } from '../../../services/i18n'
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import {
  CloseCircleOutlined,
  ControlOutlined,
  EnvironmentOutlined,
  FileExcelOutlined,
  FilterOutlined,
  FontSizeOutlined,
  LineChartOutlined,
  MoreOutlined,
  PlusOutlined,
  UserOutlined,
  TableOutlined,
} from '@ant-design/icons'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { NewShipmentHub } from '../../pages/billOfLading/newShipmentHub'
import { currencies } from '../../../services/catalogs'
import { defineStatusColor } from '../../pages/shipments/sections/statusDropdowns'
import { debounce } from '../../../services/db/debounceTools'
import { NewShipment } from '../../pages/shipments/newShipment'

const { Title, Text } = Typography
const { Option } = Select

const testOptions = [
  {
    label: <span>Manager</span>,
    title: 'manager',
    options: [
      {
        label: <span>Jack</span>,
        value: 'Jack',
      },
      {
        label: <span>Lucy</span>,
        value: 'Lucy',
      },
    ],
  },
  {
    label: <span>Engineer</span>,
    title: 'engineer',
    options: [
      {
        label: <span>Chloe</span>,
        value: 'Chloe',
      },
      {
        label: <span>Lucas</span>,
        value: 'Lucas',
      },
    ],
  },
]

const operativeStatusSelectOptions = [
  {
    label: i18n('shipmentStatusMenu.requested'),
    title: i18n('shipmentStatusMenu.requested'),
    options: [
      {
        value: 'requested',
        label: i18n('shipmentStatusMenu.requested'),
      },
      {
        value: 'quoted',
        label: i18n('shipmentStatusMenu.quoted'),
      },
    ],
  },
  {
    label: i18n('shipmentStatusMenu.requested'),
    title: i18n('shipmentStatusMenu.requested'),
    options: [
      {
        value: 'requested',
        label: i18n('shipmentStatusMenu.requested'),
      },
      {
        value: 'quoted',
        label: i18n('shipmentStatusMenu.quoted'),
      },
    ],
  },
]

const DownloadShipmentListCsvButton = ({
  dateRange,
  reportType,
  label,
  tooltip,
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
  shipmentLoad,
  shipmentTrip,
  shipmentMode,
  shipmentService,
  shipmentRecurrence,
  shipmentUrgency,
  shipmentOperationStatus,
  shipmentCollectStatus,
  shipmentSupplierStatus,
  shipmentPendingTasks,
  shipmentAlarms,
  shipmentOnWatch,
}) => {
  const downloadCsv = () => {
    const url = `/api/shipment/list-csv?from=${dateRange[0].toISOString()}&to=${dateRange[1].toISOString()}&shipmentNumber=${shipmentNumber}&shipmentName=${shipmentName}&shipmentLocation=${shipmentLocation}&shipmentCurrency=${shipmentCurrency}&shipmentTags=${shipmentTags}&shipmentCompanies=${shipmentCompanies}&shipmentTeams=${shipmentTeams}&shipmentUsers=${shipmentUsers}&shipmentProjects=${shipmentProjects}&shipmentClients=${shipmentClients}&shipmentProviders=${shipmentProviders}&shipmentLoad=${shipmentLoad}&shipmentTrip=${shipmentTrip}&shipmentMode=${shipmentMode}&shipmentService=${shipmentService}&shipmentRecurrence=${shipmentRecurrence}&shipmentUrgency=${shipmentUrgency}&shipmentOperationStatus=${shipmentOperationStatus}&shipmentCollectStatus=${shipmentCollectStatus}&shipmentSupplierStatus=${shipmentSupplierStatus}&shipmentPendingTasks=${shipmentPendingTasks}&shipmentAlarms=${shipmentAlarms}&shipmentOnWatch=${shipmentOnWatch}&reportType=${reportType}`
    post(url)
      .then(({ csvData, count, error }) => {
        if (error) notification.error({ message: 'Error', description: i18n(error) })
        else if (count > 0) downloadBase64File(`data:text/csv;charset=utf-8;base64,${btoa(csvData)}`, `${reportType}.csv`)
      })
      .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
  }
  // const disabled =
  //   cfdiType && cfdiType.length !== 0
  //     ? (reportType === 'billing' && !cfdiType.includes('invoice') && !cfdiType.includes('creditNote')) ||
  //       (reportType === 'paymentProofs' && !cfdiType.includes('paymentProof'))
  //     : false

  return (
    <Tooltip placement="topLeft" title={i18n(tooltip)} mouseEnterDelay={0} onClick={downloadCsv}>
      <Button icon={<FileExcelOutlined />} disabled={false} style={{ width: '100%' }} className="text-left">
        {i18n(label)}
      </Button>
    </Tooltip>
  )
}

const TaskilityPageHeader = ({
  dateRange,
  // cfdiType,
  // cfdiStatus,
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
  shipmentLoad,
  shipmentTrip,
  shipmentMode,
  shipmentService,
  shipmentRecurrence,
  shipmentUrgency,
  shipmentOperationStatus,
  shipmentCollectStatus,
  shipmentSupplierStatus,
  shipmentPendingTasks,
  shipmentAlarms,
  shipmentOnWatch,
  onDateRangeChange,
  onShipmentNumberChange,
  onShipmentNameChange,
  onShipmentLocationChange,
  onShipmentCurrencyChange,
  onShipmentTagsChange,
  onShipmentCompaniesChange,
  onShipmentTeamsChange,
  onShipmentUsersChange,
  onShipmentProjectsChange,
  onShipmentClientsChange,
  onShipmentProvidersChange,
  onShipmentOperationStatusChange,
  onShipmentCollectStatusChange,
  onShipmentSupplierStatusChange,
  onShipmentAlarmsChange,
  onShipmentPendingTasksChange,
  onShipmentOnWatchChange,
  onShipmentLoadChange,
  onShipmentTripChange,
  onShipmentModeChange,
  onShipmentServiceChange,
  onShipmentRecurrenceChange,
  onShipmentUrgencyChange,
  isShipmentAuthorized,
  loggedUserProfile,
  companyProfile,
  setSelectedView,
  selectedView
}) => {
  const [selectedToolbar, setSelectedToolbar] = useState('')
  const [isNewShipmentHubVisible, setIsNewShipmentHubVisible] = useState('')
  const [viewValue, setViewValue] = useState('table')
  const [isWaitingData, setIsWaitingData] = useState(false)
  const [form] = Form.useForm()

  const { data: data, error: Error } = useSWR('/api/shipment/get-selects-options-data', url => fetch(url).then(res => res.json()))

  console.log({ shipmentTags, shipmentOperationStatus, shipmentCollectStatus })
  // const { clientsData, usersData } = data
  // console.log('data in BillOfLadingHubPage', data)

  const companiesData = data?.data?.companiesData
  const teamsData = data?.data?.teamsData
  const usersData = data?.data?.usersData?.users
  const projectsData = data?.data?.projectsData
  const clientsData = data?.data?.clientsData
  const suppliersData = data?.data?.suppliersData

  useEffect(() => {
    // if (!clientsData || !data.ok) {
    //   setIsWaitingData(true)
    // } else if (!usersData || !data.ok) {
    //   setIsWaitingData(true)
    if (!companiesData || !teamsData || !usersData || !projectsData || !clientsData || !suppliersData || !data.ok) {
      setIsWaitingData(true)
    } else {
      setIsWaitingData(false)
    }
  }, [clientsData, companiesData, data, projectsData, suppliersData, teamsData, usersData])

  const handleMenuClick = () => {
    return null
  }
  const handleAddClick = () => {
    setIsNewShipmentHubVisible(true)
  }
  const items = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  const toolBars = {
    appearance: (
      <Space>
        <Button icon={<FontSizeOutlined />} />
      </Space>
    ),
    filters: (
      // TODO: Make a separate component filtersToolBar
      <div className="text-left w-full pr-1">
        {/* Filter by Shipments Main Data */}
        <Divider orientation="center" plain>
          {i18n(`filters.byData`)}
        </Divider>
        <Form layout="inline" className="w-full -mr-3" form={form}>
          <Row gutter={[8, 8]} wrap justify="end" className="w-full">
            {/* Filter by Shipments Number */}
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
              {/* <Select allowClear
              showSearch
              onChange={onShipmentClientsChange}
              placeholder={i18n('filters.shipmentsNumber')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            /> */}
              <Form.Item className="mr-0" name="shipmentNumber">
                <Input
                  allowClear
                  placeholder={i18n('filters.shipmentsNumber')}
                  style={{ width: '100%' }}
                  onChange={e => {
                    const value = e.target.value
                    onShipmentNumberChange(value)
                    console.log({ shipmentNumber: e.target.value })
                  }}
                />
              </Form.Item>
            </Col>

            {/* Filter by Shipments Name */}
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
              <Form.Item className="mr-0" name="shipmentName">
                <Input
                  allowClear
                  placeholder={i18n('filters.shipmentsName')}
                  style={{ width: '100%' }}
                  onChange={e => {
                    const value = e.target.value
                    onShipmentNameChange(value)
                    console.log({ shipmentName: value })
                  }}
                />
              </Form.Item>
              {/* <Select allowClear
              showSearch
              onChange={onShipmentClientsChange}
              placeholder={i18n('filters.shipmentsName')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            /> */}
            </Col>
            {/* Filter by Shipments Location */}
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
              <Form.Item className="mr-0" name="shipmentLocation">
                <Input
                  allowClear
                  placeholder={i18n('newShipment.locations.singular')}
                  style={{ width: '100%' }}
                  onChange={e => {
                    const value = e.target.value
                    onShipmentLocationChange(value)
                    console.log({ shipmentLocation: value })
                  }}
                />
              </Form.Item>
              {/* <Select allowClear
              showSearch
              onChange={onShipmentClientsChange}
              placeholder={i18n('newShipment.locations.singular')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            /> */}
            </Col>

            {/* Filter by Shipments Tags */}
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
              <Form.Item className="mr-0" name="shipmentTags">
                <Input
                  allowClear
                  placeholder={i18n('shipment.menu.tags')}
                  style={{ width: '100%' }}
                  onChange={e => {
                    const value = e.target.value
                    onShipmentTagsChange(value)
                    console.log({ shipmentLocation: value })
                  }}
                  defaultValue={shipmentTags}
                />
              </Form.Item>
              {/* <Select allowClear
              showSearch
              onChange={onShipmentClientsChange}
              placeholder={i18n('shipment.menu.tags')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            /> */}
            </Col>
            {/* Filter by Shipments Currency */}
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
              <Select
                allowClear
                showSearch
                onChange={onShipmentCurrencyChange}
                placeholder={i18n('newCfdi.invoiceDetailsStep.currency')}
                mode="multiple"
                style={{ width: '100%' }}
                tokenSeparators={[',']}
                value={shipmentCurrency === '' ? null : shipmentCurrency}
                options={currencies?.map(({ code, name }) => ({ value: code, label: `${code} - ${name}` }))}
                filterOption={
                  (input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                optionFilterProp="label"
                filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
              />
            </Col>

            {/* Filter by Shipments Date Range */}
            <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
              <DatePicker.RangePicker
                // defaultValue={[moment().startOf('month'), moment().endOf('month')]}
                defaultValue={[dayjs().startOf('month'), dayjs().endOf('month')]}
                value={dateRange}
                onChange={onDateRangeChange}
                style={{ width: '100%' }}
                presets={[
                  { label: i18n('billing.toolbars.today'), value: () => [dayjs(), dayjs()] },
                  { label: i18n('billing.toolbars.week'), value: () => [dayjs().startOf('week'), dayjs().endOf('week')] },
                  {
                    label: i18n('billing.toolbars.lastMonth'),
                    value: () => [dayjs().subtract(1, 'months').startOf('month'), dayjs().subtract(1, 'months').endOf('month')],
                  },
                  { label: i18n('billing.toolbars.thisMonth'), value: () => [dayjs().startOf('month'), dayjs().endOf('month')] },
                  { label: i18n('billing.toolbars.thisQuarter'), value: () => [dayjs().startOf('quarter'), dayjs().endOf('quarter')] },
                  { label: i18n('billing.toolbars.thisYear'), value: () => [dayjs().startOf('year'), dayjs().endOf('year')] },
                ]}
              />
            </Col>
          </Row>
        </Form>

        {/* Filter by Shipments Group of People */}
        <Divider orientation="center" plain>
          {i18n(`filters.byGroup`)}
        </Divider>
        <Row gutter={[8, 8]} wrap justify="end">
          {/* Filter by Company */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentCompaniesChange}
              placeholder={i18n('newShipment.costs.company')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentCompanies === '' ? null : shipmentCompanies}
              options={companiesData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            />
          </Col>

          {/* Filter by Team */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentTeamsChange}
              placeholder={i18n('team')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentTeams === '' ? null : shipmentTeams}
              options={teamsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            />
          </Col>

          {/* Filter by User */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentUsersChange}
              placeholder={i18n('users.role.user')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentUsers === '' ? null : shipmentUsers}
              options={usersData?.map(({ _id, username }) => ({ value: _id, label: username }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            />
          </Col>

          {/* Filter by Project */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentProjectsChange}
              placeholder={i18n('newQuote.steps.project')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentProjects === '' ? null : shipmentProjects}
              options={projectsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            />
          </Col>

          {/* Filter by Customer */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentClientsChange}
              placeholder={i18n('customer')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentClients === '' ? null : shipmentClients}
              options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            />
          </Col>

          {/* Filter by Provider */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentProvidersChange}
              placeholder={i18n('filters.provider')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentProviders === '' ? null : shipmentProviders}
              options={suppliersData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              filterOption={
                (input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // eslint-disable-next-line react/jsx-curly-newline
              }
              optionFilterProp="label"
              filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            />
          </Col>
        </Row>

        {/* Filter by Shipments Status */}
        <Divider orientation="center" plain>
          {i18n(`filters.byStatus`)}
        </Divider>
        <Row gutter={[8, 8]} wrap justify="end">
          {/* Filter by Operational Status */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentOperationStatusChange}
              placeholder={i18n('operations')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentOperationStatus === '' ? null : shipmentOperationStatus}
              // options={operativeStatusSelectOptions}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Select.OptGroup
                key="requestedMenu"
                label={i18n('shipmentStatusMenu.requested')}
                title={i18n('shipmentStatusMenu.requested')}
              >
                <Option key="requested" value="requested">
                  <Badge color={defineStatusColor('requested')} text={i18n('shipmentStatusMenu.requested')} />
                </Option>
                <Option key="quoted" value="quoted">
                  <Badge color={defineStatusColor('quoted')} text={i18n('shipmentStatusMenu.quoted')} />
                </Option>
                <Option key="acceptedByCustomer" value="acceptedByCustomer">
                  <Badge color={defineStatusColor('acceptedByCustomer')} text={i18n('shipmentStatusMenu.acceptedByCustomer')} />
                </Option>
                <Option key="rejectedByCustomer" value="rejectedByCustomer">
                  <Badge color={defineStatusColor('rejectedByCustomer')} text={i18n('shipmentStatusMenu.rejectedByCustomer')} />
                </Option>
                <Option key="canceledByCustomer" value="canceledByCustomer">
                  <Badge color={defineStatusColor('canceledByCustomer')} text={i18n('shipmentStatusMenu.canceledByCustomer')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup key="bookingMenu" label={i18n('shipmentStatusMenu.booking')} title={i18n('shipmentStatusMenu.booking')}>
                <Option key="booking" value="booking">
                  <Badge color={defineStatusColor('booking')} text={i18n('shipmentStatusMenu.booking')} />
                </Option>
                <Option key="schedulingVehicle" value="schedulingVehicle">
                  <Badge color={defineStatusColor('schedulingVehicle')} text={i18n('shipmentStatusMenu.schedulingVehicle')} />
                </Option>
                <Option key="confirmedVehicle" value="confirmedVehicle">
                  <Badge color={defineStatusColor('confirmedVehicle')} text={i18n('shipmentStatusMenu.confirmedVehicle')} />
                </Option>
                <Option key="noVehicleAvailable" value="noVehicleAvailable">
                  <Badge color={defineStatusColor('noVehicleAvailable')} text={i18n('shipmentStatusMenu.noVehicleAvailable')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup key="pickupMenu" label={i18n('shipmentStatusMenu.pickup')} title={i18n('shipmentStatusMenu.pickup')}>
                <Option key="pickup" value="pickup">
                  <Badge color={defineStatusColor('pickup')} text={i18n('shipmentStatusMenu.pickup')} />
                </Option>
                <Option key="inRouteToPickup" value="inRouteToPickup">
                  <Badge color={defineStatusColor('inRouteToPickup')} text={i18n('shipmentStatusMenu.inRouteToPickup')} />
                </Option>
                <Option key="arrivingToPickup" value="arrivingToPickup">
                  <Badge color={defineStatusColor('arrivingToPickup')} text={i18n('shipmentStatusMenu.arrivingToPickup')} />
                </Option>
                <Option key="finishingLoading" value="finishingLoading">
                  <Badge color={defineStatusColor('finishingLoading')} text={i18n('shipmentStatusMenu.finishingLoading')} />
                </Option>
                <Option key="pickupProblems" value="pickupProblems">
                  <Badge color={defineStatusColor('pickupProblems')} text={i18n('shipmentStatusMenu.pickupProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="inTransitMenu"
                label={i18n('shipmentStatusMenu.inTransit')}
                title={i18n('shipmentStatusMenu.inTransit')}
              >
                <Option key="inTransit" value="inTransit">
                  <Badge color={defineStatusColor('inTransit')} text={i18n('shipmentStatusMenu.inTransit')} />
                </Option>
                <Option key="waitingDocuments" value="waitingDocuments">
                  <Badge color={defineStatusColor('waitingDocuments')} text={i18n('shipmentStatusMenu.waitingDocuments')} />
                </Option>
                <Option key="waitingAppointment" value="waitingAppointment">
                  <Badge color={defineStatusColor('waitingAppointment')} text={i18n('shipmentStatusMenu.waitingAppointment')} />
                </Option>
                <Option key="driverOnABreak" value="driverOnABreak">
                  <Badge color={defineStatusColor('driverOnABreak')} text={i18n('shipmentStatusMenu.driverOnABreak')} />
                </Option>
                <Option key="accident" value="accident">
                  <Badge color={defineStatusColor('accident')} text={i18n('shipmentStatusMenu.accident')} />
                </Option>
                <Option key="delay" value="delay">
                  <Badge color={defineStatusColor('delay')} text={i18n('shipmentStatusMenu.delay')} />
                </Option>
                <Option key="incident" value="incident">
                  <Badge color={defineStatusColor('incident')} text={i18n('shipmentStatusMenu.incident')} />
                </Option>
                <Option key="unknownETA" value="unknownETA">
                  <Badge color={defineStatusColor('unknownETA')} text={i18n('shipmentStatusMenu.unknownETA')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="borderCrossingMenu"
                label={i18n('shipmentStatusMenu.borderCrossing')}
                title={i18n('shipmentStatusMenu.borderCrossing')}
              >
                <Option key="borderCrossing" value="borderCrossing">
                  <Badge color={defineStatusColor('borderCrossing')} text={i18n('shipmentStatusMenu.borderCrossing')} />
                </Option>
                <Option key="leavingYard" value="leavingYard">
                  <Badge color={defineStatusColor('leavingYard')} text={i18n('shipmentStatusMenu.leavingYard')} />
                </Option>
                <Option key="waitingInLine" value="waitingInLine">
                  <Badge color={defineStatusColor('waitingInLine')} text={i18n('shipmentStatusMenu.waitingInLine')} />
                </Option>
                <Option key="customs" value="customs">
                  <Badge color={defineStatusColor('customs')} text={i18n('shipmentStatusMenu.customs')} />
                </Option>
                <Option key="customsGreen" value="customsGreen">
                  <Badge color={defineStatusColor('customsGreen')} text={i18n('shipmentStatusMenu.customsGreen')} />
                </Option>
                <Option key="endOfCrossing" value="endOfCrossing">
                  <Badge color={defineStatusColor('endOfCrossing')} text={i18n('shipmentStatusMenu.endOfCrossing')} />
                </Option>
                <Option key="customsRed" value="customsRed">
                  <Badge color={defineStatusColor('customsRed')} text={i18n('shipmentStatusMenu.customsRed')} />
                </Option>
                <Option key="crossingProblems" value="crossingProblems">
                  <Badge color={defineStatusColor('crossingProblems')} text={i18n('shipmentStatusMenu.crossingProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup key="deliveryMenu" label={i18n('shipmentStatusMenu.delivery')} title={i18n('shipmentStatusMenu.delivery')}>
                <Option key="delivery" value="delivery">
                  <Badge color={defineStatusColor('delivery')} text={i18n('shipmentStatusMenu.delivery')} />
                </Option>
                <Option key="arrivingToDelivery" value="arrivingToDelivery">
                  <Badge color={defineStatusColor('arrivingToDelivery')} text={i18n('shipmentStatusMenu.arrivingToDelivery')} />
                </Option>
                <Option key="startingToUnload" value="startingToUnload">
                  <Badge color={defineStatusColor('startingToUnload')} text={i18n('shipmentStatusMenu.startingToUnload')} />
                </Option>
                <Option key="finishingUnloading" value="finishingUnloading">
                  <Badge color={defineStatusColor('finishingUnloading')} text={i18n('shipmentStatusMenu.finishingUnloading')} />
                </Option>
                <Option key="delivered" value="delivered">
                  <Badge color={defineStatusColor('delivered')} text={i18n('shipmentStatusMenu.delivered')} />
                </Option>
                <Option key="deliveryProblems" value="deliveryProblems">
                  <Badge color={defineStatusColor('deliveryProblems')} text={i18n('shipmentStatusMenu.deliveryProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="proofOfDeliveryMenu"
                label={i18n('shipmentStatusMenu.proofOfDelivery')}
                title={i18n('shipmentStatusMenu.proofOfDelivery')}
              >
                <Option key="proofOfDelivery" value="proofOfDelivery">
                  <Badge color={defineStatusColor('proofOfDelivery')} text={i18n('shipmentStatusMenu.proofOfDelivery')} />
                </Option>
                <Option key="podUploaded" value="podUploaded">
                  <Badge color={defineStatusColor('podUploaded')} text={i18n('shipmentStatusMenu.podUploaded')} />
                </Option>
                <Option key="podApproved" value="podApproved">
                  <Badge color={defineStatusColor('podApproved')} text={i18n('shipmentStatusMenu.podApproved')} />
                </Option>
                <Option key="podRejected" value="podRejected">
                  <Badge color={defineStatusColor('podRejected')} text={i18n('shipmentStatusMenu.podRejected')} />
                </Option>
              </Select.OptGroup>
              <Option key="informationRequired" value="informationRequired">
                <Badge color={defineStatusColor('informationRequired')} text={i18n('shipmentStatusMenu.informationRequired')} />
              </Option>
              <Option key="documentationRequired" value="documentationRequired">
                <Badge color={defineStatusColor('documentationRequired')} text={i18n('shipmentStatusMenu.documentationRequired')} />
              </Option>
              <Option key="completed" value="completed">
                <Badge color={defineStatusColor('completed')} text={i18n('shipmentStatusMenu.completed')} />
              </Option>
              {/* <Select.OptGroup
                key="xwaitingDocumentsMenu"
                label={i18n('shipmentStatusMenu.xwaitingDocuments')}
                title={i18n('shipmentStatusMenu.xwaitingDocuments')}
              >
                <Option key="xwaitingDocuments" value="xwaitingDocuments">
                  <Badge color={defineStatusColor('xwaitingDocuments')} text={i18n('shipmentStatusMenu.xwaitingDocuments')} />
                </Option>
              </Select.OptGroup> */}
            </Select>
          </Col>

          {/* Filter by Collection Status */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentCollectStatusChange}
              placeholder={i18n('collection')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentCollectStatus === '' ? null : shipmentCollectStatus}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Select.OptGroup key="billingMenu" label={i18n('shipmentStatusMenu.billing')} title={i18n('shipmentStatusMenu.billing')}>
                <Option key="noInvoice" value="noInvoice">
                  <Badge color={defineStatusColor('noInvoice')} text={i18n('shipmentStatusMenu.noInvoice')} />
                </Option>
                <Option key="billed" value="billed">
                  <Badge color={defineStatusColor('billed')} text={i18n('shipmentStatusMenu.billed')} />
                </Option>
                <Option key="partiallyBilled" value="partiallyBilled">
                  <Badge color={defineStatusColor('partiallyBilled')} text={i18n('shipmentStatusMenu.partiallyBilled')} />
                </Option>
                <Option key="completelyBilled" value="completelyBilled">
                  <Badge color={defineStatusColor('completelyBilled')} text={i18n('shipmentStatusMenu.completelyBilled')} />
                </Option>
                <Option key="readyToBill" value="readyToBill">
                  <Badge color={defineStatusColor('readyToBill')} text={i18n('shipmentStatusMenu.readyToBill')} />
                </Option>
                <Option key="creditNoteEmitted" value="creditNoteEmitted">
                  <Badge color={defineStatusColor('creditNoteEmitted')} text={i18n('shipmentStatusMenu.creditNoteEmitted')} />
                </Option>
                <Option key="invoiceCancelled" value="invoiceCancelled">
                  <Badge color={defineStatusColor('invoiceCancelled')} text={i18n('shipmentStatusMenu.invoiceCancelled')} />
                </Option>
                <Option key="billingProblems" value="billingProblems">
                  <Badge color={defineStatusColor('billingProblems')} text={i18n('shipmentStatusMenu.billingProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="invoiceSentMenu"
                label={i18n('shipmentStatusMenu.invoiceSent')}
                title={i18n('shipmentStatusMenu.invoiceSent')}
              >
                <Option key="invoiceSent" value="invoiceSent">
                  <Badge color={defineStatusColor('invoiceSent')} text={i18n('shipmentStatusMenu.invoiceSent')} />
                </Option>
                <Option key="invoiceReceived" value="invoiceReceived">
                  <Badge color={defineStatusColor('invoiceReceived')} text={i18n('shipmentStatusMenu.invoiceReceived')} />
                </Option>
                <Option key="invoiceApprovedForPayment" value="invoiceApprovedForPayment">
                  <Badge
                    color={defineStatusColor('invoiceApprovedForPayment')}
                    text={i18n('shipmentStatusMenu.invoiceApprovedForPayment')}
                  />
                </Option>
                <Option key="invoiceProblems" value="invoiceProblems">
                  <Badge color={defineStatusColor('invoiceProblems')} text={i18n('shipmentStatusMenu.invoiceProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="paymentDelayMenu"
                label={i18n('shipmentStatusMenu.paymentDelay')}
                title={i18n('shipmentStatusMenu.paymentDelay')}
              >
                <Option key="daysDelayed30" value="daysDelayed30">
                  <Badge color={defineStatusColor('daysDelayed30')} text={i18n('shipmentStatusMenu.daysDelayed30')} />
                </Option>
                <Option key="daysDelayed60" value="daysDelayed60">
                  <Badge color={defineStatusColor('daysDelayed60')} text={i18n('shipmentStatusMenu.daysDelayed60')} />
                </Option>
                <Option key="daysDelayed90" value="daysDelayed90">
                  <Badge color={defineStatusColor('daysDelayed90')} text={i18n('shipmentStatusMenu.daysDelayed90')} />
                </Option>
                <Option key="daysDelayed120" value="daysDelayed120">
                  <Badge color={defineStatusColor('daysDelayed120')} text={i18n('shipmentStatusMenu.daysDelayed120')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup key="collectMenu" label={i18n('shipmentStatusMenu.collect')} title={i18n('shipmentStatusMenu.collect')}>
                <Option key="partiallyCollected" value="partiallyCollected">
                  <Badge color={defineStatusColor('partiallyCollected')} text={i18n('shipmentStatusMenu.partiallyCollected')} />
                </Option>
                <Option key="totallyCollected" value="totallyCollected">
                  <Badge color={defineStatusColor('totallyCollected')} text={i18n('shipmentStatusMenu.totallyCollected')} />
                </Option>
                <Option key="paymentProofEmitted" value="paymentProofEmitted">
                  <Badge color={defineStatusColor('paymentProofEmitted')} text={i18n('shipmentStatusMenu.paymentProofEmitted')} />
                </Option>
                <Option key="collectProblems" value="collectProblems">
                  <Badge color={defineStatusColor('collectProblems')} text={i18n('shipmentStatusMenu.collectProblems')} />
                </Option>
              </Select.OptGroup>
              <Option key="informationRequired" value="informationRequired">
                <Badge color={defineStatusColor('informationRequired')} text={i18n('shipmentStatusMenu.informationRequired')} />
              </Option>
              <Option key="documentationRequired" value="documentationRequired">
                <Badge color={defineStatusColor('documentationRequired')} text={i18n('shipmentStatusMenu.documentationRequired')} />
              </Option>
              <Option key="completed" value="completed">
                <Badge color={defineStatusColor('completed')} text={i18n('shipmentStatusMenu.completed')} />
              </Option>
            </Select>
          </Col>

          {/* Filter by Suppliers Status */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentSupplierStatusChange}
              placeholder={i18n('suppliers')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentSupplierStatus === '' ? null : shipmentSupplierStatus}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Select.OptGroup key="billingMenu" label={i18n('shipmentStatusMenu.billing')} title={i18n('shipmentStatusMenu.billing')}>
                <Option key="noInvoice" value="noInvoice">
                  <Badge color={defineStatusColor('noInvoice')} text={i18n('shipmentStatusMenu.noInvoice')} />
                </Option>
                <Option key="billed" value="billed">
                  <Badge color={defineStatusColor('billed')} text={i18n('shipmentStatusMenu.billed')} />
                </Option>
                <Option key="partiallyBilled" value="partiallyBilled">
                  <Badge color={defineStatusColor('partiallyBilled')} text={i18n('shipmentStatusMenu.partiallyBilled')} />
                </Option>
                <Option key="completelyBilled" value="completelyBilled">
                  <Badge color={defineStatusColor('completelyBilled')} text={i18n('shipmentStatusMenu.completelyBilled')} />
                </Option>
                <Option key="creditNoteEmitted" value="creditNoteEmitted">
                  <Badge color={defineStatusColor('creditNoteEmitted')} text={i18n('shipmentStatusMenu.creditNoteEmitted')} />
                </Option>
                <Option key="invoiceCancelled" value="invoiceCancelled">
                  <Badge color={defineStatusColor('invoiceCancelled')} text={i18n('shipmentStatusMenu.invoiceCancelled')} />
                </Option>
                <Option key="billingProblems" value="billingProblems">
                  <Badge color={defineStatusColor('billingProblems')} text={i18n('shipmentStatusMenu.billingProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="invoiceSentMenu"
                label={i18n('shipmentStatusMenu.invoiceSent')}
                title={i18n('shipmentStatusMenu.invoiceSent')}
              >
                <Option key="invoiceSent" value="invoiceSent">
                  <Badge color={defineStatusColor('invoiceSent')} text={i18n('shipmentStatusMenu.invoiceSent')} />
                </Option>
                <Option key="invoiceReceived" value="invoiceReceived">
                  <Badge color={defineStatusColor('invoiceReceived')} text={i18n('shipmentStatusMenu.invoiceReceived')} />
                </Option>
                <Option key="invoiceApprovedForPayment" value="invoiceApprovedForPayment">
                  <Badge
                    color={defineStatusColor('invoiceApprovedForPayment')}
                    text={i18n('shipmentStatusMenu.invoiceApprovedForPayment')}
                  />
                </Option>
                <Option key="invoiceProblems" value="invoiceProblems">
                  <Badge color={defineStatusColor('invoiceProblems')} text={i18n('shipmentStatusMenu.invoiceProblems')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup
                key="paymentDelayMenu"
                label={i18n('shipmentStatusMenu.paymentDelay')}
                title={i18n('shipmentStatusMenu.paymentDelay')}
              >
                <Option key="daysDelayed30" value="daysDelayed30">
                  <Badge color={defineStatusColor('daysDelayed30')} text={i18n('shipmentStatusMenu.daysDelayed30')} />
                </Option>
                <Option key="daysDelayed60" value="daysDelayed60">
                  <Badge color={defineStatusColor('daysDelayed60')} text={i18n('shipmentStatusMenu.daysDelayed60')} />
                </Option>
                <Option key="daysDelayed90" value="daysDelayed90">
                  <Badge color={defineStatusColor('daysDelayed90')} text={i18n('shipmentStatusMenu.daysDelayed90')} />
                </Option>
                <Option key="daysDelayed120" value="daysDelayed120">
                  <Badge color={defineStatusColor('daysDelayed120')} text={i18n('shipmentStatusMenu.daysDelayed120')} />
                </Option>
              </Select.OptGroup>
              <Select.OptGroup key="collectMenu" label={i18n('shipmentStatusMenu.collect')} title={i18n('shipmentStatusMenu.collect')}>
                <Option key="partiallyCollected" value="partiallyCollected">
                  <Badge color={defineStatusColor('partiallyCollected')} text={i18n('shipmentStatusMenu.partiallyCollected')} />
                </Option>
                <Option key="totallyCollected" value="totallyCollected">
                  <Badge color={defineStatusColor('totallyCollected')} text={i18n('shipmentStatusMenu.totallyCollected')} />
                </Option>
                <Option key="paymentProofEmitted" value="paymentProofEmitted">
                  <Badge color={defineStatusColor('paymentProofEmitted')} text={i18n('shipmentStatusMenu.paymentProofEmitted')} />
                </Option>
                <Option key="collectProblems" value="collectProblems">
                  <Badge color={defineStatusColor('collectProblems')} text={i18n('shipmentStatusMenu.collectProblems')} />
                </Option>
              </Select.OptGroup>
              <Option key="informationRequired" value="informationRequired">
                <Badge color={defineStatusColor('informationRequired')} text={i18n('shipmentStatusMenu.informationRequired')} />
              </Option>
              <Option key="documentationRequired" value="documentationRequired">
                <Badge color={defineStatusColor('documentationRequired')} text={i18n('shipmentStatusMenu.documentationRequired')} />
              </Option>
              <Option key="completed" value="completed">
                <Badge color={defineStatusColor('completed')} text={i18n('shipmentStatusMenu.completed')} />
              </Option>
            </Select>
          </Col>

          {/* Filter by Alarm Status */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentAlarmsChange}
              placeholder={i18n('filters.alarm')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentAlarms === '' ? null : shipmentAlarms}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="critical">{i18n(`alarms.critical`)}</Option>
              <Option value="alert">{i18n(`alarms.alert`)}</Option>
              <Option value="informative">{i18n(`alarms.informative`)}</Option>
            </Select>
          </Col>

          {/* Filter by Pending Tasks by Role */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentPendingTasksChange}
              placeholder={i18n('filters.pendingTasks')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentPendingTasks === '' ? null : shipmentPendingTasks}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="customer">{i18n(`guestRoles.customer`)}</Option>
              <Option value="shipper">{i18n(`guestRoles.shipper`)}</Option>
              <Option value="warehousePickup">{i18n(`guestRoles.warehousePickup`)}</Option>
              <Option value="carrierExecutive">{i18n(`guestRoles.carrierExecutive`)}</Option>
              <Option value="truckOperator">{i18n(`guestRoles.truckOperator`)}</Option>
              <Option value="customsAgent">{i18n(`guestRoles.customsAgent`)}</Option>
              <Option value="warehouseDelivery">{i18n(`guestRoles.warehouseDelivery`)}</Option>
              <Option value="receiver">{i18n(`guestRoles.receiver`)}</Option>
              <Option value="observer">{i18n(`guestRoles.observer`)}</Option>
              <Option value="shipmentAdministrator">{i18n(`guestRoles.shipmentAdministrator`)}</Option>
              <Option value="manager">{i18n(`guestRoles.manager`)}</Option>
            </Select>
          </Col>

          {/* Filter by On Watch Status */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentOnWatchChange}
              placeholder={i18n('filters.onWatch')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentOnWatch === '' ? null : shipmentOnWatch}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value={true}>{i18n(`filters.onWatch`)}</Option>
              <Option value={false}>{i18n(`filters.nonCritical`)}</Option>
            </Select>
          </Col>
        </Row>

        {/* Filter by Shipments Type */}
        <Divider orientation="center" plain>
          {i18n(`filters.byType`)}
        </Divider>
        <Row gutter={[8, 8]} wrap justify="end">
          {/* Filter by Load */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentLoadChange}
              placeholder={i18n('filters.load')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentLoad === '' ? null : shipmentLoad}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="general">{i18n(`newQuote.steps.loadCategories.general`)}</Option>
              <Option value="bulk">{i18n(`newQuote.steps.loadCategories.bulk`)}</Option>
              <Option value="perishable">{i18n(`newQuote.steps.loadCategories.perishable`)}</Option>
              <Option value="fragile">{i18n(`newQuote.steps.loadCategories.fragile`)}</Option>
              <Option value="cold">{i18n(`newQuote.steps.loadCategories.cold`)}</Option>
              <Option value="hazardous">{i18n(`newQuote.steps.loadCategories.hazardous`)}</Option>
            </Select>
          </Col>

          {/* Filter by Trip */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentTripChange}
              placeholder={i18n('filters.trip')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentTrip === '' ? null : shipmentTrip}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="oneWay">{i18n(`newQuote.steps.oneWay`)}</Option>
              <Option value="roundTrip">{i18n(`newQuote.steps.roundTrip`)}</Option>
            </Select>
          </Col>

          {/* Filter by Mode */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentModeChange}
              placeholder={i18n('filters.mode')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentMode === '' ? null : shipmentMode}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="land">{i18n(`newQuote.steps.land`)}</Option>
              <Option value="sea">{i18n(`newQuote.steps.sea`)}</Option>
              <Option value="air">{i18n(`newQuote.steps.air`)}</Option>
              <Option value="train">{i18n(`newQuote.steps.train`)}</Option>
              <Option value="multi">{i18n(`newQuote.steps.multi`)}</Option>
            </Select>
          </Col>

          {/* Filter by Service */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentServiceChange}
              placeholder={i18n('filters.service')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentService === '' ? null : shipmentService}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="export">{i18n(`newQuote.steps.export`)}</Option>
              <Option value="import">{i18n(`newQuote.steps.import`)}</Option>
              <Option value="national">{i18n(`newQuote.steps.national`)}</Option>
              <Option value="regional">{i18n(`newQuote.steps.regional`)}</Option>
              <Option value="local">{i18n(`newQuote.steps.local`)}</Option>
            </Select>
          </Col>

          {/* Filter by Recurrence */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentRecurrenceChange}
              placeholder={i18n('filters.recurrence')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentRecurrence === '' ? null : shipmentRecurrence}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="spot">{i18n(`newQuote.steps.spot`)}</Option>
              <Option value="project">{i18n(`newQuote.steps.project`)}</Option>
            </Select>
          </Col>

          {/* Filter by Urgency */}
          <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Select
              allowClear
              showSearch
              onChange={onShipmentUrgencyChange}
              placeholder={i18n('filters.urgency')}
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={shipmentUrgency === '' ? null : shipmentUrgency}
              // options={clientsData?.map(({ _id, name }) => ({ value: _id, label: name }))}
              // filterOption={
              //   (input, option) =>
              //     option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //     option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              //   // eslint-disable-next-line react/jsx-curly-newline
              // }
              // optionFilterProp="label"
              // filterSort={(optionA, optionB) => optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())}
            >
              <Option value="normal">{i18n(`newQuote.steps.normal`)}</Option>
              <Option value="expedited">{i18n(`newQuote.steps.expedited`)}</Option>
            </Select>
          </Col>
        </Row>

        {isShipmentAuthorized ? (
          <div>
            <Divider orientation="center" plain>
              {i18n(`billing.toolbars.downloadCsvs`)}
            </Divider>
            <Row gutter={[8, 8]} wrap justify="end">
              <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
                <DownloadShipmentListCsvButton
                  dateRange={dateRange}
                  reportType="operations"
                  label="newBillOfLadingHub.toolbars.downloadOperationsCsvButton"
                  tooltip="newBillOfLadingHub.toolbars.downloadOperationsCsvTooltip"
                  // cfdiType={cfdiType}
                  // cfdiStatus={cfdiStatus}
                  shipmentUsers={shipmentUsers}
                  shipmentClients={shipmentClients}
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
                <DownloadShipmentListCsvButton
                  dateRange={dateRange}
                  reportType="profit"
                  label="newBillOfLadingHub.toolbars.downloadProfitCsvButton"
                  tooltip="newBillOfLadingHub.toolbars.downloadProfitCsvTooltip"
                  // cfdiType={cfdiType}
                  // cfdiStatus={cfdiStatus}
                  shipmentUsers={shipmentUsers}
                  shipmentClients={shipmentClients}
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
                <DownloadShipmentListCsvButton
                  dateRange={dateRange}
                  reportType="contpaq"
                  label="newBillOfLadingHub.toolbars.downloadContpaqTxtButton"
                  tooltip="newBillOfLadingHub.toolbars.downloadContpaqTxtTooltip"
                  // cfdiType={cfdiType}
                  // cfdiStatus={cfdiStatus}
                  shipmentUsers={shipmentUsers}
                  shipmentClients={shipmentClients}
                />
              </Col>
              {/* <Col className="gutter-row" xs={24} sm={12} md={8} lg={8} xl={4} xxl={4}>
            <Button>{i18n('buttons.copy')}</Button>
          </Col> */}
            </Row>
          </div>
        ) : null}
      </div>
    ),
    pills: <Space />,
  }

  const clearAllFilters = () => {
    onDateRangeChange([dayjs().startOf('month'), dayjs().endOf('month')])
    onShipmentNumberChange('')
    onShipmentNameChange('')
    onShipmentLocationChange('')
    onShipmentCurrencyChange('')
    onShipmentTagsChange('')
    onShipmentCompaniesChange('')
    onShipmentTeamsChange('')
    onShipmentUsersChange('')
    onShipmentProjectsChange('')
    onShipmentClientsChange('')
    onShipmentProvidersChange('')
    onShipmentOperationStatusChange('')
    onShipmentCollectStatusChange('')
    onShipmentSupplierStatusChange('')
    onShipmentAlarmsChange('')
    onShipmentPendingTasksChange('')
    onShipmentOnWatchChange('')
    onShipmentLoadChange('')
    onShipmentTripChange('')
    onShipmentModeChange('')
    onShipmentServiceChange('')
    onShipmentRecurrenceChange('')
    onShipmentUrgencyChange('')
    form.resetFields()
  }

  return (
    <>
      <Row gutter={[8, 0]} wrap align="middle" className="bg-white py-3 pl-2 pr-2 rounded mx-0">
        <Col flex={2} className="text-left">
          <Text className="text-xl font-semibold">{i18n('shipment.title')}</Text>
        </Col>
        <Col className="text-right" xs={0} sm={5} md={5}>
          <Space>
            {selectedToolbar && (
              <Tooltip placement="top" title={i18n('filters.clearAll')}>
                <Button onClick={clearAllFilters} className="pt-[1px] pb-[6px] items-center">
                  <CloseCircleOutlined />
                </Button>
              </Tooltip>
            )}
            <Radio.Group value={selectedToolbar} onChange={event => setSelectedToolbar(event.target.value)}>
              {/* <Radio.Button value="appearance" onClick={() => setSelectedToolbar('')}>
                <FontSizeOutlined />
            </Radio.Button> */}
              <Radio.Button value="filters" onClick={() => setSelectedToolbar('')} disabled={isWaitingData}>
                <ControlOutlined />
              </Radio.Button>
            </Radio.Group>
          </Space>
          {/* <Divider className="ml-6" type="vertical" /> */}
        </Col>
        <Col className="text-right">
          <Radio.Group value={selectedView}>
            <Radio.Button value="table" onClick={() => setSelectedView('table')} disabled={isWaitingData}>
              <TableOutlined />
            </Radio.Button>
            <Radio.Button value="dashboard" onClick={() => setSelectedView('dashboard')} disabled={isWaitingData}>
              <LineChartOutlined />
            </Radio.Button>
            <Radio.Button value="map" onClick={() => setSelectedView('map')} disabled={isWaitingData}>
              <EnvironmentOutlined />
            </Radio.Button>
          </Radio.Group>

          {/* <Divider type="vertical" /> */}
        </Col>
        <Col className="text-right">
          {/* <Dropdown.Button menu={menuProps} onClick={handleAddClick} icon={<MoreOutlined />} type="primary" disabled={isWaitingData}>
            <PlusOutlined />
          </Dropdown.Button> */}
          <Button
            key="add"
            type="link"
            icon={<PlusOutlined />}
            onClick={() => {
              // router.push('/new-quote')
              setIsNewShipmentHubVisible(true)
            }}
            disabled={!isShipmentAuthorized}
          />
        </Col>
      </Row>
      <Row gutter={[8, 0]} wrap align="middle" className="bg-white py-3 pl-2 pr-2 rounded mx-0 antdSm:hidden " xs={22} sm={0}>
        <Col className="text-right" xs={24} sm={0} md={0}>
          <Space>
            {selectedToolbar && (
              <Tooltip placement="top" title={i18n('filters.clearAll')}>
                <Button onClick={clearAllFilters} className="pt-[1px] pb-[6px] items-center">
                  <CloseCircleOutlined />
                </Button>
              </Tooltip>
            )}
            <Radio.Group value={selectedToolbar} onChange={event => setSelectedToolbar(event.target.value)}>
              {/* <Radio.Button value="appearance" onClick={() => setSelectedToolbar('')}>
                <FontSizeOutlined />
            </Radio.Button> */}
              <Radio.Button value="filters" onClick={() => setSelectedToolbar('')} disabled={isWaitingData}>
                <ControlOutlined />
              </Radio.Button>
            </Radio.Group>
          </Space>
          {/* <Divider className="ml-6" type="vertical" /> */}
        </Col>
      </Row>
      {selectedToolbar && (
        <Row gutter={[8, 0]} wrap align="middle" className="bg-white py-3 pl-2 pr-2 rounded mx-0">
          {toolBars[selectedToolbar]}
        </Row>
      )}
      <Drawer
        width="80%"
        onClose={() => setIsNewShipmentHubVisible(false)}
        open={isNewShipmentHubVisible}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        // eslint-disable-next-line prettier/prettier
        // extra={
        //   <Space>
        //     <Button onClick={() => setIsNewShipmentHubVisible(false)}>Cancel</Button>
        //     {/* <Button onClick={() => setIsNewShipmentHubVisible(false)} type="primary">
        //       {i18n('buttons.submit')}
        //     </Button> */}
        //   </Space>
        //   // eslint-disable-next-line prettier/prettier
        // }
        key="NewBillOfLadingHub"
      >
        <NewShipment
          setIsNewShipmentHubVisible={setIsNewShipmentHubVisible}
          userProfile={loggedUserProfile}
          companyProfile={companyProfile}
        />
      </Drawer>
    </>
  )
}

export default TaskilityPageHeader
