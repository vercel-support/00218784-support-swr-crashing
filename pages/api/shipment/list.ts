import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, dbConnectionClose, errorHandler, loadUser } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
}

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'invoicesList.errors.invalidUser' })

type Request = NextApiRequest & { dbService: DbService; userId: string; loggedUser: User }

// TODO: Tests for this handler
export const routeHandler = async (req: Request, res: NextApiResponse, next: Function) => {
  const { body, dbService, loggedUser, query } = req
  const { filters, searchText, skip } = body
  const {
    from = '',
    to = '',
    isInternal = '',
    shipmentNumber = '',
    shipmentName = '',
    shipmentLocation = '',
    shipmentCurrency = '',
    shipmentTags = '',
    shipmentCompanies = '',
    shipmentTeams = '',
    shipmentUsers = '',
    shipmentProjects = '',
    shipmentClients = '',
    shipmentProviders = '',
    shipmentOperationStatus = '',
    shipmentCollectStatus = '',
    shipmentSupplierStatus = '',
    shipmentPendingTasks = '',
    shipmentAlarms = '',
    shipmentOnWatch = '',
    shipmentLoad = '',
    shipmentTrip = '',
    shipmentMode = '',
    shipmentService = '',
    shipmentRecurrence = '',
    shipmentUrgency = '',
  } = query

  const { shipments, count } = await dbService.getShipmentsList({
    user: loggedUser,
    filters,
    searchText,
    skip,
    from: from as string,
    to: to as string,
    isInternal:  isInternal as string,
    shipmentNumber: shipmentNumber as string,
    shipmentName: shipmentName as string,
    shipmentLocation: shipmentLocation as string,
    shipmentCurrency: shipmentCurrency as string,
    shipmentTags: shipmentTags as string,
    shipmentCompanies: shipmentCompanies as string,
    shipmentTeams: shipmentTeams as string,
    shipmentUsers: shipmentUsers as string,
    shipmentProjects: shipmentProjects as string,
    shipmentClients: shipmentClients as string,
    shipmentProviders: shipmentProviders as string,
    shipmentOperationStatus: shipmentOperationStatus as string,
    shipmentCollectStatus: shipmentCollectStatus as string,
    shipmentSupplierStatus: shipmentSupplierStatus as string,
    shipmentPendingTasks: shipmentPendingTasks as string,
    shipmentAlarms: shipmentAlarms as string,
    shipmentOnWatch: shipmentOnWatch as string,
    shipmentLoad: shipmentLoad as string,
    shipmentTrip: shipmentTrip as string,
    shipmentMode: shipmentMode as string,
    shipmentService: shipmentService as string,
    shipmentRecurrence: shipmentRecurrence as string,
    shipmentUrgency: shipmentUrgency as string,
  })

  res.json({ shipments, count })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: true }), routeHandler],
  errorHandler,
  dbConnectionClose
)
