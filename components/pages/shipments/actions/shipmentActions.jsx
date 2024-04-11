import { notification } from 'antd'
import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { post, get } from '../../../../services/fetch'
import { i18n } from '../../../../services/i18n'

export const saveChangeInDB = (id, action, fields) => {
  // console.log('saveChangeInDB', { id, action, fields })
  post(`/api/shipment/update-field`, { body: { id: id, action: action, fields: fields } })
    .then(({ ok, message, error }) => {
      if (error) notification.error({ message: 'Error', description: i18n(error) })
      // if (ok) notification.info({ message: 'Info', description: i18n(message) })
    })
    .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
}

export const saveHubStatus = (id, fields) => {
  // console.log('saveChangeInDB', { id, action, fields })
  post(`/api/shipment-hub/update-status`, { body: { id: id, fields: fields } })
    .then(({ ok, message, error }) => {
      if (error) notification.error({ message: 'Error', description: i18n(error) })
      // if (ok) notification.info({ message: 'Info', description: i18n(message) })
    })
    .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
}

export const newComment = comment => {
  console.log('newComment', { comment })
  post(`/api/comments/newComment`, { body: { comment } })
    .then(({ ok, message, error }) => {
      if (error) notification.error({ message: 'Error', description: i18n(error) })
    })
    .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
}

export const newLog = (eventLogType, log, loggedUserIdData) => {
  console.log('newLog', { eventLogType, log })
  post(`/api/logs/newLog`, { body: { eventLogType, log, user: loggedUserIdData } })
    .then(({ ok, message, error }) => {
      if (error) notification.error({ message: 'Error', description: i18n(error) })
      // if (ok) notification.info({ message: 'Info', description: i18n(message) })
    })
    .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
}

export const sendNotifications = (id, share, api) => {
  console.log('createLog', { id, share })
  // eslint-disable-next-line dot-notation
  notification.success({
    key: 'sendNotifications',
    message: 'Sending Email Notifications',
    description: 'New description.',
    icon: <MailOutlined />,
  })
  setTimeout(() => {
    // eslint-disable-next-line dot-notation
    notification.info({
      key: 'sendNotifications',
      message: 'Sending WhatsApp Notifications',
      description: 'New description.',
      icon: <WhatsAppOutlined />,
    })
  }, 1500)
  // post(`/api/send-notifications`, { body: { id, share } })
  // .then(({ ok, message, error }) => {
  //   if (error) notification.error({ message: 'Error', description: i18n(error) })
  //   // if (ok) notification.info({ message: 'Info', description: i18n(message) })
  // })
  // .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
}

export const useGetHubStatus = id => {
  const { error, data: status } = useSWR(id ? `api/shipment-hub/get-hub-status?id=${id}` : null, post)
  return status
}

export const useGetHubShare = id => {
  const { error, data: share } = useSWR(id ? `api/shipment-hub/get-hub-share?id=${id}` : null, post)
  return share
}
