import React, { useState, useRef } from 'react'
import { Affix, Card, Typography, Button, Breadcrumb, Divider, Drawer, Tag, Row, Col, Segmented, Space, Statistic } from 'antd'
import { EditOutlined, CheckOutlined, PlusOutlined, ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons'
import { Mapbox } from '../../maps/Mapbox'
import { i18n } from '../../../../services/i18n'
import { NewTag } from '../newTag'
import { HubNavigationMenuOperator } from './navigationMenuOperator'
import { ShipmentActionsMenu } from '../shipmentActionsMenu'
import { ShareWithTeam } from '../shareWithTeam'
import Link from 'next/link'

const { Title, Text, Paragraph } = Typography

export const IdentificationSectionOperator = ({
  hubState,
  hubDispatch,
  isHubAuthorized,
  getViewPermissions,
  getWritingPermissions,
  emailInputRef,
  setCurrentTab,
  currentTab,
  setIsPart,
  isPart,
}) => {
  const [top, setTop] = useState(64)
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

  const breadcrumCustmerItems=[
    {
      title: hubState?.clientName,
    }
  ]

  if (hubState?.projectName) breadcrumCustmerItems.push({
    title: `${i18n('newQuote.steps.project')}: ${hubState?.projectName}`,
  })

  const breadcrumSupplierItems=[
    {
      title: hubState?.supplierName,
    }
  ]

  return (
    <>
      <Affix offsetTop={top}>
        <div className="pl-5 pr-2 pb-3 pt-3 bg-white h-10">
          <Space className="float-right -mt-[7px]">
            {getViewPermissions('share') ? (
              <>
                <Button type="link" onClick={onClickShare} className=" items-center">
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <a className="pt-1">{i18n(`newBillOfLadingHub.team.share`)}</a>
                </Button>
                
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
          {/* <div className="mt-0">
            <Link href="/bill-of-lading">
              <ArrowLeftOutlined className="mr-0" /> {i18n('newBillOfLadingHub.billOfLandingHubs')}
            </Link>{' '}
            <a href="/bill-of-lading">
              <ArrowLeftOutlined className="mr-0" /> {i18n('newBillOfLadingHub.billOfLandingHubs')}
            </a>{' '} 
            <span className="px-3">|</span> {hubState?.folio}
          </div> */}
          <Breadcrumb
            items={[
              {
                title: <Link href="/shipments">{i18n('newBillOfLadingHub.billOfLandingHubs')}</Link>,
              },
              {
                title: hubState?.folio,
              },
            ]}
          />
        </div>
      </Affix>
      <Card className="border-none -ml-1 py-0">
        {/* TODO: Add a link to the customers page and the projects page */}
        <Breadcrumb
          items={breadcrumCustmerItems}
        />
          <Text className="my-2 text-tkyBlue font-extra text-2xl">{`${hubState?.folio ? hubState?.folio : ''}   |  `}</Text>
          <Text
            className="my-2 text-tkyBlue font-extra text-2xl"
            // editable={{
            //   icon: <EditOutlined />,
            //   tooltip: i18n(`buttons.clickToEdit`),
            //   onChange: updateName,
            //   enterIcon: <CheckOutlined />,
            // }}
          >
            {hubState?.name}
          </Text>
        {/* <Space wrap className="w-full mt-2">
          {listOfTags}
          <Button
            type="link"
            className="float-right text-xs  items-center pl-0"
            onClick={() => {
              setIsTagVisible(true)
              setIsEditingTag(false)
              setTagIndex(undefined)
            }}
            size="small"
          >
            <PlusOutlined className="" /> <span className="">{i18n('buttons.addTag')}</span>
          </Button>
        </Space> */}
      </Card>
      <div className="bg-white">
        <Divider className="my-4" />
        <Affix offsetTop={top + 40}>
          <div className="bg-white py-2 pl-4 pr-4">
            {/* <Space wrap className="w-full mt-2" size="middle">
              <Segmented
                options={['Resumen', 'Parte Mexicana', 'Parte Americana', 'Aduana', 'Almacen']}
                // block
                onChange={value => {
                  setIsPart(value) // string
                }}
                size="small"
                className=""
              />
              <Button
                type="link"
                className="float-right text-xs items-center pl-0"
                onClick={() => {
                  setIsTagVisible(true)
                  setIsEditingTag(false)
                  setTagIndex(undefined)
                }}
                size="small"
              >
                <PlusOutlined className="-mt-[12px]" /> <span className="">{i18n('buttons.addStage')}</span>
              </Button>
            </Space> */}
          </div>
        </Affix>
        <div className="bg-white py-6 pl-5 pr-4">
          {/* TODO: Create an api route to extract all the stages in the shipmentId. 
              Extract all relevant data  from each stage and display it here: 
              stage folio and stage name */}
          <Breadcrumb
          items={breadcrumSupplierItems}
        />
          <Text className="text-xl font-semibold">{isPart}</Text>
          <Button className="float-right text-xs" size="small" type="link">
            <SettingOutlined />
          </Button>
        </div>

        {/* <HubNavigationMenu hubState={hubState} hubDispatch={hubDispatch} currentTab={currentTab} setCurrentTab={setCurrentTab} /> */}
        <HubNavigationMenuOperator hubState={hubState} hubDispatch={hubDispatch} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
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
