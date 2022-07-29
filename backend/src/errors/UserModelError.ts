'use strict'

import CustomError from './CustomError'

class UserModelError extends CustomError {
  constructor (status: number, message: string) {
    super(status, message)
  }
}

export default UserModelError
