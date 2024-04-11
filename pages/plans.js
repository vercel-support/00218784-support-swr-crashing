import { PlansPage } from '../components/pages/webpage/plans-page/plans'
import { redirectIfLogged } from '../services/auth/checkAuth'

export default PlansPage

export async function getServerSideProps(context) {
  redirectIfLogged(context)
  return { props: { redirected: false } }
}