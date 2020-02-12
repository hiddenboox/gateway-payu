export const ContentType = {
    JSON: 'application/json'
}

export const HEADERS = {
    Authorization: 'Authorization',
    'Content-Type': 'Content-Type'
}

export const HttpVerb = {
    POST: 'POST',
    GET: 'GET',
}

export const EnvironmentName = {
    SANDBOX: 'SANDBOX',
    PRODUCTION: 'PRODUCTION',
}

export const Environment = {
    [EnvironmentName.SANDBOX]: 'https://secure.snd.payu.com',
    [EnvironmentName.PRODUCTION]: 'https://secure.payu.com',
}

