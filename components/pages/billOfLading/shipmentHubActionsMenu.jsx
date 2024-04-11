import React from 'react'
import { Button, Dropdown } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { i18n } from '../../../services/i18n'

export const ShipmentHubActionsMenu = () => {

  const onClickActionMenuHandler = e => {
    console.log(e)
    switch(e.key) {
      case 'cancel': {
        console.log({case: 'cancel'})
        break
      }
      case 'copyHub': {
        console.log({case: 'copyHub'})
        break
      }
      case 'createTemplateFromHub' : {
        console.log({case: 'createTemplateFromHub'})
        break
      }
      case 'emailNotification' : {
        console.log({case: 'emailNotification'})
        break
      }
      case 'whatsAppNotification' : {
        console.log({case: 'whatsAppNotification'})
        break
      }
      case 'satisfactionSurvey' : {
        console.log({case: 'satisfactionSurvey'})
        break
      }
      case 'driverStatus' : {
        console.log({case: 'driverStatus'})
        break
      }
      case 'cargoInformation' : {
        console.log({case: 'cargoInformation'})
        break
      }
      case 'proofOfDelivery' : {
        console.log({case: 'proofOfDelivery'})
        break
      }
      case 'authorization' : {
        console.log({case: 'authorization'})
        break
      }
      case 'generateInvoice' : {
        console.log({case: 'generateInvoice'})
        break
      }
      case 'generateBoL' : {
        console.log({case: 'generateBoL'})
        break
      }
      case 'generateBoLTransport' : {
        console.log({case: 'generateBoLTransport'})
        break
      }
      case 'generateInstructionLetter' : {
        console.log({case: 'generateInstructionLetter'})
        break
      }
      case 'auditBolInformation' : {
        console.log({case: 'auditBolInformation'})
        break
      }
      default: 
        break
    }
  }

  const shipmentHubActionMenuItems = [
    {
      key: 'edit',
      label: i18n('shipmentHub.menu.editGroup'),
      type: 'group',
      children: [
        {
          key: 'cancel',
          label: i18n('buttons.cancel'),
        },
        {
          key: 'copyHub',
          label: i18n('shipmentHub.menu.copyHub'),
        },
        {
          key: 'createTemplateFromHub',
          label: i18n('shipmentHub.menu.createTemplateFromHub'),
        },
      ],
    },
    {
      key: 'send',
      label: i18n('shipmentHub.menu.sendGroup'),
      type: 'group',
      children: [
        {
          key: 'emailNotification',
          label: i18n('shipmentHub.menu.emailNotification'),
        },
        {
          key: 'whatsAppNotification',
          label: i18n('shipmentHub.menu.whatsAppNotification'),
        },
        {
          key: 'satisfactionSurvey',
          label: i18n('shipmentHub.menu.satisfactionSurvey'),
        },
      ],
    },
    // {
    //   key: 'tracking',
    //   label: i18n('shipmentHub.menu.trackingGroup'),
    //   type: 'group',
    //   children: [
    //     {
    //       key: 'connectGPS',
    //       label: i18n('shipmentHub.menu.connectGPS'),
    //     },
    //     {
    //       key: 'trackViaWhatsApp',
    //       label: i18n('shipmentHub.menu.trackViaWhatsApp'),
    //     }
    //   ],
    // },
    {
      key: 'request',
      label: i18n('shipmentHub.menu.requestGroup'),
      type: 'group',
      children: [
        {
          key: 'authorization',
          label: i18n('shipmentHub.menu.authorization'),
        },
        {
          key: 'cargoInformation',
          label: i18n('shipmentHub.menu.cargoInformation'),
        },
        {
          key: 'driverStatus',
          label: i18n('shipmentHub.menu.driverStatus'),
        },
        {
          key: 'proofOfDelivery',
          label: i18n('shipmentHub.menu.proofOfDelivery'),
        },
        {
          key: 'quoteFromCarriers',
          label: i18n('shipmentHub.menu.quoteFromCarriers'),
        },
      ],
    },
    {
      key: 'generate',
      label: i18n('shipmentHub.menu.generateGroup'),
      type: 'group',
      children: [
        {
          key: 'generateInvoice',
          label: i18n('shipmentHub.menu.invoice'),
        },
        {
          key: 'generateBoL',
          label: i18n('shipmentHub.menu.billOfLading'),
        },
        {
          key: 'generateTransportBoL',
          label: i18n('shipmentHub.menu.billOfLadingTransport'),
        },
        {
          key: 'generateInstructionLetter',
          label: i18n('shipmentHub.menu.instructionsLetter'),
        },
      ],
    },
    {
      key: 'audit',
      label: i18n('shipmentHub.menu.auditGroup'),
      type: 'group',
      children: [
        {
          key: 'auditBolInformation',
          label: i18n('shipmentHub.menu.bolInformation'),
        },
      ],
    },
    // {
    //   key: 'addSection',
    //   label: i18n('shipmentHub.menu.addSectionGroup'),
    //   type: 'group',
    //   children: [
    //     {
    //       key: 'tags',
    //       label: i18n('shipmentHub.menu.tags'),
    //     },
    //     {
    //       key: 'prices',
    //       label: i18n('shipmentHub.menu.prices'),
    //     },
    //     {
    //       key: 'costs',
    //       label: i18n('shipmentHub.menu.costs'),
    //     },
    //     {
    //       key: 'generalInfo',
    //       label: i18n('shipmentHub.menu.generalInfo'),
    //     },
    //     {
    //       key: 'transports',
    //       label: i18n('shipmentHub.menu.transports'),
    //     },
    //     {
    //       key: 'goods',
    //       label: i18n('shipmentHub.menu.goods'),
    //     },
    //     {
    //       key: 'documents',
    //       label: i18n('shipmentHub.menu.documents'),
    //     },
    //     {
    //       key: 'map',
    //       label: i18n('shipmentHub.menu.map'),
    //     },
    //     {
    //       key: 'comments',
    //       label: i18n('shipmentHub.menu.comments'),
    //     },
    //     {
    //       key: 'authorizations',
    //       label: i18n('shipmentHub.menu.authorizations'),
    //     },
    //   ],
    // },
  ]

  return (
    <Dropdown menu={{ items: shipmentHubActionMenuItems, onClick: onClickActionMenuHandler }}>
      <Button type="link" className="float-right -mt-2">
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
}
