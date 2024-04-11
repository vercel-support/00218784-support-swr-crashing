import React, { useContext, useState } from 'react'
import  useSWR  from 'swr'
import { Card, Empty, Spin, Form, Space, Avatar, Input, Button, Row, Col } from 'antd'
import { LoadingOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { i18n } from '../../../../services/i18n'
import { CommentCard } from '../sections/commentCard'
import { dateFormat } from '../../../../services/helpers/dateFormat'
import { HubDispatchContext } from '../../../contexts/shipmentHub'
import { debounce } from '../../../../services/db/debounceTools'
import { CurrentUserContext } from '../../../contexts/currentUser'

const { TextArea } = Input

export const NewComment = ({
  section,
  pinToBottom = false,
  borderless = false,
  bodyStyle = { padding: '12px' },
  showAvatar = true,
  showSendButton = true,
  isCommentsVisible
}) => {
  const currentUser = useContext(CurrentUserContext)
  const hubDispatch = useContext(HubDispatchContext)
  const [commentText, setCommentText] = useState('')
  const hadleClick = () => {
    // console.log({
    //       section: section,
    //       text: commentText,
    //     })
    hubDispatch({
      type: 'Add Comment to Section',
      payload: {
        section: section,
        text: commentText,
      },
    })
    setCommentText('')
    isCommentsVisible(false)
  }
  const handleKeyDown = e => {
    // console.log(e.target.value)
    setCommentText(e.target.value)
  }
 
  return (
    <Card
      className={`mt-4 w-full ${pinToBottom ? 'absolute inset-x-0 bottom-0' : ''} ${borderless ? 'border-none' : ''}`}
      bodyStyle={bodyStyle}
    >
      {showAvatar ? (
        <Row>
          <Col xs={5} sm={4} md={2} lg={2} xl={1}>
            <Avatar className="mr-4" src={currentUser.loggedUserIdData.profilePhoto}>{currentUser.loggedUserIdData.initials || <UserOutlined />}</Avatar>
          </Col>
          <Col xs={19} sm={20} md={22} lg={22} xl={23}>
            <Space.Compact className="w-full" block>
              <TextArea
                className="w-full"
                placeholder={i18n('postComment')}
                autoSize={{ minRows: 1, maxRows: 5 }}
                onChange={handleKeyDown}
                value={commentText}
              />
              {showSendButton ? (
                <Button type="link" onClick={hadleClick}>
                  <SendOutlined />
                </Button>
              ) : null}
            </Space.Compact>
          </Col>
        </Row>
      ) : (
        <Space.Compact className="w-full" block>
          <TextArea
            className="w-full"
            placeholder={i18n('postComment')}
            autoSize={{ minRows: 1, maxRows: 5 }}
            onChange={handleKeyDown}
            value={commentText}
          />
          {showSendButton ? (
            <Button type="link" onClick={hadleClick}>
              <SendOutlined />
            </Button>
          ) : null}
        </Space.Compact>
      )}
    </Card>
  )
}
