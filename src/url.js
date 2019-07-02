import { Environment } from "./consts"

export const url = Environment[(process.env.PAYU_ENVIRONMENT ? process.env.PAYU_ENVIRONMENT : 'sandbox').toUpperCase()] 
