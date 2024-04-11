import React, { useEffect, useState } from 'react'
import { EyeOutlined, LoadingOutlined, FlagOutlined, FlagTwoTone } from '@ant-design/icons'
import useSWR from 'swr'
import { post } from '../../../services/fetch'
import { message } from 'antd'
import { i18n } from '../../../services/i18n'

export const OnWatchToggle = ({ shipmentId, onWatch }) => {
  // const [messageApi, contextHolder] = message.useMessage()
  const [isOnWatch, setIsOnWatch] = useState(onWatch)
  const [isLoading, setIsLoading] = useState(false)

  // console.log({ function: 'OnWatchToggle', shipmentId, onWatch })

  useEffect(() => {
    setIsOnWatch(onWatch)
  }, [onWatch])

  const onWatchClick = async () => {
    setIsLoading(true)
    const response = await post(`/api/shipment/update-onWatch?shipmentId=${shipmentId}&onWatch=${onWatch}`)
    const { error, ok } = response
    // console.log({ response })
    if (ok) {
      setIsOnWatch(!isOnWatch)
      // console.log({isOnWatch})
      if (onWatch) {
        message.success(i18n('shipment.removedFromWatchList'))
      } else {
        message.success(i18n('shipment.addedToWatchList'))
      }
    } else {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <LoadingOutlined className="text-tkyBlue" />
      ) : (
        <div key={shipmentId} className="cursor-pointer" onClick={onWatchClick} disabled={isLoading}>
          {isOnWatch ? <FlagTwoTone twoToneColor="#f50538" /> : <FlagOutlined className="text-tkyGrey" />}
        </div>
      )}
    </>
  )
}
