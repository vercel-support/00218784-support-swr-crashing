
import React, { useEffect, useState } from 'react'
import { Tabs, message } from 'antd';
import useSWR from 'swr'
import { post } from '../../../../services/fetch/index.js'
import { i18n } from '../../../../services/i18n';

export const TabStageMenu = ({ hubState, isPart, setIsPart, setIsStageVisible, setIsEditingStage, setStageIndex, items, setItems, stages }) => {
  const [activeKey, setActiveKey] = useState(items[0].key);
  // const { data } = useSWR(`/api/shipment/get-shipmentStage-data?id=${hubState?._id}`, post, {
  //   dedupingInterval: 3000,
  // });

  
    
  // const stages = data && data[0] ? data[0].stages || [] : [];

  // const initialItems = [
  //     {
  //       label: i18n('shipmentSections.summary'),
  //       key: 'summary',
  //       closable: false,
  //     }, 
  //     ...stages?.map(stage => ({
  //       label: stage?.name,
  //       key: `${stage?.folio} | ${stage?.name}`,
  //       closable: false,
  //     }))   
  //   ];

  //   const [items, setItems] = useState(initialItems);

  // const stages = data && data[0] ? data[0].stages || [] : [];
      
  // const newItems = stages?.map(stage => ({
  //   label: stage?.name,
  //   key: stage?.name,
  //   closable: false,
  // }));

  // useEffect(() => {
      
  //     setItems(prevItems => [...prevItems, ...newItems]);
    
  // }, [data]);

  const onChange = (key) => {
    setIsPart(key);
  };

  const remove = async (targetKey) => {

    for (const stage of stages) {
      if (stage.name === targetKey) {
        const id = stage._id;
    
        try {
          const response = await post(`/api/shipment/delete-stage?id=${id}`);
          const { ok } = response;
          console.log('res', response);
    
          if (ok) {
            message.success(i18n('newShipment.newStage.deletedToStageList'));
          }
        } catch (error) {
          // Manejar errores aquí
          console.error('Error al eliminar el escenario:', error);
        }
      }
    }

    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setIsPart(newActiveKey)
  };

  const onEdit = async (targetKey, action) => {
    if (action === 'add') {

      setIsStageVisible(true);
      setIsEditingStage(false);
      setStageIndex(undefined);

    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      onChange={onChange}
      type="editable-card"
      size="middle"
      onEdit={onEdit}
      items={items}
      className='w-full'
      activeKey={isPart}
    />
  );
};



