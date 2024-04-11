import { LoginPage } from '../components/pages/login'
import { redirectIfLogged } from '../services/auth/checkAuth'

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
}

export default LoginPage

export async function getServerSideProps(context) {
  redirectIfLogged(context) // TODO: Add user setting for initial page.
  return { props: { redirected: false } }
}
