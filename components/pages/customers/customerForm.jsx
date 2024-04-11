import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Space, Button, notification, Select, Form, Input, Typography, message, Switch } from 'antd'
import { labelValueCfdiUses, labelValueFiscalRegimes } from '../../../services/catalogs'
import { i18n } from '../../../services/i18n'
import { post } from '../../../services/fetch'
import { rfcValido } from '../../../services/sat/rfcValidator'

const { Title, Text, Paragraph } = Typography

export const CustomerForm = ({
  companyData = {},
  cancelUrl = '/customers',
  finishButtonText = '',
  isNewItemForm = true,
  relationshipType = 'service',
  relationshipRole = 'client',
}) => {
  const router = useRouter()
  const { id } = router.query
  const [loadingSave, setLoadingSave] = useState(false)
  const [api, contextHolderNotification] = notification.useNotification()
  const [RFCValid, setRFCValid] = useState(true)
  const [RFCValidateStatus, setRFCValidateStatus] = useState('')
  const [RFCValidateMessage, setRFCValidateMessage] = useState('')
  // const [body, setBody] = useState()
  // const [apiUrl, setApiUrl] = useState()

  const apiUrl = isNewItemForm ? '/api/companies/create-new-company-and-business-relationship' : '/api/customers/save-customer'
  // const relationshipType = 'service'
  // const relationshipRole = 'client'
  let body = isNewItemForm ? { relationshipType, relationshipRole } : { id }

  const onFinish = values => {
    setLoadingSave(true)
    body = { ...body, fields: values }
    // console.log({ isNewItemForm, apiUrl, body })
    post(apiUrl, { body })
      .then(({ ok, insertedCompanyId, insertedBusinessRelationshipId }) => {
        setLoadingSave(false)
        // console.log({ ok, insertedCompanyId, insertedBusinessRelationshipId })
        return ok ? insertedCompanyId : 'error'
      })
      // eslint-disable-next-line consistent-return
      .then(insertedCompanyId => {
        // console.log({ insertedCompanyId, logicTest: typeof insertedCompanyId === 'undefined' || insertedCompanyId === 'error' })
        
        if (isNewItemForm) {
          if (typeof insertedCompanyId === 'undefined' || insertedCompanyId === 'error') {
            message.error('Something went wrong when saving customer')
            return 'error'
          }
          message.success(i18n('customers.created'))
          router.push(`/customer/${insertedCompanyId}`)
        } else {
          message.success(i18n('customers.saved'))
          router.push(`/customers`)
        }
      })
      // .then(({ error, details }) => {
      //   // if (!error) setFinished('signed')
      //   setApiError(error, details?.message || '')
      //   // console.log('details', details)
      // })
      .catch(error => {
        // messageApi.open({
        //   type: 'error',
        //   content: `${error}`,
        // })
        api.error({
          message: i18n('error.title'),
          description: `${error}`,
        })
        console.log(error)
      })
    // .finally(() => setCreatingCfdi(false))
    // router.push(`/bill-of-lading-hub/${1}`)
    // setIsNewBillOfLadingHubVisible(false)

    // console.log(loadingSave)
    setTimeout(() => {
      // console.log('Timeout')
      setLoadingSave(false)
    }, 5000)
    // console.log('Success:', { ...values, id: id })
  }

  const onFinishFailed = errorInfo => {
    setLoadingSave(false)
    // console.log('Failed:', errorInfo)
  }

  const onChangeFiscalRegime = value => {
    // console.log(`selected ${value}`)
  }
  const onSearchFiscalRegime = value => {
    // console.log('search:', value)
  }
  const fiscalRegimeOptions = labelValueFiscalRegimes.map(cfdiUse => {
    return { value: cfdiUse.value, label: `${cfdiUse.value} - ${cfdiUse.label}` }
  })

  const onChangeCfdiUse = value => {
    console.log(`selected ${value}`)
  }
  const onSearchCfdiUse = value => {
    console.log('search:', value)
  }
  const cfdiUseOptions = labelValueCfdiUses.map(cfdiUse => {
    return { value: cfdiUse.value, label: `${cfdiUse.value} - ${cfdiUse.label}` }
  })

  return (
    <Form
      layout="vertical"
      name="Customer"
      initialValues={{
        name: companyData.name || '',
        rfc: companyData.rfc || '',
        fiscalRegime: companyData.fiscalRegime || '',
        cfdiUse: companyData.cfdiUse || '',
        zipCode: companyData.zipCode || '',
        foreignFiscalId: companyData.foreignFiscalId || '',
        fiscalResidenceCountry: companyData.fiscalResidenceCountry || '',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {contextHolderNotification}
      {!isNewItemForm ? (
        <Form.Item name="active" className="align-right">
          <Switch
            checkedChildren={i18n('buttons.active')}
            unCheckedChildren={i18n('buttons.suspended')}
            defaultChecked={companyData.active}
            className="float-right"
          />
        </Form.Item>
      ) : null}
      <Form.Item name="name" label={i18n('customers.name')} rules={[{ required: true, message: i18n('customers.nameMessage') }]}>
        {/* eslint-disable-next-line no-return-assign */}
        <Input onInput={e => (e.target.value = e.target.value.toUpperCase())} />
      </Form.Item>
      <Form.Item
        name="rfc"
        label={i18n('customers.taxId')}
        rules={[
          // { pattern: new RegExp(/^a-zA-Z0-9/i), message: i18n('customers.RFCPatternMessage') },
          {
            message: 'this is custom validation',
            validator: (_, value) => {
              const { valid, validateStatus, message } = rfcValido(value)
              setRFCValid(valid)
              setRFCValidateStatus(validateStatus)
              setRFCValidateMessage(message)
              if (message) {
                return Promise.resolve()
              }
              return Promise.reject()
            },
          },
          { required: true, message: i18n('customers.rfcMessage') },
        ]}
        help={!RFCValid ? RFCValidateMessage : null}
        validateStatus={!RFCValid ? RFCValidateStatus : null}
      >
        {/* eslint-disable-next-line no-return-assign */}
        <Input onInput={e => (e.target.value = e.target.value.replace(/-|\s/g, '').toUpperCase())} />
      </Form.Item>
      <Form.Item
        name="fiscalRegime"
        label={i18n('customers.fiscalRegime')}
        rules={[{ required: !isNewItemForm, message: i18n('customers.fiscalRegimeMessage') }]}
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
        rules={[{ required: !isNewItemForm, message: i18n('customers.cfdiUseMessage') }]}
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
        rules={[{ required: !isNewItemForm, message: i18n('customers.zipCodeMessage') }]}
      >
        <Input />
      </Form.Item>
      {companyData.rfc === 'XEXX010101000' ? (
        <div>
          <Title level={5}>{i18n('customers.requiredFieldsForForeigners')}</Title>
          <Form.Item
            name="fiscalResidenceCountry"
            label={i18n('customers.fiscalResidenceCountry')}
            rules={[{ required: companyData.rfc === 'XEXX010101000', message: i18n('customers.fiscalResidenceCountryCodeMessage') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="foreignFiscalId"
            label={i18n('customers.foreignFiscalId')}
            rules={[{ required: companyData.rfc === 'XEXX010101000', message: i18n('customers.foreignFiscalIdCodeMessage') }]}
          >
            <Input />
          </Form.Item>
        </div>
      ) : null}
      <Form.Item>
        <Space className="float-right">
          <Link href="/customers">{i18n('buttons.cancel')}</Link>
          <Button type="primary" htmlType="submit" loading={loadingSave}>
            {finishButtonText || i18n('buttons.save')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
