'use strict'

import CustomError from './CustomError'

class RouterError extends CustomError {
  constructor (status: number, message: string) {
    super(status, message)
  }
}

export default RouterError
