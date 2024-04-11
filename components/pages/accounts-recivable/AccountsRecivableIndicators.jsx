import React from 'react'
import { Card, Statistic, Row, Col } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
// eslint-disable-next-line import/no-extraneous-dependencies
import CountUp from 'react-countup'

const formatter = value => <CountUp end={value} separator="," decimals={2} />

export const AccountsRecivableIndicators = () => {
  return (
    <>
      {/* Row of four */}
      {/* <Row justify="space-between" gutter={[16, 16]} className='mt-6'>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="w-full">
            <Statistic title="Total Facturado" prefix="USD" value={4521355.67} precision={2} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="w-full">
            <Statistic title="Total Adeudado" prefix="USD" value={1243345.55} precision={2} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="w-full">
            <Statistic
              title="Cambio Mes Anterior"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="w-full">
            <Statistic title="Días Promedio de Pago" suffix="días" value={54.33} precision={2} />
          </Card>
        </Col>
      </Row> */}
      <Row justify="space-between" gutter={[8, 8]} className="mt-3">
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Ventas a Crédito" prefix="USD" value={4521355.67} precision={2} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Saldo Total" prefix="USD" value={1243345.55} precision={2} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic
              title="Tasa de recuperación"
              value={72.50}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Días Promedio de Pago" suffix="días" value={24.33} precision={2} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Rotación de Cuentas por Cobrar" value={12.55} precision={2} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic
              title="Prcentaje Cuentas Incobrables"
              value={6.24}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              suffix="%"
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
