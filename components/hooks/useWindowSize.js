import { useState, useEffect } from 'react'

// 👇
// a Util function that will conver the absolute width into breakpoints
function getBreakPoint(windowWidth) {
  if (windowWidth) {
    if (windowWidth < 640) {
      return 'sm'
    }
    if (windowWidth < 768) {
      return 'md'
    }
    if (windowWidth < 1024) {
      return 'lg'
    }
    if (windowWidth < 1280) {
      return 'xl'
    }
    if (windowWidth < 1536) {
      return '2xl'
    }
    return 'xlg'
  }
  return undefined
}
// ☝️

function useWindowSize() {
  const isWindowClient = typeof window === 'object'

  const [windowSize, setWindowSize] = useState(
    isWindowClient
      ? getBreakPoint(window.innerWidth) // 👈
      : undefined
  )

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // a handler which will be called on change of the screen resize
    function setSize() {
      setWindowSize(getBreakPoint(window.innerWidth)) // 👈
    }

    if (isWindowClient) {
      // register the window resize listener
      window.addEventListener('resize', setSize)

      // unregister the listerner on destroy of the hook
      return () => window.removeEventListener('resize', setSize)
    }
  }, [isWindowClient, setWindowSize])

  return windowSize
}

export default useWindowSize
