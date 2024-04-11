import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RouteTest',
  description: 'Welcome to Taskility',
}

const AppRoutePageTest = () => {
  return (<p>This is an app Route Page Test</p>)
  // return new Error
}

export default AppRoutePageTest