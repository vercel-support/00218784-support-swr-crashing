import React from 'react'
import { Card, Statistic, Row, Col } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
// eslint-disable-next-line import/no-extraneous-dependencies
import CountUp from 'react-countup'

const formatter = value => <CountUp end={value} separator="," decimals={2} />
const formatterNoDecimals = value => <CountUp end={value} separator="," decimals={0} />

export const ShipmentsIndicators = () => {
  return (
    <>
      <Row justify="space-between" gutter={[8, 8]} className="mt-3">
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Ingresos" prefix="USD" value={873261.33} precision={2} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Costos" prefix="USD" value={644323.64} precision={2} formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Margen" value={26.22} precision={2} valueStyle={{ color: '#3f8600' }} suffix="%" formatter={formatter} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Embarques Totales" value={688} precision={0} formatter={formatterNoDecimals} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic title="Embarques a Tiempo" value={643} precision={0} formatter={formatterNoDecimals} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={4}>
          <Card className="w-full" hoverable>
            <Statistic
              title="Porcentaje Eficiencia"
              value={93.45}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
