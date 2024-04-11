import React from 'react'
import { Card, Statistic, Row, Col } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { Chart } from 'react-google-charts'

export const paymentsData = [
  ['Día', 'Pagado', 'Gastado'],
  ['1', 1000, 900],
  ['2', 1170, 1200],
  ['3', 660, 580],
  ['4', 30, 100],
  ['5', 100, 90],
  ['6', 908, 880],
  ['7', 123, 100],
  ['8', 140, 40],
  ['9', 20, 0],
  ['10', 440, 330],
  ['11', 10, 10],
  ['12', 70, 70],
  ['13', 60, 60],
  ['14', 130, 0],
  ['15', 310, 0],
  ['16', 1230, 0],
  ['17', 200, 200],
  ['18', 330, 400],
  ['19', 0, 230],
  ['20', 0, 1030],
  ['21', 0, 130],
  ['22', 0, 1000],
  ['23', 0, 1170],
  ['24', 0, 660],
  ['25', 0, 430],
  ['26', 0, 530],
  ['27', 0, 330],
  ['28', 0, 230],
  ['29', 0, 1030],
  ['30', 0, 1030],
]

export const paymentsOptions = {
  chart: {
    subtitle: 'Durante el periodo: 1 al 30 de Enero 2024',
  },
}

export const agingData = [
  ['Días de envejecimiento', 'Número de días'],
  ['Local', 11],
  ['Regional', 5],
  ['Importación', 4],
  ['Exportación', 2],
  ['Almacenamiento', 7], // CSS-style declaration
]

export const agingOptions = {
  pieHole: 0.4,
  is3D: false,
}

export const AccountsRecivableGraphs = () => {
  return (
    <>
      <Row justify="space-between" gutter={[8, 8]} className="mt-3">
        <Col xs={24} sm={24} md={12} lg={16}>
          <Card className="w-full" title="Pagos vs Gastos" extra={<a href="/accounts-recivable/payments">Detalle</a>}>
            <Chart chartType="AreaChart" width="100%" height="250px" data={paymentsData} options={paymentsOptions} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card className="w-full" title="Por Servicio" extra={<a href="/accounts-recivable/aging">Detalle</a>}>
            <Chart chartType="PieChart" width="100%" height="250px" data={agingData} options={agingOptions} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
