import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Typography, Alert, Button, Space, Switch } from 'antd'
import moment from 'moment'
import { i18n } from '../../../../services/i18n'
import { Mapbox } from '../../maps/Mapbox'
import { LastComment } from './lastComment'
import { OperativeStatusDropdown, CollectStatusDropdown, SuppliersStatusDropdown, MilestonesTimeLine, SummaryInfo } from './summaryDropdowns'
import useSWR from 'swr'
import { post } from '../../../../services/fetch'
import TimelineComponent from './timeLineSwitch'
import TimelineComponent2 from './timeLineSwitch2'

const { Title, Text, Paragraph } = Typography

export const ShipmentSummary = ({ hubState, hubDispatch, loggedUserProfile }) => {

  const { data, error } = useSWR(`/api/shipment/get-milestone-by-shipmentId?shipmentId=${hubState._id}`, post, {
    dedupingInterval: 3000,
  })

  const [isMilestone, setIsMilestone] = useState('')
  const [detailedView, setDetailedView] = useState(false);
  
  useEffect(() => {
    setIsMilestone(data)
 }, [data])

  
  console.log('isMielstone', isMilestone);
  // console.log('events', data?.event);



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
        <Text className='text-lg font-medium'>{`${i18n(`hubSections.summary`)}`}</Text>
        {hubState?.currentPosition ? <Text size="sm">{`${i18n(`hubSections.eta`)}: ${moment(new Date().toDateString())}`}</Text> : null}
      </Card>
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
      <Row className="w-full">
        <Col span={24} sm={{ span: 8 }}>
          <Card className="mt-2  ">
            <Text className="text-tkyGrey text-sm">{i18n('shipment.info')}</Text>
           <SummaryInfo shipmentState={hubState}/>
            {/* <SuppliersStatusDropdown
              statusColor={hubState?.status?.suppliers?.color}
              statusText={hubState?.status?.suppliers?.text}
              loggedUserProfile={loggedUserProfile}
              onOk={onOk}
            /> */}
          </Card>
        </Col>  
        <Col span={24} md={{ span: 12 }}>
          <Card className="mt-2 md:ml-2"  style={{ height: '860px' }}>
            <Text className=" text-sm">{i18n('shipment.shipmentTransport')}</Text>
            {/* <OperativeStatusDropdown
              statusColor={hubState?.status?.operative?.color}
              statusText={hubState?.status?.operative?.text}
              loggedUserProfile={loggedUserProfile}
              onOk={onOk}
            /> */}
            {hubState?.locations?.locations?.length !== 0 ? (
              <div className="mt-2 ">
                <Mapbox
                  initialZoom={10}
                  height={520}
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
          </Card>
        </Col>
        <Col span={24} sm={{ span: 4 }} >
          <Card className="mt-2 md:ml-2" style={{ height: '860px' }}>

            <Row align={'middle'}  justify="space-evenly">
              <Text className="text-tkyGrey text-sm">{i18n('shipment.milestones')}</Text>
              <Switch  size="small" checkedChildren="Detailed" unCheckedChildren=" Resume" onChange={setDetailedView} />
            </Row>

            {/* <MilestonesTimeLine  */}
            <TimelineComponent
             hubState={hubState}
             milestones={isMilestone}
             detailedView={detailedView}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
