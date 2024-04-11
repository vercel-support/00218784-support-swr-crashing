import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Card, Form, Typography, Space, Row, Col, Statistic, Table, Drawer } from 'antd'
import { i18n } from '../../../../services/i18n'
import { numberFormat } from '../../../../services/helpers/mathHelp'
import { BottomBar } from './sectionBottomMenu'
import { LastComment } from './lastComment'
import { NewInvoiceItemForm4 } from '../../new-cfdi-40/newInvoiceItemForm'
import useWindowSize from '../../../hooks/useWindowSize'

const { Title, Text, Paragraph } = Typography

export const ShipmentPrices = ({ hubState, hubDispatch, getViewPermissions, getWritingPermissions }) => {
  const [isEditPriceItemDetailVisible, setIsEditPriceItemDetailVisible] = useState(false)
  const windowSize = useWindowSize()
  const [isEditingPrice, setIsEditingPrice] = useState(false)
  const [itemIndex, setItemIndex] = useState(null)
  const [rowValues, setRowValues] = useState(null)
  // console.log({ windowSize })
  const priceItemsColumns = [
    {
      title: i18n('newBillOfLadingHub.prices.product'),
      dataIndex: 'productCode',
      key: 'productCode',
      align: 'right',
      responsive: ['sm'],
    },
    {
      title: i18n('newBillOfLadingHub.prices.productDescription'),
      dataIndex: 'productDescription',
      key: 'productDescription',
    },
    {
      title: i18n('newBillOfLadingHub.prices.quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
    },
    // {
    //   title: i18n('newBillOfLadingHub.prices.unitCode'),
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   responsive: ['md','lg'],
    // },
    {
      title: i18n('newBillOfLadingHub.prices.currency'),
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
    },
    {
      title: i18n('newBillOfLadingHub.prices.subtotal'),
      dataIndex: 'subtotal',
      key: 'subtotal',
      responsive: ['sm'],
      align: 'right',
    },
    {
      title: i18n('newBillOfLadingHub.prices.tax'),
      dataIndex: 'taxIva',
      key: 'taxIva',
      responsive: ['sm'],
      align: 'right',
    },
    {
      title: i18n('newBillOfLadingHub.prices.taxRetention'),
      dataIndex: 'taxIvaRet',
      key: 'taxIvaRet',
      responsive: ['sm'],
      align: 'right',
    },
    {
      title: i18n('newBillOfLadingHub.prices.total'),
      dataIndex: 'total',
      key: 'total',
      align: 'right',
    },
  ]

  const getTotalPrice = quotations => {
    let subtotal = 0
    if (quotations)
      quotations.map(quotation => {
        if (typeof quotation.subtotal === 'undefined') return null
        subtotal += quotation.subtotal
        return null
      })
    return subtotal
  }

  const getCfdiDraftByBoLHSection = sectionName => {
    const cfdiDraft = hubState?.cfdiDrafts?.find(({ BoLHSection }) => BoLHSection === sectionName)
    // console.log('getCfdiDraftByBoLHSection', cfdiDraft, sectionName)
    return cfdiDraft
  }

  const getItemsFromCfdiDraft = cfdiDraft => {
    const items = cfdiDraft?.items?.map(item => {
      const iva = item?.taxes?.find(({ isRetention }) => isRetention === false)
      const ivaRet = item?.taxes?.find(({ isRetention }) => isRetention === true)
      const row = {
        key: `${item?.productCode} ${item?.total}`,
        productCode: item?.productCode,
        productDescription: item?.notes,
        quantity: numberFormat(item?.quantity),
        unit: item?.unit,
        currency: cfdiDraft?.currency ? cfdiDraft?.currency : '',
        unitValue: numberFormat(item.unitValue),
        subtotal: numberFormat(item.subtotal),
        taxIva: numberFormat(iva?.value) || numberFormat(0),
        taxIvaRet: numberFormat(ivaRet?.value) || numberFormat(0),
        total: numberFormat(item.total),
      }
      return row
    })
    // console.log('getItemsFromCfdiDraft', items)
    return items
  }

  const getItemsFromQuotations = quotations => {
    const items = quotations.map(item => {
      const iva = item?.taxes?.find(({ isRetention }) => isRetention === false)
      const ivaRet = item?.taxes?.find(({ isRetention }) => isRetention === true)
      const row = {
        key: `${item?.productCode} ${item?.total}`,
        id: item?.id,
        productCode: item?.productCode,
        productDescription: item?.description,
        quantity: numberFormat(item?.quantity),
        unit: item?.unit,
        currency: item?.currency ? item?.currency : '',
        unitValue: numberFormat(item?.unitValue),
        subtotal: numberFormat(item?.subtotal),
        haveTax: item?.haveTax,
        haveIvaRet: item?.haveIvaRet,
        notes: item?.notes,
        taxIva: numberFormat(iva?.value) || numberFormat(0),
        taxIvaRet: numberFormat(ivaRet?.value) || numberFormat(0),
        total: numberFormat(item?.total),
        taxObject: item?.taxObject,
      }
      return row
    })
    // console.log('getItemsFromCfdiDraft', items)
    return items
  }

  const getCfdiFields = (BoLHState, BoLHSection = 'Main') => {
    Router.push({
      pathname: '/new-cfdi',
      query: {
        issuerId: BoLHState.companyId,
        receiverId: BoLHState.clientId,
        BoLHId: BoLHState._id,
        requestedFrom: 'BillOfLadingHub',
        BoLHSection: BoLHSection,
      },
    })
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

  const getTotalMargin = (totalPrice, totalCost, decimals) => {
    if (totalPrice === 0) return 1
    const margin = (totalPrice - totalCost) / totalPrice
    return parseFloat(margin.toFixed(decimals))
  }

  const getTotalMarginText = (totalPrice, totalCost, monetaryDecimals, percentageDecimals, currency = '') => {
    const totalMargin = getTotalMargin(totalPrice, totalCost, percentageDecimals) * 100
    const monetaryProfit = totalPrice - totalCost
    return `${currency} ${numberFormat(monetaryProfit, monetaryDecimals)} (${totalMargin.toFixed(monetaryDecimals)}%)`
  }

  const addAdditionalItem = value => {
    setIsEditPriceItemDetailVisible(false)
    hubDispatch({ type: 'addAdditionalItem', payload: value })
  }
  const removeAdditionalItem = itemId => {
    console.log('Reached remobeAdditionalItem')
    // console.log('after update ',{isEditPriceItemDetailVisible})
    // console.log('removeAdditionalItem shipmentPrices', { itemId })
    setIsEditPriceItemDetailVisible(false)
    hubDispatch({ type: 'removeAdditionalItem', payload: itemId })
  }
  const selectedAdditionalItem = value => {
    hubDispatch({ type: 'setSelectedAdditionalItem', payload: value })
    // console.log('before update ',{isEditPriceItemDetailVisible})
    // console.log('after update ',{isEditPriceItemDetailVisible})
  }

  return (
    <>
      {/* Prices */}
      {getViewPermissions('prices') ? (
        <div>
          <Card className="w-full mt-20 border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id="prices">
            <Form layout="vertical">
              <Title level={4}>{i18n(`newBillOfLadingHub.prices.title`)}</Title>
              <div className="mt-4">{i18n('newBillOfLadingHub.prices.description')}</div>
              {getWritingPermissions('prices') ? (
                <Space className="mt-4 md:float-right md:-mt-16" wrap>
                  {hubState?.status?.pricesComplete ? null : (
                    // <Button type="" className="float-right" onClick={() => getCfdiFields(hubState)}>
                    <Button
                      type=""
                      className="float-right"
                      onClick={() => {
                        setIsEditingPrice(false)
                        setIsEditPriceItemDetailVisible(true)
                      }}
                    >
                      {i18n('newBillOfLadingHub.prices.addItem')}
                    </Button>
                  )}
                  {hubState?.status?.pricesComplete ? (
                    <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Prices Edit' })}>
                      {i18n('buttons.edit')}
                    </Button>
                  ) : (
                    <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Prices Complete' })}>
                      {i18n('buttons.complete')}
                    </Button>
                  )}
                </Space>
              ) : null}

              {/* <Divider plain />
                  <Table
                    pagination={false}
                    dataSource={getItemsFromCfdiDraft(getCfdiDraftByBoLHSection('Main'))}
                    columns={priceItemsColumns}
                  />
                  <Divider plain /> */}
              {/* {getWritingPermissions('prices') ? (
                    <div>
                      {hubState?.status?.pricesComplete ? (
                        <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Prices Edit' })}>
                          {i18n('buttons.edit')}
                        </Button>
                      ) : (
                        <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Prices Complete' })}>
                          {i18n('buttons.complete')}
                        </Button>
                      )}
                    </div>
                  ) : null} */}
            </Form>
          </Card>
          {/* Profitability */}
          {getViewPermissions('prices') && getViewPermissions('costs') ? (
            <Row className="w-full">
              <Col span={24} sm={{ span: 8 }}>
                <Card className="mt-2">
                  <Statistic
                    title={i18n('newBillOfLadingHub.profitability.totalPrice')}
                    value={getTotalPrice(hubState?.prices?.quotations)}
                    precision={2}
                    // valueStyle={{ color: '#53cf8c' }}
                    prefix={hubState?.cfdiDrafts[0] ? hubState?.cfdiDrafts[0].currency : ''}
                    // suffix="%"
                    key="totalPrice"
                  />
                </Card>
              </Col>
              <Col span={24} sm={{ span: 8 }}>
                <Card className="mt-2 md:ml-2">
                  <Statistic
                    title={i18n('newBillOfLadingHub.profitability.totalCost')}
                    value={getTotalCost(hubState?.costs?.costs)}
                    precision={2}
                    // valueStyle={{ color: '#f50538' }}
                    prefix={
                      hubState?.costs?.costs !== undefined && hubState?.costs?.costs.length > 0 ? hubState?.costs?.costs[0].currency : ''
                    }
                    // suffix="%"
                    key="totalCost"
                  />
                </Card>
              </Col>
              <Col span={24} sm={{ span: 8 }}>
                <Card className="mt-2 md:ml-2">
                  <Statistic
                    title={i18n('newBillOfLadingHub.profitability.totalMargin')}
                    value={getTotalMarginText(
                      getTotalPrice(hubState?.cfdiDrafts),
                      getTotalCost(hubState?.costs?.costs),
                      2,
                      4,
                      hubState?.costs?.costs !== undefined && hubState?.costs?.costs.length > 0 ? hubState?.costs?.costs[0].currency : ''
                    )}
                    precision={2}
                    valueStyle={
                      getTotalMargin(getTotalPrice(hubState?.cfdiDrafts), getTotalCost(hubState?.costs?.costs), 4) > 0
                        ? { color: '#53cf8c' }
                        : { color: '#f50538' }
                    }
                    // prefix={''}
                    // suffix="%"
                    key="totalMargin"
                  />
                </Card>
              </Col>
            </Row>
          ) : null}
          {getViewPermissions('prices') && !getViewPermissions('costs') ? (
            <Row className="w-full">
              <Col span={24}>
                <Card className="mt-2">
                  <Statistic
                    title={i18n('newBillOfLadingHub.profitability.totalPrice')}
                    value={getTotalPrice(hubState?.cfdiDrafts)}
                    precision={2}
                    // valueStyle={{ color: '#53cf8c' }}
                    prefix={hubState?.cfdiDrafts[0] ? hubState?.cfdiDrafts[0].currency : ''}
                    // suffix="%"
                    key="totalPrice"
                  />
                </Card>
              </Col>
            </Row>
          ) : null}
          <Card className="w-full my-2">
            <Table
              pagination={false}
              dataSource={getItemsFromQuotations(hubState?.prices?.quotations || [])}
              columns={priceItemsColumns}
              scroll={{ x: '100%' }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    // console.log('onClick', { event, record, rowIndex })
                    setRowValues(record)
                    hubDispatch({ type: 'setSelectedAdditionalItems', payload: record })
                    setItemIndex(rowIndex)
                    setIsEditingPrice(true)
                    setIsEditPriceItemDetailVisible(true)
                  },
                  // }, // click row
                  // onDoubleClick: event => {
                  //   console.log('onDoubleClick', { event })
                  // }, // double click row
                  // onContextMenu: event => {
                  //   console.log('onContextMenu', { event })
                  // }, // right button click row
                  // onMouseEnter: event => {
                  //   console.log('onMouseEnter', { event })
                  // }, // mouse enter row
                  // onMouseLeave: event => {
                  //   console.log('onMouseLeave', { event })
                  // }, // mouse leave row
                }
              }}
              summary={pageData => {
                // console.log({ pageData })
                let totalQuantity = 0
                let totalSubtotal = 0
                let totalTaxIva = 0
                let totalTaxIvaRet = 0
                let totalTotal = 0

                pageData.forEach(({ quantity, subtotal, taxIva, taxIvaRet, total }) => {
                  // console.log({ total, total2: parseFloat(total) })
                  totalQuantity += parseFloat(quantity.replace(/,/g, ''))
                  totalSubtotal += parseFloat(subtotal.replace(/,/g, ''))
                  totalTaxIva += parseFloat(taxIva.replace(/,/g, ''))
                  totalTaxIvaRet += parseFloat(taxIvaRet.replace(/,/g, ''))
                  // eslint-disable-next-line no-restricted-globals
                  totalTotal += parseFloat(total.replace(/,/g, ''))
                  // console.log({totalTotal})
                })

                return (
                  <>
                    {windowSize === 'sm' ? (
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align="right">
                          <Text strong>{i18n('totals')}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} align="right">
                          <Text strong>{totalQuantity}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} responsive="sm" />
                        <Table.Summary.Cell index={3} align="right">
                          <Text strong>{totalTotal}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    ) : (
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align="right">
                          <Text strong>{i18n('totals')}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} responsive="sm" />
                        <Table.Summary.Cell index={2} align="right">
                          <Text strong>{totalQuantity}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3} responsive="sm" />
                        <Table.Summary.Cell index={4} align="right" responsive={['sm']}>
                          <Text strong>{totalSubtotal}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={5} align="right" responsive={['sm']}>
                          <Text strong>{totalTaxIva}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={6} align="right" responsive={['sm']}>
                          <Text strong>{totalTaxIvaRet}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={7} align="right">
                          <Text strong>{totalTotal}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    )}
                  </>
                )
              }}
            />
          </Card>
          <LastComment section="prices" comment={hubState?.prices?.lastComment} />
          <BottomBar hubState={hubState} hubDispatch={hubDispatch} />
        </div>
      ) : null}
      <Drawer
        title={<Title level={3}>{i18n('newBillOfLadingHub.prices.edit')}</Title>}
        width="80%"
        onClose={() => setIsEditPriceItemDetailVisible(false)}
        open={isEditPriceItemDetailVisible}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        destroyOnClose
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
        key={4}
      >
        <NewInvoiceItemForm4
          isHub
          addAdditionalItem={addAdditionalItem}
          removeAdditionalItem={removeAdditionalItem}
          selectedAdditionalItem={hubState?.prices?.selectedAdditionalItem || null}
          index={itemIndex}
          rowValues={rowValues}
          isEditing={isEditingPrice}
        />
        {/* cfdiCurrency="MXN"
          addAdditionalItem={addAdditionalItem}
          removeAdditionalItem={removeAdditionalItem}
          selectedAdditionalItem={selectedAdditionalItem}
          dispatch={hubDispatch}
          setIsEditVisible={setIsEditPriceItemDetailVisible}
          quotations={hubState.prices.quotations}
          index={index}
          isEditingTransport
          authorizedUsers={usersList}
          companyProfile={companyProfile}
          /> */}
      </Drawer>
    </>
  )
}
