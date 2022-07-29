'use strict'

import CustomError from './CustomError'

class AuthenticationControllerError extends CustomError {
  constructor (status: number, message: string) {
    super(status, message)
  }
}

export default AuthenticationControllerError
