import React from 'react'
import Router from 'next/router'
import { Button, Card, Form, Typography, Space, Row, Col, Statistic, Table } from 'antd'
import { i18n } from '../../../../services/i18n'
import { numberFormat } from '../../../../services/helpers/mathHelp'
import { BottomBar } from './sectionBottomMenu'
import { LastComment } from './lastComment'

const { Title, Text, Paragraph } = Typography

export const ShipmentCosts = ({ hubState, hubDispatch, getViewPermissions, getWritingPermissions }) => {
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
      title: i18n('newBillOfLadingHub.costs.company'),
      dataIndex: 'companyName',
      key: 'company.name',
    },
    {
      title: i18n('newBillOfLadingHub.costs.folio'),
      dataIndex: 'folio',
      key: 'folio',
    },
    {
      title: i18n('newBillOfLadingHub.costs.currency'),
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: i18n('newBillOfLadingHub.costs.subtotal'),
      dataIndex: 'subtotal',
      key: 'subtotal',
      responsive: ['sm'],
    },
    {
      title: i18n('newBillOfLadingHub.costs.tax'),
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

  return (
    <>
      {/* Costs */}
      {getViewPermissions('costs') ? (
        <div>
          <Card className="w-full mt-20 border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id="costs">
            <Form layout="vertical">
              <Title level={4}>{i18n(`newBillOfLadingHub.costs.title`)}</Title>
              <div className="mt-4">{i18n('newBillOfLadingHub.costs.description')}</div>
              {getWritingPermissions('costs') ? (
                <Space className="mt-4 md:float-right md:-mt-16" wrap>
                  {/* {BoLHState?.status?.pricesComplete ? null : (
                  <Button type="" className="float-right" onClick={() => getCfdiFields(BoLHState)}>
                    {i18n('newBillOfLadingHub.costs.addItem')}
                  </Button>
                )} */}
                  {hubState?.status?.costsComplete ? (
                    <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Costs Edit' })}>
                      {i18n('buttons.edit')}
                    </Button>
                  ) : (
                    <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Costs Complete' })}>
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
                {BoLHState?.status?.pricesComplete ? (
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
          {getViewPermissions('costs') ? (
            <Row className="w-full">
              <Col span={24}>
                <Card className="mt-2">
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
            </Row>
          ) : null}
          <Card className="w-full my-2">
            <Table
              pagination={false}
              dataSource={costsData(hubState?.costs?.costs ? hubState?.costs?.costs : [])}
              columns={costItemsColumns}
              // summary={pageData => costsTotals(pageData)}
            />
          </Card>
        </div>
      ) : null}

      <LastComment section="costs" comment={hubState?.costs?.lastComment} />
      <BottomBar />
    </>
  )
}
