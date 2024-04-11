// Format antd menu Items for antd 5.0

export const menuItemFormatter = ({title, label, key, icon, disabled, danger}) => {
  return {
    title,
    key,
    icon,
    label,
    disabled,
    danger,
  }
}

export const subMenuFormatter = ({onTitleClick, theme, popupOffset, popupClassName, label, key, icon, disabled, children}) => {
  return {
    onTitleClick, 
    theme, 
    popupOffset, 
    popupClassName, 
    label, 
    key, 
    icon, 
    disabled, 
    children
  }
}

export const menuGroupFormatter = ({label, children}) => {
  return {
    type: 'group',
    label, 
    children
  }
}

export const menuDivider = (dashed = false) => {
  return {
    type: 'divider', 
    dashed,
  }
}

