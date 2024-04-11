import React, { useReducer, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Typography, Button, Select, Input, Form, Divider, DatePicker, Checkbox, Radio, Space } from 'antd'
import { CustomerForm } from './customerForm'
import { i18n } from '../../../services/i18n'
import { post } from '../../../services/fetch'

const { Title } = Typography

export const NewCustomer = ({ setIsNewBillOfLadingHubVisible, userProfile, companyProfile }) => {
  const router = useRouter()
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [allowCreateShipment, setAllowCreateShipment] = useState(companyProfile.allowCreateShipmentWithBoLH)
  const [defaultCreateShipment, setDefaultCreateShipment] = useState(companyProfile.defaultCreateShipmentWithBoLH)
  const [disableCreateShipment, setDisableCreateShipment] = useState(companyProfile.disableCreateShipmentWithBoLH)
  const [defaultTaskilityBoLHObjective, setTaskilityBoLHObjective] = useState(companyProfile.defaultTaskilityObjectiveBoL)
  const [disableTaskilityBoLHObjective, setDisableTaskilityBoLHObjective] = useState(companyProfile.disableTaskilityBoLHObjective)

  const newBoLHInitialState = { createShipmentWithHub: defaultCreateShipment, taskilityBoLHObjective: defaultTaskilityBoLHObjective }
  const newBoLHReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'Name Update':
        return { ...state, name: action.payload }
      case 'Customer Update': {
        const client = action.clientsD.clients.find(client => client._id === action.payload)
        return { ...state, clientId: action.payload, clientName: client.name }
      }
      case 'Create Shipment Update':
        return { ...state, createShipmentWithHub: action.payload }
      case 'Change Hub Objective':
        return { ...state, taskilityBoLHObjective: action.payload }
      default:
        return { ...state }
    }
  }
  const [newBoLHState, newBoLHDispatch] = useReducer(newBoLHReducer, newBoLHInitialState)

  // Get Clients data to populate the Select Options in the Clients Filter
  const { data: clientsData, error: clientsError } = useSWR('/api/billing/get-all-user-clients', url => fetch(url).then(res => res.json()))
  const saveNewBillOfLadingHub = BoLH => {
    // console.log('vehicle: ', BoLH)
    setLoading(true)
    post('/api/customers/create-new-customer', { body: {} })
      .then(({ ok, _id }) => {
        return ok ? _id : 'error'
      })
      .then(_id => router.push(`/shipment-hub/${_id}`))
      // .then(({ error, details }) => {
      //   // if (!error) setFinished('signed')
      //   setApiError(error, details?.message || '')
      //   // console.log('details', details)
      // })
      .catch()
    // .finally(() => setCreatingCfdi(false))
    // router.push(`/bill-of-lading-hub/${1}`)
    // setIsNewBillOfLadingHubVisible(false)
  }

  return (
    <div className="w-full mt-10">
      <Title level={3}>{i18n(`customers.newCustomerTitle`)}</Title>
      <span className="text-blue">{i18n('customers.newCustomerDescription')}</span>
      {/* <Button onClick={() => console.log('newBillOfLadingHubState')}>Console State</Button> */}
      <Divider plain />
      <CustomerForm relationshipRole='client' />
    </div>
  )
}
