import React, { useState, useEffect } from 'react'
import { Badge, Dropdown, Tag } from 'antd'
import { i18n } from '../../../../services/i18n'
import { WantToAddComment } from '../tabs/wantToAddComment'
import { dateFormat } from '../../../../services/helpers/dateFormat'

export const defineStatusColor = key => {
  switch (key) {
    case 'requested':
      return '#999999'
    case 'quoted':
      return '#999999'
    case 'acceptedByCustomer':
      return '#999999'
    case 'rejectedByCustomer':
      return '#F50538'
    case 'canceledByCustomer':
      return '#F50538'
    case 'booking':
      return '#162a50'
    case 'schedulingVehicle':
      return '#162a50'
    case 'confirmedVehicle':
      return '#162a50'
    case 'noVehicleAvailable':
      return '#F50538'
    case 'pickup':
      return '#0B58A8'
    case 'inRouteToPickup':
      return '#0B58A8'
    case 'arrivingToPickup':
      return '#0B58A8'
    case 'startingToLoad':
      return '#0B58A8'
    case 'finishingLoading':
      return '#0B58A8'
    case 'pickupProblems':
      return '#F50538'
    case 'inTransit':
      return '#0085FF'
    case 'position':
      return '#0085FF'
    case 'waiting':
      return '#f5c723'
    case 'waitingDocuments':
      return '#f5c723'
    case 'waitingAppointment':
      return '#f5c723'
    case 'driverOnABreak':
      return '#f5c723'
    case 'accident':
      return '#F50538'
    case 'delay':
      return '#F50538'
    case 'incident':
      return '#F50538'
    case 'unknownETA':
      return '#F50538'
    case 'borderCrossing':
      return '#9381ff'
    case 'leavingYard':
      return '#9381ff'
    case 'waitingInLine':
      return '#9381ff'
    case 'customs':
      return '#9381ff'
    case 'customsGreen':
      return '#9381ff'
    case 'endOfCrossing':
      return '#9381ff'
    case 'customsRed':
      return '#F50538'
    case 'crossingProblems':
      return '#F50538'
    case 'delivery':
      return '#00B2FA'
    case 'arrivingToDelivery':
      return '#00B2FA'
    case 'startingToUnload':
      return '#00B2FA'
    case 'finishingUnloading':
      return '#00B2FA'
    case 'delivered':
      return '#00B2FA'
    case 'deliveryProblems':
      return '#F50538'
    case 'proofOfDelivery':
      return '#00DEF5'
    case 'podUploaded':
      return '#00DEF5'
    case 'podApproved':
      return '#00DEF5'
    case 'podRejected':
      return '#F50538'
    case 'completed':
      return '#53cf8c'
    case 'informationRequired':
      return '#F50538'
    case 'documentationRequired':
      return '#F50538'
    case 'billing':
      return '#00DEF5'
    case 'billed':
      return '#00DEF5'
    case 'readyToBill':
      return '#f5c723'
    case 'noInvoice':
      return '#999999'
    case 'partiallyBilled':
      return '#00DEF5'
    case 'completelyBilled':
      return '#00DEF5'
    case 'creditNoteEmitted':
      return '#f5c723'
    case 'invoiceCancelled':
      return '#f5c723'
    case 'billingProblems':
      return '#F50538'
    case 'invoiceSent':
      return '#80C2FF'
    case 'invoiceReceived':
      return '#40A4FF'
    case 'invoiceApprovedForPayment':
      return '#0085FF'
    case 'invoiceProblems':
      return '#F50538'
    case 'daysDelayed30':
      return '#F5C723'
    case 'daysDelayed60':
      return '#F6AB3E'
    case 'daysDelayed90':
      return '#F89059'
    case 'daysDelayed120':
      return '#F50538'
    case 'partiallyCollected':
      return '#f5c723'
    case 'totallyCollected':
      return '#53cf8c'
    case 'collectProblems':
      return '#F50538'
    case 'invoiceUploaded':
      return '#05B6D1'
    case 'invoiceApproved':
      return '#05B6D1'
    case 'partiallyPaid':
      return '#f5c723'
    case 'totallyPaid':
      return '#53cf8c'
    case 'paymentProofEmitted':
      return '#05B6D1'
    case 'paymentProblems':
      return '#F50538'
    default:
      return '#777777'
  }
}

export const operativeStatusSelectOptions = [
  {
    label: <Badge color={defineStatusColor('requested')} text={i18n('shipmentStatusMenu.requested')} />,
    title: i18n('shipmentStatusMenu.requested'),
    options: [
      {
        value: 'requested',
        label: <Badge color={defineStatusColor('requested')} text={i18n('shipmentStatusMenu.requested')} />,
      },
      {
        value: 'quoted',
        label: <Badge color={defineStatusColor('quoted')} text={i18n('shipmentStatusMenu.quoted')} />,
      },
    ],
  },
]

export const OperativeStatusDropdown = ({ statusColor, statusText, loggedUserProfile, onOk, hubId }) => {
  const [operativeState, setOperativeState] = useState({ text: 'requested', color: '#999999' })
  const [operativeOpen, setOperativeOpen] = useState(false)
  const [operativeComment, setOperativeComment] = useState(false)
  const [payload, setPayload] = useState({})

  useEffect(() => {
    setPayload({
      shipmentState: {
        operative: {
          text: operativeState.text,
          color: operativeState.color,
          lastComment: { user: loggedUserProfile, date: dateFormat(new Date()), text: operativeComment, section: 'operativeStatus' },
        },
      },
      lastComment: { user: loggedUserProfile, date: dateFormat(new Date()), text: operativeComment, section: 'operativeStatus' },
      log: {
        name: 'shipmentStatusChanged',
        category: 'shipmentOperations',
        section: 'operativeStatus',
        status: operativeState.text,
        color: operativeState.color,
      },
      hubId: hubId || '',
    })
  }, [operativeState, operativeComment])

  const shipmentStatusMenu = [
    {
      key: 'requestedMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('requested')} text={i18n('shipmentStatusMenu.requested')} />,
      children: [
        { key: 'requested', label: <Badge color={defineStatusColor('requested')} text={i18n('shipmentStatusMenu.requested')} /> },
        { key: 'quoted', label: <Badge color={defineStatusColor('quoted')} text={i18n('shipmentStatusMenu.quoted')} /> },
        {
          key: 'acceptedByCustomer',
          label: <Badge color={defineStatusColor('acceptedByCustomer')} text={i18n('shipmentStatusMenu.acceptedByCustomer')} />,
        },
        {
          key: 'rejectedByCustomer',
          label: <Badge color={defineStatusColor('rejectedByCustomer')} text={i18n('shipmentStatusMenu.rejectedByCustomer')} />,
        },
        {
          key: 'canceledByCustomer',
          label: <Badge color={defineStatusColor('canceledByCustomer')} text={i18n('shipmentStatusMenu.canceledByCustomer')} />,
        },
      ],
    },
    {
      key: 'bookingMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('booking')} text={i18n('shipmentStatusMenu.booking')} />,
      children: [
        { key: 'booking', label: <Badge color={defineStatusColor('booking')} text={i18n('shipmentStatusMenu.booking')} /> },
        {
          key: 'schedulingVehicle',
          label: <Badge color={defineStatusColor('schedulingVehicle')} text={i18n('shipmentStatusMenu.schedulingVehicle')} />,
        },
        {
          key: 'confirmedVehicle',
          label: <Badge color={defineStatusColor('confirmedVehicle')} text={i18n('shipmentStatusMenu.confirmedVehicle')} />,
        },
        {
          key: 'noVehicleAvailable',
          label: <Badge color={defineStatusColor('noVehicleAvailable')} text={i18n('shipmentStatusMenu.noVehicleAvailable')} />,
        },
      ],
    },
    {
      key: 'pickupMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('pickup')} text={i18n('shipmentStatusMenu.pickup')} />,
      children: [
        { key: 'pickup', label: <Badge color={defineStatusColor('pickup')} text={i18n('shipmentStatusMenu.pickup')} /> },
        {
          key: 'inRouteToPickup',
          label: <Badge color={defineStatusColor('inRouteToPickup')} text={i18n('shipmentStatusMenu.inRouteToPickup')} />,
        },
        {
          key: 'arrivingToPickup',
          label: <Badge color={defineStatusColor('arrivingToPickup')} text={i18n('shipmentStatusMenu.arrivingToPickup')} />,
        },
        {
          key: 'startingToLoad',
          label: <Badge color={defineStatusColor('startingToLoad')} text={i18n('shipmentStatusMenu.startingToLoad')} />,
        },
        {
          key: 'finishingLoading',
          label: <Badge color={defineStatusColor('finishingLoading')} text={i18n('shipmentStatusMenu.finishingLoading')} />,
        },
        {
          key: 'pickupProblems',
          label: <Badge color={defineStatusColor('pickupProblems')} text={i18n('shipmentStatusMenu.pickupProblems')} />,
        },
      ],
    },
    {
      key: 'inTransitMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('inTransit')} text={i18n('shipmentStatusMenu.inTransit')} />,
      children: [
        { key: 'inTransit', label: <Badge color={defineStatusColor('inTransit')} text={i18n('shipmentStatusMenu.inTransit')} /> },
        // { key: 'position', label: <Badge color={defineStatusColor('position')} text={i18n('shipmentStatusMenu.position')} /> },
        { key: 'waiting', label: <Badge color={defineStatusColor('waiting')} text={i18n('shipmentStatusMenu.waiting')} /> },
        {
          key: 'waitingDocuments',
          label: <Badge color={defineStatusColor('waitingDocuments')} text={i18n('shipmentStatusMenu.waitingDocuments')} />,
        },
        {
          key: 'waitingAppointment',
          label: <Badge color={defineStatusColor('waitingAppointment')} text={i18n('shipmentStatusMenu.waitingAppointment')} />,
        },
        {
          key: 'driverOnABreak',
          label: <Badge color={defineStatusColor('driverOnABreak')} text={i18n('shipmentStatusMenu.driverOnABreak')} />,
        },
        { key: 'accident', label: <Badge color={defineStatusColor('accident')} text={i18n('shipmentStatusMenu.accident')} /> },
        { key: 'delay', label: <Badge color={defineStatusColor('delay')} text={i18n('shipmentStatusMenu.delay')} /> },
        { key: 'incident', label: <Badge color={defineStatusColor('incident')} text={i18n('shipmentStatusMenu.incident')} /> },
        { key: 'unknownETA', label: <Badge color={defineStatusColor('unknownETA')} text={i18n('shipmentStatusMenu.unknownETA')} /> },
      ],
    },
    {
      key: 'borderCrossingMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('borderCrossing')} text={i18n('shipmentStatusMenu.borderCrossing')} />,
      children: [
        {
          key: 'borderCrossing',
          label: <Badge color={defineStatusColor('borderCrossing')} text={i18n('shipmentStatusMenu.borderCrossing')} />,
        },
        { key: 'leavingYard', label: <Badge color={defineStatusColor('leavingYard')} text={i18n('shipmentStatusMenu.leavingYard')} /> },
        {
          key: 'waitingInLine',
          label: <Badge color={defineStatusColor('waitingInLine')} text={i18n('shipmentStatusMenu.waitingInLine')} />,
        },
        { key: 'customs', label: <Badge color={defineStatusColor('customs')} text={i18n('shipmentStatusMenu.customs')} /> },
        { key: 'customsGreen', label: <Badge color={defineStatusColor('customsGreen')} text={i18n('shipmentStatusMenu.customsGreen')} /> },
        {
          key: 'endOfCrossing',
          label: <Badge color={defineStatusColor('endOfCrossing')} text={i18n('shipmentStatusMenu.endOfCrossing')} />,
        },
        { key: 'customsRed', label: <Badge color={defineStatusColor('customsRed')} text={i18n('shipmentStatusMenu.customsRed')} /> },
        {
          key: 'crossingProblems',
          label: <Badge color={defineStatusColor('crossingProblems')} text={i18n('shipmentStatusMenu.crossingProblems')} />,
        },
      ],
    },
    {
      key: 'deliveryMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('delivery')} text={i18n('shipmentStatusMenu.delivery')} />,
      children: [
        { key: 'delivery', label: <Badge color={defineStatusColor('delivery')} text={i18n('shipmentStatusMenu.delivery')} /> },
        {
          key: 'arrivingToDelivery',
          label: <Badge color={defineStatusColor('arrivingToDelivery')} text={i18n('shipmentStatusMenu.arrivingToDelivery')} />,
        },
        {
          key: 'startingToUnload',
          label: <Badge color={defineStatusColor('startingToUnload')} text={i18n('shipmentStatusMenu.startingToUnload')} />,
        },
        {
          key: 'finishingUnloading',
          label: <Badge color={defineStatusColor('finishingUnloading')} text={i18n('shipmentStatusMenu.finishingUnloading')} />,
        },
        { key: 'delivered', label: <Badge color={defineStatusColor('delivered')} text={i18n('shipmentStatusMenu.delivered')} /> },
        {
          key: 'deliveryProblems',
          label: <Badge color={defineStatusColor('deliveryProblems')} text={i18n('shipmentStatusMenu.deliveryProblems')} />,
        },
      ],
    },
    {
      key: 'proofOfDeliveryMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('proofOfDelivery')} text={i18n('shipmentStatusMenu.proofOfDelivery')} />,
      children: [
        {
          key: 'proofOfDelivery',
          label: <Badge color={defineStatusColor('proofOfDelivery')} text={i18n('shipmentStatusMenu.proofOfDelivery')} />,
        },
        { key: 'podUploaded', label: <Badge color={defineStatusColor('podUploaded')} text={i18n('shipmentStatusMenu.podUploaded')} /> },
        { key: 'podApproved', label: <Badge color={defineStatusColor('podApproved')} text={i18n('shipmentStatusMenu.podApproved')} /> },
        { key: 'podRejected', label: <Badge color={defineStatusColor('podRejected')} text={i18n('shipmentStatusMenu.podRejected')} /> },
      ],
    },
    {
      key: 'informationRequired',
      label: <Badge color={defineStatusColor('informationRequired')} text={i18n('shipmentStatusMenu.informationRequired')} />,
    },
    {
      key: 'documentationRequired',
      label: <Badge color={defineStatusColor('documentationRequired')} text={i18n('shipmentStatusMenu.documentationRequired')} />,
    },
    { key: 'completed', label: <Badge color={defineStatusColor('completed')} text={i18n('shipmentStatusMenu.completed')} /> },
  ]

  const onOperativeStatusMenuClick = e => {
    // hubDispatch({ type: 'Update Status Menu', payload: { operative: { text: e.key, color: defineStatusColor(e.key) } } })
    setOperativeState({ text: e.key, color: defineStatusColor(e.key) })
    setOperativeOpen(true)
  }

  const handleOperativeCancel = () => {
    setOperativeOpen(false)
  }

  const handleOperativeOk = e => {
    onOk(payload)
    setOperativeOpen(false)
  }

  return (
    <>
      <Dropdown className="w-full my-4" menu={{ items: shipmentStatusMenu, onClick: onOperativeStatusMenuClick }} trigger={['click']}>
        <Tag color={statusColor || '#999999'} className="w-full text-center py-1">
          {i18n(`shipmentStatusMenu.${statusText || 'requested'}`)}
        </Tag>
      </Dropdown>
      <WantToAddComment
        open={operativeOpen}
        setComment={setOperativeComment}
        handleCancel={handleOperativeCancel}
        handleOk={handleOperativeOk}
        state={operativeState}
        section="operativeStatus"
      />
    </>
  )
}

export const CollectStatusDropdown = ({ statusColor, statusText, loggedUserProfile, onOk, hubId }) => {
  const [collectState, setCollectState] = useState({ text: 'noInvoice', color: '#999999' })
  const [collectOpen, setCollectOpen] = useState(false)
  const [collectComment, setCollectComment] = useState(false)
  const [payload, setPayload] = useState({})

  const collectMenu = [
    {
      key: 'billingMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('billing')} text={i18n('shipmentStatusMenu.billing')} />,
      children: [
        { key: 'noInvoice', label: <Badge color={defineStatusColor('noInvoice')} text={i18n('shipmentStatusMenu.noInvoice')} /> },
        { key: 'billed', label: <Badge color={defineStatusColor('billed')} text={i18n('shipmentStatusMenu.billed')} /> },
        {
          key: 'partiallyBilled',
          label: <Badge color={defineStatusColor('partiallyBilled')} text={i18n('shipmentStatusMenu.partiallyBilled')} />,
        },
        {
          key: 'completelyBilled',
          label: <Badge color={defineStatusColor('completelyBilled')} text={i18n('shipmentStatusMenu.completelyBilled')} />,
        },
        { key: 'readyToBill', label: <Badge color={defineStatusColor('readyToBill')} text={i18n('shipmentStatusMenu.readyToBill')} /> },
        {
          key: 'creditNoteEmitted',
          label: <Badge color={defineStatusColor('creditNoteEmitted')} text={i18n('shipmentStatusMenu.creditNoteEmitted')} />,
        },
        {
          key: 'invoiceCancelled',
          label: <Badge color={defineStatusColor('invoiceCancelled')} text={i18n('shipmentStatusMenu.invoiceCancelled')} />,
        },
        {
          key: 'billingProblems',
          label: <Badge color={defineStatusColor('billingProblems')} text={i18n('shipmentStatusMenu.billingProblems')} />,
        },
      ],
    },
    {
      key: 'sendingInvoiceMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('invoiceSent')} text={i18n('shipmentStatusMenu.sendingInvoice')} />,
      children: [
        { key: 'invoiceSent', label: <Badge color={defineStatusColor('invoiceSent')} text={i18n('shipmentStatusMenu.invoiceSent')} /> },
        {
          key: 'invoiceReceived',
          label: <Badge color={defineStatusColor('invoiceReceived')} text={i18n('shipmentStatusMenu.invoiceReceived')} />,
        },
        {
          key: 'invoiceApprovedForPayment',
          label: (
            <Badge color={defineStatusColor('invoiceApprovedForPayment')} text={i18n('shipmentStatusMenu.invoiceApprovedForPayment')} />
          ),
        },
        {
          key: 'invoiceProblems',
          label: <Badge color={defineStatusColor('invoiceProblems')} text={i18n('shipmentStatusMenu.invoiceProblems')} />,
        },
      ],
    },
    {
      key: 'pymentDelayMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('daysDelayed30')} text={i18n('shipmentStatusMenu.paymentDelay')} />,
      children: [
        {
          key: 'daysDelayed30',
          label: <Badge color={defineStatusColor('daysDelayed30')} text={i18n('shipmentStatusMenu.daysDelayed30')} />,
        },
        {
          key: 'daysDelayed60',
          label: <Badge color={defineStatusColor('daysDelayed60')} text={i18n('shipmentStatusMenu.daysDelayed60')} />,
        },
        {
          key: 'daysDelayed90',
          label: <Badge color={defineStatusColor('daysDelayed90')} text={i18n('shipmentStatusMenu.daysDelayed90')} />,
        },
        {
          key: 'daysDelayed120',
          label: <Badge color={defineStatusColor('daysDelayed120')} text={i18n('shipmentStatusMenu.daysDelayed120')} />,
        },
      ],
    },
    {
      key: 'collectMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('partiallyCollected')} text={i18n('shipmentStatusMenu.collect')} />,
      children: [
        {
          key: 'partiallyCollected',
          label: <Badge color={defineStatusColor('partiallyCollected')} text={i18n('shipmentStatusMenu.partiallyCollected')} />,
        },
        {
          key: 'totallyCollected',
          label: <Badge color={defineStatusColor('totallyCollected')} text={i18n('shipmentStatusMenu.totallyCollected')} />,
        },
        {
          key: 'paymentProofEmitted',
          label: <Badge color={defineStatusColor('paymentProofEmitted')} text={i18n('shipmentStatusMenu.paymentProofEmitted')} />,
        },
        {
          key: 'collectProblems',
          label: <Badge color={defineStatusColor('collectProblems')} text={i18n('shipmentStatusMenu.collectProblems')} />,
        },
      ],
    },
    {
      key: 'informationRequired',
      label: <Badge color={defineStatusColor('informationRequired')} text={i18n('shipmentStatusMenu.informationRequired')} />,
    },
    {
      key: 'documentationRequired',
      label: <Badge color={defineStatusColor('documentationRequired')} text={i18n('shipmentStatusMenu.documentationRequired')} />,
    },
    { key: 'completed', label: <Badge color={defineStatusColor('completed')} text={i18n('shipmentStatusMenu.completed')} /> },
  ]

  const onCollectStatusMenuClick = e => {
    setCollectState({ text: e.key, color: defineStatusColor(e.key) })
    setCollectOpen(true)
  }

  useEffect(() => {
    setPayload({
      shipmentState: {
        collect: {
          text: collectState.text,
          color: collectState.color,
          lastComment: { user: loggedUserProfile, date: dateFormat(new Date()), text: collectComment, section: 'collectStatus' },
        },
      },
      lastComment: { user: loggedUserProfile, date: dateFormat(new Date()), text: collectComment, section: 'collectStatus' },
      log: {
        name: 'shipmentStatusChanged',
        category: 'shipmentOperations',
        section: 'collectStatus',
        status: collectState.text,
        color: collectState.color,
      },
      hubId: hubId || '',
    })
  }, [collectState, collectComment])

  const handleCollectOk = e => {
    onOk(payload)
    setCollectOpen(false)
  }

  const handleCollectCancel = () => {
    setCollectOpen(false)
  }

  return (
    <>
      <Dropdown
        className="w-full my-4"
        menu={{ items: collectMenu, mode: 'inline', onClick: onCollectStatusMenuClick }}
        trigger={['click']}
      >
        <Tag color={statusColor || '#999999'} className="w-full text-center py-1">
          {i18n(`shipmentStatusMenu.${statusText || 'noInvoice'}`)}
        </Tag>
      </Dropdown>
      <WantToAddComment
        open={collectOpen}
        setComment={setCollectComment}
        handleCancel={handleCollectCancel}
        handleOk={handleCollectOk}
        state={collectState}
        section="collectStatus"
      />
    </>
  )
}

export const SuppliersStatusDropdown = ({ statusColor, statusText, loggedUserProfile, onOk, hubId }) => {
  const [suppliersOpen, setSuppliersOpen] = useState(false)
  const [suppliersState, setSuppliersState] = useState({ text: 'noInvoice', color: '#999999' })
  const [suppliersComment, setSuppliersComment] = useState(false)
  const [payload, setPayload] = useState({})

  const suppliersMenu = [
    {
      key: 'billingMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('billing')} text={i18n('shipmentStatusMenu.billing')} />,
      children: [
        { key: 'billing', label: <Badge color={defineStatusColor('billing')} text={i18n('shipmentStatusMenu.billing')} /> },
        { key: 'noInvoice', label: <Badge color={defineStatusColor('noInvoice')} text={i18n('shipmentStatusMenu.noInvoice')} /> },
        {
          key: 'partiallyBilled',
          label: <Badge color={defineStatusColor('partiallyBilled')} text={i18n('shipmentStatusMenu.partiallyBilled')} />,
        },
        {
          key: 'completelyBilled',
          label: <Badge color={defineStatusColor('completelyBilled')} text={i18n('shipmentStatusMenu.completelyBilled')} />,
        },
        {
          key: 'invoiceUploaded',
          label: <Badge color={defineStatusColor('invoiceUploaded')} text={i18n('shipmentStatusMenu.invoiceUploaded')} />,
        },
        {
          key: 'invoiceApproved',
          label: <Badge color={defineStatusColor('invoiceApproved')} text={i18n('shipmentStatusMenu.invoiceApproved')} />,
        },
        {
          key: 'billingProblems',
          label: <Badge color={defineStatusColor('billingProblems')} text={i18n('shipmentStatusMenu.billingProblems')} />,
        },
      ],
    },
    {
      key: 'sendingInvoiceMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('invoiceSent')} text={i18n('shipmentStatusMenu.sendingInvoice')} />,
      children: [
        { key: 'invoiceSent', label: <Badge color={defineStatusColor('invoiceSent')} text={i18n('shipmentStatusMenu.invoiceSent')} /> },
        {
          key: 'invoiceReceived',
          label: <Badge color={defineStatusColor('invoiceReceived')} text={i18n('shipmentStatusMenu.invoiceReceived')} />,
        },
        {
          key: 'invoiceApprovedForPayment',
          label: (
            <Badge color={defineStatusColor('invoiceApprovedForPayment')} text={i18n('shipmentStatusMenu.invoiceApprovedForPayment')} />
          ),
        },
        {
          key: 'invoiceProblems',
          label: <Badge color={defineStatusColor('invoiceProblems')} text={i18n('shipmentStatusMenu.invoiceProblems')} />,
        },
      ],
    },
    {
      key: 'pymentDelayMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('daysDelayed30')} text={i18n('shipmentStatusMenu.paymentDelay')} />,
      children: [
        {
          key: 'daysDelayed30',
          label: <Badge color={defineStatusColor('daysDelayed30')} text={i18n('shipmentStatusMenu.daysDelayed30')} />,
        },
        {
          key: 'daysDelayed60',
          label: <Badge color={defineStatusColor('daysDelayed60')} text={i18n('shipmentStatusMenu.daysDelayed60')} />,
        },
        {
          key: 'daysDelayed90',
          label: <Badge color={defineStatusColor('daysDelayed90')} text={i18n('shipmentStatusMenu.daysDelayed90')} />,
        },
        {
          key: 'daysDelayed120',
          label: <Badge color={defineStatusColor('daysDelayed120')} text={i18n('shipmentStatusMenu.daysDelayed120')} />,
        },
      ],
    },
    {
      key: 'paymentMenu',
      type: 'Submenu',
      label: <Badge color={defineStatusColor('partiallyPaid')} text={i18n('shipmentStatusMenu.payment')} />,
      children: [
        {
          key: 'partiallyPaid',
          label: <Badge color={defineStatusColor('partiallyPaid')} text={i18n('shipmentStatusMenu.partiallyPaid')} />,
        },
        { key: 'totallyPaid', label: <Badge color={defineStatusColor('totallyPaid')} text={i18n('shipmentStatusMenu.totallyPaid')} /> },
        {
          key: 'paymentProblems',
          label: <Badge color={defineStatusColor('paymentProblems')} text={i18n('shipmentStatusMenu.paymentProblems')} />,
        },
      ],
    },
    {
      key: 'informationRequired',
      label: <Badge color={defineStatusColor('informationRequired')} text={i18n('shipmentStatusMenu.informationRequired')} />,
    },
    {
      key: 'documentationRequired',
      label: <Badge color={defineStatusColor('documentationRequired')} text={i18n('shipmentStatusMenu.documentationRequired')} />,
    },
    { key: 'completed', label: <Badge color={defineStatusColor('completed')} text={i18n('shipmentStatusMenu.completed')} /> },
  ]

  const onSuppliersStatusMenuClick = e => {
    setSuppliersState({ text: e.key, color: defineStatusColor(e.key) })
    setSuppliersOpen(true)
  }

  useEffect(() => {
    setPayload({
      shipmentState: {
        suppliers: {
          text: suppliersState.text,
          color: suppliersState.color,
          lastComment: { user: loggedUserProfile, date: dateFormat(new Date()), text: suppliersComment, section: 'suppliersStatus' },
        },
      },
      lastComment: { user: loggedUserProfile, date: dateFormat(new Date()), text: suppliersComment, section: 'suppliersStatus' },
      log: {
        name: 'shipmentStatusChanged',
        category: 'shipmentOperations',
        section: 'suppliersStatus',
        status: suppliersState.text,
        color: suppliersState.color,
      },
      hubId: hubId || '',
    })
  }, [suppliersState, suppliersComment])

  const handleSuppliersOk = e => {
    onOk(payload)
    setSuppliersOpen(false)
  }

  const handleSuppliersCancel = () => {
    setSuppliersOpen(false)
  }

  return (
    <>
      <Dropdown className="w-full my-4" menu={{ items: suppliersMenu, onClick: onSuppliersStatusMenuClick }} trigger={['click']}>
        <Tag color={statusColor || '#999999'} className="w-full text-center py-1">
          {i18n(`shipmentStatusMenu.${statusText || 'noInvoice'}`)}
        </Tag>
      </Dropdown>
      <WantToAddComment
        open={suppliersOpen}
        setComment={setSuppliersComment}
        handleCancel={handleSuppliersCancel}
        handleOk={handleSuppliersOk}
        state={suppliersState}
        section="suppliersStatus"
      />
    </>
  )
}
