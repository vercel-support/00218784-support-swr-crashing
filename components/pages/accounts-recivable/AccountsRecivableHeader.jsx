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
    label: 'Todos los clientes',
    value: 'Todos los clientes',
  },
  {
    label: 'American Industires',
    value: 'American Industires',
  },

  {
    label: 'Central Zone',
    value: 'Central Zone',
  },
  {
    label: 'Elicamex',
    value: 'Elicamex',
  },
  {
    label: 'Mitsubishi',
    value: 'Mitsubishi',
  },
  {
    label: 'Toyota Guanajuato',
    value: 'Toyota Guanajuato',
  },
]
export const AccountsRecivableHeader = () => {
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={3}>Cuentas por Cobrar</Typography.Title>
      <Space>
        <Select
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Selecciona un cliente"
          defaultValue={['Todos los clientes']}
          onChange={handleChange}
          options={selectData}
        />
        <DatePicker onChange={onChange} picker="month" value={dayjs()} />
      </Space>
    </Flex>
  )
}
