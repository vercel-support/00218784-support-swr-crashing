/* eslint-disable react/prop-types */
import React, { useState, useReducer, useEffect } from 'react'
import moment from 'moment'
import {
  Layout,
  Space,
  Button,
  Menu,
  Empty,
  Card,
  Row,
  Col,
  Result,
  Tooltip,
  Divider,
  Radio,
  List,
  Spin,
  notification,
  DatePicker,
  Modal,
  Select,
  Form,
  Checkbox,
  InputNumber,
  Drawer,
  Typography,
  Table,
  Progress,
  Dropdown,
  message,
  Tag,
} from 'antd'
import {
  LoadingOutlined,
  PlusOutlined,
  FilterOutlined,
  FontSizeOutlined,
  FileExcelOutlined,
  MoreOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons'

import { i18n } from '../../../services/i18n'

import { AppHeader } from '../../layout/AppHeader'
import { SideMenu } from '../../layout/SideMenu'

import { AppHeadLayout } from '../../layout/app-head-layout'
import { AccountsRecivableIndicators } from './AccountsRecivableIndicators'
import { AccountsRecivableGraphs } from './AccountsRecivableGraphs'
import { AccountsRecivableCalendarCustomers } from './AccountsRecivableCalendarCustomers'
import { AccountsRecivableHeader } from './AccountsRecivableHeader'

const { Option } = Select
const { Paragraph, Text, Title } = Typography

// TODO: i18n "Ha ocurrido un error durante la operación"

export const AccountsPayablePage = () => {
  const defaultDateRange = [moment().subtract(30, 'days'), moment()]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [collapsedMenu, setCollapsedMenu] = useState(true)
  // TODO: When filtering first customer is not working
  // console.log({customersList})

  const toggleMenu = () => {
    setCollapsedMenu(!collapsedMenu)
  }

  const [page, setPage] = useState('accounts-recivable')

  return (
    <Layout className="min-h-screen" hasSider>
      <AppHeadLayout tabTitle={i18n('customers.title')} />
      <Layout>
        <AppHeader toggleMenu={toggleMenu} collapsed={collapsedMenu} />
        <Layout.Content className="p-4">
          <AccountsRecivableHeader />
          <AccountsRecivableIndicators />
          <AccountsRecivableGraphs />
          <AccountsRecivableCalendarCustomers />
          {/* <DashboardHeader />
          <MainIndicators />
          <Graphs /> */}
        </Layout.Content>
      </Layout>
      <SideMenu collapsed={collapsedMenu} page={page} />
    </Layout>
  )
}
