import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Card, Form, Typography, Space, Row, Col, Statistic, Table, Drawer, Divider } from 'antd'
import { i18n } from '../../../../services/i18n'
import { numberFormat } from '../../../../services/helpers/mathHelp'
import { filterUsersByViewPermission, filterUsersByViewPermissionOnlyMail } from '../../users/filterUsersByPermission'
import { LandTransport } from '../landTransport'
import { NewTransport } from '../newTransport'
import { BottomBar } from './sectionBottomMenu'
import { LastComment } from './lastComment'

const { Title, Text, Paragraph } = Typography

export const ShipmentCarriers = ({
  hubState,
  hubDispatch,
  getViewPermissions,
  getWritingPermissions,
  handleSubmit,
  onSubmitLoad,
  loggedEmail,
  companyProfile,
}) => {
  const [isEditingTransport, setIsEditingTransport] = useState(false)
  const [transportIndex, setTransportIndex] = useState(undefined)
  const [isTransportVisible, setIsTransportVisible] = useState(false)

  const createTransportsCards = hubState
    ? hubState?.transports?.transports?.map((transport, index) => {
        // console.log('transport', transport)
        // console.log('index', index)
        // console.log('transport.transportType', transport.transportType)

        if (transport.transportType === '01')
          return (
            <LandTransport
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${transport.company._id}`}
              transports={hubState.transports.transports}
              index={index}
              parentDispatch={hubDispatch}
              isEditing={isEditingTransport}
              disabled={getWritingPermissions('transports') && !hubState?.status?.transportsComplete}
              usersList={filterUsersByViewPermission(hubState?.share?.users, 'transports')}
              loggedEmail={loggedEmail}
              sharePermission={getViewPermissions('share')}
              companyProfile={companyProfile}
            />
          )
        return null
      })
    : []

  return (
    <>
      {/* Transport */}
      {getViewPermissions('transports') ? (
        <div>
          <Card className="w-full mt-20 border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id="carriers">
            <Form layout="vertical" onFinish={handleSubmit(onSubmitLoad)}>
              <Title level={4}>{i18n(`newBillOfLadingHub.transport.title`)}</Title>
              <div className="mt-4">{i18n('newBillOfLadingHub.transport.description')}</div>
              {getWritingPermissions('transports') ? (
                <Space className="mt-4 md:float-right md:-mt-16" wrap>
                  <Button
                    type=""
                    onClick={() => {
                      setIsEditingTransport(false)
                      setTransportIndex(undefined)
                      setIsTransportVisible(true)
                    }}
                    // disabled={hubState?.status?.transportsComplete}
                  >
                    {i18n('newBillOfLadingHub.transport.addTransport')}
                  </Button>
                  {/* Mark as Completed Button */}
                  {/* {hubState?.status?.transportsComplete ? (
                        <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Transports Edit' })}>
                          {i18n('buttons.edit')}
                        </Button>
                      ) : (
                        <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Transports Complete' })}>
                          {i18n('buttons.complete')}
                        </Button>
                      )} */}
                </Space>
              ) : null}

              {/* {createTransportsCards}
                  <Divider plain />
                  {getWritingPermissions('transports') ? (
                    <div>
                      {hubState?.status?.transportsComplete ? (
                        <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Transports Edit' })}>
                          {i18n('buttons.edit')}
                        </Button>
                      ) : (
                        <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Transports Complete' })}>
                          {i18n('buttons.complete')}
                        </Button>
                      )}
                    </div>
                  ) : null} */}
              <Button
                className="md:float-right mt-4 md:mt-0"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('hubState', hubState)
                }}
              >
                Console Log State
              </Button>
            </Form>
          </Card>
          {createTransportsCards}
          <Drawer
            width="80%"
            onClose={() => setIsTransportVisible(false)}
            open={isTransportVisible}
            styles={{
              body: {
                paddingBottom: 80,
              },
            }}
            destroyOnClose
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
            key={4}
          >
            <NewTransport
              hubDispatch={hubDispatch}
              setIsTransportVisible={setIsTransportVisible}
              transports={hubState?.transports?.transports}
              index={transportIndex}
              isEditingTransport={isEditingTransport}
              authorizedUsers={filterUsersByViewPermissionOnlyMail(hubState?.share?.users, 'transports')}
              companyProfile={companyProfile}
            />
          </Drawer>
        </div>
      ) : null}
      <LastComment section="carriers" comment={hubState?.carriers?.lastComment} />
      <BottomBar />
    </>
  )
}
