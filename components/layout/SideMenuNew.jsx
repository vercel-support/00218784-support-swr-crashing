'use client'

import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Layout, Menu, Divider, Avatar, Typography, Button, Dropdown, Space, Tooltip } from 'antd'
import {
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  MessageOutlined,
  LogoutOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
  ContactsOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { CurrentUserContext } from 'components/contexts/currentUser'
import { logout } from '../../state/actions/index.ts'

import { i18n } from '../../services/i18n/index.js'
import { post } from '../../services/fetch/index.js'
import { menuItemFormatter, menuGroupFormatter, menuDivider, subMenuFormatter } from '../../services/helpers/antdMenuItemFormetter.js'

const { Text } = Typography

const LoggedUserMenu = () => {
  const currentUser = useContext(CurrentUserContext)
  const dispatch = useDispatch()
  const onLogout = () => dispatch(logout())

  const avatarMenuItems = [menuItemFormatter({ label: i18n('buttons.logout'), icon: <LogoutOutlined /> })]

  const menu = (
    <Menu>
      {/* <Menu.Item>
          <Button type="link" icon={<SettingOutlined />}>
            Configuración
          </Button>
        </Menu.Item> */}
      <Menu.Item>
        <Button type="link" onClick={onLogout}>
          <LogoutOutlined /> Cerrar sesión
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="px-4 pt-3 pb-10 w-full">
      <Space>
        <Dropdown menu={{ items: avatarMenuItems, onClick: onLogout }} placement="bottomLeft">
          <Avatar
            size="default"
            icon={currentUser?.loggedUserIdData?.initials || <UserOutlined />}
            src={currentUser?.loggedUserIdData?.profilePhoto || null}
          />
        </Dropdown>
        <Space direction="vertical" size={0} className="w-4/5 pl-2">
          <Tooltip title={currentUser?.loggedUserIdData?.name || ''} placement="bottomRight">
            <Text className="text-white w-max" ellipsis>
              {currentUser?.loggedUserIdData?.name || ''}
            </Text>
          </Tooltip>
          <Tooltip title={currentUser?.loggedUserIdData?.email} placement="bottomRight">
            <Text className="text-white w-max" ellipsis>
              {currentUser?.loggedUserIdData?.email}
            </Text>
          </Tooltip>
        </Space>
      </Space>
    </div>
  )
}

export const SideMenuNew = ({ collapsed, page }) => {
  const currentUser = useContext(CurrentUserContext)
  // const [collapsed, toggleCollapsed] = useReducer(state => !state, true)
  const router = useRouter()
  const goTo = route => () => router.push(route)
  // console.log('SideMenu page = ', page)
  const [mainMenuItems, setMainMenuItems] = useState([])
  const [loggedEmail, setLoggedEmail] = useState()
  const [loggedName, setLoggedName] = useState()

  // post('/api/logged-user/get-authorizations')
  //   .then(({ ok, loggedUserLicenses, loggedUserEmail, loggedUserName, error }) => {
  //     if (loggedUserLicenses) {
  //       loggedUserLicenses.map(license => {
  //         if (license.licenseName === 'BoLHub') {
  //           setIsBoLHAuthorized(license.active)
  //         }
  //         if (license.licenseName === 'Billing') {
  //           setIsBillingAuthorized(license.active)
  //         }
  //         if (license.licenseName === 'BetaTester') {
  //           setIsBetaAuthorized(license.active)
  //         }
  //         return null
  //       })
  //     }
  //     if (loggedUserEmail) setLoggedEmail(loggedUserEmail)
  //     if (loggedUserName) setLoggedName(loggedUserName)

  //     // if (!error) setFinished('signed')
  //     // setApiError(error, details?.message || '')
  //   })
  //   // eslint-disable-next-line
  //   .catch(error => console.log(error))

  const dispatch = useDispatch()
  const onLogout = () => dispatch(logout())

  const getMainMenuItems = currentUser => {
    return [
      menuItemFormatter({ label: i18n('billOfLading.title'), key: 'bill-of-lading', icon: <DeploymentUnitOutlined /> }),
      currentUser?.isBillingAuthorized
        ? menuItemFormatter({ label: i18n('customers.title'), key: 'customers', icon: <ContactsOutlined /> })
        : null,
      currentUser?.isBillingAuthorized
        ? menuItemFormatter({ label: i18n('billing.title'), key: 'billing', icon: <DollarOutlined /> })
        : null,
      currentUser?.isBetaAuthorized ? menuItemFormatter({ label: i18n('users.title'), key: 'users', icon: <TeamOutlined /> }) : null,
      currentUser?.isBetaAuthorized
        ? menuItemFormatter({ label: i18n('quotes.title'), key: 'new-quote', icon: <FileTextOutlined /> })
        : null,
    ]
  }

  useEffect(() => {
    // console.log({mainMenuItems: getMainMenuItems(currentUser), currentUser})
    setMainMenuItems(getMainMenuItems(currentUser))
  }, [currentUser, loggedEmail])

  const onClickMainMenu = e => {
    // console.log({ e, path: `/${e.key}` })
    router.push(`/${e.key}`)
  }
  const secondaryMenuItems = [
    menuItemFormatter({ label: i18n('help.title'), key: 'help', icon: <MessageOutlined /> }),
    menuItemFormatter({ label: i18n('settings.title'), key: 'settings', icon: <SettingOutlined /> }),
  ]
  const onClickSecondaryMenu = e => {
    // console.log({ e, path: `/${e.key}` })
    router.push(`/${e.key}`)
  }
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      reverseArrow
      collapsedWidth={0}
      className="bg-tkyBlue-darkest h-screen sticky top-0 mb-0"
    >
      <LoggedUserMenu />
      <Menu
        defaultSelectedKeys={[page]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        className="bg-tkyBlue-darkest"
        key="Menu Top"
        items={mainMenuItems}
        onClick={onClickMainMenu}
      />
      <Menu
        mode="inline"
        theme="dark"
        className="bg-tkyBlue-darkest  absolute inset-x-0 bottom-10 mb-0"
        key="Menu bottom"
        items={secondaryMenuItems}
        onClick={onClickSecondaryMenu}
      />
      {!collapsed ? (
        <Button
          key="logout"
          icon={<LogoutOutlined />}
          onClick={onLogout}
          className="w-full border-none bg-tkyBlue-darkest text-tkyBlue hover:bg-tkyBlue hover:text-white active:bg-tkyBlue-dark absolute inset-x-0 bottom-0 mb-0"
        >
          {i18n('buttons.logout')}
        </Button>
      ) : null}
    </Layout.Sider>
  )
}
