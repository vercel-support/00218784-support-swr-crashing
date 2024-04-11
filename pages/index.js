
import { LoginPage } from '../components/pages/login'
import { LandingPage } from "../components/pages/webpage/landing-page"
import { redirectIfLogged } from '../services/auth/checkAuth'


// Render login page on index page
// export default LoginPage
export default LandingPage

export async function getServerSideProps(context) {
  redirectIfLogged(context)
  return { props: { redirected: false } }
}
