import React from 'react'
import { Row, Col, Card, Typography, Alert, Button } from 'antd'
import moment from 'moment'
import { i18n } from '../../../../services/i18n'
import { Mapbox } from '../../maps/Mapbox'
import { LastComment } from './lastComment'
import { OperativeStatusDropdown, CollectStatusDropdown, SuppliersStatusDropdown } from './statusDropdowns'

const { Title, Text, Paragraph } = Typography

export const ShipmentStatus = ({ hubState, hubDispatch, loggedUserProfile }) => {
  const pendingActions = `${hubState?.status?.generalInfoComplete ? '' : i18n('newBillOfLadingHub.pendingActions.generalInfoIncomplete')}\n
  ${hubState?.status?.locationsComplete ? '' : i18n('newBillOfLadingHub.pendingActions.locationsIncomplete')}\n
  ${hubState?.status?.goodsComplete ? '' : i18n('newBillOfLadingHub.pendingActions.goodsIncomplete')}\n
  ${hubState?.status?.transportsComplete ? '' : i18n('newBillOfLadingHub.pendingActions.transportsIncomplete')}`

  const isBoLHComplete =
    hubState?.status?.generalInfoComplete &&
    hubState?.status?.locationsComplete &&
    hubState?.status?.goodsComplete &&
    hubState?.status?.transportsComplete

  const onOk = payload => {
    hubDispatch({
      type: 'Update Status Menu',
      payload,
    })
  }

  return (
    <>

      <Card className="w-full border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id="status">
        <Text className='text-lg font-medium'>{`${i18n(`hubSections.status`)}`}</Text>
        {hubState?.currentPosition ? <Text size="sm">{`${i18n(`hubSections.eta`)}: ${moment(new Date().toDateString())}`}</Text> : null}
      </Card>
      {hubState?.locations?.locations?.length !== 0 ? (
        <div className="mt-2">
          <Mapbox
            initialZoom={10}
            height={250}
            width="100%"
            originLatitude={20.5888}
            originLongitude={-100.3899}
            centerMarker
            navigation
            styleCtrl
          />
        </div>
      ) : null}
      <Row className="w-full">
        <Col span={24} sm={{ span: 8 }}>
          <Card className="mt-2 ">
            <Text className=" text-sm">{i18n('shipmentHub.operativeStatus')}</Text>
            <OperativeStatusDropdown
              statusColor={hubState?.status?.operative?.color}
              statusText={hubState?.status?.operative?.text}
              loggedUserProfile={loggedUserProfile}
              onOk={onOk}
            />
            <Text className="text-tkyGrey text-sm">{}</Text>
            <LastComment section="operativeStatus" comment={hubState?.status?.operative?.lastComment} padding="12px" />
          </Card>
        </Col>
        <Col span={24} sm={{ span: 8 }}>
          <Card className="mt-2 md:ml-2">
            <Text className="text-tkyGrey text-sm">{i18n('shipmentHub.collectStatus')}</Text>
            <CollectStatusDropdown
              statusColor={hubState?.status?.collect?.color}
              statusText={hubState?.status?.collect?.text}
              loggedUserProfile={loggedUserProfile}
              onOk={onOk}
            />
            <Text className="text-tkyGrey text-sm">{}</Text>
            <LastComment section="collectStatus" comment={hubState?.status?.collect?.lastComment} padding="12px" />
          </Card>
        </Col>
        <Col span={24} sm={{ span: 8 }}>
          <Card className="mt-2 md:ml-2">
            <Text className="text-tkyGrey text-sm">{i18n('shipmentHub.suppliersStatus')}</Text>
            <SuppliersStatusDropdown
              statusColor={hubState?.status?.suppliers?.color}
              statusText={hubState?.status?.suppliers?.text}
              loggedUserProfile={loggedUserProfile}
              onOk={onOk}
            />
            <Text className="text-tkyGrey text-sm">{}</Text>
            <LastComment section="suppliersStatus" comment={hubState?.status?.suppliers?.lastComment} padding="12px" />
          </Card>
        </Col>
      </Row>
      {isBoLHComplete ? (
        <Alert
          className="mt-2"
          message={i18n('newBillOfLadingHub.pendingActions.successTitle')}
          description={i18n('newBillOfLadingHub.pendingActions.successDescription')}
          type="success"
          showIcon
        />
      ) : (
        <Alert
          className="mt-2"
          message={i18n('newBillOfLadingHub.pendingActions.title')}
          description={pendingActions}
          type="info"
          showIcon
        />
      )}
    </>
  )
}
