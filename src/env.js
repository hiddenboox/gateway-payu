import { Environment } from "./consts"

export const environment = Environment[(process.env.PAYU_ENVIRONMENT ? process.env.PAYU_ENVIRONMENT : 'sandbox').toUpperCase()] 
