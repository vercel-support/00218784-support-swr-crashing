import React from 'react'
import { Card, Typography } from 'antd'
import { ExpertNavBar, WebpageNavbar } from 'components/webpage/webpage-navbar/webpage-navbar'
import { HeroSection } from 'components/webpage/hero-section/hero-section'
import { VideoSection } from 'components/webpage/video-section/video-section'
import { CustomersLogosSection } from 'components/webpage/social-proof-section/customers-logos-section'
import { ThreeFeatureSection } from 'components/webpage/features-sections/three-feature-section'
import { WebPageFooter } from 'components/webpage/footer/footer'
import { LastCall } from 'components/webpage/last-call-section/last-call-section'
import { TwoFeatureSection } from 'components/webpage/features-sections/two-feature-section'
import { FourFeatureSection } from 'components/webpage/features-sections/four-feature-section'

const { Text } = Typography

export const LandingPage = () => {
  return (
    <div className="[--header-height:calc(var(--base-header-nav)+var(--base-header-banner))] [--base-header-nav:64px] tablet:[--base-header-nav:72px] [--base-header-banner:0px]">
      <div className="bg-white dark:bg-gray-900">
        <WebpageNavbar />
        <HeroSection />
        <VideoSection />
        {/* <CustomersLogosSection /> */}
        <ThreeFeatureSection />
        <TwoFeatureSection />
        <FourFeatureSection />
        <LastCall />
        <WebPageFooter />
      </div>
    </div>
  )
}
