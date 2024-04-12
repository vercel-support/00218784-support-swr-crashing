import React, { useReducer, useState } from 'react'
import { Typography, Button, Select, Form, Divider, Input, message } from 'antd'
import { i18n } from '../../../services/i18n'
import { debounce } from '../../../services/db/debounceTools'
import randomstring from 'randomstring'

// eslint-disable-next-line import/named
import { labelValueSatCveTransporte, sctTypePermit, configAutotransport, subTipoRem } from '../../../services/catalogs'
import { post } from '../../../services/fetch'

const { Title, Text } = Typography
const { Option } = Select

export const NewStage = ({
  setIsStageVisible,
  shipmentId,
  isEditingStage,
  stages,
  setIsStageFolio,
  setIsPart,
  setIsEditingStage,
  setItems,
  items,
}) => {
  const [form] = Form.useForm()

  let nameStage = ''
  let typeStage = ''

  const add = (newStage, folio) => {
    const newPanes = [...items]

    newPanes.push({
      label: newStage,
      key: newStage,
      closable: false,
    })

    setIsStageFolio(folio)
    setItems(newPanes)
  }

  const onChangeStage = async value => {
    const selectedStage = stages.find(stage => stage._id === value)
    nameStage = selectedStage.name
    typeStage = selectedStage.type

    // stages.map (stage => {
    //   if (stage._id === value) {
    //     nameStage = stage.name;
    //     typeStage= stage.type;
    //   }
    // });

    // Actualizar los campos del formulario con los nuevos valores
    form.setFieldsValue({
      type: typeStage,
      name: nameStage,
      nameStage: nameStage,
    })

    console.log('name y type', nameStage, typeStage)
  }

  const onFinish = async values => {
    const newStage = values?.name

    if (isEditingStage) {
      const response = await post(`/api/shipment/update-StageName`, { body: values })
      const { ok } = response

      if (ok) {
        const updatedItems = items.map(item => {
          if (item.label === values.nameStage) {
            return { ...item, label: newStage, key: newStage }
          }
          return item
        })

        message.success(i18n('newShipment.newStage.changedStage'))
        setIsPart(values.stage)
        setItems(updatedItems)
        setIsStageVisible(false)
        setIsEditingStage(false)
      }

      return
    }

    const folio = randomstring.generate(4).toUpperCase()

    const response = await post(`/api/shipment/create-new-stage?shipmentId=${shipmentId}&folio=${folio}`, { body: values })
    const { ok } = response

    if (ok) {
      message.success(i18n('newShipment.newStage.addedToStageList'))
      setIsStageVisible(false)
      add(newStage, folio)
    }
  }

  return (
    <div className="w-full mt-10">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Title level={3}>{isEditingStage ? i18n(`newShipment.newStage.editTitle`) : i18n(`newShipment.newStage.title`)}</Title>
        <span className="text-blue">{i18n('newShipment.newStage.description')}</span>
        {/* <Button onClick={() => console.log(newTagState)}>Console State</Button> */}
        <Divider plain />
        {/* <Button onClick={showStateInConsole}>Console State</Button> */}

        {/* Company */}
        {isEditingStage && (
          <Form.Item name="stageId" label={i18n(`newShipment.newStage.selectStage`)} required>
            <Select
              className="w-full"
              placeholder={i18n(`newShipment.newStage.selectStage`)}
              onChange={onChangeStage}
              // defaultValue={newTagState.type ? newTagState.type : null}
              // options={labelValueSatCveTransporte}
            >
              {stages.map(stage => (
                <Option value={stage._id} key={stage._id}>
                  {stage.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item name="type" label={i18n(`newShipment.newStage.type`)} required>
          <Select
            className="w-full"
            placeholder={i18n(`newShipment.newStage.type`)}
            // options={labelValueSatCveTransporte}
          >
            <Option value="land" key="land">
              {i18n('newShipment.stages.land')}
            </Option>
            <Option value="sea" key="sea">
              {i18n('newShipment.stages.sea')}
            </Option>
            <Option value="customs" key="customs">
              {i18n('newShipment.stages.customs')}
            </Option>
            <Option value="air" key="air">
              {i18n('newShipment.stages.air')}
            </Option>
            <Option value="warehouse" key="warehouse">
              {i18n('newShipment.stages.warehouse')}
            </Option>
            <Option value="train" key="train">
              {i18n('newShipment.stages.train')}
            </Option>
          </Select>
        </Form.Item>

        <Form.Item name="name" label={i18n(`newShipment.newStage.stage`)} required>
          <Input
            placeholder={i18n(`newShipment.newStage.stage`)}
            // onKeyUp={e => newTagDispatch({ type: 'Tag Value Update', payload: e.target.value })}
            // defaultValue={nameStage ? nameStage : null}
          />
        </Form.Item>

        <Form.Item
          name="nameStage"
          hidden // Oculta el input pero permite enviar su valor
        >
          <Input type="hidden" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="float-right" htmlType="submit">
            {i18n('buttons.save')}
          </Button>
        </Form.Item>

        {/* <Button type="primary" onClick={isEditingStage ? updateStage : saveStage} className="float-right">
          {i18n('buttons.save')}
        </Button> */}
      </Form>
    </div>
  )
}
