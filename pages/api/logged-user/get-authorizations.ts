import { closeSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { composeRoute, RequestError } from 'services/api/helpers'
import { methodFilter, checkUserToken, dbConnection, dbConnectionClose, errorHandler, loadUser } from 'services/api/helpers/middlewares'
import { DbService, User } from 'services/model'
import { getInitials } from 'services/helpers/text'

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
};

const checkUserTokenMiddleware = checkUserToken({ errorMessage: 'saveCfdiDraft.errors.invalidUser' })

export const routeHandler = async (
  req: NextApiRequest & { dbService: DbService; loggedUser: User },
  res: NextApiResponse,
  next: Function
) => {
  const { loggedUser }: { loggedUser: User } = req
  const { dbService } = req
  if (!loggedUser) return next(new RequestError(400, 'saveNewPlace.errors.noData'))
  // console.log('loggedUser in api', loggedUser)
  // const { _id } = await dbService.saveNewBoLH(BoLH, loggedUser._id, loggedUser.profile?.companyId, loggedUser)
  // console.log('BoLH _id in api:', _id)
  // console.log("loggedUser", loggedUser)
  const loggedUserLicenses = loggedUser.licenses || [{ licenseId: '000777', licenseName: 'freeUser', active: true }]
  const loggedUserProfile = loggedUser.profile ? loggedUser.profile : null

  
  
  const loggedUserIdData = {
    userId: loggedUser._id,
    name: loggedUser.username,
    initials: loggedUser.username ? getInitials({string1: loggedUser.username, string2:'',string3:''}) : getInitials({string1: loggedUser.emails[0].address, string2:'',string3:''}),
    profilePhoto: loggedUser.profile.photo || '',
    email: loggedUser.emails[0].address,
    mobile: loggedUser.mobilePhone,
    companyId: loggedUser.profile.companyId,
    companyName: loggedUser.profile.companyName,
  }

  // console.log('get-authorizations', {loggedUserIdData})

  const company = loggedUser?.profile?.companyId ? await dbService.getCompanyProfile(loggedUser.profile.companyId) : null
  // console.log("company", company)
  const companyProfile = company?.profile ? company.profile : null
  const companyLogo = company?.logoUrl ? company?.logoUrl : null

  // console.log('get-authorizations', {loggedUser})

  // console.log('get-authorizations', loggedUser.licenses)
  res.json({ ok: true, loggedUserLicenses: loggedUserLicenses, loggedUserEmail: loggedUser.emails[0].address, loggedUserProfile: loggedUserProfile, companyProfile: companyProfile, loggedUserName: loggedUser.username, loggedUserIdData, companyLogo })
  return next()
}

export default composeRoute(
  [methodFilter('post'), checkUserTokenMiddleware, dbConnection, loadUser({ isRequired: false }), routeHandler],
  errorHandler,
  dbConnectionClose
)
