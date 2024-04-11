import React, { useEffect } from 'react'
const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return React.createElement('stripe-pricing-table', {
    'pricing-table-id': 'prctbl_1P3lqVD7XcB8DAJkKkPcBRSr',
    'publishable-key': 'pk_live_AXj3chQKejolWnPdYMlVShsW00VXnlIsUq',
  })
}
export default StripePricingTable
