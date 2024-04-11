import React, { useState, useRef } from 'react'
import { Card, Typography, Space, Button, Drawer, Tag, Row, Col, Statistic, Affix } from 'antd'
import { EditOutlined, CheckOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Mapbox } from '../../maps/Mapbox'
import { i18n } from '../../../../services/i18n'
import { NewTag } from '../newTag'
import { HubNavigationMenu } from './navigationMenu'
import { ShipmentHubActionsMenu } from '../shipmentHubActionsMenu'
import { ShareWithTeam } from '../shareWithTeam'
import Link from 'next/link'

const { Title, Text, Paragraph } = Typography

export const IdentificationSection = ({
  hubState,
  hubDispatch,
  isHubAuthorized,
  getViewPermissions,
  getWritingPermissions,
  emailInputRef,
  setCurrentTab,
  currentTab,
}) => {
  const [top, setTop] = useState(0)
  const [isTagVisible, setIsTagVisible] = useState(false)
  const [isEditingTag, setIsEditingTag] = useState(false)
  const [isDeletingTag, setIsDeletingTag] = useState(false)
  const [tagIndex, setTagIndex] = useState(undefined)
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false)
  const [isShareVisible, setIsShareVisible] = useState(false)

  const onClickShare = () => {
    setIsShareVisible(true)
  }

  const onCloseShare = () => {
    setIsShareVisible(false)
  }

  const handleCloseTag = removedTag => {
    console.log(removedTag)
    const index = hubState?.tags?.findIndex(tag => {
      return tag?.type === removedTag?.type && tag?.value === removedTag?.value
    })
    console.log('index', index)
    hubDispatch({ type: 'Delete a Tag', payload: index })
    setIsDeletingTag(true)
  }

  const onCloseTag = () => {
    setIsTagVisible(false)
  }

  const listOfTags = hubState?.tags?.map(tag => {
    // console.log('tag', tag)
    let color = ''
    switch (tag.type) {
      case 'Shipment':
        color = 'geekblue'
        break
      case 'shipment':
        color = 'geekblue'
        break
      case 'purchaseOrder':
        color = 'blue'
        break
      case 'customerReference':
        color = 'cyan'
        break
      case 'category':
        color = 'green'
        break
      case 'keyword':
        color = 'gold'
        break
      case 'shipmentType':
        color = 'gold'
        break
      case 'shipmentMethod':
        color = 'gold'
        break
      case 'shipmentVia':
        color = 'gold'
        break
      case 'other':
        color = 'volcano'
        break
      default:
        color = 'magenta'
        break
    }
    return (
      <Tag color={color} closable borderless onClose={() => handleCloseTag(tag)} key={tag.value}>
        {`${i18n(`newBillOfLadingHub.tags.${tag.type}`)} | ${tag.value}`}
      </Tag>
    )
  })

  const updateName = value => {
    // console.log('value', value)
    hubDispatch({ type: 'Update Hub Name', payload: value })
  }

  return (
    <>
      <Affix offsetTop={top}>
        <div className="px-5 pb-3 pt-3 bg-white h-10">
          <Space className="float-right  ">
            {getViewPermissions('share') ? (
              <>
                <Button type="link" onClick={onClickShare} className="-mt-2">
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <a>{i18n(`newBillOfLadingHub.team.share`)}</a>
                </Button>
                <ShipmentHubActionsMenu />
              </>
            ) : null}
          </Space>

          {/* <Button
            key="addSection"
            type="link"
            className="float-right -mt-1"
            icon={<PlusOutlined />}
            onClick={() => {
              // router.push('/new-quote')
              setIsAddSectionVisible(true)
            }}
            disabled={!isHubAuthorized}
          /> */}
          <div className="mt-0">
            <Link href="/bill-of-lading">
              <ArrowLeftOutlined className="mr-0" /> {i18n('newBillOfLadingHub.billOfLandingHubs')}
            </Link>{' '}
            {/* <a href="/bill-of-lading">
              <ArrowLeftOutlined className="mr-0" /> {i18n('newBillOfLadingHub.billOfLandingHubs')}
            </a>{' '} */}
            <span className="px-3">|</span> {hubState?.folio}
          </div>
        </div>
      </Affix>
      <Card className="border-none -ml-1 py-0">
        <Paragraph
          className="my-2 text-tkyBlue italic text-2xl"
          editable={{
            icon: <EditOutlined />,
            tooltip: i18n(`buttons.clickToEdit`),
            onChange: updateName,
            enterIcon: <CheckOutlined />,
          }}
        >
          {hubState?.name}
        </Paragraph>
        <Space wrap className="w-full mt-2">
          {listOfTags}
          <Button
            type=""
            className="float-right text-xs"
            onClick={() => {
              setIsTagVisible(true)
              setIsEditingTag(false)
              setTagIndex(undefined)
            }}
            size="small"
          >
            <PlusOutlined /> {i18n('buttons.addTag')}
          </Button>
        </Space>
      </Card>
      <HubNavigationMenu hubState={hubState} hubDispatch={hubDispatch} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <Drawer
        width="80%"
        onClose={onCloseTag}
        open={isTagVisible}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        key="TagDrawer"
        destroyOnClose
      >
        <NewTag
          dispatch={hubDispatch}
          setIsTagVisible={setIsTagVisible}
          tags={hubState?.tags}
          index={tagIndex}
          isEditingTransport={isEditingTag}
        />
      </Drawer>
      <Drawer
        width="80%"
        onClose={onCloseShare}
        open={isShareVisible}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
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
        key={1}
        destroyOnClose
      >
        <ShareWithTeam
          initialState={hubState?.share}
          BoLHFolio={hubState?.folio}
          BoLHName={hubState?.name}
          BoLHId={hubState?._id}
          parentDispatch={hubDispatch}
          emailInputRef={emailInputRef}
          disabled={!getWritingPermissions('share')}
        />
      </Drawer>
    </>
  )
}
