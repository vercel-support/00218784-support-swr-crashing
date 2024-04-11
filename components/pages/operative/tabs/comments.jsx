import React, { useContext } from 'react'
import useSWR, { mutate } from 'swr'
import { Card, Empty, Spin, Affix, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { i18n } from '../../../../services/i18n'
import { CommentCard } from '../sections/commentCard'
import { datetimeFormat } from '../../../../services/helpers/dateFormat'
import { NewComment } from './newComment'
import { post } from '../../../../services/fetch'
import { HubStateContext } from '../../../contexts/shipmentHub'

const { Title } = Typography

const formatComments = ({ data, section }) => {
  const { comments, count } = data
  // console.log({ data, section })
  if (comments?.length === 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  const formattedComments = comments.map(comment => {
    return (
      <CommentCard
        key={`${comment?.date}-${comment?.user?.initials}`}
        avatarContent={comment?.user?.initials}
        avatarSrc={comment?.user?.profilePhoto}
        dateTime={datetimeFormat(comment?.date || new Date())}
        comment={comment?.text}
        // bodyStyle={{ padding: '0px', backgroundColor: '#eff7ff' }}
      />
    )
  })
  return formattedComments
  // return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  // return [
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  //   <CommentCard bodyStyle={{ padding: '12px' }} section={section} />,
  // ]
}

export const Comments = ({ section, isCommentsVisible }) => {
  const hubState = useContext(HubStateContext)
  const { data, error } = useSWR(`/api/shipment-hub/get-hub-comments-by-section?hubId=${hubState?._id}&section=${section}`, post, {})
  // console.log(hubState?._id)
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  )
  const callMutate = () => {
    mutate()
  }

  return (
    <>
      {data ? formatComments({ data, section }) : <Spin indicator={antIcon} />}
      <NewComment section={section} pinToBottom isCommentsVisible={isCommentsVisible} />
    </>
  )
}
