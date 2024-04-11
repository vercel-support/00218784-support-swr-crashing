import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Card, Form, Typography, Space, Row, Col, Statistic, Table, Drawer, Divider } from 'antd'
import { i18n } from '../../../../services/i18n'
import { numberFormat } from '../../../../services/helpers/mathHelp'
import { filterUsersByViewPermission, filterUsersByViewPermissionOnlyMail } from '../../users/filterUsersByPermission'
import { NewItem } from '../../products/newItem'
import { GoodsList } from '../goodsList'
import { BottomBar } from './sectionBottomMenu'
import { LastComment } from './lastComment'

const { Title, Text, Paragraph } = Typography

export const ShipmentLoad = ({
  hubState,
  hubDispatch,
  getViewPermissions,
  getWritingPermissions,
  handleSubmit,
  onSubmitLoad,
  loggedEmail,
}) => {
  const [isItemVisible, setIsItemVisible] = useState(false)
  const [isEditingItem, setIsEditingItem] = useState(false)
  const [itemIndex, setItemIndex] = useState(undefined)
  const [isDisabledSearchItems, setIsDisabledSearchItems] = useState(false)

  return (
    <>
      {/* Goods */}
      {getViewPermissions('goods') ? (
        <div>
          <Card className="w-full border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id="load">
            <Form layout="vertical" onFinish={handleSubmit(onSubmitLoad)}>
            <Text className="text-lg font-medium">{i18n(`newBillOfLadingHub.goods.title`)}</Text>
              <div className="mt-4">{i18n('newBillOfLadingHub.goods.description')}</div>
              {getWritingPermissions('goods') ? (
                <Space className="mt-4 md:float-right md:-mt-16" wrap>
                  {/* <Button type="" onClick={() => loadXMLFileToParse()}>
                        {i18n('newBillOfLadingHub.goods.importFromXML')}
                      </Button>
                      <Button type="" onClick={() => loadXMLFileToParse()}>
                        {i18n('newBillOfLadingHub.goods.loadXML')}
                      </Button> */}
                  <Button
                    type=""
                    onClick={() => {
                      setIsItemVisible(true)
                      setIsEditingItem(false)
                      setItemIndex(undefined)
                    }}
                    disabled={hubState?.status?.goodsComplete}
                  >
                    {i18n('newBillOfLadingHub.load.addItem')}
                  </Button>

                  {hubState?.status?.goodsComplete ? (
                    <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Goods Edit' })}>
                      {i18n('buttons.edit')}
                    </Button>
                  ) : (
                    <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Goods Complete' })}>
                      {i18n('buttons.complete')}
                    </Button>
                  )}
                </Space>
              ) : null}

              <Divider plain />
              <Space direction="vertical" size={0}>
                <Text type="secondary">{i18n(`newBillOfLadingHub.goods.totalWeight`)}</Text>
                <Text>
                  {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                  <strong>{hubState ? numberFormat(hubState?.goods?.totalWeight) : 0} </strong>
                  {hubState ? hubState?.goods?.UnidadPeso : null}
                </Text>
              </Space>
              <Space direction="vertical" size={0} className="float-right mr-5">
                <Text type="secondary">{i18n(`newBillOfLadingHub.goods.items`)}</Text>
                <Space className="float-right ">
                  <Text>
                    <strong>{hubState ? hubState?.goods?.good.length : 0}</strong>
                  </Text>
                  {/* <Text>{i18n(`newBillOfLadingHub.goods.items`)}</Text> */}
                </Space>
              </Space>
              {/* <Divider plain />
                  <GoodsList
                    goods={hubState ? hubState?.goods?.good : null}
                    hubDispatch={hubDispatch}
                    disabled={getWritingPermissions('goods') && !hubState?.status?.goodsComplete}
                  />
                  <Divider plain />
                  {getWritingPermissions('goods') ? (
                    <div>
                      {hubState?.status?.goodsComplete ? (
                        <Button type="" className="float-right" onClick={() => hubDispatch({ type: 'Goods Edit' })}>
                          {i18n('buttons.edit')}
                        </Button>
                      ) : (
                        <Button type="primary" className="float-right" onClick={() => hubDispatch({ type: 'Goods Complete' })}>
                          {i18n('buttons.complete')}
                        </Button>
                      )}
                    </div>
                  ) : null} */}
            </Form>
          </Card>
          <GoodsList
            goods={hubState ? hubState?.goods?.good : null}
            hubDispatch={hubDispatch}
            disabled={getWritingPermissions('goods') && !hubState?.status?.goodsComplete}
            usersList={filterUsersByViewPermission(hubState?.share?.users, 'goods')}
            loggedEmail={loggedEmail}
            sharePermission={getViewPermissions('share')}
          />
          <LastComment section="cargo" comment={hubState?.goods?.lastComment} />
          <BottomBar />
          <Drawer
            width="80%"
            onClose={() => setIsItemVisible(false)}
            open={isItemVisible}
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
            key="newItemDrawer"
          >
            <NewItem
              hubDispatch={hubDispatch}
              setIsItemVisible={setIsItemVisible}
              goods={hubState?.goods?.good}
              index={itemIndex}
              isEditingItem={isEditingItem}
              isDisabledSearchItems={isDisabledSearchItems}
              key="newItemForm"
              authorizedUsers={filterUsersByViewPermissionOnlyMail(hubState?.share?.users, 'goods')}
            />
          </Drawer>
        </div>
      ) : null}
    </>
  )
}
