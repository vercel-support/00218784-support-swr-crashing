import React from 'react'
import { Button, Dropdown } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { i18n } from '../../../services/i18n'

export const StageActionsMenu = ({setIsClosable, isClosable, setIsEditingStage, setIsStageVisible}) => {

  const onClickActionMenuHandler = e => {
    console.log(e)
    switch(e.key) {
      case 'edit': {
        setIsEditingStage(true)
        setIsStageVisible(true)
        console.log({case: 'edit'})
        break
      }
      case 'delete': {
        setIsClosable(true)
        console.log('aqui');
        break
      }
      default: 
        break
    }
  }

  const onClick = () => {
    setIsClosable(false)
  }

  const shipmentHubActionMenuItems = [
    {
      key: 'edit stage',
      label: i18n('shipment.menu.stage'),
      type: 'group',
      children: [
        {
          key: 'edit',
          label: i18n('buttons.edit'),
        },
        {
          key: 'delete',
          label: i18n('buttons.delete'),
        },
      ],
    },
  ]

  return (
    <>

    {(isClosable)
      ?<>
       
          <Button type="button" className="float-right pt-[0px] pb-[7px] items-center text-tkyBlue" onClick={onClick}>
            Terminar
          </Button>

      
      </>
      :<>
          <Dropdown menu={{ items: shipmentHubActionMenuItems, onClick: onClickActionMenuHandler }}>
          <Button type="link" className="float-right pt-[0px] pb-[7px] items-center">
            <MoreOutlined className="-m-4"/>
          </Button>
        </Dropdown>   
      </>    
    }
    
    </>
    
    
  )
}
