import React from 'react'
import { Card, Space, Typography, Avatar, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { i18n } from '../../../../services/i18n'

const { Text, Paragraph } = Typography

export const CommentCard = ({ avatarContent, avatarName, avatarSrc, dateTime, ellipsis, comment, bodyStyle = {}, section, style }) => {
  // console.log('commentCard', { section })
  return (
    <Card bodyStyle={bodyStyle} className="mt-2 border-none" style={style || {}}>
      <Space className="mt-2" align="start">
        <Tooltip title={avatarName || avatarContent}>
          <Avatar className="" src={avatarSrc}>
            {avatarContent || <UserOutlined />}
          </Avatar>
        </Tooltip>
        <Space.Compact direction="vertical">
          {dateTime ? <Text className="text-tkyGrey mb-0 ml-2 text-xs">{dateTime}</Text> : null}
          <Paragraph ellipsis={ellipsis || false} className="mb-0 ml-2">
            {comment || i18n('noComments')}
          </Paragraph>
          {section ? <Text className="text-tkyGrey mb-0 ml-2 text-xs">{i18n(`hubSections.${section}`)}</Text> : null}
        </Space.Compact>
      </Space>
    </Card>
  )
}
