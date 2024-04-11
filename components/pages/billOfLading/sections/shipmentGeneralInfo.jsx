import React from 'react'
import { Button, Card, Form, Typography, Space } from 'antd'
import { i18n } from '../../../../services/i18n'
import { GeneralShipmentInfo } from '../generalShipmentInfo'
import { BottomBar } from './sectionBottomMenu'
import { LastComment } from './lastComment'

const { Title, Text, Paragraph } = Typography

export const ShipmentGeneralInfo = ({ hubState, hubDispatch, getViewPermissions, getWritingPermissions, handleSubmit, onSubmitRoute }) => {
  return (
    <>
      {/* General Info */}
      {getViewPermissions('generalInfo') ? (
        <div>
          <Card className="w-full mt-20 border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id='generalInfo'>
            <Form layout="vertical" onFinish={handleSubmit(onSubmitRoute)}>
              {/* <Button onClick={() => console.log(hubState, hubState.locations)}>
            Console Log State
          </Button> */}
              <Title level={4}>{i18n(`newBillOfLadingHub.generalInfo.title`)}</Title>
              <div className="mt-4">{i18n('newBillOfLadingHub.generalInfo.description')}</div>
              {getWritingPermissions('generalInfo') ? (
                <Space className="mt-4 md:float-right md:-mt-16" wrap>
                  {hubState?.status?.generalInfoComplete ? (
                    <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'General Info Edit' })}>
                      {i18n('buttons.edit')}
                    </Button>
                  ) : (
                    <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'General Info Complete' })}>
                      {i18n('buttons.complete')}
                    </Button>
                  )}
                </Space>
              ) : null}

              {/* <Divider plain />
                  <GeneralShipmentInfo
                    hubDispatch={hubDispatch}
                    internationalTransport={hubState?.internationalTransport}
                    inOutGoods={hubState?.inOutGoods}
                    countryOfOrigin={hubState?.countryOfOrigin}
                    wayInOut={hubState?.wayInOut}
                    disabled={!(getWritingPermissions('generalInfo') && !hubState?.status?.generalInfoComplete)}
                  />
                  <Divider plain />
                  {getWritingPermissions('generalInfo') ? (
                    <div>
                      {hubState?.status?.generalInfoComplete ? (
                        <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'General Info Edit' })}>
                          {i18n('buttons.edit')}
                        </Button>
                      ) : (
                        <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'General Info Complete' })}>
                          {i18n('buttons.complete')}
                        </Button>
                      )}
                    </div>
                  ) : null} */}
            </Form>
          </Card>
          <Card className="w-full mt-2">
            <GeneralShipmentInfo
              hubDispatch={hubDispatch}
              internationalTransport={hubState?.generalInfo.internationalTransport}
              inOutGoods={hubState?.generalInfo.inOutGoods}
              countryOfOrigin={hubState?.generalInfo.countryOfOrigin}
              wayInOut={hubState?.generalInfo.wayInOut}
              disabled={!(getWritingPermissions('generalInfo') && !hubState?.status?.generalInfoComplete)}
            />
          </Card>
        </div>
      ) : null}
      <LastComment section='generalInfo' comment={hubState?.generalInfo?.lastComment} />
      <BottomBar />
    </>
  )
}
