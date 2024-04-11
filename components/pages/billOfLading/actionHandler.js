import { notification } from "antd"
import { post } from "../../../services/fetch"
import { i18n } from "../../../services/i18n"

export const saveChangeInDB = (id, action, fields) => {
  console.log('saveChangeInDB', {id, action, fields})
  post(`/api/shipment-hub/update-field`, { body: { id: id, action: action, fields: fields } })
    .then(({ ok, message, error }) => {
      if (error) notification.error({ message: 'Error', description: i18n(error) })
      // if (ok) notification.info({ message: 'Info', description: i18n(message) })
    })
    .catch(error => notification.error({ message: 'Error', description: i18n(error.message) }))
}

// eslint-disable-next-line consistent-return
export const actionHandler = (state, action, reducer) => {
  switch(action.type) {
    case 'Add a tag': {
      if (state.tags) {
        saveChangeInDB(state._id, 'Update', { tags: [...state.tags, action.payload] })
        return {
          ...state,
          tags: [...state.tags, action.payload],
        }
      }
      saveChangeInDB(state._id, 'Update', { tags: [action.payload] })
      return {
        ...state,
        tags: [action.payload],
      }
    }
    default:
      break
  }
}