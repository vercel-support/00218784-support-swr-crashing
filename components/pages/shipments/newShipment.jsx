import React, { useReducer, useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import {
  Typography,
  Button,
  Select,
  Input,
  Form,
  Divider,
  DatePicker,
  Checkbox,
  message,
  Radio,
  Space,
  Card,
  Spin,
  Tabs,
  Upload,
} from 'antd'
import { CloudUploadOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { i18n } from '../../../services/i18n'
import { get, post } from '../../../services/fetch'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload
import * as XLSX from 'xlsx'

const { Title, Text } = Typography

const TemplateSelector = ({ hub, customerId, companyId, newHubDispatch, errors, setTemplates, disabled }) => {
  // console.log({place: 'TemplateSelector', customerId, companyId})
  const { data: templatesData, error: templatesError } = useSWR(
    companyId && customerId ? `/api/shipment-hub/new-hub/templates/${companyId}/${customerId}` : null,
    url => get(url)
  )
  // console.log({templatesData})
  // const templatesData = {templates:[{_id: 'hweuhr938h23', name: 'Calabastro 1'}, {_id: '3i3wnndksl', name: 'Aéreo 2'}]}
  // const templatesError = null
  useEffect(() => newHubDispatch({ action: 'Set Templates', payload: templatesData?.templates }), [templatesData])

  if (!customerId) return null
  if (templatesError) return <div>{i18n(templatesError)}</div>
  if (!templatesData)
    return (
      <Card bordered={false} className="invoice-card w-full p-4">
        <Spin />
      </Card>
    )
  if (templatesData.error) return <div>{i18n(templatesData.error)}</div>
  const templatesOptions = (templatesData && templatesData.templates) || [
    { _id: 'hweuhr938h23', name: 'Template 1' },
    { _id: '3i3wnndksl', name: 'Template 2' },
  ]
  const selectedTemplate = templatesOptions.find(({ _id }) => _id === hub.templateId)
  return (
    <>
      <Form layout="vertical">
        <Form.Item
          label={i18n(`newBillOfLadingHub.newBoLH.template`)}
          validateStatus={errors?.clientId && 'error'}
          help={errors?.clientId && i18n(errors?.clientId)}
          name="templateId"
        >
          <Select
            showSearch
            className="w-full"
            onChange={templateId => newHubDispatch({ type: 'Template Update', payload: templateId })}
            placeholder={i18n(`newBillOfLadingHub.newBoLH.templatePlaceHolder`)}
            value={hub.templateId}
            disabled={disabled}
            optionFilterProp="children"
            // filterOption={(input, { label }) => label.toLowerCase().includes(input.toLowerCase())}
            // eslint-disable-next-line no-unused-expressions
            options={templatesOptions.map(({ _id, name }) => ({ value: _id, label: name }))}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
      </Form>
      {/* {selectedTemplate && (
        <Card size="small">
          <List size="small">
            <List.Item>{`Rfc: ${selectedReceiver.rfc}`}</List.Item>
            <List.Item>
              <Row gutter={4} className="w-full justify-center flex-no-wrap max-w-full">
                <Col flex="30px">Address:</Col>
                <Col flex="auto" className="flex-shrink truncate ...">
                  <Tooltip placement="topLeft" title={selectedReceiver.address}>
                    {selectedReceiver.address}
                  </Tooltip>
                </Col>
              </Row>
            </List.Item>
            <List.Item>{`Fiscal Regime: ${selectedReceiver.fiscalRegime}`}</List.Item>
          </List>
        </Card>
      )} */}
    </>
  )
}

const newHubReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'Name Update':
      return { ...state, name: action.payload }
    case 'Clear Values': {
      return { ...state, clientId: null, name: null, setTemplates: null, templateId: null }
    }
    case 'Customer Update': {
      const client = action.clientsD.clients.find(client => client._id === action.payload)
      return { ...state, clientId: action.payload, clientName: client.name }
    }
    case 'Customer Clear': {
      return { ...state, clientId: null }
    }
    case 'Template Update': {
      return { ...state, templateId: action.payload }
    }
    case 'Set Templates':
      return { ...state, setTamplates: action.payload }
    case 'Create Shipment Update':
      return { ...state, createShipmentWithHub: action.payload }
    case 'Create Shipment From Template':
      return { ...state, createShipmentFromTemplate: action.payload }
    case 'Change Hub Objective':
      return { ...state, taskilityBoLHObjective: action.payload }
    case 'Change Hub Creation Mode':
      return { ...state, creationMode: action.payload }
    default:
      return { ...state }
  }
}

export const MultipleShipmentForm = ({ newHubDispatch, newHubState, userProfile, errors, messageApi }) => {
  const [loading, setLoading] = useState(false)
  const props = {
    name: 'file',
    multiple: true,
    // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    // onChange(info) {
    //   const { status } = info.file
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList)
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`)
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`)
    //   }
    // },
    onChange(info) {
      console.log('onChangeUpload', { info })
      const file = info.file.originFileObj
      let reader = new FileReader()
      const { status } = info.file

      reader.onload = function (e) {
        let data = new Uint8Array(e.target.result)
        let workbook = XLSX.read(data, { type: 'array' })
        // find the name of your sheet in the workbook first
        let worksheet = workbook.Sheets['Embarques Taskility']

        // convert to json format
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        console.log({ jsonData })
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        reader.readAsArrayBuffer(file)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  const downloadFile = () => {
    window.open('/Taskility_Shipments_Template.xlsx', '_blank')
  }

  return (
    <Form layout="vertical">
      <Text className="text-lg font-base mt-6">{i18n(`newShipment.multipleShipments.title`)}</Text>
      <div className="mt-2">{i18n('newShipment.multipleShipments.description')}</div>
      <Divider plain />
      <Form.Item>
        <Button
          onClick={downloadFile}
          // type="primary"
          className="float-right"
          icon={<CloudDownloadOutlined />}
          // loading={loading}
          // disabled={!newHubState?.templateId || !newHubState?.name || !newHubState.clientId}
        >
          {i18n('buttons.downloadExcelTemplate')}
        </Button>
      </Form.Item>
      <Form.Item className="w-full">
        <Dragger {...props} className="w-full ">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{i18n('buttons.uploadDocumentsAreaMessage')}</p>
          {/* <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
          </p> */}
        </Dragger>
      </Form.Item>
      {/* <Form.Item label={i18n(`newBillOfLadingHub.newBoLH.name`)}>
        <Input
          placeholder={i18n(`newBillOfLadingHub.newBoLH.namePlaceholder`)}
          onKeyUp={e => newHubDispatch({ type: 'Name Update', payload: e.target.value })}
          defaultValue={newHubState.name ? newHubState.name : null}
        />
      </Form.Item>
      <Form.Item label={i18n(`newBillOfLadingHub.newBoLH.customer`)}>
        <Select
          showSearch
          onChange={e => newHubDispatch({ type: 'Customer Update', payload: e, clientsD: clientsData })}
          placeholder={i18n(`newBillOfLadingHub.newBoLH.customerPlaceholder`)}
          style={{ width: '100%' }}
          tokenSeparators={[',']}
          options={clientsData?.clients?.map(({ _id, name }) => ({ value: _id, label: name }))}
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
      </Form.Item>
      <TemplateSelector
        hub={newHubState}
        customerId={newHubState.clientId}
        companyId={userProfile?.companyId}
        errors={errors}
        newHubDispatch={newHubDispatch}
        setTemplates={setTemplates}
      /> */}
      <Button
        // onClick={() => saveNewBillOfLadingHub(newHubState)}
        type="primary"
        className="float-right"
        loading={loading}
        // disabled={!newHubState?.templateId || !newHubState?.name || !newHubState.clientId}
      >
        {i18n('buttons.create')}
      </Button>
    </Form>
  )
}

export const NewShipmentForm = ({ userProfile, errors, messageApi }) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState([])

  const newHubInitialState = {
    companyId: userProfile.companyId,
    companyName: userProfile.companyName,
    // creationMode: defaultTaskilityCreationMode,
    // createShipmentWithHub: defaultCreateShipment,
    // taskilityBoLHObjective: defaultTaskilityBoLHObjective,
  }

  const [newHubState, newHubDispatch] = useReducer(newHubReducer, newHubInitialState)

  // Get Clients data to populate the Select Options in the Clients Filter
  const { data: clientsData, error: clientsError } = useSWR('/api/billing/get-all-user-clients', url => fetch(url).then(res => res.json()))
  /**
   * Save a new shipment.
   *
   * @param {object} shipment - the shipment object to be saved
   * @param {boolean} redirect - a boolean indicating to redirect after saving the shipment
   */
  const saveNewShipment = async (shipment, redirect) => {
    console.log('saveNewShipment: shipment=', shipment, 'redirect=', redirect)
    if (!shipment || !messageApi) {
      console.error('Missing shipment or messageApi. Cannot save new shipment.')
      return
    }
    try {
      console.log('saveNewShipment: inside try')
      setLoading(true)
      const response = await fetch('/api/shipment/create-new-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipment)
      })
      console.log('saveNewShipment: after await, response.ok=', response.ok)
      if (!response.ok) {
        console.log('saveNewShipment: failed to create new shipment')
        throw new Error('Failed to create new shipment.')
      }
      const data = await response.json()
      console.log('saveNewShipment: new shipment created, _id=', data._id)
      messageApi.success(`${i18n('newShipment.created')}: ${newHubState.name}`)
      form.resetFields()
      newHubDispatch({ type: 'Clear Values' })
      if (redirect && data._id) {
        console.log('saveNewShipment: redirecting to /shipment/', data._id)
        window.open(`/shipment/${data._id}`, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error('saveNewShipment: error creating new shipment:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form layout="vertical" form={form}>
      <Text className="text-lg font-base mt-6">{i18n(`newShipment.singleShipment.title`)}</Text>
      <div className="mt-2">{i18n('newShipment.singleShipment.description')}</div>
      <Divider plain />
      <Form.Item label={i18n(`newBillOfLadingHub.newBoLH.name`)} name="name">
        <Input
          placeholder={i18n(`newBillOfLadingHub.newBoLH.namePlaceholder`)}
          onKeyUp={e => newHubDispatch({ type: 'Name Update', payload: e.target.value })}
          defaultValue={newHubState.name ? newHubState.name : null}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item label={i18n(`newBillOfLadingHub.newBoLH.customer`)} name="clientId">
        <Select
          showSearch
          onChange={e => newHubDispatch({ type: 'Customer Update', payload: e, clientsD: clientsData })}
          placeholder={i18n(`newBillOfLadingHub.newBoLH.customerPlaceholder`)}
          style={{ width: '100%' }}
          disabled={loading}
          tokenSeparators={[',']}
          options={clientsData?.clients?.map(({ _id, name }) => ({ value: _id, label: name }))}
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
      </Form.Item>
      <TemplateSelector
        hub={newHubState}
        customerId={newHubState.clientId}
        companyId={userProfile?.companyId}
        errors={errors}
        newHubDispatch={newHubDispatch}
        setTemplates={setTemplates}
        disabled={loading}
      />
      <Button
        onClick={() => saveNewShipment(newHubState, false)}
        type="primary"
        className="float-right"
        loading={loading}
        disabled={!newHubState?.templateId || !newHubState?.name || !newHubState.clientId}
      >
        {i18n('buttons.create')}
      </Button>
      <Button
        onClick={() => saveNewShipment(newHubState, true)}
        className="float-right mr-2"
        loading={loading}
        disabled={!newHubState?.templateId || !newHubState?.name || !newHubState.clientId}
      >
        {i18n('buttons.createAndRedirect')}
      </Button>
    </Form>
  )
}

export const NewShipment = ({ setIsNewShipmentVisible, userProfile, companyProfile }) => {
  const [messageApi, contextHolder] = message.useMessage()
  // const router = useRouter()
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [allowCreateShipment, setAllowCreateShipment] = useState(companyProfile.allowCreateShipmentWithBoLH)
  const [allowCreateShipmentFromTemplate, setAllowCreateShipmentFromTemplate] = useState(
    companyProfile.allowCreateShipmentFromTemplate || true
  )
  const [defaultCreateShipment, setDefaultCreateShipment] = useState(companyProfile.defaultCreateShipmentWithBoLH)
  const [defaultCreateShipmentFromTemplate, setDefaultCreateShipmentFromTemplate] = useState(
    companyProfile.defaultCreateShipmentFromTemplate || true
  )
  const [disableCreateShipment, setDisableCreateShipment] = useState(companyProfile.disableCreateShipmentWithBoLH)
  const [disableCreateShipmentFromTemplate, setDisableCreateShipmentFromTemplate] = useState(
    companyProfile.disableCreateShipmentFromTemplate || false
  )
  const [defaultTaskilityBoLHObjective, setTaskilityBoLHObjective] = useState(companyProfile.defaultTaskilityObjectiveBoL)
  const [defaultTaskilityCreationMode, setDefaultTaskilityCreationMode] = useState(companyProfile.defaultCreationMode || 'From Zero')
  const [disableTaskilityBoLHObjective, setDisableTaskilityBoLHObjective] = useState(companyProfile.disableTaskilityBoLHObjective)
  const [disableTaskilityHubCreationMode, setDisableTaskilityHubCreationMode] = useState(companyProfile.creationModeDisabled || false)

  const [errors, setErrors] = useState({})

  const newShipmentTabs = [
    {
      key: 'single',
      label: 'Single Shipment',
      children: <NewShipmentForm userProfile={userProfile} errors={errors} messageApi={messageApi} />,
    },
    {
      key: 'multiple',
      label: 'Multiple Shipment',
      children: <MultipleShipmentForm userProfile={userProfile} errors={errors} messageApi={messageApi} />,
    },
  ]

  return (
    <div className="w-full mt-10">
      {contextHolder}
      <Text className="text-2xl font-semibold">{i18n(`newBillOfLadingHub.newBoLH.title`)}</Text>
      <div className="pb-6  pt-3">{i18n('newBillOfLadingHub.newBoLH.description')}</div>
      <Tabs items={newShipmentTabs} />
    </div>
  )
}
