import React, { useEffect } from 'react'
import { Form, Button, InputNumber, Checkbox, Space, Select, Input, message } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { i18n } from '../../../services/i18n'
import { num, numberFormat } from '../../../services/helpers/mathHelp'
import { labelValueServices, labelValueUnitCodes, labelValueCfdiTaxObject } from '../../../services/catalogs'

const { Option } = Select

const validateAdditionalItemForm = item => {
  // console.log({ item })
  const errors = {}
  if (!item.productCode) errors.productCode = 'newCfdi.errors.productCodeRequired'
  if (!item.unit) errors.unit = 'newCfdi.errors.unitRequired'
  if (!item.quantity || item.quantity <= 0) errors.quantity = 'newCfdi.errors.invalidQuantity'
  if (!item.unitValue || item.unitValue <= 0) errors.unitValue = 'newCfdi.errors.invalidUnitValue'
  return errors
}

export const NewInvoiceItemForm4 = ({
  addAdditionalItem,
  removeAdditionalItem,
  selectedAdditionalItem,
  isHub = false,
  rowValues,
  isEditing = false,
}) => {
  const initialValues = {
    id: null,
    productCode: null,
    unit: null,
    quantity: 1,
    unitValue: 0,
    haveTax: false,
    tax: 0,
    haveIvaRet: false,
    ivaRet: 0,
    subtotal: 0,
    total: 0,
    notes: '',
    currency: 'USD',
    taxObject: '02',
  }

  const defaultValues = isEditing ? rowValues : initialValues

  // console.log('NewInvoiceItemForm4', {rowValues, defaultValues, initialValues, isEditing})

  const resolver = values => {
    const validationErrors = validateAdditionalItemForm(values)
    const error = Object.keys(validationErrors).length > 0
    return { values: error ? {} : values, errors: validationErrors }
  }
  const { control, handleSubmit, errors, watch, setValue, reset } = useForm({ defaultValues, resolver })
  const { id, quantity, unitValue, haveTax, haveIvaRet, subtotal, tax, ivaRet } = watch()
  useEffect(() => {
    if (!selectedAdditionalItem) return
    reset({
      ...selectedAdditionalItem,
      haveTax: Boolean(selectedAdditionalItem?.taxes?.find(({ name, isRetention }) => name === 'iva' && isRetention === false)),
      haveIvaRet: Boolean(selectedAdditionalItem?.taxes?.find(({ name, isRetention }) => name === 'iva' && isRetention === true)),
    })
  }, [selectedAdditionalItem])
  useEffect(() => setValue('subtotal', num(quantity).times(unitValue).val()), [quantity, unitValue])
  useEffect(() => setValue('tax', haveTax ? num(subtotal).times(0.16).val() : 0), [subtotal, haveTax])
  useEffect(() => setValue('ivaRet', haveIvaRet ? num(subtotal).times(0.04).val() : 0), [subtotal, haveIvaRet])
  useEffect(() => setValue('total', num(subtotal).plus(tax).minus(ivaRet).val()), [subtotal, tax, ivaRet])
  const onSubmit = data => {
    // console.log({ data })
    addAdditionalItem(data)
    reset(initialValues)
    if (isHub) message.success(i18n('newBillOfLadingHub.prices.addedSuccessfully'))
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {isHub ? null : <h3>{i18n('newCfdi.invoiceItemsStep.additionalItems')}</h3>}
      <Controller name="id" control={control} render={() => <></>} />

      <Form.Item
        label={i18n('newCfdi.additionalItem.productCode')}
        validateStatus={errors?.productCode && 'error'}
        help={errors?.productCode && i18n(errors?.productCode)}
      >
        <Controller
          name="productCode"
          // as={Select}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={i18n('newCfdi.additionalItem.productCodePlaceholder')}
              optionFilterProp="children"
              // filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              showSearch
              options={labelValueServices.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
              defaultValue=""
            />
          )}
          className="w-full"
          // placeholder={i18n('newCfdi.additionalItem.productCodePlaceholder')}
          // optionFilterProp="children"
          // filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          // showSearch
          // options={labelValueServices.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
          control={control}
          // defaultValue=""
        />
      </Form.Item>
      <Form.Item label={i18n('newCfdi.additionalItem.notes')}>
        <Controller name="description" render={({ field }) => <Input.TextArea {...field} defaultValue="" />} control={control} />
      </Form.Item>
      <Form.Item
        label={i18n('newCfdi.additionalItem.unit')}
        validateStatus={errors?.unit && 'error'}
        help={errors?.unit && i18n(errors?.unit)}
      >
        <Controller
          name="unit"
          // as={Select}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={i18n('newCfdi.additionalItem.unitPlaceholder')}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              options={labelValueUnitCodes.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
              showSearch
              defaultValue=""
            />
          )}
          className="w-full"
          // placeholder={i18n('newCfdi.additionalItem.unitPlaceholder')}
          // optionFilterProp="children"
          // filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          // showSearch
          // options={labelValueUnitCodes.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
          control={control}
          // defaultValue=""
        />
      </Form.Item>

      {isHub ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            <Form.Item
              label={i18n('newCfdi.additionalItem.quantity')}
              validateStatus={errors?.quantity && 'error'}
              help={errors?.quantity && i18n(errors?.quantity)}
            >
              <Controller name="quantity" render={({ field }) => <InputNumber {...field} min={1} />} control={control} className="w-full" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={i18n('newCfdi.additionalItem.currency')}
              // validateStatus={errors?.unitValue && 'error'}
              // help={errors?.unitValue && i18n(errors?.unitValue)}
            >
              <Controller
                name="currency"
                // as={Select}
                render={({ field }) => (
                  <Select {...field} defaultValue="USD" style={{ width: 100 }}>
                    <Option value="MXN">MXN</Option>
                    <Option value="USD">USD</Option>
                    <Option value="EUR">EUR</Option>
                    <Option value="GBP">GBP</Option>
                    <Option value="CNY">CNY</Option>
                  </Select>
                )}
                // placeholder={i18n('newCfdi.additionalItem.unitPlaceholder')}
                // optionFilterProp="children"
                // filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                // showSearch
                // options={labelValueUnitCodes.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
                control={control}
                // defaultValue=""
              />
            </Form.Item>
            <Form.Item
              label={i18n('newCfdi.additionalItem.unitValue')}
              validateStatus={errors?.unitValue && 'error'}
              help={errors?.unitValue && i18n(errors?.unitValue)}
            >
              <Controller
                name="unitValue"
                render={({ field }) => <InputNumber {...field} min={0} step={0.01} formatter={value => numberFormat(value)} />}
                control={control}
                className="w-full"
              />
            </Form.Item>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={i18n('newCfdi.additionalItem.quantity')}
            validateStatus={errors?.quantity && 'error'}
            help={errors?.quantity && i18n(errors?.quantity)}
          >
            <Controller name="quantity" render={({ field }) => <InputNumber {...field} min={1} />} control={control} className="w-full" />
          </Form.Item>
          <Form.Item
            label={i18n('newCfdi.additionalItem.unitValue')}
            validateStatus={errors?.unitValue && 'error'}
            help={errors?.unitValue && i18n(errors?.unitValue)}
          >
            <Controller
              name="unitValue"
              render={({ field }) => <InputNumber {...field} min={0} step={0.01} />}
              control={control}
              className="w-full"
            />
          </Form.Item>
        </div>
      )}

      <Form.Item
        label={i18n('newCfdi.additionalItem.itemTaxObject')}
        validateStatus={errors?.unit && 'error'}
        help={errors?.unit && i18n(errors?.unit)}
      >
        <Controller
          name="taxObject"
          // as={Select}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={i18n('newCfdi.additionalItem.itemTaxObject')}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              options={labelValueCfdiTaxObject.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
              showSearch
              defaultValue="02"
            />
          )}
          className="w-full"
          // placeholder={i18n('newCfdi.additionalItem.unitPlaceholder')}
          // optionFilterProp="children"
          // filterOption={(input, option) => option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          // showSearch
          // options={labelValueUnitCodes.map(({ label, value }) => ({ value, label: `${value} - ${label}` }))}
          control={control}
          // defaultValue=""
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item label={i18n('newCfdi.additionalItem.tax')} className="mr-4">
          <Space direction="vertical">
            <Controller
              name="haveTax"
              control={control}
              render={({ field: { onChange, value } }) => <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
            />
            <Controller
              className="w-full"
              name="tax"
              render={({ field }) => <InputNumber {...field} disabled defaultValue={0} />}
              control={control}
            />
          </Space>
        </Form.Item>
        <Form.Item label={i18n('newCfdi.additionalItem.ivaRet')}>
          <Space direction="vertical">
            <Controller
              name="haveIvaRet"
              control={control}
              render={({ field: { onChange, value } }) => {
                // console.log({value})
                return <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />
              }}
            />
            <Controller
              className="w-full"
              name="ivaRet"
              render={({ field }) => <InputNumber {...field} disabled defaultValue={0} />}
              control={control}
            />
          </Space>
        </Form.Item>
        <Form.Item label={i18n('newCfdi.additionalItem.subtotal')}>
          <Controller
            className="w-full"
            name="subtotal"
            render={({ field }) => <InputNumber {...field} disabled defaultValue={0} />}
            control={control}
          />
        </Form.Item>
        <Form.Item label={i18n('newCfdi.additionalItem.total')}>
          <Controller
            className="w-full"
            name="total"
            render={({ field }) => <InputNumber {...field} disabled defaultValue={0} />}
            control={control}
          />
        </Form.Item>
      </div>
      
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {i18n(id !== null ? 'newCfdi.additionalItem.updateItem' : 'newCfdi.additionalItem.addItem')}
          </Button>
          {id !== null && (
            <Button
              danger
              onClick={() => {
                removeAdditionalItem(id)
                reset(defaultValues)
              }}
            >
              {i18n('newCfdi.additionalItem.deleteItem')}
            </Button>
          )}{' '}
          {isHub
            ? null
            : id !== null && <Button onClick={() => reset(defaultValues)}>{i18n('newCfdi.additionalItem.cancelEditItem')}</Button>}
        </Space>
      </Form.Item>
    </Form>
  )
}
