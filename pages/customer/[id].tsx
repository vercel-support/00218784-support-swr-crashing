import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, loadUser, dbConnectionClose, errorHandler } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'
import { getMongoDbConnection } from 'services/db/getMongoDbConnection'
import { appDbService } from 'services/db'
import { verifyToken } from 'services'
import { Customer } from '../../components/pages/customers/customer'
import { redirectIfNotLogged } from '../../services/auth/checkAuth'

export default Customer

// const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'newCfdi.errors.invalidUser' })

// let customerData: any

// const routeHandler = async (
//   req: NextApiRequest & { dbService: DbService; loggedUser: User }, 
//   res: NextApiResponse, 
//   next: Function
//   ) => {
//     console.log('routeHandler reached')
//     const { dbService, loggedUser, query } = req
//     const { profile } = loggedUser
//     if (!profile.companyId) return next(new RequestError(400, 'newCfdi.errors.userWithoutCompany'))
//     const id: string = query?.id?.toString() || ""
  
//     const companyData = await dbService.getCompanyById(id)
//     const businessRaltionshipData = await dbService.getServiceRelationship(profile.companyId,id)
//     const data = {companyData: companyData, businessRelationshipData: businessRaltionshipData}
//     // console.log('data in get-all-customers-and-users.ts', data)
//     // console.log('users', usersData)
//     // console.log('clients', clientsData)
//     customerData = await data
//     console.log({customerData, where:'inRouteHandler'})
//     console.log('routeHandler finished')
//     res.json({ ok: true, ...data })
//     return next()
// }
export async function getServerSideProps(context: { query: { id: any }, req: {cookies: any }}) {

  // get Customer ID
  const customerId = context.query.id

  // get User ID
    // read token from 
  const { token } = context.req.cookies
  const { decoded: decodedToken, error } = verifyToken(token)
    // const { id, email, iat, exp, aud, iss } = decodedToken
  
    // If there is an error with the token, the functions stops and redirect to the login page
  if (error) return {redirect: { permanent: false, destination: "/login"}, props: {errorMessage: 'newCfdi.errors.invalidUser' }}
  const userId = decodedToken.id
  const userEmail = decodedToken.email

  // Connect to database
  const { client, db, close } = await getMongoDbConnection()
  const dbClient = client
  const dbClose = close
  const dbService = appDbService(db)

  // get loggedUser Data
  const loggedUser = await dbService.getUserById(userId)

  // get customer Data
  if ( loggedUser === null) return {redirect: { permanent: false, destination: "/login"}, props: {errorMessage: 'newCfdi.errors.invalidUser' }}
  const { profile } = loggedUser
  if (!profile.companyId) return  {props: {errorMessage: 'newCfdi.errors.userWithoutCompany' } }// next(new RequestError(400, 'newCfdi.errors.userWithoutCompany'))

  const companyData = await dbService.getCompanyById(customerId)
  const businessRaltionshipData = await dbService.getServiceRelationship(profile.companyId,customerId)
  
  // close DB connection
  await dbClose()

  // console.log({loggedUser, companyData, businessRaltionshipData} )
  return {props: {loggedUser: JSON.parse(JSON.stringify(loggedUser)), companyData: JSON.parse(JSON.stringify(companyData)), businessRaltionshipData: JSON.parse(JSON.stringify(businessRaltionshipData))}}
  


  // await composeRoute(
  //   [ checkUserTokenMiddleware, dbConnection, loadUser(), routeHandler],
  //   errorHandler,
  //   dbConnectionClose
  // )

  // console.log({ context, id })
  // // if (data) {
  // //   return { props: { redirected: false, data } }
  // // }
  // return { props: { redirected: false } }
}
