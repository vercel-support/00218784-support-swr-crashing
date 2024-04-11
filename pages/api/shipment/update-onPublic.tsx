import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, dbConnectionClose, errorHandler, loadUser } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'saveCfdiDraft.errors.invalidUser' })

type Request = NextApiRequest & { dbService: DbService; loggedUser: User }

export const routeHandler = async (req: Request, res: NextApiResponse, next: Function) => {
  const { body, loggedUser, dbService, query }: { body: any; loggedUser: User; dbService: DbService; query: any } = req

  const {
    shipmentId,
    onPublic,
  }: {
    shipmentId: string
    onPublic: string
  } = query

  let onPublicBoolean = true

  if (onPublic === 'true') {
    onPublicBoolean = true
  } else if (onPublic === 'false') {
    onPublicBoolean = false
  }

  // const onPublicBoolean = onPublic === 'false' ? false : true
  // console.log('api/shipment/update-onPublic', { query, shipmentId, onPublic, onPublicBoolean, negativeOnPublicBoolean: !onPublicBoolean })

  // eslint-disable-next-line no-console
  const response = await dbService.updateShipmentOnPublic(shipmentId, !onPublicBoolean).catch(error => console.log(error))
 
  // Add a log  to track the request
  await dbService.addEventLog(
    { name: 'shipment.updateOnPublic', category: 'operative' },
    { shipmentId, formerValue: onPublic, endValue: !onPublic },
    loggedUser
  )
  console.log({ response: response })
  
  res.json({ ok: true })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: false }), routeHandler],
  errorHandler,
  dbConnectionClose
)
