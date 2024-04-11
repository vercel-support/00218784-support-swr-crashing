import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, loadUser, dbConnectionClose, errorHandler } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
};

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'newCfdi.errors.invalidUser' })

export const routeHandler = async (
  req: NextApiRequest & { dbService: DbService; loggedUser: User },
  res: NextApiResponse,
  next: Function
) => {
  const { dbService, loggedUser } = req
  const { profile } = loggedUser
  if (!profile.companyId) return next(new RequestError(400, 'newCfdi.errors.userWithoutCompany'))
  const companiesData = await dbService.getAllUserCompanies(loggedUser, { _id: 1, name: 1 })
  const teamsData = await dbService.getAllUserTeams(loggedUser,{ _id: 1, name: 1 })
  const usersData = await dbService.getUsersList(loggedUser)
  const projectsData = await dbService.getAllUserProjects(loggedUser,{ _id: 1, name: 1 })
  const clientsData = await dbService.getAllUserClients(loggedUser, { _id: 1, name: 1 })
  const suppliersData = await dbService.getAllUserSuppliers(loggedUser, { _id: 1, name: 1 })
  
  const data = {companiesData, teamsData, usersData, projectsData, clientsData, suppliersData}
  // console.log('data in get-all-customers-and-users.ts', data)
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