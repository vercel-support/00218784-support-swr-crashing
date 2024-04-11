import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import ReactMapGL, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { Flex, Radio, Affix } from 'antd'
import Image from 'next/image'
import { EnvironmentTwoTone, PlusOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import { Card, Typography, Badge, Breadcrumb, Space, Button, Tag } from 'antd/lib'
import { i18n } from '../../../services/i18n'
import Link from 'next/link'

const { Text } = Typography

const navControlStyle = {
  right: 16,
  top: 16,
}

const geolocateControlStyle = {
  right: 16,
  top: 119,
}

// const scaleControlStyle = {
//   left: 20,
//   bottom: 100,
// }

export function Mapbox({
  width,
  height,
  originLatitude,
  originLongitude,
  initialZoom,
  styleCtrl = false,
  centerMarker = false,
  navigation = false,
  geolocation = false,
}) {
  const satellite = 'mapbox://styles/german-castro-jurado/ckn9c5g5202aw17nqcnwwq37y'
  const streetDay = 'mapbox://styles/german-castro-jurado/ckn9bcta901l017kf61ki88mm'
  const streetNight = 'mapbox://styles/german-castro-jurado/ckn9c9w3t02il17o7mimppbyj'
  const [mapStyle, setMapStyle] = useState(streetDay)
  const [selected, setSelected] = useState('d')
  const [viewport, setViewport] = useState({
    latitude: originLatitude,
    longitude: originLongitude,
    zoom: initialZoom,
  })
  const mapStyleChange = e => {
    switch (e.target.value) {
      case 'd':
        setMapStyle(streetDay)
        setSelected('d')
        break
      case 'n':
        setMapStyle(streetNight)
        setSelected('n')
        break
      case 's':
        setMapStyle(satellite)
        setSelected('s')
        break
      default:
        break
    }
  }

  // const attributionStyle = {
  //   right: 0,
  //   top: 0,
  // }

  const setNewViewPort = nextViewport => {
    setViewport(nextViewport)
  }
  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: originLatitude,
      longitude: originLongitude,
    })
  }, [originLatitude, originLongitude])

  return (
    <ReactMapGL
      {...viewport}
      width={width}
      height={height}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={mapStyle}
      onViewportChange={setNewViewPort}
    >
      {' '}
      {styleCtrl ? (
        <Radio.Group defaultValue="d" size="small" style={{ marginTop: 16, marginLeft: 16 }} onChange={mapStyleChange}>
          <Radio.Button value="d">
            <Image src={selected === 'd' ? '/sun-blue.svg' : '/sun-grey.svg'} width={11} height={11} />
          </Radio.Button>
          <Radio.Button value="n">
            <Image src={selected === 'n' ? '/moon-blue.svg' : '/moon-grey.svg'} width={11} height={11} />
          </Radio.Button>
          <Radio.Button value="s">
            <Image src={selected === 's' ? '/satellite-blue.svg' : '/satellite-grey.svg'} width={11} height={11} />
          </Radio.Button>
        </Radio.Group>
      ) : null}
      {centerMarker ? (
        <Marker key="1" latitude={originLatitude} longitude={originLongitude}>
          <Image src="/placeholder.svg" width={24} height={24} />
        </Marker>
      ) : null}
      {navigation ? <NavigationControl style={navControlStyle} showCompass={false} /> : null}
      {geolocation ? (
        <GeolocateControl style={geolocateControlStyle} positionOptions={{ enableHighAccuracy: true }} trackUserLocation />
      ) : null}
    </ReactMapGL>
  )
}

export function MapboxMultiple({
  width,
  height,
  originLatitude,
  originLongitude,
  initialZoom,
  styleCtrl = false,
  centerMarker = false,
  navigation = false,
  geolocation = false,
}) {
  const satellite = 'mapbox://styles/german-castro-jurado/ckn9c5g5202aw17nqcnwwq37y'
  const streetDay = 'mapbox://styles/german-castro-jurado/ckn9bcta901l017kf61ki88mm'
  const streetNight = 'mapbox://styles/german-castro-jurado/ckn9c9w3t02il17o7mimppbyj'
  const [mapStyle, setMapStyle] = useState(streetDay)
  const [selected, setSelected] = useState('d')
  const [viewport, setViewport] = useState({
    latitude: originLatitude,
    longitude: originLongitude,
    zoom: initialZoom,
  })
  const mapStyleChange = e => {
    switch (e.target.value) {
      case 'd':
        setMapStyle(streetDay)
        setSelected('d')
        break
      case 'n':
        setMapStyle(streetNight)
        setSelected('n')
        break
      case 's':
        setMapStyle(satellite)
        setSelected('s')
        break
      default:
        break
    }
  }

  // const attributionStyle = {
  //   right: 0,
  //   top: 0,
  // }

  const setNewViewPort = nextViewport => {
    setViewport(nextViewport)
  }
  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: originLatitude,
      longitude: originLongitude,
    })
  }, [originLatitude, originLongitude])

  return (
    <>
      <ReactMapGL
        {...viewport}
        width={width}
        height={height}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle={mapStyle}
        onViewportChange={setNewViewPort}
        className="h-full"
      >
        {' '}
        {styleCtrl ? (
          <Radio.Group defaultValue="d" size="small" style={{ marginTop: 16, marginLeft: 16 }} onChange={mapStyleChange}>
            <Radio.Button value="d">
              <Image src={selected === 'd' ? '/sun-blue.svg' : '/sun-grey.svg'} width={11} height={11} />
            </Radio.Button>
            <Radio.Button value="n">
              <Image src={selected === 'n' ? '/moon-blue.svg' : '/moon-grey.svg'} width={11} height={11} />
            </Radio.Button>
            <Radio.Button value="s">
              <Image src={selected === 's' ? '/satellite-blue.svg' : '/satellite-grey.svg'} width={11} height={11} />
            </Radio.Button>
          </Radio.Group>
        ) : null}
        {centerMarker ? (
          <Marker key="1" latitude={originLatitude} longitude={originLongitude}>
            <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
          </Marker>
        ) : null}
        <Marker key="2" latitude={20.5244503} longitude={-100.7439608}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="3" latitude={34.693419} longitude={-82.2398337}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="4" latitude={-82.2398337} longitude={-99.4881163}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="5" latitude={20.6168249} longitude={-100.4304173}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="6" latitude={27.700764} longitude={-99.449489}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="7" latitude={32.4430156} longitude={-97.3452535}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="8" latitude={22.5244503} longitude={-100.639608}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="9" latitude={34.093419} longitude={-82.598337}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="10" latitude={-82.2398337} longitude={-99.481163}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="11" latitude={24.6168249} longitude={-101.9804173}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="12" latitude={27.500764} longitude={-97.659489}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        <Marker key="13" latitude={32.8260156} longitude={-97.3432535}>
          <Image src="/placeholder.svg" width={24} height={24} alt="Shipment Marker" />
        </Marker>
        {navigation ? <NavigationControl style={navControlStyle} showCompass={false} /> : null}
        {geolocation ? (
          <GeolocateControl style={geolocateControlStyle} positionOptions={{ enableHighAccuracy: true }} trackUserLocation />
        ) : null}
      </ReactMapGL>
      <Affix offsetBottom={24} className="">
        <Card className="">
          <Breadcrumb
            items={[
              {
                title: 'KAWASAKI',
              },
              {
                title: 'Project: Autoparts',
              },
            ]}
          />
          <Text className="my-2 text-tkyBlue font-extra text-2xl">{`W1S-FWD-23887  |  `}</Text>
          <Text
            className="my-2 text-tkyBlue font-extra text-2xl"
            editable={{
              icon: <EditOutlined />,
              tooltip: i18n(`buttons.clickToEdit`),
              // onChange: updateName,
              enterIcon: <CheckOutlined />,
            }}
          >
            Embarque de Autopartes Kawasaki
          </Text>
          <Space wrap className="w-full mt-2">
            <Tag color="blue" closable borderless key={1}>
              {`Purchase Order | 338293`}
            </Tag>
            <Button
              type="link"
              className="float-right text-xs  items-center pl-0"
              // onClick={() => {
              //   setIsTagVisible(true)
              //   setIsEditingTag(false)
              //   setTagIndex(undefined)
              // }}
              size="small"
            >
              <PlusOutlined className="" /> <span className="">{i18n('buttons.addTag')}</span>
            </Button>
          </Space>
        </Card>
      </Affix>
    </>
  )
}
