import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, dbConnectionClose, errorHandler, loadUser } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'
import { UpdateResult } from 'mongodb'

const postmark = require('postmark')

const client = new postmark.ServerClient('34072dd1-b9cc-481d-9726-88af944744d0')

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'saveCfdiDraft.errors.invalidUser' })

export const routeHandler = async (
  req: NextApiRequest & { dbService: DbService; loggedUser: User },
  res: NextApiResponse,
  next: Function
) => {
  const { body, dbService, loggedUser }: { body: any; dbService: DbService; loggedUser: User } = req
  const { id, fields } = body
  if (!id || !fields) return next(new RequestError(400, 'customer.errors.noData'))
  // console.log({apiReached:'/api/customers/save-customer', id, fields})
  const respuesta: UpdateResult | { error: unknown } = await dbService.updateCompaniesField(id, 'Update', fields)

  // console.log(respuesta)
  if ('error' in respuesta) {
    // console.log(respuesta.error)
    res.json({ ok: false, error: respuesta.error })
  }
  if ('acknowledge' in respuesta) {
    if (respuesta.acknowledge === false) {
      res.json({ ok: false })
    }
  }
  // const { _id } = await dbService.saveNewBoLH(BoLH, loggedUser._id, loggedUser.profile?.companyId, loggedUser)
  // console.log('BoLH _id in api:', _id)
  res.json({ ok: true })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: false }), routeHandler],
  errorHandler,
  dbConnectionClose
)
