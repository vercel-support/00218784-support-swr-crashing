import React, { useEffect, useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { post } from '../../../services/fetch'
import { message } from 'antd'
import { i18n } from '../../../services/i18n'

export const OnPublicToggle = ({ shipmentId, onPublic }) => {
  // const [messageApi, contextHolder] = message.useMessage()
  const [isOnPublic, setIsOnPublic] = useState(onPublic)
  const [isLoading, setIsLoading] = useState(false)

  // console.log({ function: 'onPublicToggle', shipmentId, onPublic })

  useEffect(() => {
    setIsOnPublic(onPublic)
  }, [onPublic])

  const onPublicClick = async () => {
    setIsLoading(true)
    console.log("pub", onPublic);
    const response = await post(`/api/shipment/update-onPublic?shipmentId=${shipmentId}&onPublic=${onPublic}`)
    const { error, ok } = response
    // console.log({ response })
    
    if (ok) {
      setIsOnPublic(!isOnPublic)
      // console.log({isonPublic})
      if (!isOnPublic) {
        message.success(i18n('shipment.addedOnPublic'))
      } else {
        message.success(i18n('shipment.removedOnPublic'))
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
        <div key={shipmentId} className="cursor-pointer" onClick={onPublicClick} disabled={isLoading}>
          {isOnPublic ? <EyeOutlined className="text-tkyBlue" /> : <EyeInvisibleOutlined className="text-tkyGrey" />}
        </div>
      )}
    </>
  )
}
