import React from 'react'

export const AppLogoOld = ({ className = '' }) => <div className={`app-logo ${className}`} />

export const AppLogoWithText = ({ className = '' }) => <div className={`app-logo-with-text ${className}`} />

export const AppLogo = ({ imagotype = true, imagotypeColor = 'color', logo = false, logoColor = 'white' }) => {
  if (imagotype && logo) {
    switch (logoColor) {
      case 'white':
        return <img src="/Taskility_logo_white_text.svg" alt="Logo Taskility" className="h-16 float-left py-2" />
      case 'black':
        return <img src="/Taskility_logo_black_text.svg" alt="Logo Taskility" className="h-16 float-left py-2"/>
      case 'blue':
        return <img src="/Taskility_logo_blue_text.svg" alt="Logo Taskility" className="h-16 float-left py-2" />
      case 'grey':
        return <img src="/Taskility_logo_grey_text.svg" alt="Logo Taskility" className="h-16 float-left py-2" />
      default:
        return <img src="/Taskility_logo_white_text.svg" alt="Logo Taskility" className="h-16 float-left py-2" />
    }
  }

  if (!imagotype && logo) {
    switch (logoColor) {
      case 'white':
        return <img src="/Taskility_logo_blanco.svg" alt="Logo Taskility" />
      case 'black':
        return <img src="/Taskility_logo_negro.svg" alt="Logo Taskility" />
      case 'blue':
        return <img src="/Taskility_logo_azul.svg" alt="Logo Taskility" />
      case 'grey':
        return <img src="/Taskility_logo_gris.svg" alt="Logo Taskility" />
      default:
        return <img src="/Taskility_logo_blanco.svg" alt="Logo Taskility" />
    }
  }

  if (imagotype && !logo) {
    return <img src="/taskility-logo-no-text.svg" alt="Logo Taskility" className="h-16 float-left py-2" />
  }

  return <img src="/Taskility_logo_white_text.svg" alt="Logo Taskility" />
}
