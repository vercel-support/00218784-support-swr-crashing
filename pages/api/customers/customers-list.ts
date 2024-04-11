import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, loadUser, dbConnectionClose, errorHandler } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'newCfdi.errors.invalidUser' })

export const routeHandler = async (
  req: NextApiRequest & { dbService: DbService; loggedUser: User },
  res: NextApiResponse,
  next: Function
) => {
  const { dbService, loggedUser, query } = req
  const { profile } = loggedUser
  const { customerStatus = '', customersList = '', groups, customersUsers } = query
  // console.log({query, customerStatus, customersList})
  if (!profile.companyId) return next(new RequestError(400, 'newCfdi.errors.userWithoutCompany'))
  // const customersData = await dbService.getAllUserClients(loggedUser, { _id: 1, name: 1, rfc: 1, foreignFiscalId: 1, active: 1 })
  if (typeof customersList!== 'string') return next(new RequestError(400, 'newCfdi.errors.customersListNotString'))
  if (typeof customerStatus!== 'string') return next(new RequestError(400, 'newCfdi.errors.customersStatusNotString'))

  const customersData = await dbService.getCustomersList({user: loggedUser, customers: customersList, status: customerStatus, fields: { _id: 1, name: 1, rfc: 1, foreignFiscalId: 1, active: 1 }})
  const data = {customersData: customersData}
  // console.log('data in customers-list.ts', data)
  // console.log('users', usersData)
  // console.log('clients', clientsData)
  res.json({ ok: true, data })
  return next()
}

export default composeRoute(
  [methodFilter(), checkUserTokenMiddleware, dbConnection, loadUser(), routeHandler],
  errorHandler,
  dbConnectionClose
)