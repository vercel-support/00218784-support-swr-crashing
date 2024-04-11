import React from 'react'
import { Col, Dropdown, Typography, Radio, Row } from 'antd'
import { FilterOutlined, LineChartOutlined, PlusOutlined, TableOutlined, MoreOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export const TableHeader = () => {
  return (
    <Row gutter={[8, 0]} wrap align="middle" className="bg-white py-3 pl-2 pr-2 rounded mx-0">
      <Col flex={2} className="text-left">
        <Text className="text-xl font-semibold">{i18n('billOfLading.title')}</Text>
      </Col>
      <Col className="text-right">
        <Radio.Group value={selectedToolbar} onChange={event => setSelectedToolbar(event.target.value)}>
          {/* <Radio.Button value="appearance" onClick={() => setSelectedToolbar('')}>
          <FontSizeOutlined />
  </Radio.Button> */}
          <Radio.Button value="filters" onClick={() => setSelectedToolbar('')} disabled={isWaitingData}>
            <FilterOutlined />
          </Radio.Button>
        </Radio.Group>
        {/* <Divider className="ml-6" type="vertical" /> */}
      </Col>
      <Col className="text-right">
        <Radio.Group value={viewValue}>
          <Radio.Button value="table" onClick={() => setSelectedToolbar('')} disabled={isWaitingData}>
            <TableOutlined />
          </Radio.Button>
          <Radio.Button value="dashboard" onClick={() => setSelectedToolbar('')} disabled={isWaitingData}>
            <LineChartOutlined />
          </Radio.Button>
        </Radio.Group>

        {/* <Divider type="vertical" /> */}
      </Col>
      <Col className="text-right">
        <Dropdown.Button menu={menuProps} onClick={handleAddClick} icon={<MoreOutlined />} type="primary" disabled={isWaitingData}>
          <PlusOutlined />
        </Dropdown.Button>
        {/* <Button
          key="add"
          type="link"
          icon={<PlusOutlined />}
          onClick={() => {
            // router.push('/new-quote')
            setIsNewShipmentHubVisible(true)
          }}
          disabled={!isBoLHAuthorized}
        /> */}
      </Col>
      {selectedToolbar && toolBars[selectedToolbar]}
    </Row>
  )
}
