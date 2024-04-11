import React, { useState } from 'react'
import { Button, Col, Flex, Checkbox, DatePicker, Divider, Drawer, Form, Input, Row, Select, Space, Typography, Card } from 'antd'

const { Option } = Select
const { Title, Text } = Typography
const CheckboxGroup = Checkbox.Group
const plainOptions = [
  'Robo',
  'Huelgas',
  'Manchas',
  'Derrames',
  'Oxidación',
  'Mojadura',
  'Rotura',
  'Abolladura',
  'Dobladura',
  'Rajadura',
  'Contaminación de Cargas',
  'Echazón',
  'Barredura',
  'Baratería del Capitán',
  'Guerra',
  'Falla de Sistema de Refrigeración',
  'Deducibles',
  'ROT',
]
const defaultCheckedList = ['Robo', 'Huelgas']

export const LoadInsuranceForm = ({ hubStatus }) => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const checkAll = plainOptions.length === checkedList.length
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length
  const onChange = list => {
    setCheckedList(list)
  }
  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : [])
  }
  console.log({ hubStatus })
  return (
    <>
      <Title level={3}>Forma de Solicitud de Seguro de Carga</Title>
      <Card
        bodyStyle={{ background: 'linear-gradient(145deg, rgba(0,133,255,1) 0%, rgba(0,212,255,1) 100%)', 'border-radius': '25px;' }}
        className="rounded-lg"
      >
        <Flex justify="space-between" align="baseline">
          <Flex justify="space-between" vertical>
            <Text className="text-white text-xs">Precio</Text>
            <div>
              <Text className="text-white text-xl mr-2">USD</Text>
              <Text className="text-white text-3xl" strong>
                433.55
              </Text>
            </div>
            <Text className="text-white text-xs mt-2">+ IVA</Text>
          </Flex>
        </Flex>
        <Flex justify="space-between" className="mt-8">
          <Flex justify="space-between" vertical>
            <Flex justify="space-between" vertical>
              <Text className="text-white text-xs">Suma Asegurada</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  USD 200,000
                </Text>
              </div>
            </Flex>
            <Flex justify="space-between" vertical className="mt-4">
              <Text className="text-white text-xs">5% Deducible</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  USD 10,000
                </Text>
              </div>
            </Flex>
            <Flex justify="space-between" vertical className="mt-4">
              <Text className="text-white text-xs">Cobertura</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  Riesgos Ordinarios de Tránsito
                </Text>
              </div>
            </Flex>
          </Flex>
          <Flex justify="space-between" vertical >
            <Flex justify="space-between" vertical>
              <Text className="text-white text-xs">Beneficiario</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  Elicamex
                </Text>
              </div>
            </Flex>
            <Flex justify="space-between" vertical className="mt-4">
              <Text className="text-white text-xs">Embarcador - Receptor</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  Elicamex | REHAU
                </Text>
              </div>
            </Flex>
            <Flex justify="space-between" vertical className="mt-4">
              <Text className="text-white text-xs">Valido</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  22-Ene-24 8:35 | 01-Feb-24 16:22
                </Text>
              </div>
            </Flex>
            <Flex justify="space-between" vertical className="mt-4">
              <Text className="text-white text-xs">Medio</Text>
              <div className="mt-0">
                <Text className="text-white text-base" strong>
                  Terrestre
                </Text>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <Button className="w-full mt-8">Pagar</Button>
      </Card>
      <Title level={4}>Coberturas Adicionales</Title>
      <Form layout="vertical" requiredMark={false}>
        <Form.Item name="coberturasExtras" label="Coberturas Extras">
          <>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
          </>
        </Form.Item>
        <Divider />
        <Title level={4}>Datos Adicionales</Title>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter user name',
            },
          ]}
        >
          <Input placeholder="Please enter user name" />
        </Form.Item>
        <Form.Item
          name="url"
          label="Url"
          rules={[
            {
              required: true,
              message: 'Please enter url',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
            addonBefore="http://"
            addonAfter=".com"
            placeholder="Please enter url"
          />
        </Form.Item>

        <Form.Item
          name="owner"
          label="Owner"
          rules={[
            {
              required: true,
              message: 'Please select an owner',
            },
          ]}
        >
          <Select placeholder="Please select an owner">
            <Option value="xiao">Xiaoxiao Fu</Option>
            <Option value="mao">Maomao Zhou</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: 'Please choose the type',
            },
          ]}
        >
          <Select placeholder="Please choose the type">
            <Option value="private">Private</Option>
            <Option value="public">Public</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="approver"
          label="Approver"
          rules={[
            {
              required: true,
              message: 'Please choose the approver',
            },
          ]}
        >
          <Select placeholder="Please choose the approver">
            <Option value="jack">Jack Ma</Option>
            <Option value="tom">Tom Liu</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateTime"
          label="DateTime"
          rules={[
            {
              required: true,
              message: 'Please choose the dateTime',
            },
          ]}
        >
          <DatePicker.RangePicker
            style={{
              width: '100%',
            }}
            getPopupContainer={trigger => trigger.parentElement}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'please enter url description',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="please enter url description" />
        </Form.Item>
      </Form>
    </>
  )
}
