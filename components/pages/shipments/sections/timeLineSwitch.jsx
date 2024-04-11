import { Timeline, Switch } from 'antd';
import React, { useState } from 'react';
import useSWR from 'swr';
import { post } from '../../../../services/fetch';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { i18n } from '../../../../services/i18n';

const TimelineComponent = ({ milestones, hubState, detailedView}) => {

  const { data } = useSWR(`/api/shipment/get-shipmentStage-data?id=${hubState?._id}`, post, {
    dedupingInterval: 3000,
  });
  
  const  stages = data && data[0] ? data[0].stages || [] : [];

//   console.log('stages', stages);
  
  const arraymilestones = ["requested", "booking", "pickup", "inTransit", "delivery", "customs"];
  
   milestones?.event?.sort((a, b) => {
    return arraymilestones?.indexOf(a.name) - arraymilestones?.indexOf(b.name);
  });

  const statusColor = {
    requested: '#0085FF',
    acceptedByCustomer: 'green',
    rejectedByCustomer: '#F50538',
    canceledByCustomer: '#F50538',
    booking: '#0085FF',
    schedulingVehicle: '#0085FF',
    confirmedVehicle: 'green',
    noVehicleAvailable: '#f5c723',
    pickup: '#0085FF',
    inRouteToPickup: '#0085FF',
    arrivingToPickup: '#0085FF',
    startingToLoad: '#0085FF',
    finishingLoading: 'green',
    pickupProblems: '#f5c723',
    inTransit: '#0085FF',
    waiting: '#f5c723',
    waitingDocuments: '#f5c723',
    waitingAppointment: '#f5c723',
    driverOnABreak: '#f5c723',
    accident: '#F50538',
    delay: '#F50538',
    incident: '#F50538',
    unknownETA: '#F50538',
    arrivingToDelivery: 'green',
    startingToUnload: '#0085FF',
    finishingUnloading: '#0085FF',
    delivered: 'green',
    deliveryProblems: '#f5c723',
    completed:'green', 
  };
  
  const statusIcon = {
    requested: null,
    acceptedByCustomer: <CheckCircleOutlined/>,
    rejectedByCustomer: <ExclamationCircleOutlined />,
    canceledByCustomer: <ExclamationCircleOutlined />,
    booking: null,
    schedulingVehicle: null,
    confirmedVehicle: <CheckCircleOutlined/>,
    noVehicleAvailable: <ExclamationCircleOutlined />,
    pickup: null,
    inRouteToPickup: null,
    arrivingToPickup: null,
    startingToLoad: null,
    finishingLoading: <CheckCircleOutlined/>,
    pickupProblems: <ExclamationCircleOutlined />,
    inTransit: null,
    waiting: null,
    waitingDocuments: null,
    waitingAppointment: null,
    driverOnABreak: null,
    accident: <ExclamationCircleOutlined />,
    delay: <ExclamationCircleOutlined />,
    incident: <ExclamationCircleOutlined />,
    unknownETA: <ExclamationCircleOutlined />,
    arrivingToDelivery: <CheckCircleOutlined/>,
    delivery: null,
    startingToUnload: null,
    finishingUnloading: null,
    delivered: <CheckCircleOutlined />,
    deliveryProblems: <ExclamationCircleOutlined />,
    completed:<CheckCircleOutlined/>, 
  };

  const getMilestoneData = (stage) => {
    const milestone = milestones?.event?.find(m => m.stageId === stage._id);
    const detailedData = milestone && stage?.statusStage !== 'completed'
      ? { name: milestone?.name, status: milestone?.status, /* Other detailed information */ } : null;
    return { key: stage._id, label: `${stage.name}`, status: `${stage.statusStage}`, detailedData };
  };

  const getStageMilestones = () => {
    return stages?.map(stage => getMilestoneData(stage));
  };

//   const getDetailedMilestones = (stage) => {
//     const milestonesToShow = stage?.statusStage === 'inTransit'
//       ? milestones?.event?.filter(m => m.stageId === stage._id)
//       : [];
//     console.log('milestonesToShow',milestonesToShow);
//     return milestonesToShow.map(milestone => (
//       <Timeline.Item key={milestone._id}>
//         <p style={{ fontWeight: 'bold', fontSize: '.8rem' }}>{milestone.name}</p>
//         <p>{milestone.status}</p>
//         <p  style={{fontSize: '.55rem' }}>{milestone.plannedDate && new Date(milestone.plannedDate).toLocaleDateString()}</p>
//         <p  style={{fontSize: '.55rem' }}>{milestone.completedDate  && new Date(milestone.completedDate).toLocaleDateString()}</p>
//       </Timeline.Item>
//     ));
//   };

  const getDetailedMilestones = (stage) => {
    
    const milestonesToShow = stage?.statusStage === 'inTransit'
      ? milestones?.event?.filter(m => m.stageId === stage._id)
      : [];
    // console.log('milestonesToShow',milestonesToShow);
    
    return milestonesToShow.map(milestone => {
      const color = milestone.status in statusColor ? statusColor[milestone.status] : 'gray';
      const dot = milestone.status in statusIcon ? statusIcon[milestone.status] : null;
      return(
      <Timeline.Item key={milestone._id} color={color} dot={dot}>
        <>
          <p style={{ fontWeight: 'bold', fontSize: '.8rem' }}>{i18n(`shipmentStatusMenu.${milestone.name}`)}</p>
          <p>{i18n(`shipmentStatusMenu.${milestone.status}`)}</p>
          <p  style={{fontSize: '.55rem' }}>{milestone.plannedDate && new Date(milestone.plannedDate).toLocaleDateString()}</p>
          <p  style={{fontSize: '.55rem' }}>{milestone.completedDate  && new Date(milestone.completedDate).toLocaleDateString()}</p>
        </>
      </Timeline.Item>
      );
    });
  };

  return (
    <div className='mt-2'>
      {/* <Switch checkedChildren="Detailed View" unCheckedChildren=" Resumen View" onChange={setDetailedView} /> */}
      <Timeline mode="left"className='mt-4'>
        {getStageMilestones().map(({ key, label, status, detailedData }) => {
          const color = status in statusColor ? statusColor[status] : 'gray';
          const dot = status in statusIcon ? statusIcon[status] : null;
          return (           
          <Timeline.Item key={key} color={color} dot={dot}>           
            {detailedData ? (
              detailedView ? (
                <>
                  <p style={{ fontWeight: 'bold', fontSize: '.9rem' }}>{label}</p>
                  <p>{i18n(`shipmentStatusMenu.${status}`)}</p>
                  {getDetailedMilestones(stages.find(s => s._id === key)) }
                </>
              ) : (
                 <>
                  <p style={{ fontWeight: 'bold', fontSize: '.9rem' }}>{label}</p>
                  <p>{i18n(`shipmentStatusMenu.${status}`)}</p>
                </> 
              )
                
            ) : (
                <>
                    <p style={{ fontWeight: 'bold', fontSize: '.9rem' }}>{label}</p>
                    <p>{i18n(`shipmentStatusMenu.${status}`)}</p>
              </>
            )}
          </Timeline.Item>
        )})}
      </Timeline>
    </div>
  );
};

export default TimelineComponent;
