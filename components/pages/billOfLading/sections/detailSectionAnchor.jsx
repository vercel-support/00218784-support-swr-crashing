import React from 'react'
import { Anchor } from 'antd'
import { i18n } from '../../../../services/i18n'

export const DetailTabAnchor = () => {
  const detailAnchorItems = [
    {
      title: i18n('hubSections.status'),
      href: '#status',
      key: 'status',
    },
    {
      title: i18n('hubSections.prices'),
      href: '#prices',
      key: 'prices',
    },
    {
      title: i18n('hubSections.costs'),
      href: '#costs',
      key: 'costs',
    },
    {
      title: i18n('hubSections.generalInfo'),
      href: '#generalInfo',
      key: 'generalInfo',
    },
    {
      title: i18n('hubSections.locations'),
      href: '#locations',
      key: 'locations',
    },
    {
      title: i18n('hubSections.cargo'),
      href: '#load',
      key: 'load',
    },
    {
      title: i18n('hubSections.carriers'),
      href: '#carriers',
      key: 'carriers',
    },
    {
      title: i18n('hubSections.customerSatisfaction'),
      href: '#customerSatisfaction',
      key: 'customerSatisfaction',
    },
    {
      title: i18n('hubSections.approvals'),
      href: '#approvals',
      key: 'approvals',
    },
    {
      title: i18n('hubSections.documents'),
      href: '#documents',
      key: 'documents',
    },
    {
      title: i18n('hubSections.quotes'),
      href: '#quotes',
      key: 'quotes',
    },
    {
      title: i18n('hubSections.audits'),
      href: '#audits',
      key: 'audits',
    },
  ]

  return (
    <Anchor
      affix
      offsetTop={190}
      direction="vertical"
      items={[
        {
          key: 'status',
          href: '#status',
          title: i18n('hubSections.status'),
        },
        {
          title: i18n('hubSections.prices'),
          href: '#prices',
          key: 'prices',
        },
        {
          title: i18n('hubSections.costs'),
          href: '#costs',
          key: 'costs',
        },
        {
          title: i18n('hubSections.generalInfo'),
          href: '#generalInfo',
          key: 'generalInfo',
        },
        {
          title: i18n('hubSections.locations'),
          href: '#locations',
          key: 'locations',
        },
        {
          title: i18n('hubSections.cargo'),
          href: '#load',
          key: 'load',
        },
        {
          title: i18n('hubSections.carriers'),
          href: '#carriers',
          key: 'carriers',
        },
        {
          title: i18n('hubSections.customerSatisfaction'),
          href: '#customerSatisfaction',
          key: 'customerSatisfaction',
        },
        {
          title: i18n('hubSections.approvals'),
          href: '#approvals',
          key: 'approvals',
        },
        {
          title: i18n('hubSections.documents'),
          href: '#documents',
          key: 'documents',
        },
        {
          title: i18n('hubSections.quotes'),
          href: '#quotes',
          key: 'quotes',
        },
        {
          title: i18n('hubSections.audits'),
          href: '#audits',
          key: 'audits',
        },
      ]}
      className=""
    />
  )
}
