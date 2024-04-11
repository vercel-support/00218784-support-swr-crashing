import React from 'react'
import { Card, Space, Button } from 'antd'
import { LikeOutlined, DislikeOutlined, CheckOutlined, CommentOutlined, FileOutlined } from '@ant-design/icons'

export const BottomBar = ({ hubState, huDispatch }) => {
  return (
    <>
      <div className="w-full mt-2 mb-12 py-2 px-5 bg-white h-12">
        <Space className="float-left">
          <Button type="link">
            <LikeOutlined />
          </Button>
          <Button type="link">
            <DislikeOutlined />
          </Button>
        </Space>
        <Space className="float-right">
          <Button type="link">
            <FileOutlined />
          </Button>
          <Button type="link">
            <CheckOutlined />
          </Button>
          <Button type="link">
            <CommentOutlined />
          </Button>
        </Space>
      </div>
    </>
  )
}
