import { ConsoleSqlOutlined } from '@ant-design/icons'
import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute } from 'services/api/helpers'
import {
  methodFilter,
  checkUserToken,
  dbConnection,
  dbConnectionClose,
  errorHandler,
  loadUser,
} from 'services/api/helpers/middlewares'
import { DbService, SatAddress, User } from 'services/model'

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'invoicesList.errors.invalidUser' })

type Request = NextApiRequest & { dbService: DbService; userId: string; loggedUser: User }

// TODO: Tests for this handler
export const routeHandler = async (req: Request, res: NextApiResponse, next: Function) => {
  const { body, dbService, loggedUser, query } = req
  // const { filters, searchText, skip } = body
  const { id } = query
  // console.log(`postalCode: ${postalCode}, countryCodeO: ${countryCodeO}`)

  // Get the Sat Codification from Database
  let ShipmentResult = await dbService.getUsersById(id as string)
  // const cfdiDrafts = await dbService.getCfdiDraftsByBoLHId(id as string)
  ShipmentResult = {...ShipmentResult}

  res.json(ShipmentResult)
  // res.json({ postalCode, countryCodeO, stateCode, municipalityCode, localityCode, countryCode })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: true }), routeHandler],
  errorHandler,
  dbConnectionClose
)
