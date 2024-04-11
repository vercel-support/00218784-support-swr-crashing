import React, { useState } from 'react'
import { Card, Menu, Affix, Badge, Anchor } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  UngroupOutlined,
  TeamOutlined,
  OrderedListOutlined,
  BranchesOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  CommentOutlined,
  FormOutlined,
  FileDoneOutlined,
  AuditOutlined,
  BorderOutlined,
  LikeOutlined,
  CalendarOutlined,
  FileTextOutlined,
  FileOutlined,
  ScheduleOutlined,
} from '@ant-design/icons'
import { i18n } from '../../../../services/i18n'
import useWindowSize from '../../../hooks/useWindowSize'

export const HubNavigationMenuOperator = ({ hubState, hubDispatch, currentTab, setCurrentTab }) => {
  const [current, setCurrent] = useState('details')
  const [top, setTop] = useState(152)
  const [newMessages, setNewMessages] = useState(hubState?.comments?.new || true)
  const windowSize = useWindowSize()

  const onClick = e => {
    console.log('click ', e)
    setCurrentTab(e.key)
  }

  const itemsDesktop = [
    {
      label: i18n('details'),
      key: 'details',
      // onTitleClick: onClick,
      icon: <FormOutlined />,
      children: [
        {
          label: i18n('hubSections.status'),
          key: 'status',
        },
        {
          label: i18n('hubSections.intructions'),
          key: 'intructions',
        },      
        // {
        //   label: i18n('hubSections.prices'),
        //   key: 'prices',
        // },
        // {
        //   label: i18n('hubSections.costs'),
        //   key: 'costs',
        // },
        // {
        //   label: i18n('hubSections.generalInfo'),
        //   key: 'generalInfo',
        // },
        // {
        //   label: i18n('hubSections.locations'),
        //   key: 'locations',
        // },
        // {
        //   label: i18n('hubSections.cargo'),
        //   key: 'cargo',
        // },
        // {
        //   label: i18n('hubSections.carriers'),
        //   key: 'carriers',
        // },
        // {
        //   label: i18n('hubSections.customerSatisfaction'),
        //   key: 'customerSatisfaction',
        // },
        // {
        //   label: i18n('hubSections.approvals'),
        //   key: 'approvals',
        // },
        {
          label: i18n('hubSections.documents'),
          key: 'documents',
        },
        // {
        //   label: i18n('hubSections.quotes'),
        //   key: 'quotes',
        // },
        // {
        //   label: i18n('hubSections.audits'),
        //   key: 'audits',
        // },
        // {
        //   type: 'group',
        //   label: 'Status',
        //   children: [
        //     {
        //       label: 'Map',
        //       key: 'map',
        //     },
        //     {
        //       label: 'Status',
        //       key: 'status',
        //     },
        //     {
        //       label: 'Pending Tasks',
        //       key: 'pendingTasks',
        //     },
        //   ],
        // },
        // {
        //   type: 'group',
        //   label: 'Item 2',
        //   children: [
        //     {
        //       label: 'Option 3',
        //       key: 'setting:3',
        //     },
        //     {
        //       label: 'Option 4',
        //       key: 'setting:4',
        //     },
        //   ],
        // },
      ],
    },
    {
      label: i18n('events'),
      icon: <CalendarOutlined />,
      key: 'events',
    },
    {
      label: i18n('team'),
      icon: <TeamOutlined />,
      key: 'team',
    },
    {
      label: <Badge dot={newMessages}>{i18n('tasks')}</Badge>,
      icon: <CheckOutlined />,
      key: 'tasks',
    },
    // {
    //   label: <Badge dot={newMessages}>{i18n('approvals')}</Badge>,
    //   icon: <LikeOutlined />,
    //   key: 'approvals',
    // },
    // {
    //   label: <Badge dot={newMessages}>{i18n('documents')}</Badge>,
    //   icon: <FileOutlined />,
    //   key: 'documents',
    // },
    {
      icon: (
        <Badge dot={newMessages}>
          <CommentOutlined />
        </Badge>
      ),
      key: 'comments',
    },
  ]

  const itemsMobile =  [
    {
      label: (<Badge dot={newMessages}><FormOutlined /></Badge>),
      key: 'details',
      // onTitleClick: onClick,
      icon: "",
      children: [
        {
          label: i18n('hubSections.status'),
          key: 'status',
        },
        {
          label: i18n('hubSections.prices'),
          key: 'prices',
        },
        {
          label: i18n('hubSections.costs'),
          key: 'costs',
        },
        {
          label: i18n('hubSections.generalInfo'),
          key: 'generalInfo',
        },
        {
          label: i18n('hubSections.locations'),
          key: 'locations',
        },
        {
          label: i18n('hubSections.cargo'),
          key: 'cargo',
        },
        {
          label: i18n('hubSections.carriers'),
          key: 'carriers',
        },
        {
          label: i18n('hubSections.customerSatisfaction'),
          key: 'customerSatisfaction',
        },
        {
          label: i18n('hubSections.approvals'),
          key: 'approvals',
        },
        {
          label: i18n('hubSections.documents'),
          key: 'documents',
        },
        {
          label: i18n('hubSections.quotes'),
          key: 'quotes',
        },
        {
          label: i18n('hubSections.audits'),
          key: 'audits',
        },
        // {
        //   type: 'group',
        //   label: 'Status',
        //   children: [
        //     {
        //       label: 'Map',
        //       key: 'map',
        //     },
        //     {
        //       label: 'Status',
        //       key: 'status',
        //     },
        //     {
        //       label: 'Pending Tasks',
        //       key: 'pendingTasks',
        //     },
        //   ],
        // },
        // {
        //   type: 'group',
        //   label: 'Item 2',
        //   children: [
        //     {
        //       label: 'Option 3',
        //       key: 'setting:3',
        //     },
        //     {
        //       label: 'Option 4',
        //       key: 'setting:4',
        //     },
        //   ],
        // },
      ],
    },
    {
      label: (<Badge dot={newMessages}><CalendarOutlined /></Badge>),
      icon: '',
      key: 'events',
    },
    {
      label: (<Badge dot={newMessages}><TeamOutlined /></Badge>),
      icon: '',
      key: 'team',
    },
    {
      label: <Badge dot={newMessages}><CheckOutlined /></Badge>,
      icon: '',
      key: 'tasks',
    },
    // {
    //   label: <Badge dot={newMessages}><LikeOutlined /></Badge>,
    //   icon: '',
    //   key: 'approvals',
    // },
    // {
    //   label: <Badge dot={newMessages}><FileOutlined /></Badge>,
    //   icon: '',
    //   key: 'documents',
    // },
    {
      icon: (
        <Badge dot={newMessages}>
          <CommentOutlined />
        </Badge>
      ),
      key: 'comments',
    },
  ]

  const items = [
    {
      label: i18n('details'),
      key: 'details',
      // onTitleClick: onClick,
      icon: "",
    },
    // {
    //   label: i18n('shipmentSections.generalInfo'),
    //   icon: "",
    //   key: 'generalInfo',
    // },
    // {
    //   label: i18n('shipmentSections.prices'),
    //   icon: "",
    //   key: 'prices',
    // },
    // {
    //   label: i18n('shipmentSections.costs'),
    //   icon: "",
    //   key: 'costs',
    // },
    {
      label: i18n('shipmentSections.instructions'),
      icon: "",
      key: 'instructions',
    },
    // {
    //   label: i18n('shipmentSections.cargo'),
    //   icon: "",
    //   key: 'cargo',
    // },
    // {
    //   label: i18n('shipmentSections.carriers'),
    //   icon: "",
    //   key: 'carriers',
    // },
    // {
    //   label: i18n('shipmentSections.quote'),
    //   icon: "",
    //   key: 'quote',
    // },
    // {
    //   label: i18n('shipmentSections.approvals'),
    //   icon: "",
    //   key: 'approvals',
    // },
    // {
    //   label: i18n('shipmentSections.events'),
    //   icon: "",
    //   key: 'events',
    // },
    // {
    //   label: i18n('shipmentSections.team'),
    //   icon: "",
    //   key: 'team',
    // },
    {
      label: <Badge dot={newMessages}><FileOutlined /></Badge>,
      icon: "",
      key: 'documents',
    },
    // {
    //   label: <Badge dot={newMessages}><CheckOutlined /></Badge>,
    //   icon: "",
    //   key: 'tasks',
    // },
    // {
    //   label: <Badge dot={newMessages}>{i18n('approvals')}</Badge>,
    //   icon: <LikeOutlined />,
    //   key: 'approvals',
    // },
    
    // {
    //   icon: (
    //     <Badge dot={newMessages}>
    //       <CommentOutlined />
    //     </Badge>
    //   ),
    //   key: 'comments',
    // },
  ]

  console.log(windowSize)

  return (
    <Affix offsetTop={top}>
      <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} className="mt-0 px-2" />
      
      {/* {windowSize !== 'sm' ? (
        <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={itemsDesktop} className="mt-0" />
      ) : (
        <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={itemsMobile} className="mt-0" />
      )} */}
    </Affix>
  )
}
