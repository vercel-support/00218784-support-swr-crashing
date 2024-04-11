import React, { useState } from 'react'
import { Modal, Button, Typography, Input, Badge } from 'antd'
import { NewComment } from './newComment'
import { i18n } from '../../../../services/i18n'

const { Title, Text, Paragraph } = Typography

const { TextArea } = Input

export const WantToAddComment = ({open, handleCancel, handleOk, setComment, state, section}) => {
  
  return (
    <Modal
      open={open}
      title={i18n('doYouWantToAddAComment')}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={[
        <Button key="back" onClick={handleCancel}>
          {i18n('buttons.cancel')}
        </Button>,
        <Button key="primary" type="primary" onClick={handleOk}>
          {i18n('buttons.save')}
        </Button>,
      ]}
    >
      <Title level={5}>{i18n(`shipmentHub.${section || 'status'}`)}</Title>
      <Paragraph>{i18n(`wantToAddACommentDescription`)}</Paragraph>
      <Badge color={state.color} text={i18n(`shipmentStatusMenu.${state.text}`)} className='my-4' />
      <TextArea className="w-full" placeholder={i18n('postComment')} autoSize={{ minRows: 1, maxRows: 5 }} onKeyUp={(e)=>setComment(e.target.value)} />
    </Modal>
  )
}
