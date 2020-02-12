import { Environment, EnvironmentName } from "./consts"

export const environment = Environment[process.env.PAYU_ENVIRONMENT ? process.env.PAYU_ENVIRONMENT : EnvironmentName.SANDBOX] 
