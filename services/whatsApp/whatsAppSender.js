export const whatsAppSender = async ({ token, originPhoneId, destinationPhone, type, templateName, languageCode, templateVariables }) => {
  const url = `https://graph.facebook.com/v15.0/${originPhoneId}/messages`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: `{"messaging_product":"whatsapp","to":"${destinationPhone}","type":"template","template":{"name":"hello_world","language":{"code":"en_US"}}}`,
  }
  console.log({options})
  fetch(url, options)
    .then(response => response.json())
    .then(data => console.log({ from: 'whatsAppSender', data }))
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error)
    })
}
