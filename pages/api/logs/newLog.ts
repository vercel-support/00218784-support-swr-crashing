import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, dbConnectionClose, errorHandler, loadUser } from 'services/api/helpers/middlewares'
import { DbService, User, EventLog, EventLogType, UserIdData } from 'services/model'

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'saveCfdiDraft.errors.invalidUser' })

type Request = NextApiRequest & { dbService: DbService; loggedUser: User }

export const routeHandler = async (req: Request, res: NextApiResponse, next: Function) => {
  const { body, dbService }: { body: any; loggedUser: User; dbService: DbService } = req
  const {eventLogType, log, user}: {eventLogType: EventLogType, log: EventLog, user: UserIdData} = body

  console.log('logs/newLog server', {eventLogType, log})

  // eslint-disable-next-line no-console
  const response = await dbService.addEventLog2(eventLogType, log, user).catch(error => console.log(error))
  console.log({ response: await response })
  res.json({ ok: true })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: false }), routeHandler],
  errorHandler,
  dbConnectionClose
)
