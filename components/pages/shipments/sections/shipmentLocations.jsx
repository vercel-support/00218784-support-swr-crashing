import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Card, Form, Typography, Space, Row, Col, Statistic, Table, Drawer } from 'antd'
import { i18n } from '../../../../services/i18n'
import { numberFormat } from '../../../../services/helpers/mathHelp'
import { filterUsersByViewPermission, filterUsersByViewPermissionOnlyMail } from '../../users/filterUsersByPermission'
import { NewLocation } from '../newLocation'
import { RouteTimeline } from '../routeTimeline'
import { BottomBar } from './sectionBottomMenu'
import { LastComment } from './lastComment'

const { Title, Text, Paragraph } = Typography

export const ShipmentLocations = ({
  hubState,
  hubDispatch,
  getViewPermissions,
  getWritingPermissions,
  handleSubmit,
  onSubmitRoute,
  loggedEmail,
}) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false)
  const [isDisabledSearchPlaces, setIsDisabledSearchPlaces] = useState(false)
  const [locationIndex, setLocationIndex] = useState(undefined)
  const [isLocationVisible, setIsLocationVisible] = useState(false)

  return (
    <>
      {/* Locations */}
      {getViewPermissions('locations') ? (
        <div>
          <Card className="w-full border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id="locations">
            <Form layout="vertical" onFinish={handleSubmit(onSubmitRoute)}>
            <Text className="text-lg font-medium">{i18n(`newBillOfLadingHub.locations.title`)}</Text>
              <div className="mt-4">{i18n('newBillOfLadingHub.locations.description')}</div>
              {getWritingPermissions('locations') ? (
                <Space className="mt-4 md:float-right md:-mt-16" wrap>
                  <Button
                    type=""
                    className="float-right"
                    onClick={() => {
                      setIsEditingLocation(false)
                      setIsDisabledSearchPlaces(false)
                      setLocationIndex(undefined)
                      setIsLocationVisible(true)
                      // console.log('isEditingLocation', isEditingLocation)
                      // console.log('isDisabledSearchPlaces', isDisabledSearchPlaces)
                    }}
                    disabled={hubState?.status?.locationsComplete}
                  >
                    {i18n('newBillOfLadingHub.locations.addLocation')}
                  </Button>
                  {hubState?.status?.locationsComplete ? (
                    <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Locations Edit' })}>
                      {i18n('buttons.edit')}
                    </Button>
                  ) : (
                    <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Locations Complete' })}>
                      {i18n('buttons.complete')}
                    </Button>
                  )}
                </Space>
              ) : null}

              {/* <Divider plain />
                  <RouteTimeline
                    locations={hubState ? hubState?.locations?.locations : null}
                    hubDispatch={hubDispatch}
                    disabled={getWritingPermissions('locations') && !hubState?.status?.locationsComplete}
                  />
                  <Divider plain /> */}
              {/* {getWritingPermissions('locations') ? (
                    <div>
                      {hubState?.status?.locationsComplete ? (
                        <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Locations Edit' })}>
                          {i18n('buttons.edit')}
                        </Button>
                      ) : (
                        <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Locations Complete' })}>
                          {i18n('buttons.complete')}
                        </Button>
                      )}
                    </div>
                  ) : null} */}
            </Form>
          </Card>
          <Drawer
            width="80%"
            onClose={() => setIsLocationVisible(false)}
            open={isLocationVisible}
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
            key={2}
          >
            <NewLocation
              hubDispatch={hubDispatch}
              setIsLocationVisible={setIsLocationVisible}
              locations={hubState?.locations?.locations}
              index={locationIndex}
              isEditingLocation={isEditingLocation}
              isDisabledSearchPlaces={isDisabledSearchPlaces}
              isDisabledSearchCompanies={isDisabledSearchPlaces}
              authorizedUsers={filterUsersByViewPermissionOnlyMail(hubState?.share?.users, 'locations')}
            />
          </Drawer>
          <Card className="w-full mt-2">
            <RouteTimeline
              locations={hubState ? hubState?.locations?.locations : null}
              hubDispatch={hubDispatch}
              disabled={getWritingPermissions('locations') && !hubState?.status?.locationsComplete}
              usersList={filterUsersByViewPermission(hubState?.share?.users, 'locations')}
              loggedEmail={loggedEmail}
              sharePermission={getViewPermissions('share')}
            />
          </Card>
        </div>
      ) : null}
      <LastComment section="locations" comment={hubState?.locations?.lastComment} />
      <BottomBar />
    </>
  )
}
