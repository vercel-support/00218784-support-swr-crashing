'use client'

import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { Space, Layout, Select, Dropdown, Button, Menu, AutoComplete, Input, Avatar, Col, Row } from 'antd'
import useSWR from 'swr'
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
  MailOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppLogo, AppLogoWithText, AppLogoOld } from './app-logo'
import { logout } from '../../state/actions/index.ts'
import { get } from '../../services/fetch'
import { i18n } from '../../services/i18n'
import { menuItemFormatter } from '../../services/helpers/antdMenuItemFormetter'
import { CurrentUserContext } from '../contexts/currentUser'

// TODO: Keep search text even after a result has been selected
// TODO: Highlight serach text into results
const GlobalSearchInput = () => {
  const [searchText, setSearchText] = useState('')
  const { error, data } = useSWR(searchText ? `api/search/${searchText}` : null, get, { dedupingInterval: 100 })

  const renderSearchResultTitle = (title, href) => (
    <span>
      {title}
      <a href={href} className="float-right">
        Ver
      </a>
    </span>
  )

  const renderSearchResultItem = (href, title, count) => ({
    value: title,
    label: (
      <a className="flex justify-between" href={href}>
        <div>
          <strong>{title}</strong>
        </div>
        <span>{count}</span>
      </a>
    ),
  })

  const createAutocompleteOptions = () => {
    if (!searchText || error) return []
    return data?.searchResults
      ? data.searchResults.map(({ category, categoryUrl, items }) => ({
          label: renderSearchResultTitle(category, `/${categoryUrl}`),
          options: items.map(({ href, description, details }) => renderSearchResultItem(href, description, details)),
        }))
      : []
  }

  return (
    <AutoComplete popupMatchSelectWidth options={createAutocompleteOptions()} style={{ width: '100%' }}>
      <Input.Search
        className="global-search-input"
        placeholder="Search..."
        onSearch={setSearchText}
        loading={!!searchText && !data}
        value={searchText}
      />
    </AutoComplete>
  )
}

const notificationMenuItems = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
]

// TODO: Use card style layout for notification details
const notificationsMenu = (
  <Menu items={notificationMenuItems} />
  /*
    <Menu.Item>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a target="_blank" rel="noopener noreferrer" href="#">
        1st sample notification
      </a>
    </Menu.Item> 
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        2nd sample notification
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        3rd sample notification
      </a>
    </Menu.Item> */
)

export const LoggedUserMenu = () => {
  const currentUser = useContext(CurrentUserContext)
  const dispatch = useDispatch()
  const onLogout = () => dispatch(logout())

  const avatarMenuItems = [menuItemFormatter({ label: i18n('buttons.logout'), icon: <LogoutOutlined /> })]

  return (
    <Dropdown menu={{ items: avatarMenuItems, onClick: onLogout }} placement="bottomRight">
      <Avatar
        size="large"
        icon={currentUser.loggedUserIdData?.initials || <UserOutlined />}
        src={currentUser.loggedUserIdData?.profilePhoto || null}
      />
    </Dropdown>
  )
}

export const AppHeader = ({ toggleMenu, collapsed }) => {
  return (
    <Layout.Header className="bg-gradient-to-r from-tkyBlue-dark to-tkyBlue pl-4 pr-4">
      <Row>
        <Col xs={collapsed ? 4 : 4} sm={8} md={0} className="text-left ml-0">
          <AppLogo imagotype={true} logo={false} />
        </Col>
        <Col xs={0} sm={0} md={8} lg={8} xl={8} xxl={8} className="text-left ml-0">
          <AppLogo imagotype={true} logo={true} logoColor="white" />
        </Col>
        <Col xs={collapsed ? 10 : 0} sm={8} md={8} lg={8} xl={8} xxl={8} className="text-center">
          {/* <GlobalSearchInput /> */}
        </Col>
        <Col
          xs={collapsed ? { span: 10, offset: 0 } : { span: 10, offset: 5 }}
          sm={{ span: 8, offset: 0 }}
          md={{ span: 8, offset: 0 }}
          lg={{ span: 8, offset: 0 }}
          xl={{ span: 8, offset: 0 }}
          xxl={{ span: 8, offset: 0 }}
          className="text-right"
        >
          <Space>
            <Dropdown menu={{ items: notificationMenuItems }} placement="bottomRight">
              <Button type="default" className="border-none" ghost>
                <BellOutlined className="hover:text-tkyBlue-lightest text-white" />
              </Button>
            </Dropdown>
            {collapsed ? <LoggedUserMenu /> : null}
            {/* </Col>
        <Col xs={collapsed ? 1 : 20} sm={1} md={1} lg={1} xl={1} xxl={1} className="text-right"> */}
            <Button type="default" className="border-none " ghost onClick={toggleMenu}>
              <MenuOutlined className="hover:text-tkyBlue-lightest text-white" />
            </Button>
          </Space>
        </Col>
        {/*
          <Space size="middle" className="float-right">
        <Select
          showSearch
          className="w-64"
          placeholder={i18n('companySelector.placeholder')}
          optionFilterProp="children"
          // onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch}
          // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option value="jack">A1A Logistics</Select.Option>
          <Select.Option value="lucy">A1A Expedited</Select.Option>
          <Select.Option value="tom">A1A Trucking</Select.Option>
        </Select>
        </Space>
        */}
      </Row>
    </Layout.Header>
  )
}
