import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, dbConnectionClose, errorHandler } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'
import { i18n } from 'services/i18n'

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'newCfdi.errors.invalidUser' })

type RequestType = NextApiRequest & { dbService: DbService; loggedUser: User }

export const routeHandler = async (req: RequestType, res: NextApiResponse, next: Function) => {
  const { query, dbService } = req
  const [companyId, customerId] = query.params || ["",""]
  if (!companyId) return next(new RequestError(400, 'newHub.errors.companyIdRequired'))
  if (!customerId) return next(new RequestError(400, 'newHub.errors.customerIdRequired'))
  // console.log({place: 'api/shipment-hub/new-hub/templates', companyId, customerId})
  const templateFields = { _id: 1, name: 1 }
  const listOfTemplates = await dbService.getListOfTemplates(companyId, customerId, templateFields)
  const baseTemplates = [
    {_id: '0001', name: 'No Template - Empty Shipment Hub' },
    {_id: '0002', name: 'Import' },
    {_id: '0003', name: 'Export' },
    {_id: '0004', name: 'National'},
  ]

  const completeListOfTemplates = [...baseTemplates, ...listOfTemplates]
  // const servicesFields = {
  //   referencia: 1,
  //   pendingAmount: 1,
  //   origin: 1,
  //   destination: 1,
  //   quotations: 1,
  //   orderClientReference: 1,
  //   observaciones: 1,
  //   submitted: 1,
  // }
  // const services = await dbService.getBillingPendingServices(issuerId, receiverId, servicesFields)
  res.json({ ok: true, templates: completeListOfTemplates })
  return next()
}

export default composeRoute([methodFilter(), checkUserTokenMiddleware, dbConnection, routeHandler], errorHandler, dbConnectionClose)
