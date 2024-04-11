import { ShipmentsIndicators } from './shipmentsIndicators'
import { ShipmentsClassifications } from './shipmentsClassifications'
import { ShipmentsGraphsTotals } from './shipmentsGraphsTotals'
import { ShipmentsGraphsEfficiency } from './shipmentsGraphsEfficiency'

export const ShipmentDashboard = () => {
  return (
    <>
      <ShipmentsIndicators />
      <ShipmentsGraphsTotals />
      <ShipmentsClassifications />
      <ShipmentsGraphsEfficiency />
    </>
  )
}
