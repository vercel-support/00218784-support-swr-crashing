import React, { useState, useContext } from 'react'
import { Avatar, Typography, Card, Row, Col, Button, Space, Drawer } from 'antd'
import { DownOutlined, CommentOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { i18n } from '../../../../services/i18n'
import { CommentCard } from './commentCard'
import { datetimeFormat } from '../../../../services/helpers/dateFormat'
import { Comments } from '../tabs/comments'
import { NewComment } from '../tabs/newComment'
import { post } from '../../../../services/fetch'
import { HubStateContext } from '../../../contexts/shipmentHub'

const { Title, Text, Paragraph } = Typography
const { Meta } = Card

export const LastComment = ({ comment, section = 'prices', padding = '24px' }) => {
  const hubState = useContext(HubStateContext)
  const [commentsVisible, isCommentsVisible] = useState(false)
  const { data, error } = useSWR(`/api/shipment-hub/get-hub-comments-by-section?hubId=${hubState?._id}&section=${section}`, post, {})

  const numberOfComments = data?.count || 0

  const onCloseShare = () => {
    isCommentsVisible(false)
    // console.log({ commentsVisible })
  }

  const openMore = () => {
    isCommentsVisible(true)
    // console.log({ commentsVisible })
  }
  return (
    <>
      <Card className="mt-2 " bodyStyle={{ padding: padding, backgroundColor: '#eff7ff' }}>
        <Button className="float-right -mt-1" type="link" onClick={openMore}>
          {i18n('more')}
        </Button>
        <Text>{i18n('comments')}</Text> <Text className="text-tkyGrey">({numberOfComments || 0})</Text> <br />
        {comment ? (
          <CommentCard
            avatarContent={comment?.user?.initials}
            avatarName={comment?.user?.name}
            avatarSrc={comment?.user?.profilePhoto}
            dateTime={datetimeFormat(comment?.date) || ''}
            comment={comment?.text}
            bodyStyle={{ padding: '0px', backgroundColor: '#eff7ff' }}
            ellipsis={{ rows: 2, expandable: true }}
          />
        ) : (
          <NewComment section={section} showAvatar={false} bodyStyle={{ padding: '0px', backgroundColor: '#eff7ff' }} borderless />
        )}
        {/* <Space className="mt-2">
            <Avatar>JM</Avatar>
            <Paragraph ellipsis={{ rows: 2, tooltip: true }} className="mb-0 ml-2 text-tkyGrey">
              {comment?.text}
            </Paragraph>
          </Space> */}
      </Card>

      <Drawer
        height="90%"
        title={`${i18n('comments')}: ${i18n(`hubSections.${section}`)} (${numberOfComments})`}
        placement="bottom"
        onClose={onCloseShare}
        open={commentsVisible}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        // eslint-disable-next-line prettier/prettier
        // extra={
        //   <Space>
        //     <Button onClick={() => setIsLocationVisible(false)}>Cancel</Button>
        //     {/* <Button onClick={() => setIsLocationVisible(false)} type="primary">
        //       {i18n('buttons.submit')}
        //     </Button> */}
        //   </Space>
        //   // eslint-disable-next-line prettier/prettier
        // }
        key={1}
        destroyOnClose
      >
        <Comments section={section} isCommentsVisible={isCommentsVisible} />
      </Drawer>
    </>
  )
}
