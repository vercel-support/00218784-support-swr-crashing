// pages/api/whatsapp-webhook.ts

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Send a response back to WhatsApp to acknowledge receipt of the webhook
    // and include the verify token in the response

    // eslint-disable-next-line camelcase
    const verify_token = 'Taskility2023' // process.env.VERIFY_TOKEN;
    // Parse params from the webhook verification request
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      // eslint-disable-next-line camelcase
      if (mode === 'subscribe' && token === verify_token) {
        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED')
        // res.status(200).json({ verifyToken: 'Taskility2023' });
        res.status(200).send(challenge)
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        // res.sendStatus(403);
        res.status(403).json({ error: 'Method not allowed' })
      }
    }
  } else if (req.method === 'POST') {
    const {body} = req // Get the incoming payload from the request body
    console.log('WhatsApp Webhook', {body, entry: body.entry})
    
    // Process the payload and handle the desired actions
    // You can access different fields of the payload, such as message text, sender, recipient, etc., depending on your requirements
    // Example actions you can perform here:
    // - Send a reply message
    // - Store the incoming message in a database
    // - Perform custom business logic based on the content of the message

    // Send a response back to WhatsApp to acknowledge receipt of the webhook
    res.status(200).json({ message: 'Webhook received successfully' })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
