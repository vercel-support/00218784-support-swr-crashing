import React from 'react'
import { Card, Row, Col, Table, Badge, Tag, Calendar } from 'antd'



const tableColumns = [
  {
    title: 'Cliente',
    dataIndex: 'customer',
    key: 'customer',
    render: text => <a href={`/customers/${text}`}>{text}</a>,
  },
  {
    title: 'Servicio',
    dataIndex: 'service',
    key: 'service',
    render: text => <a href={`/service/${text}`}>{text}</a>,
  },
  {
    title: 'Monto',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
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
    customer: 'Elicamex',
    service: 'A1AL239904',
    amount: 'USD 5,234',
    ages: [180],
  },
  {
    key: '2',
    customer: 'GKN Celaya',
    service: 'A1AL232734',
    amount: 'USD 4,142',
    ages: [130],
  },
  {
    key: '3',
    customer: 'Toyota Guanajuato',
    service: 'A1AL233450',
    amount: 'USD 3,384',
    ages: [30],
  },
  {
    key: '4',
    customer: 'Central Zone',
    service: 'A1AL234857',
    amount: 'USD 2,098',
    ages: [40],
  },
  {
    key: '5',
    customer: 'Ameya Industires',
    service: 'A1AL239904',
    amount: 'USD 1,665',
    ages: [30],
  },
]

const tablePColumns = [
  {
    title: 'Proveedor',
    dataIndex: 'customer',
    key: 'customer',
    render: text => <a href={`/customers/${text}`}>{text}</a>,
  },
  {
    title: 'Servicio',
    dataIndex: 'service',
    key: 'service',
    render: text => <a href={`/service/${text}`}>{text}</a>,
  },
  {
    title: 'Monto',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
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
const tablePData = [
  {
    key: '1',
    customer: 'Transportes Hernandez',
    service: 'A1AL234403',
    amount: 'USD 5,234',
    ages: [45],
  },
  {
    key: '2',
    customer: 'Transportes Trucka',
    service: 'A1AL234343',
    amount: 'USD 4,142',
    ages: [30],
  },
  {
    key: '3',
    customer: 'Transportes Central Zone',
    service: 'A1AL234543',
    amount: 'USD 3,384',
    ages: [30],
  },
  {
    key: '4',
    customer: 'Transportes Oriente',
    service: 'A1AL237765',
    amount: 'USD 2,098',
    ages: [120],
  },
  {
    key: '5',
    customer: 'Transportes del Sureste',
    service: 'A1AL239904',
    amount: 'USD 1,665',
    ages: [30],
  },
]
export const AccountsRecivableCalendarCustomers = () => {

  return (
    <>
      <Row justify="space-between" gutter={[8, 8]} className="mt-3">
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card className="w-full" title="Facturas de Clientes" extra={<a href="/accounts-recivable/top-customers">Detalle</a>}>
            <Table columns={tableColumns} dataSource={tableData} pagination={false} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card className="w-full" title="Facturas de Proveedores" extra={<a href="/accounts-recivable/top-customers">Detalle</a>}>
            <Table columns={tablePColumns} dataSource={tablePData} pagination={false} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
