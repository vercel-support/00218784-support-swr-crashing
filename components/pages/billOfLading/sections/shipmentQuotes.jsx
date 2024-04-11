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

export const ShipmentQuotes = ({
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
      <Card className="w-full mt-20 border-l-8 border-t-0 border-b-0 border-r-0 border-tkyBlue" id='quotes'>
        <Form layout="vertical" onFinish={handleSubmit(onSubmitLoad)}>
          <Title level={4}>{i18n(`newBillOfLadingHub.quotes.title`)}</Title>
          <div className="mt-4">{i18n('newBillOfLadingHub.quotes.description')}</div>
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
        </Form>
      </Card>
      <LastComment section="quotes" comment={hubState?.quotes?.lastComment} />
      <BottomBar />
    </>
  )
}