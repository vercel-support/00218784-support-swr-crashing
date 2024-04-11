import { DatePicker, Flex, Space, Typography, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const onChange = (date, dateString) => {
  console.log(date, dateString)
}

const handleChange = value => {
  console.log(`selected ${value}`)
}

const selectData = [
  {
    label: 'Todos los proveedores',
    value: 'Todos los proveedores',
  },
  {
    label: 'American Freight',
    value: 'American Freight',
  },

  {
    label: 'Central Zone',
    value: 'Central Zone',
  },
  {
    label: 'Elias Transportes',
    value: 'Elias Transportes',
  },
  {
    label: 'Transportes Martínez',
    value: 'Transportes Martínez',
  },
  {
    label: 'Transportes Proactivos',
    value: 'Transportes Proactivos',
  },
]
export const AccountsRecivableHeader = () => {
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={3}>Cuentas por Pagar</Typography.Title>
      <Space>
        <Select
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Selecciona un proveedor"
          defaultValue={['Todos los proveedores']}
          onChange={handleChange}
          options={selectData}
        />
        <DatePicker onChange={onChange} picker="month" value={dayjs()} />
      </Space>
    </Flex>
  )
}
