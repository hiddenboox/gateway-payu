export const ContentType = {
  JSON: 'application/json'
}

export const HEADER = {
  Authorization: 'Authorization',
  ContentType: 'Content-Type',
  ContentLength: 'Content-Length'
}

export const HttpVerb = {
  POST: 'POST',
  GET: 'GET'
}

export const EnvironmentName = {
  SANDBOX: 'SANDBOX',
  PRODUCTION: 'PRODUCTION'
}

export const Environment = {
  [EnvironmentName.SANDBOX]: 'https://secure.snd.payu.com',
  [EnvironmentName.PRODUCTION]: 'https://secure.payu.com'
}

export const GrantType = {
  ClientCredentials: 'client_credentials'
}
