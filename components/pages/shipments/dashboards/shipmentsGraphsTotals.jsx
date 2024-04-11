import React from 'react'
import { Card, Statistic, Row, Col } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Chart } from 'react-google-charts'

export const paymentsData = [
  ['Día', 'Completado', 'En proceso'],
  ['1', 10, 10],
  ['2', 70, 70],
  ['3', 60, 60],
  ['4', 130, 0],
  ['5', 310, 0],
  ['6', 1230, 0],
  ['7', 200, 200],
  ['8', 330, 400],
  ['9', 0, 230],
  ['10', 0, 1030],
  ['11', 1000, 900],
  ['12', 1170,1200],
  ['13', 660, 580],
  ['14', 30, 100],
  ['15', 100, 90],
  ['16', 908, 880],
  ['17', 123, 100],
  ['18', 140, 40],
  ['19', 20, 0],
  ['20', 440, 330],
  ['21', 0, 730],
  ['22', 0, 1200],
  ['23', 0, 1370],
  ['24', 0, 460],
  ['25', 0, 730],
  ['26', 0, 630],
  ['27', 0, 230],
  ['28', 0, 1030],
  ['29', 0, 830],
  ['30', 0, 730],
]

export const paymentsOptions = {
  chart: {
    subtitle: 'Durante el periodo: 1 al 30 de Enero 2024',
  },
}

export const agingData = [
  ['Categoría', 'Cantidad Embarques'],
  ['Exportación', 15],
  ['Importación', 2],
  ['Nacional', 6],
  ['Regional', 1],
  ['Local', 4], // CSS-style declaration
]

export const agingOptions = {
  pieHole: 0.4,
  is3D: false,
}

export const ShipmentsGraphsTotals = () => {
  return (
    <>
      <Row justify="space-between" gutter={[8, 8]} className="mt-3">
        <Col xs={24} sm={24} md={12} lg={16}>
          <Card className="w-full" title="Embarques" extra={<a href="/shipments/detail">Detalle</a>}>
            <Chart chartType="Bar" width="100%" height="250px" data={paymentsData} options={paymentsOptions} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card className="w-full" title="Tipo Embarques" extra={<a href="/accounts-recivable/aging">Detalle</a>}>
            <Chart chartType="PieChart" width="100%" height="250px" data={agingData} options={agingOptions} />
          </Card>
        </Col>
      </Row>
    </>
  )
}