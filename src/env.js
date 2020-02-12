import { Environment, EnvironmentName } from './consts'
import { required } from './helpers/validation'

const tryFormatEnv = env => {
  required('PAYU_ENVIRONMENT', env)

  return env.toUpperCase()
}

export const environment =
  Environment[
    process.env.PAYU_ENVIRONMENT
      ? tryFormatEnv(process.env.PAYU_ENVIRONMENT)
      : EnvironmentName.SANDBOX
  ]
