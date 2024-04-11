import React from 'react'
import { Card, Row, Col, Table, Badge, Tag, Calendar } from 'antd'

const getListData = value => {
  let listData
  switch (value.date()) {
    case 2:
      listData = [
        {
          type: 'warning',
          content: 'Promesa pago',
        },
        {
          type: 'success',
          content: 'Pago realizado',
        },
      ]
      break
    case 4:
      listData = [
        {
          type: 'warning',
          content: 'Promesa de pago',
        },
        {
          type: 'success',
          content: 'Pago realizado',
        },
        {
          type: 'error',
          content: 'Promesa Incumplida',
        },
      ]
      break
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'Promesa de pago',
        },
        {
          type: 'success',
          content: 'Pago realizado',
        },
        {
          type: 'error',
          content: 'Promesa incumplida',
        },
        {
          type: 'error',
          content: 'Promesa incumplida',
        },
        {
          type: 'error',
          content: 'Promesa incumplida',
        },
        {
          type: 'error',
          content: 'Promesa incumplida',
        },
      ]
      break
    default:
  }
  return listData || []
}
const getMonthData = value => {
  if (value.month() === 8) {
    return 1394
  }
  return null
}

const tableColumns = [
  {
    title: 'Proveedor',
    dataIndex: 'provider',
    key: 'provider',
    render: text => <a href={`/provider/${text}`}>{text}</a>,
  },
  {
    title: 'Monto',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Días promedio',
    key: 'age',
    dataIndex: 'age',
    render: (_, { ages }) => (
      <>
        {ages.map(age => {
          let color = 'green'
          if (age > 0 && age < 30) {
            color = 'green'
          }
          if (age > 31 && age < 60) {
            color = 'gold'
          }
          if (age > 61 && age < 90) {
            color = 'orange'
          }
          if (age > 91 && age < 120) {
            color = 'volcano'
          }
          if (age > 120) {
            color = 'red'
          }
          return (
            <Tag color={color} key={age}>
              {age}
            </Tag>
          )
        })}
      </>
    ),
  },
]
const tableData = [
  {
    key: '1',
    customer: 'Trucka',
    amount: 'USD 4,234',
    ages: [184],
  },
  {
    key: '2',
    customer: 'Tigers Logistics',
    amount: 'USD 3,142',
    ages: [93],
  },
  {
    key: '3',
    customer: 'Lopez Transportes',
    amount: 'USD 2,384',
    ages: [67],
  },
  {
    key: '4',
    customer: 'Transportes Hernández',
    amount: 'USD 1,098',
    ages: [53],
  },
  {
    key: '5',
    customer: 'Transportes del Sur',
    amount: 'USD 665',
    ages: [22],
  },
]
export const AccountsRecivableCalendarCustomers = () => {
  const monthCellRender = value => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }
  const dateCellRender = value => {
    const listData = getListData(value)
    return (
      <>
        {listData.map(item => (
          <Badge status={item.type} text={item.content} key={item.content} />
        ))}
      </>
    )
  }
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }
  return (
    <>
      <Row justify="space-between" gutter={[8, 8]} className="mt-3">
        <Col xs={24} sm={24} md={12} lg={16}>
          <Card className="w-full" title="Calendario de Pagos" extra={<a href="/accounts-payable/calendar">Detalle</a>}>
            <Calendar cellRender={cellRender} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card className="w-full" title="Top Adeudo Proveedores" extra={<a href="/accounts-payable/top-providers">Detalle</a>}>
            <Table columns={tableColumns} dataSource={tableData} pagination={false} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
