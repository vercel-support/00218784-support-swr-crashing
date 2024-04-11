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
    onWatch,
  }: {
    shipmentId: string
    onWatch: string
  } = query

  let onWatchBoolean = true

  if (onWatch === 'true') {
    onWatchBoolean = true
  } else if (onWatch === 'false') {
    onWatchBoolean = false
  }

  // const onWatchBoolean = onWatch === 'false' ? false : true
  // console.log('api/shipment/update-onWatch', { query, shipmentId, onWatch, onWatchBoolean, negativeOnWatchBoolean: !onWatchBoolean })

  // eslint-disable-next-line no-console
  const response = await dbService.updateShipmentOnWatch(shipmentId, !onWatchBoolean).catch(error => console.log(error))

  // Add a log  to track the request
  await dbService.addEventLog(
    { name: 'shipment.updateOnWatch', category: 'operative' },
    { shipmentId, formerValue: onWatch, endValue: !onWatch },
    loggedUser
  )

  console.log({ response: await response })
  res.json({ ok: true })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: false }), routeHandler],
  errorHandler,
  dbConnectionClose
)
