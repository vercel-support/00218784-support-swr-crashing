import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import {
  methodFilter,
  checkUserToken,
  dbConnection,
  dbConnectionClose,
  errorHandler,
  loadUser,
} from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'saveCfdiDraft.errors.invalidUser' })

type Request = NextApiRequest & { dbService: DbService; loggedUser: User }

export const routeHandler = async (
  req: Request, 
  res: NextApiResponse, 
  next: Function
  ) => {
  const { body:stageData, query, dbService }= req
  const {name, folio} = query

    
  // eslint-disable-next-line no-console
  const response = await dbService.updateStage(name, folio, stageData).catch(error => console.log(error))
  console.log('response', response);
  
  res.json({ok:true})
  // res.json({ name: name, folio: folio })
  return next()
}

export default composeRoute(
  [
    methodFilter('post'),
    checkUserTokenMiddleware,
    dbConnection,
    loadUser({ isRequired: false }),
    routeHandler
  ],
  errorHandler,
  dbConnectionClose
)
