import { ServerClient } from 'postmark'
import { getNewId } from '../helpers/server'
import { log } from '../logs'
import { RequestError } from '../api/helpers'
import { BoLHBenefits } from '../../components/pages/billOfLading/marketingMessages'


import postmark from 'postmark'


export const createEmailService = ({ apiKey, fromEmail }) => ({
  /**
   * Create a function to send emails using the specified email template.
   * @param {string} emailTemplateAlias Postmark email template Id
   * @returns {Function} Return a function to send "emailData"
   */
  sendEmailTemplate(emailTemplateAlias) {
    return emailData => {
      const { to, templateModel = {}, attachments = [], replyTo = '' } = emailData
      // console.log('template Alias Postmark', emailTemplateAlias)

      const email = {
        From: fromEmail,
        To: to,
        ReplyTo: replyTo,
        TemplateAlias: emailTemplateAlias,
        TemplateModel: templateModel,
        Attachments: attachments,
      }

      if (process.env.NODE_ENV === 'production') {
        const client = new ServerClient(apiKey)
        return client.sendEmailWithTemplate(email)
      }

      log('info', '******* DEVELOPMENT EMAIL SENT ********')
      log('info', email)
      // appLogs.message({ message: '******* DEVELOPMENT EMAIL SENT ********' });
      // appLogs.debug({ message: email });
      const fakeResponse = {
        To: emailData.to,
        SubmittedAt: new Date(),
        MessageID: getNewId(),
        ErrorCode: 0,
        Message: 'OK',
      }
      return new Promise(resolve => setTimeout(() => resolve(fakeResponse), 1000))
    }
  },
})

export const createEmailSender = ({ templateAlias }) => {
  const apiKey = process.env.POSTMARK_API_KEY_LEANFLOW
  // console.log('apiKey Postmark', apiKey)
  const fromEmail = process.env.FROM_EMAIL
  const emailService = createEmailService({ apiKey, fromEmail })
  return emailService.sendEmailTemplate(templateAlias)
}

export const createEmailClient = () => {
  const client = new postmark.ServerClient('34072dd1-b9cc-481d-9726-88af944744d0')
  return client
}

export const selectARandomBenefit = () => {
  const randomBenefit = BoLHBenefits[Math.floor(Math.random() * BoLHBenefits.length)]
  return randomBenefit
}


export const sendHubInvitation = ({ emailClient, shipmentHub, loggedUser, adminUser, userToInvite }) => {

  const benefit = selectARandomBenefit()
  const currentTime = new Date()
  const templateModel = {
    emailSubject: `${shipmentHub.folio} | ${shipmentHub.name}`,
    receiverName: userToInvite?.name ? userToInvite.name : '',
    BoLHName: shipmentHub.name,
    BoLHLink: `https://app.taskility.com/shipment-hub/${shipmentHub._id}`,
    BoLHFolio: shipmentHub.folio,
    benefitTitle: benefit?.title,
    benefitDescription: benefit?.description,
    benefitLinkUrl: benefit?.linkUrl,
    benefitLinkText: benefit?.linkText,
    createUserLink: 'https://app.taskility.com/signup',
    adminUserEmail: adminUser?.email,
    adminUserName: `${adminUser?.name} ${adminUser?.lastName}`,
    year: currentTime.getFullYear(),
    headText: 'headText_Value',
    linkText: 'linkText_Value',
    userName: loggedUser.username
  }


  if (!templateModel) return { error: RequestError(400, 'saveNewPlace.errors.noData') }
  // console.log('templateModel in api:', templateModel, 'preferedLanguage', preferedLanguage, 'loggedUser in api', loggedUser, 'emailToSend', emailToSend)


  emailClient.sendEmailWithTemplate({
    From: 'taskility@taskility.com',
    To: userToInvite?.email,
    TemplateAlias: `bill-of-lading-hub-invite-${userToInvite.preferedLanguage}`,
    TemplateModel: templateModel,
  })
  // console.log('templateModel in api:', templateModel, 'preferedLanguage', preferedLanguage, 'loggedUser in api', loggedUser, 'emailToSend', emailToSend)

  return { ok: true }
}
