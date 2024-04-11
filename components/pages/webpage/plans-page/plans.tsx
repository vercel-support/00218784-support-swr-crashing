import React from 'react'
import { Typography } from 'antd'
import { WebpageNavbar } from 'components/webpage/webpage-navbar/webpage-navbar'
import { WebPageFooter } from 'components/webpage/footer/footer'
import StripePricingTable from 'components/webpage/plans-section/plans-section'

const { Text } = Typography

export const PlansPage = () => {
  return (
    <div className="[--header-height:calc(var(--base-header-nav)+var(--base-header-banner))] [--base-header-nav:64px] tablet:[--base-header-nav:72px] [--base-header-banner:0px]">
      <div className="bg-white dark:bg-gray-900">
        <WebpageNavbar />
        <StripePricingTable />
        <WebPageFooter />
      </div>
    </div>
  )
}