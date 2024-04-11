/* eslint-disable react/prop-types */
import React, { useState, useReducer, useEffect, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'
import { PageHeader } from '@ant-design/pro-layout'
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
} from 'antd'
import {
  LoadingOutlined,
  PlusOutlined,
  FilterOutlined,
  FontSizeOutlined,
  FileExcelOutlined,
  MoreOutlined,
  DeleteOutlined,
  MailOutlined,
  WhatsAppOutlined,
  CopyOutlined,
} from '@ant-design/icons'
import { labelValueCurrencies, getCreditTermsCode } from '../../../services/catalogs'
import { num, numberFormat } from '../../../services/helpers/mathHelp'
import { i18n } from '../../../services/i18n'
import { post } from '../../../services/fetch'
import { AppHeader } from '../../layout/AppHeader'
import { SideMenu } from '../../layout/SideMenu'
import { downloadBase64File } from '../../../services/helpers/base64'
import { NewShipmentHub } from './newShipmentHub'
import { AppHeadLayout } from '../../layout/app-head-layout'
import { menuItemFormatter, menuGroupFormatter, menuDivider, subMenuFormatter } from '../../../services/helpers/antdMenuItemFormetter'
import { CommentCard } from './sections/commentCard'
import { datetimeFormat } from '../../../services/helpers/dateFormat'
import { CurrentUserContext } from '../../contexts/currentUser'
import { OperativeStatusDropdown, CollectStatusDropdown, SuppliersStatusDropdown } from './sections/statusDropdowns'
import { saveChangeInDB, newComment, newLog, sendNotifications, useGetHubStatus, useGetHubShare } from './actions/shipmentActions'
import dayjs from 'dayjs'

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

const CfdiTypeFilter = () => {
  return <div>{i18n('list')}</div> // TODO: i18n
}

const DownloadCfdiListCsvButton = ({ dateRange, reportType, label, tooltip, BoLHClients, BoLHUsers }) => {
  const downloadCsv = () => {
    const url = `/api/shipment-hub/list-csv?from=${dateRange[0].toISOString()}&to=${dateRange[1].toISOString()}&BoLHCients=${BoLHClients}&BoLHUsers=${BoLHUsers}&reportType=${reportType}`
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

const DueDateStatus = (createdAt, paymentConditions) => {
  if (paymentConditions === 'Contado') {
    return i18n('cfdiCard.status.cash')
  }
  const numberOfCreditDays = getCreditTermsCode(paymentConditions)
  const dueDate = moment(createdAt).add(numberOfCreditDays, 'days')
  dueDate.locale(i18n('locale'))
  const daysToDueDate = dueDate.fromNow()
  return `${i18n('cfdiCard.status.due')}: ${daysToDueDate}`
}

const BillOfLadingPageHeader = ({
  dateRange,
  // cfdiType,
  // cfdiStatus,
  BoLHUsers,
  BoLHClients,
  onDateRangeChange,
  onCfdiTypeChange,
  onCfdiStatusChange,
  onBoLHClientsChange,
  onBoLHUsersChange,
  isBoLHAuthorized,
  loggedUserProfile,
  companyProfile,
}) => {
  const router = useRouter()
  // const [isBoLHAuthorized, setIsBoLHAuthorized] = useState(false)
  // const [loggedEmail, setLoggedEmail] = useState()
  // const [companyProfile, setCompanyProfile] = useState()
  // const [loggedUserProfile, setLoggedUserProfile] = useState()

  // useEffect(() => {}, [isBoLHAuthorized, loggedEmail])
  // useEffect(() => {
  //   post('/api/logged-user/get-authorizations')
  //     .then(({ ok, loggedUserLicenses, loggedUserEmail, loggedUserProfile, companyProfile, error }) => {
  //       if (loggedUserLicenses) {
  //         // console.log('loggedUserLicences', loggedUserLicenses)
  //         loggedUserLicenses.map(license => {
  //           if (license.licenseName === 'BoLHub') {
  //             // console.log('licenseName', license.licenseName, 'license.active', license.active)
  //             setIsBoLHAuthorized(license.active)
  //             // console.log('isBoLHAuthorized', isBoLHAuthorized)
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
  //       console.log({loggedUserProfile})
  //     })
  //     // eslint-disable-next-line no-console
  //     .catch(error => console.log(error))
  // }, [])

  const selectToolbarReducer = (state, action) => {
    if (state === action) return ''
    return action
  }
  const [selectedToolbar, setSelectedToolbar] = useReducer(selectToolbarReducer, '')
  const [isNewShipmentHubVisible, setIsNewShipmentHubVisible] = useState(false)

  // Get Clients data to populate the Select Options in the Clients Filter
  // const { data: clientsData, error: clientsError } = useSWR('/api/billing/get-all-user-clients', url => fetch(url).then(res => res.json()))
  // useEffect(() => setIssuers(issuersData?.issuers), [issuersData])

  // Get Users data to populate the Select Options in the Users Filter
  // eslint-disable-next-line no-useless-rename
  const { data: data, error: Error } = useSWR('/api/billing/get-all-customers-and-users', url => fetch(url).then(res => res.json()))
  // const { clientsData, usersData } = data
  // console.log('data in BillOfLadingHubPage', data)

  const clientsData = data?.data?.clientsData
  const usersData = data?.data?.usersData?.users

  // console.log('usersData', usersData)
  // console.log('clientsData', clientsData)

  if (Error) return <div>client or user error: {Error}</div>
  if (!clientsData || !data.ok)
    return (
      <Card bordered={false} className="invoice-card w-full p-4">
        <Spin />
      </Card>
    )

  if (!usersData || !data.ok)
    return (
      <Card bordered={false} className="invoice-card w-full p-4">
        <Spin />
      </Card>
    )

  const toolBars = {
    appearance: (
      <Space>
        <Button icon={<FontSizeOutlined />} />
      </Space>
    ),
    filters: (
      // TODO: Make a separate component filtersToolBar
      <div className="text-left">
        <Divider orientation="right" plain>
          {i18n(`billing.toolbars.filters`)}
        </Divider>
        <Row gutter={[8, 8]} wrap justify="end">
          <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
            <Select
              showSearch
              onChange={onBoLHClientsChange}
              placeholder="Clientes"
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
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
            <Select
              showSearch
              onChange={onBoLHUsersChange}
              placeholder="Usuarios"
              mode="multiple"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              options={usersData.map(({ _id, username }) => ({ value: _id, label: username }))}
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
          {/* <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
            <Select onChange={onCfdiStatusChange} placeholder="Estado" style={{ width: '100%' }} mode="multiple" tokenSeparators={[',']}>
              <Option value="active">{i18n(`cfdiStatus.active`)}</Option>
              <Option value="payed">{i18n(`cfdiStatus.payed`)}</Option>
              <Option value="partiallyPayed">{i18n(`cfdiStatus.partiallyPayed`)}</Option>
              <Option value="payedWithoutComplement">{i18n(`cfdiStatus.payedWithoutComplement`)}</Option>
              <Option value="discounted">{i18n(`cfdiStatus.discounted`)}</Option>
              <Option value="totallyDiscounted">{i18n(`cfdiStatus.totallyDiscounted`)}</Option>
              <Option value="cancelPending">{i18n(`cfdiStatus.cancelPending`)}</Option>
              <Option value="canceled">{i18n(`cfdiStatus.canceled`)}</Option>
            </Select>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
            <Select onChange={onCfdiTypeChange} placeholder="CFDI Type" style={{ width: '100%' }} mode="multiple" tokenSeparators={[',']}>
              <Option value="invoice">{i18n(`cfdiType.invoice`)}</Option>
              <Option value="creditNote">{i18n(`cfdiType.creditNote`)}</Option>
              <Option value="paymentProof">{i18n(`cfdiType.paymentProof`)}</Option>
            </Select>
          </Col> */}
          <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
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
              // ranges={{
              //   [i18n('billing.toolbars.today')]: [moment(), moment()],
              // [i18n('billing.toolbars.week')]: [moment().startOf('week'), moment().endOf('week')],
              // [i18n('billing.toolbars.lastMonth')]: [
              //   moment().subtract(1, 'months').startOf('month'),
              //   moment().subtract(1, 'months').endOf('month'),
              // ],
              // [i18n('billing.toolbars.thisMonth')]: [moment().startOf('month'), moment().endOf('month')],
              // [i18n('billing.toolbars.thisQuarter')]: [moment().startOf('quarter'), moment().endOf('quarter')],
              //   [i18n('billing.toolbars.thisYear')]: [moment().startOf('year'), moment().endOf('year')],
              // }}
            />
          </Col>
        </Row>
        {isBoLHAuthorized ? (
          <div>
            <Divider orientation="right" plain>
              {i18n(`billing.toolbars.downloadCsvs`)}
            </Divider>
            <Row gutter={[8, 8]} wrap justify="end">
              <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
                <DownloadCfdiListCsvButton
                  dateRange={dateRange}
                  reportType="operations"
                  label="newBillOfLadingHub.toolbars.downloadOperationsCsvButton"
                  tooltip="newBillOfLadingHub.toolbars.downloadOperationsCsvTooltip"
                  // cfdiType={cfdiType}
                  // cfdiStatus={cfdiStatus}
                  BoLHUsers={BoLHUsers}
                  BoLHClients={BoLHClients}
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
                <DownloadCfdiListCsvButton
                  dateRange={dateRange}
                  reportType="profit"
                  label="newBillOfLadingHub.toolbars.downloadProfitCsvButton"
                  tooltip="newBillOfLadingHub.toolbars.downloadProfitCsvTooltip"
                  // cfdiType={cfdiType}
                  // cfdiStatus={cfdiStatus}
                  BoLHUsers={BoLHUsers}
                  BoLHClients={BoLHClients}
                />
              </Col>
              <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
                <DownloadCfdiListCsvButton
                  dateRange={dateRange}
                  reportType="contpaq"
                  label="newBillOfLadingHub.toolbars.downloadContpaqTxtButton"
                  tooltip="newBillOfLadingHub.toolbars.downloadContpaqTxtTooltip"
                  // cfdiType={cfdiType}
                  // cfdiStatus={cfdiStatus}
                  BoLHUsers={BoLHUsers}
                  BoLHClients={BoLHClients}
                />
              </Col>
              {/* <Col className="gutter-row" xs={24} sm={12} md={6} lg={6} xl={4} xxl={3}>
            <Button>{i18n('buttons.copy')}</Button>
          </Col> */}
            </Row>
          </div>
        ) : null}
      </div>
    ),
    pills: <Space />,
  }

  const extra = (
    <Row gutter={[8, 0]} wrap justify="end" align="middle">
      <Col>
        <Radio.Group value={selectedToolbar} onChange={event => setSelectedToolbar(event.target.value)}>
          {/* <Radio.Button value="appearance" onClick={() => setSelectedToolbar('')}>
          <FontSizeOutlined />
  </Radio.Button> */}
          <Radio.Button value="filters" onClick={() => setSelectedToolbar('')}>
            <FilterOutlined />
          </Radio.Button>
          {/* <Radio.Button value="pills" onClick={() => setSelectedToolbar('')}>
          <BarChartOutlined />
</Radio.Button> */}
        </Radio.Group>
      </Col>
      <Col>
        <Divider type="vertical" />
      </Col>
      {/* <Radio.Group>
        <Radio.Button value="pills" onClick={() => setSelectedToolbar('')}>
          <BarChartOutlined />
        </Radio.Button>
        <Radio.Button value="pills" onClick={() => setSelectedToolbar('')}>
          <BarChartOutlined />
        </Radio.Button>
        <Radio.Button value="pills" onClick={() => setSelectedToolbar('')}>
          <BarChartOutlined />
        </Radio.Button>
      </Radio.Group>
      <Divider type="vertical" /> */}
      <Col>
        <Button
          key="add"
          type="link"
          icon={<PlusOutlined />}
          onClick={() => {
            // router.push('/new-quote')
            setIsNewShipmentHubVisible(true)
          }}
          disabled={!isBoLHAuthorized}
        />
      </Col>
    </Row>
  )

  return (
    <PageHeader ghost={false} title={i18n('billOfLading.title')} subTitle={<CfdiTypeFilter />} extra={extra} className="text-right py-1">
      {selectedToolbar && toolBars[selectedToolbar]}
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
        <NewShipmentHub
          setIsNewShipmentHubVisible={setIsNewShipmentHubVisible}
          userProfile={loggedUserProfile}
          companyProfile={companyProfile}
        />
      </Drawer>
    </PageHeader>
  )
}

const CfdiTotalPill = ({ cfdi }) => {
  const { shortCurrency, total } = cfdi

  const totalText = ({ cfdiType, payments }) => {
    if (cfdiType !== 'paymentProof') {
      return `${shortCurrency} ${numberFormat(total)}`
    }
    const paymentsTotal = payments.reduce(
      (totals, { currency, amount }) => ({ ...totals, [currency]: totals[currency] ? totals[currency] + amount : amount }),
      {}
    )
    return Object.keys(paymentsTotal)
      .map(currency => `${currency} ${numberFormat(paymentsTotal[currency])}`)
      .join(', ')
  }

  const totalType = cfdiType => {
    if (cfdiType === 'invoice') {
      return 'totalType.invoiced'
    }
    if (cfdiType === 'creditNote') {
      return 'totalType.credited'
    }
    if (cfdiType === 'paymentProof') {
      return 'totalType.paid'
    }
    return null
  }

  return (
    <Card bordered={false}>
      <div className="text-xs text-shadow text-left">{i18n(totalType(cfdi.cfdiType))}</div>
      <div className="h-24 flex flex-col justify-center">
        <div className="text-2xl font-bold">{totalText(cfdi)}</div>
      </div>
    </Card>
  )
}

const PartialCreditNoteModal = ({ cfdi, isVisible, onChangeVisibility }) => {
  const { controler } = useForm
  const { partialCreditNoteState, setPartialCreditNoteState } = useState()
  const defaultValues = {
    id: null,
    cfdiId: cfdi._id,
    amount: null,
    currency: cfdi.shortCurrency,
    haveTax: false,
    haveIvaRet: false,
    tax: 0,
    ivaRet: 0,
    total: 0,
    maxAmount: 0,
  }

  const validateAdditionalItemForm = item => {
    const errors = {}
    if (!item.amount) errors.amount = 'newCfdi.modal.errors.amountIsRequired'
    if (!item.currency) errors.unit = 'newCfdi.modal.errors.currencyIsRequired'
    return errors
  }

  const resolver = values => {
    const validationErrors = validateAdditionalItemForm(values)
    const error = Object.keys(validationErrors).length > 0
    return { values: error ? {} : values, errors: validationErrors }
  }

  const { control, handleSubmit, errors, watch, setValue, reset } = useForm({ defaultValues, resolver })

  const setMaxAmount = () => {
    const hasTax = control.getValues().haveTax
    const hasIvaRet = control.getValues().haveIvaRet
    if (!hasTax && !hasIvaRet) return num(cfdi.total).div(1).minus(0.01).fixedVal(2)
    if (hasTax && !hasIvaRet) return num(cfdi.total).div(1.16).minus(0.01).fixedVal(2)
    if (!hasTax && hasIvaRet) return num(cfdi.total).div(0.96).minus(0.01).fixedVal(2)
    if (hasTax && hasIvaRet) return num(cfdi.total).div(1.12).minus(0.01).fixedVal(2)
    return null
  }

  const { id, amount, haveTax, haveIvaRet, tax, ivaRet } = watch()
  useEffect(() => setValue('tax', haveTax ? num(amount).times(0.16).val() : 0), [amount, haveTax, haveIvaRet])
  useEffect(() => setValue('ivaRet', haveIvaRet ? num(amount).times(0.04).val() : 0), [amount, haveIvaRet])
  useEffect(() => setValue('total', num(amount).plus(tax).minus(ivaRet).val()), [amount, tax, ivaRet])
  useEffect(() => setValue('maxAmount', setMaxAmount()), [haveTax, haveIvaRet])

  const onSubmit = () => {
    setValue('cfdiId', cfdi._id)
    const data = control.getValues()
    // setCancelInProgress(true)
    post('/api/billing/partial-credit-note-from-invoice', { body: data })
      .then(({ ok, message, error }) => {
        if (error) notification.error({ message: 'Error', description: i18n(error) })
        if (ok) notification.info({ message: 'Info', description: i18n(message) })
      })
      .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
    // .finally(() => setCancelInProgress(false))
    reset(defaultValues)
  }

  const handleCancel = e => {
    e.stopPropagation()
    onChangeVisibility(false)
  }

  return (
    <Modal visible={isVisible} onCancel={handleCancel} footer={null} title={i18n('cfdiCard.modal.title')} handleSubmit={handleSubmit}>
      <div>{`${i18n('cfdiCard.modal.instruction1')} ${cfdi.folio}.`}</div>
      <div>{`${i18n('cfdiCard.modal.instruction2')}${numberFormat(cfdi.total)} ${cfdi.shortCurrency}.`}</div>
      <br />
      <div>{i18n('cfdiCard.modal.question')}</div>
      <br />
      <Form layout="vertical" onFinish={e => onSubmit()}>
        <Controller name="id" control={control} />
        <Form.Item
          label={i18n('cfdiCard.modal.amount')}
          validateStatus={errors.amount && 'error'}
          help={errors.amount && i18n('cfdiCard.modal.errors.amount')}
        >
          <Controller
            name="amount"
            as={InputNumber}
            className="w-full"
            placeholder={i18n('cfdiCard.modal.amount')}
            max={control.getValues().maxAmount}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            control={control}
          />
        </Form.Item>
        <Form.Item label={i18n('cfdiCard.modal.currency')} style={{ width: '100%' }}>
          <Controller
            name="currency"
            as={Select}
            className="w-full"
            placeholder={i18n('cfdiCard.modal.currency')}
            optionFilterProp="children"
            filterOption={(input, { label }) => label.toLowerCase().includes(input.toLowerCase())}
            showSearch
            options={labelValueCurrencies}
            control={control}
            defaultValue={cfdi.shortCurrency}
            disabled
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label={i18n('newCfdi.additionalItem.tax')}>
            <Controller
              name="haveTax"
              control={control}
              render={({ value, onChange }) => <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
            />
            <Controller className="w-full" name="tax" as={InputNumber} control={control} disabled defaultValue={0} />
          </Form.Item>
          <Form.Item label={i18n('newCfdi.additionalItem.ivaRet')}>
            <Controller
              name="haveIvaRet"
              control={control}
              render={({ value, onChange }) => <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
            />
            <Controller className="w-full" name="ivaRet" as={InputNumber} control={control} disabled defaultValue={0} />
          </Form.Item>
        </div>
        <Form.Item label={i18n('newCfdi.additionalItem.total')}>
          <Controller className="w-full" name="total" as={InputNumber} control={control} disabled defaultValue={0} />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item>
            <Button htmlType="button" onClick={handleCancel} style={{ width: '100%' }}>
              {i18n('cfdiCard.modal.cancel')}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleCancel} style={{ width: '100%' }}>
              {i18n('cfdiCard.modal.ok')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
const BoLHCard = ({ BoLHub }) => {
  const [cancelInProgress, setCancelInProgress] = useState(false)
  const [notificationStarted, setNotificationStarted] = useState(false)
  const [partialCreditNoteModalVisible, setPartialCreditNoteModalVisible] = useState(false)
  const handleChangeVisibility = isVisible => {
    setPartialCreditNoteModalVisible(isVisible)
  }

  const cancelCfdi = (cfdiId, cfdi) => {
    if (cancelInProgress) return
    const cancelMessage = `Va a iniciar la cancelación directa del Cfdi ${cfdi.folio} de ${cfdi.issuer.name} 
    por valor de $${numberFormat(cfdi.total)} ${cfdi.shortCurrency}.`
    Modal.confirm({
      title: `Cancelar ${i18n(cfdi.cfdiType)}`,
      content: (
        <div>
          <div>{cancelMessage}</div>
          <br />
          <div>Desea continuar?</div>
        </div>
      ),
      okText: 'Si',
      okButtonProps: { danger: true },
      cancelText: 'No',
      onOk: () => {
        setCancelInProgress(true)
        post('/api/billing/cancel-cfdi', { body: { cfdiId } })
          .then(({ ok, message, error }) => {
            if (error) notification.error({ message: 'Error', description: i18n(error) })
            if (ok) notification.info({ message: 'Info', description: message })
          })
          .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
          .finally(() => setCancelInProgress(false))
      },
    })
  }

  const cancelCfdiWithCreditNote = (cfdiId, cfdi) => {
    if (cancelInProgress) return
    const cancelMessage = `Va a iniciar la cancelación de la factura ${cfdi.folio} de ${cfdi.issuer.name} mediante la creación de una nota 
    crédito por valor de $${numberFormat(cfdi.total)} ${cfdi.shortCurrency} a favor de ${cfdi.receiver.name}.`
    Modal.confirm({
      title: 'Cancelar factura con nota crédito',
      content: (
        <div>
          <div>{cancelMessage}</div>
          <br />
          <div>¿Desea continuar?</div>
        </div>
      ),
      okText: 'Si',
      okButtonProps: { danger: true },
      cancelText: 'No',
      onOk: () => {
        setCancelInProgress(true)
        post('/api/billing/credit-note-from-invoice', { body: { cfdiId } })
          .then(({ ok, message, error }) => {
            if (error) notification.error({ message: 'Error', description: i18n(error) })
            if (ok) notification.info({ message: 'Info', description: i18n(message) })
          })
          .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
          .finally(() => setCancelInProgress(false))
      },
    })
  }

  const downloadXml = (cfdiId, folio) => () => {
    post('/api/billing/get-cfdi-xml', { body: { cfdiId } })
      .then(({ ok, xmlDocument, error }) => {
        if (error) notification.error({ message: 'Error', description: i18n(error) })
        if (ok) downloadBase64File(xmlDocument, `${folio}.xml`)
      })
      .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
  }

  const sendNotification = cfdiId => {
    if (cancelInProgress) return
    setNotificationStarted(true)
    post('/api/billing/send-new-cfdi-notification', { body: { cfdiId } })
      .then(({ ok, message, error }) => {
        if (error) notification.error({ message: 'Error', description: i18n(error) })
        if (ok) notification.info({ message: 'Info', description: message })
      })
      .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
  }

  // TODO: Tarjetas diferenciadas por estado de factura
  // TODO: Alertas en la misma fila del estado de la factura
  const menu = (
    <Menu>
      {/* <Menu.Item icon={cfdi.pdfDocumentId ? <FilePdfOutlined /> : <Spin />} disabled={!cfdi.pdfDocumentUrl}>
        {cfdi.pdfDocumentUrl ? (
          <a href={cfdi.pdfDocumentUrl} target="_blank" rel="noopener noreferrer">
            {i18n('billing.downloadPdf')}
          </a>
        ) : (
          <span className="ml-2">{i18n('billing.downloadPdf')}</span>
        )}
      </Menu.Item>
      <Menu.Item icon={<FileOutlined />} onClick={downloadXml(cfdi._id, cfdi.folio)}>
        <span className="ml-2">{i18n('billing.downloadXml')}</span>
      </Menu.Item>
      {cfdi.cfdiType === 'invoice' && !cfdi.canceledAt ? (
        <Menu.Item
          icon={cancelInProgress ? <Spin /> : <FileExclamationOutlined />}
          onClick={() => handleChangeVisibility(true)}
          disabled={Boolean(cancelInProgress)}
        >
          <PartialCreditNoteModal cfdi={cfdi} isVisible={partialCreditNoteModalVisible} onChangeVisibility={handleChangeVisibility} />
          <span className="ml-2">{i18n('billing.partialCreditNote')}</span>
        </Menu.Item>
      ) : null}
      {cfdi.deliveryStatus === 'pending' ? (
        <Menu.Item
          icon={notificationStarted ? <Spin /> : <MailOutlined />}
          onClick={() => sendNotification(cfdi._id)}
          disabled={notificationStarted}
        >
          <span className="ml-2">{i18n('billing.sendCreationNotification')}</span>
        </Menu.Item>
      ) : null}
      {cfdi.cfdiType === 'invoice' && !cfdi.canceledAt ? (
        <Menu.Item
          icon={notificationStarted ? <Spin /> : <DollarTwoTone twoToneColor="#53cf8c" />}
          onClick={() => sendNotification(cfdi._id)}
          disabled={notificationStarted}
        >
          <span className="ml-2">{i18n('billing.paidWithoutComplement')}</span>
        </Menu.Item>
      ) : null}
      {cfdi.cfdiType === 'invoice' && !cfdi.canceledAt && moment(cfdi.createdAt).isSame(new Date(), 'month') ? (
        <Menu.Item
          icon={cancelInProgress ? <Spin /> : <CloseCircleTwoTone twoToneColor="#f50538" />}
          onClick={() => cancelCfdi(cfdi._id)}
          disabled={Boolean(cancelInProgress)}
        >
          <span className="ml-2">{i18n('billing.cancelCfdi')}</span>
        </Menu.Item>
      ) : null}

      {!(cfdi.cfdiType === 'invoice') && !cfdi.canceledAt ? (
        <Menu.Item
          icon={cancelInProgress ? <Spin /> : <CloseCircleTwoTone twoToneColor="#f50538" />}
          onClick={() => cancelCfdi(cfdi._id)}
          disabled={Boolean(cancelInProgress)}
        >
          <span className="ml-2">{i18n('billing.cancelCfdi')}</span>
        </Menu.Item>
      ) : null}

      {cfdi.cfdiType === 'invoice' && !cfdi.canceledAt && !moment(cfdi.createdAt).isSame(new Date(), 'month') ? (
        <Menu.Item
          icon={cancelInProgress ? <Spin /> : <CloseCircleTwoTone twoToneColor="#f50538" />}
          onClick={() => cancelCfdiWithCreditNote(cfdi._id)}
          disabled={Boolean(cancelInProgress)}
        >
          <span className="ml-2">{i18n('billing.cancelCfdiWithCreditNote')}</span>
        </Menu.Item>
      ) : null} */}
    </Menu>
  )

  return (
    <Card bordered={false} className="invoice-card w-full">
      <List size="small" bordered={false}>
        <List.Item>
          <div className="w-full">
            <a href={`shipment-hub/${BoLHub._id}`} className="text-xs">
              {BoLHub.folio}
            </a>
            <br />
            <a href={`shipment-hub/${BoLHub._id}`} className="text-xl">
              {BoLHub.name}
            </a>
            {/* <Dropdown overlay={menu} placement="bottomRight">
              <Button type="link" className="float-right" icon={<MoreOutlined />} />
            </Dropdown> */}
          </div>
        </List.Item>

        {/* <List.Item>
          <Row justify="space-between" className="w-full">
            <Col flex="auto" className="text-left">
              {BoLHub?.state?.generalInfoComplete ? (
                <Tooltip placement="top" title={BoLHub?.status?.generalInfoComplete}>
                  <MailTwoTone className="mr-2" />
                </Tooltip>
              ) : (
                <Tooltip placement="top" title={BoLHub?.status?.generalInfoComplete}>
                  <MailOutlined className="mr-2" />
                </Tooltip>
              )}
              {i18n(`newBillOfLadingHub.card.${BoLHub?.status?.description}`)}
            </Col>
            <Col flex="auto">
              {cfdi.cfdiType === 'invoice' && cfdi.status !== 'payed' && cfdi.status !== 'payedWithoutComplement'
                ? DueDateStatus(cfdi.createdAt, cfdi.paymentConditions)
                : null}
            </Col> 
            <Col span={2} className="text-center">
              <Badge status="success" />
            </Col>
          </Row>
        </List.Item> */}

        {/* <List.Item>
          <Carousel className="cfdi-card-carousel">
            <CfdiTotalPill cfdi={cfdi} />
          </Carousel>
        </List.Item> */}

        {/* <List.Item>
          <Row gutter={4} className="w-full justify-center flex-no-wrap max-w-full" style={{ width: 286 }}>
            <Col flex="auto" className="flex-shrink truncate ...">
              <Tooltip placement="topLeft" title={cfdi.issuer.name}>
                {cfdi.issuer.name}
              </Tooltip>
            </Col>
            <Col flex="30px">
              {/* TODO: MOVE TO TAILWIND CSS */}
        {/* <RightOutlined color="#0085ff" />
            </Col>
            <Col flex="auto" className="flex-shrink text-right truncate ...">
              <Tooltip placement="topLeft" title={cfdi.receiver.name}>
                {cfdi.receiver.name}
              </Tooltip>
            </Col>
          </Row>
        </List.Item> */}

        {/* <List.Item>
          <Row gutter={[16, 16]} className="invoice-card-details">
            <Col>
              {cfdi.relatedServices &&
                cfdi.relatedServices.map(({ id, reference }) => (
                  <Statistic key={id} title={i18n('cfdiCard.details.shipments')} valueRender={() => <a href="/">{reference}</a>} />
                ))}
            </Col>
            <Col> */}
        {/* <Statistic title="Referencia de cliente" valueRender={() => '000000'} /> */}
        {/* <Statistic
                title={i18n('cfdiCard.details.cfdiDate')}
                value={dateFormat(new Date(cfdi.createdAt), { format: 'DD-MMM-YY | HH:mm:ss' })}
              /> */}
        {/* <Statistic title="Valor" prefix="$" value={`${invoice.currency} ${invoice.total}`} /> */}
        {/* </Col>
          </Row>
        </List.Item> */}

        {/* <List.Item className="py-0">
          <Comment
            author={<a href="/#">Taskility</a>}
            avatar={<Avatar src="/taskility-avatar-square.png" alt="Taskility" shape="circle" size={32} />}
            content={<p>Last event for this invoice</p>}
            datetime={
              <Tooltip title={dateFormat(new Date(2016, 0, 1))}>
                <span>{dateFormat(new Date(2016, 0, 1))}</span>
              </Tooltip>
            }
          />
        </List.Item> */}
      </List>
    </Card>
  )
}
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

const BoLHList = ({ dateRange, BoLHType, BoLHStatus, BoLHClients, BoLHUsers, loggedUserProfile, isBoLHAuthorized, loggedUserIdData }) => {
  const [selectedHubIds, setSelectedHubIds] = useState([])
  const [messageApi, messageContextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [originalHubs, setOriginalHubs] = useState([])
  const [hubCounter, setHubCounter] = useState(1)
  const [copyModalVisible, setCopyModalVisible] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  console.log({ dRBoLHList: dateRange[0].toISOString() })

  const listUrl = `/api/shipment-hub/list?from=${dateRange[0].toISOString()}&to=${dateRange[1].toISOString()}&BoLHClients=${BoLHClients}&BoLHUsers=${BoLHUsers}`
  const { data, error } = useSWR(listUrl, url => post(url, {}), { refreshInterval: 5000 })

  if (error) return <InvoiceListPageErrorState errorMessage={error} />
  if (!data) return <InvoiceListPageLoadingState />
  if (data.error) return <InvoiceListPageErrorState errorMessage={data.error} />
  if (data?.BoLHubs?.length === 0) return <InvoiceListPageEmptyState />

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

  // console.log('data', data)
  const columnsForInternalUsers = [
    {
      title: i18n('hub'),
      dataIndex: 'folo',
      key: 'folio',
      width: 120,
      render: (text, record) => (
        <div>
          <Paragraph className="mb-1 text-xs">{record.folio}</Paragraph>
          <Paragraph className="mt-0 text-xs font-medium">
            <a href={`/shipment-hub/${record._id}`}>{record.name || record.folio}</a>
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
      title: i18n('hub'),
      dataIndex: 'folio',
      key: 'folio',
      render: (text, record) => (
        <div>
          <Paragraph className="mt-1 text-xs">{record.folio}</Paragraph>
          <Paragraph className="my-0 text-xs font-medium">
            <a href={`/shipment-hub/${record._id}`}>{record.name || record.folio}</a>
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

  const dataForTable = data?.BoLHubs?.map(BoLHub => {
    const generalInfoComplete = BoLHub?.status?.generalInfoComplete ? 1 : 0
    const locationsComplete = BoLHub?.status?.locationsComplete ? 1 : 0
    const goodsComplete = BoLHub?.status?.goodsComplete ? 1 : 0
    const transportsComplete = BoLHub?.status?.transportsComplete ? 1 : 0
    const pricesComplete = BoLHub?.status?.pricesComplete ? 1 : 0
    const status = (100 * (generalInfoComplete + locationsComplete + goodsComplete + transportsComplete + pricesComplete)) / 5
    const isHubAndUserFromSameCompany = loggedUserProfile?.companyId === BoLHub.companyId
    const locations = BoLHub?.locations?.locations || []
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
    const totalPrice = BoLHub?.prices?.quotations?.map(item => item.total).reduce((partialSum, a) => partialSum + a, 0)
    console.log({ quotations: BoLHub?.prices?.quotations?.length > 0 ? BoLHub?.prices?.quotations[0].currency : null })
    // const priceTotal = BoLHub?.prices?.quotations ? BoLHub?.prices?.quotations.map()
    // console.log({ origin: origins[0], destination: destinations[destinations.length-1] }, origins.length, destinations.length )
    if (isHubAndUserFromSameCompany)
      return {
        key: BoLHub._id,
        folio: BoLHub.folio,
        _id: BoLHub._id,
        name: BoLHub.name,
        customerName: BoLHub?.clientName || '---',
        lastComment: BoLHub?.lastComment || {},
        companyName: BoLHub?.companyName || '---',
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
        operativeStatus: BoLHub.status.operative?.text || 'requested',
        operativeStatusColor: BoLHub.status.operative?.color || '#bbbbbb',
        collectStatus: BoLHub.status.collect?.text || 'noInvoice',
        collectStatusColor: BoLHub.status.collect?.color || '#bbbbbb',
        supplierStatus: BoLHub.status.suppliers?.text || 'noInvoice',
        supplierStatusColor: BoLHub.status.suppliers?.color || '#bbbbbb',
        price: totalPrice || 0,
        currency: BoLHub?.prices?.quotations?.length > 0 ? BoLHub?.prices?.quotations[0].currency : '---',
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
      key: BoLHub._id,
      folio: BoLHub.folio,
      _id: BoLHub._id,
      name: BoLHub.name,
      customerName: '---',
      companyName: BoLHub?.companyName || '---',
      origin: {
        city: origins?.length > 0 ? origins[0]?.satAddress?.locality?.satDescription : '',
        state: origins?.length > 0 ? origins[0]?.satAddress?.politicalState?.satCode : '',
        country: origins?.length > 0 ? origins[0]?.satAddress?.country : '',
        date: origins?.length > 0 ? origins[0]?.date : '',
      },
      destination: {
        city: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.locality?.satDescription : '',
        state: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.politicalState?.satCode : '',
        country: destinations?.length > 0 ? destinations[destinations.length - 1]?.satAddress?.country : '',
        date: destinations?.length > 0 ? destinations[destinations.length - 1]?.date : '',
      },
      operativeStatus: BoLHub.status.operative?.text || 'No status',
      operativeStatusColor: BoLHub.status.operative?.color || '#bbbbbb',
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

  // console.log('dataForTable',dataForTable)
  return (
    // <Row gutter={[16, 16]} className="pt-4 justify-center">
    //   {data.BoLHubs.map(BoLHub => (
    //     <Col key={BoLHub._id}>
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
      <Table
        rowSelection={rowSelection}
        columns={isBoLHAuthorized ? columnsForInternalUsers : columnsForExternalUsers}
        dataSource={dataForTable}
        className="mt-4"
        bordered={false}
        pagination={false}
      />
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

export const BillOfLadingPage = () => {
  const currentUser = useContext(CurrentUserContext)
  const defaultDateRange = [dayjs().subtract(30, 'days'), dayjs()] // Before: [moment().startOf('month'), moment().endOf('month')]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [cfdiType, setCfdiType] = useState('')
  const [cfdiStatus, setCfdiStatus] = useState('')
  const [BoLHUsers, setBoLHUsers] = useState('')
  const [BoLHClients, setBoLHClients] = useState('')
  const [collapsedMenu, setCollapsedMenu] = useState(true)

  const [isBoLHAuthorized, setIsBoLHAuthorized] = useState(false)
  const [loggedEmail, setLoggedEmail] = useState()
  const [companyProfile, setCompanyProfile] = useState()
  const [loggedUserProfile, setLoggedUserProfile] = useState()
  const [loggedUserIdData, setLoggedUserIdData] = useState()

  useEffect(() => {
    setIsBoLHAuthorized(currentUser.isHubAuthorized || false)
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
  //           if (license.licenseName === 'BoLHub') {
  //             // console.log('licenseName', license.licenseName, 'license.active', license.active)
  //             setIsBoLHAuthorized(license.active)
  //             // console.log('isBoLHAuthorized', isBoLHAuthorized)
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

  console.log('BillOfLadingPage', { loggedUserIdData })
  return (
    <Layout className="min-h-screen" hasSider>
      <AppHeadLayout tabTitle={i18n('billOfLading.title')} />
      <Layout>
        <AppHeader toggleMenu={toggleMenu} collapsed={collapsedMenu} />
        <Layout.Content className="p-4">
          <TaskilityPageHeader
            dateRange={dateRange}
            cfdiType={cfdiType}
            onBoLHClientsChange={setBoLHClients}
            // onCfdiStatusChange={setCfdiStatus}
            onBoLHUsersChange={setBoLHUsers}
            // onCfdiTypeChange={setCfdiType}
            onDateRangeChange={onDateRangeChange}
            // cfdiStatus={cfdiStatus}
            BoLHUsers={BoLHUsers}
            BoLHClients={BoLHClients}
            isBoLHAuthorized={isBoLHAuthorized}
            loggedUserProfile={loggedUserProfile}
            companyProfile={companyProfile}
          />
          {/* <BillOfLadingPageHeader
            dateRange={dateRange}
            cfdiType={cfdiType}
            onBoLHClientsChange={setBoLHClients}
            // onCfdiStatusChange={setCfdiStatus}
            onBoLHUsersChange={setBoLHUsers}
            // onCfdiTypeChange={setCfdiType}
            onDateRangeChange={onDateRangeChange}
            // cfdiStatus={cfdiStatus}
            BoLHUsers={BoLHUsers}
            BoLHClients={BoLHClients}
            isBoLHAuthorized={isBoLHAuthorized}
            loggedUserProfile={loggedUserProfile}
            companyProfile={companyProfile}
          /> */}
          <BoLHList
            dateRange={dateRange}
            BoLHClients={BoLHClients}
            BoLHUsers={BoLHUsers}
            loggedUserProfile={loggedUserProfile}
            isBoLHAuthorized={isBoLHAuthorized}
            loggedUserIdData={loggedUserIdData}
          />
        </Layout.Content>
      </Layout>
      <SideMenu collapsed={collapsedMenu} page={page} />
    </Layout>
  )
}
