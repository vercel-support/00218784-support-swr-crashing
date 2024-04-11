import React, { useState, useReducer, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import moment from 'moment'
import { PageHeader } from '@ant-design/pro-layout';
import {
  Layout,
  Tabs,
  Space,
  Button,
  Dropdown,
  Menu,
  Avatar,
  Empty,
  Card,
  Row,
  Col,
  Carousel,
  Statistic,
  Result,
  Tooltip,
  Divider,
  Radio,
  List,
  Spin,
  notification,
  DatePicker,
  Modal,
  Badge,
  Select,
  Form,
  Checkbox,
  Input,
  InputNumber,
  Typography,
  Collapse,
  Skeleton,
  message,
  Switch,
} from 'antd'
import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
  FilterOutlined,
  FontSizeOutlined,
  MoreOutlined,
  FilePdfOutlined,
  FileOutlined,
  MailOutlined,
  FileExcelOutlined,
  MailTwoTone,
  FileExclamationOutlined,
  DollarTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { labelValueCfdiUses, labelValueFiscalRegimes, labelValueCurrencies, getCreditTermsCode } from '../../../services/catalogs'
import { num, numberFormat } from '../../../services/helpers/mathHelp'
import { dateFormat } from '../../../services/helpers/dateFormat'
import { i18n } from '../../../services/i18n'
import { post } from '../../../services/fetch'
import { AppHeader } from '../../layout/AppHeader'
import { SideMenu } from '../../layout/SideMenu'
import { downloadBase64File } from '../../../services/helpers/base64'
import { AppHeadLayout } from '../../layout/app-head-layout'
import { CustomerForm } from './customerForm'

const { Title, Text, Paragraph } = Typography
const { Header, Content, Footer, Sider } = Layout
const { Panel } = Collapse

export const Customer = ({ loggedUser, companyData, businessRaltionshipData }) => {
  const router = useRouter()
  const { id } = router.query
  const [collapsedMenu, setCollapsedMenu] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)
  const [page, setPage] = useState('customers')
  const [api, contextHolderNotification] = notification.useNotification()
  const [formDefaultValues, setFormDefaultValues] = useState()

  const toggleMenu = () => {
    setCollapsedMenu(!collapsedMenu)
  }

  // const companyData =
  //   id === '8TwefpEyArTCnnuwq'
  //     ? {
  //         _id: '8TwefpEyArTCnnuwq',
  //         name: 'AL PACKING DE MEXICO SA DE CV',
  //         email: 'yanet.martinez@albea-group.com',
  //         address: 'Jurica 7, Zona Industria, 76130 Santiago de Querétaro, Qro., Mexico',
  //         addressData: {
  //           street: 'Jurica',
  //           exteriorNumber: '7',
  //           neighborhood: 'Santiago de Querétaro',
  //           zipCode: '76130',
  //           municipality: 'Santiago de Querétaro',
  //           state: 'QUERÉTARO',
  //           country: 'MEX',
  //         },
  //         rfc: 'BME061127UF4',
  //         phoneNumber: '4421920941',
  //         fiscalRegime: '601',
  //         currency: 'Pesos MX',
  //         accountLastDigits: '4525',
  //         bank: 'Banamex',
  //         createdAt: '2017-11-08T19:51:17.149Z',
  //         createdBy: 'TbQ2jRYQCpEtoWWhq',
  //         addressList: [
  //           {
  //             addressData: {
  //               street: 'East Drive',
  //               exteriorNumber: '5803',
  //               neighborhood: 'Laredo',
  //               zipCode: '78041',
  //               municipality: 'Laredo',
  //               state: 'TEXAS',
  //               country: 'USA',
  //               name: 'CARGOQUIN',
  //             },
  //             address: 'CARGOQUIN - 5803 East Dr, Laredo, TX 78041, USA',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Refinería Azcapotzalco',
  //               exteriorNumber: '46',
  //               neighborhood: 'Ciudad de México',
  //               zipCode: '02020',
  //               municipality: 'Ciudad de México',
  //               state: 'CIUDAD DE MÉXICO',
  //               country: 'MEX',
  //             },
  //             address: 'Av. Refineria Azcapotzalco #46, Azcapotzalco, San Marcos, 02020 Ciudad de México, CDMX, Mexico',
  //             createdByUser: 'GmHeGWnh3Phfxawpk',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Cane Creek Boulevard',
  //               exteriorNumber: '187',
  //               neighborhood: 'Danville',
  //               zipCode: '24540',
  //               municipality: 'Danville',
  //               state: 'VIRGINIA',
  //               country: 'USA',
  //               name: 'Essel Propack America LLC',
  //             },
  //             address: 'Essel Propack America LLC - 187 Cane Creek Blvd, Danville, VA 24540, USA',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Arbor Tech Drive',
  //               exteriorNumber: '2400',
  //               neighborhood: 'Hebron',
  //               zipCode: '41048',
  //               municipality: 'Hebron',
  //               state: 'KENTUCKY',
  //               country: 'USA',
  //               name: 'MAUER USA LLC               ',
  //             },
  //             address: 'MAUER USA LLC                - 2400 Arbor Tech Dr, Hebron, KY 41048, USA',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               name: 'CARGOQUIN LAREDO',
  //               zipCode: '78045',
  //               street: 'HAYTER RD.',
  //               municipality: 'LAREDO',
  //               state: 'TEXAS',
  //               exteriorNumber: '11921',
  //               neighborhood: 'LAREDO',
  //               country: 'USA',
  //             },
  //             address: 'CARGOQUIN LAREDO - cargoquin laredo 11921 Hayter Rd, Laredo, TX 78045 ',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Reach Road',
  //               exteriorNumber: '2921',
  //               neighborhood: 'Williamsport',
  //               zipCode: '17701',
  //               municipality: 'Williamsport',
  //               state: 'PENNSYLVANIA',
  //               country: 'USA',
  //               name: 'WESTPHARMA',
  //             },
  //             address: 'WESTPHARMA - 2921 Reach Rd, Williamsport, PA 17701, USA',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Franklin Boulevard',
  //               exteriorNumber: '1515',
  //               neighborhood: 'Libertyville',
  //               zipCode: '60048',
  //               municipality: 'Libertyville',
  //               state: 'ILLINOIS',
  //               country: 'USA',
  //               name: 'RPC Zeller Plastik ',
  //             },
  //             address: 'RPC Zeller Plastik  - 1515 Franklin Blvd, Libertyville, IL 60048, USA',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Toebben Drive',
  //               exteriorNumber: '10600',
  //               neighborhood: 'Independence',
  //               zipCode: '41051',
  //               municipality: 'Independence',
  //               state: 'KENTUCKY',
  //               country: 'USA',
  //               name: 'Mauer USA',
  //             },
  //             address: 'Mauer USA - 10600 Toebben Dr, Independence, KY 41051, USA',
  //             createdByUser: 's7oawh5kWdEsbPxm3',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //           {
  //             addressData: {
  //               street: 'Vía Israel',
  //               neighborhood: 'Panamá',
  //               zipCode: '0000',
  //               municipality: 'Panamá',
  //               state: 'Panamá',
  //               country: 'Panamá',
  //               name: 'Multiplaza Panamá',
  //             },
  //             address: 'Multiplaza Panamá - Calle Isaac Hanono Missri, Panamá, Vía Israel, Panamá, Panama',
  //             createdByUser: 'GmHeGWnh3Phfxawpk',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //           },
  //         ],
  //         cfdiUse: 'G03',
  //         peopleList: [],
  //         bankAccountsList: [
  //           {
  //             bank: 'BANCO BASE',
  //             number: '2011',
  //             currency: 'USD',
  //             isDefault: true,
  //             createdByUser: 'TbQ2jRYQCpEtoWWhq',
  //             createdByCompany: 'bugL7uZvYvcodAENJ',
  //             createdAt: '2018-09-10T21:25:24.391Z',
  //           },
  //         ],
  //         operationYears: '',
  //         website: 'www.myweb.com',
  //       }
  //     : {
  //         _id: 'u8PzzDntXPFTZ2pML',
  //         name: 'RYDER INTEGRATED LOGISTICS, INC.',
  //         comercialName: 'RYDER',
  //         email: 'gerardo_garcia_jaime@ryder.com',
  //         address: '837 Union Pacific Blvd, Laredo, TX 78045, USA',
  //         addressData: {
  //           street: 'Union Pacific Boulevard',
  //           exteriorNumber: '837',
  //           neighborhood: 'Laredo',
  //           zipCode: '78045',
  //           municipality: 'Laredo',
  //           state: 'TEXAS',
  //           country: 'USA',
  //         },
  //         phoneNumber: '8182623108',
  //         website: 'mexico.ryder.com',
  //         rfc: 'XEXX010101000',
  //         fiscalRegime: '601',
  //         currency: 'USD',
  //         companyType: 'private',
  //         activity: 'LOGISTICA Y TRANSPORTE',
  //         certifications: ['basc'],
  //         createdAt: '2018-05-23T14:01:27.810Z',
  //         createdBy: 'TbQ2jRYQCpEtoWWhq',
  //         cfdiUse: 'P01',
  //         accountLastDigits: '7880',
  //         bank: 'BANK OF AMERICA',
  //         foreignFiscalId: '591506958',
  //       }
  // const { data, error } = useSWR(`/api/customers/get-customer-by-id?id=${id}`, url => fetch(url).then(res => res.json()))
  // const { data, error } = useSWR(`/api/customers/get-customer-by-id?id=${id}`, url => post(url, {}))

  // console.log(data)
  // if (!companyData) {
  //   return (
  //     <Layout className="min-h-screen" hasSider>
  //       <AppHeadLayout tabTitle="Loading" />
  //       <Layout>
  //         <AppHeader toggleMenu={toggleMenu} collapsed={collapsedMenu} />
  //         <Layout.Content className="p-4">
  //           <Card>
  //             <Skeleton active />
  //           </Card>
  //         </Layout.Content>
  //       </Layout>
  //       <SideMenu collapsed={collapsedMenu} page={page} />
  //     </Layout>
  //   )
  // }
  // const { companyData, businessRelationshipData } = data

  // const onFinish = values => {
  //   setLoadingSave(true)
  //   post('/api/customers/save-customer', { body: { id: id, fields: values } })
  //     .then(({ ok, _id }) => {
  //       setLoadingSave(false)
  //       return ok ? _id : 'error'
  //     })
  //     .then(_id => router.push(`/customers`))
  //     // .then(({ error, details }) => {
  //     //   // if (!error) setFinished('signed')
  //     //   setApiError(error, details?.message || '')
  //     //   // console.log('details', details)
  //     // })
  //     .catch(error => {
  //       // messageApi.open({
  //       //   type: 'error',
  //       //   content: `${error}`,
  //       // })
  //       api.error({
  //         message: i18n('error.title'),
  //         description: `${error}`,
  //       })
  //       console.log(error)
  //     })
  //   // .finally(() => setCreatingCfdi(false))
  //   // router.push(`/bill-of-lading-hub/${1}`)
  //   // setIsNewBillOfLadingHubVisible(false)

  //   console.log(loadingSave)
  //   setTimeout(() => {
  //     console.log('Timeout')
  //     setLoadingSave(false)
  //   }, 5000)
  //   console.log('Success:', { ...values, id: id })
  // }

  // const onCancelClick = () => {
  //   router.push(`/customers`)
  // }
  // const onFinishFailed = errorInfo => {
  //   setLoadingSave(false)
  //   console.log('Failed:', errorInfo)
  // }

  // const onChangeFiscalRegime = value => {
  //   console.log(`selected ${value}`)
  // }
  // const onSearchFiscalRegime = value => {
  //   console.log('search:', value)
  // }
  // const fiscalRegimeOptions = labelValueFiscalRegimes.map(cfdiUse => {
  //   return { value: cfdiUse.value, label: `${cfdiUse.value} - ${cfdiUse.label}` }
  // })

  // const onChangeCfdiUse = value => {
  //   console.log(`selected ${value}`)
  // }
  // const onSearchCfdiUse = value => {
  //   console.log('search:', value)
  // }
  // const cfdiUseOptions = labelValueCfdiUses.map(cfdiUse => {
  //   return { value: cfdiUse.value, label: `${cfdiUse.value} - ${cfdiUse.label}` }
  // })

  console.log({ companyData })

  return (
    <Layout className="min-h-screen" hasSider>
      <AppHeadLayout tabTitle={companyData ? companyData.name : 'Loading'} />
      <Layout>
        <AppHeader toggleMenu={toggleMenu} collapsed={collapsedMenu} />
        <Layout.Content className="p-4">
          {contextHolderNotification}
          {companyData ? (
            <Card>
              <div className="mt-2">
                <Link href="/customers">{i18n('customers.title')}</Link> {'>'} {companyData.name}
              </div>
              <Title level={4} className="mt-4">
                {companyData.name}
              </Title>
              <Divider />
              <CustomerForm companyData={companyData} isNewItemForm={false} />
              {/* <Form
              layout="vertical"
              name="Customer"
              initialValues={{
                name: companyData.name || '',
                rfc: companyData.rfc || '',
                fiscalRegime: companyData.fiscalRegime || '',
                cfdiUse: companyData.cfdiUse || '',
                zipCode: companyData.zipCode || '',
                foreignTaxId: companyData.foreignTaxId || '',
                fiscalResidenceCountry: companyData.fiscalResidenceCountry || '',
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name="active" className="align-right">
                <Switch
                  checkedChildren={i18n('buttons.active')}
                  unCheckedChildren={i18n('buttons.suspended')}
                  defaultChecked={companyData.active}
                  className="float-right"
                />
              </Form.Item>
              <Form.Item name="name" label={i18n('customers.name')} rules={[{ required: true, message: i18n('customers.nameMessage') }]}>
                <Input />
              </Form.Item>
              <Form.Item name="rfc" label={i18n('customers.taxId')} rules={[{ required: true, message: i18n('customers.rfcMessage') }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="fiscalRegime"
                label={i18n('customers.fiscalRegime')}
                rules={[{ required: true, message: i18n('customers.fiscalRegimeMessage') }]}
              >
                <Select
                  showSearch
                  placeholder={i18n('customers.fiscalRegime')}
                  optionFilterProp="children"
                  onChange={onChangeFiscalRegime}
                  onSearch={onSearchFiscalRegime}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={fiscalRegimeOptions}
                />
              </Form.Item>
              <Form.Item
                name="cfdiUse"
                label={i18n('customers.cfdiUse')}
                rules={[{ required: true, message: i18n('customers.cfdiUseMessage') }]}
              >
                <Select
                  showSearch
                  placeholder={i18n('customers.cfdiUse')}
                  optionFilterProp="children"
                  onChange={onChangeCfdiUse}
                  onSearch={onSearchCfdiUse}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={cfdiUseOptions}
                />
              </Form.Item>
              <Form.Item
                name="zipCode"
                label={i18n('customers.zipCode')}
                rules={[{ required: true, message: i18n('customers.zipCodeMessage') }]}
              >
                <Input />
              </Form.Item>
              {companyData.rfc === 'XEXX010101000' ? (
                <div>
                  <Title level={5}>{i18n('customers.requiredFieldsForForeigners')}</Title>
                  <Form.Item
                    name="fiscalResidenceCountry"
                    label={i18n('customers.fiscalResidenceCountry')}
                    rules={[
                      { required: companyData.rfc === 'XEXX010101000', message: i18n('customers.fiscalResidenceCountryCodeMessage') },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="foreignTaxId"
                    label={i18n('customers.foreignTaxId')}
                    rules={[{ required: companyData.rfc === 'XEXX010101000', message: i18n('customers.foreignTaxIdCodeMessage') }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              ) : null}
              <Form.Item>
                <Space className="float-right">
                  <Link href="/customers">{i18n('buttons.cancel')}</Link>
                  <Button type="primary" htmlType="submit" loading={loadingSave}>
                    {i18n('buttons.save')}
                  </Button>
                </Space>
              </Form.Item>
            </Form> */}
            </Card>
          ) : (
            <Card>
              <Skeleton active />
            </Card>
          )}
        </Layout.Content>
      </Layout>
      <SideMenu collapsed={collapsedMenu} page={page} />
    </Layout>
  )
}
