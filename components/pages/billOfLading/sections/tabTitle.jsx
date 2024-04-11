import React, { useState } from 'react'
import { Button, Card, Typography, Popover, Checkbox, Space, message } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { i18n } from '../../../../services/i18n'

const { Text, Title, Paragraph } = Typography

const defaultSectionsArray = [
  'prices',
  'costs',
  'generalInfo',
  'locations',
  'cargo',
  'carriers',
  'customerSatisfaction',
  'approvals',
  'documents',
  'quotes',
  'audits',
]

const SectionSelector = ({ hubDispatch, activeSections = ['generalInfo', 'locations'] }) => {
  const onChange = value => {
    hubDispatch({ type: 'Change Active Sections', payload: value })
    message.success(i18n('hubSections.activeSectionsUpdated'))
    // console.log(value)
  }
  return (
    <Checkbox.Group onChange={onChange} defaultValue={activeSections}>
      <Space direction="vertical" size={0}>
        <Checkbox checked={false} key="generalInfo" value="generalInfo">
          {i18n('hubSections.generalInfo')}
        </Checkbox>
        <Checkbox checked={false} key="prices" value="prices">
          {i18n('hubSections.prices')}
        </Checkbox>
        <Checkbox checked={false} key="costs" value="costs">
          {i18n('hubSections.costs')}
        </Checkbox>
        <Checkbox checked={false} key="locations" value="locations">
          {i18n('hubSections.locations')}
        </Checkbox>
        <Checkbox checked={false} key="cargo" value="cargo">
          {i18n('hubSections.cargo')}
        </Checkbox>
        <Checkbox checked={false} key="carriers" value="carriers">
          {i18n('hubSections.carriers')}
        </Checkbox>
        <Checkbox checked={false} key="customerSatisfaction" value="customerSatisfaction">
          {i18n('hubSections.customerSatisfaction')}
        </Checkbox>
        <Checkbox checked={false} key="approvals" value="approvals">
          {i18n('hubSections.approvals')}
        </Checkbox>
        <Checkbox checked={false} key="quotes" value="quotes">
          {i18n('hubSections.quotes')}
        </Checkbox>
        {/* <Checkbox checked={false} key="audits" value="audits">
          {i18n('hubSections.audits')}
        </Checkbox> */}
      </Space>
    </Checkbox.Group>
  )
}

export const TabTitle = ({ hubState, hubDispatch, section, settingsVisible = false, buttonType = 'plus', activeSections }) => {
  // console.log({ hubDispatch, activeSections })
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false)
  const selectButton = buttonType => {
    switch (buttonType) {
      case 'plus':
        return <PlusOutlined />
      case 'settings':
        return <SettingOutlined />
      default:
        return <PlusOutlined />
    }
  }

  return (
    <div className="mt-8 mb-8">
      {settingsVisible ? (
        <Popover
          content={<SectionSelector hubDispatch={hubDispatch} activeSections={activeSections} />}
          placement="bottomRight"
          title={i18n('hubSections.selectSection')}
          trigger="click"
        >
          <Button
            key="addSection"
            type="link"
            className="float-right mt-2"
            icon={selectButton(buttonType)}
            onClick={() => {
              // router.push('/new-quote')
              setIsAddSectionVisible(true)
            }}
            // disabled={!isHubAuthorized}
          />
        </Popover>
      ) : null}
      <Text className="text-base font-normal">{i18n(section)}</Text>
      
    </div>
  )
}
