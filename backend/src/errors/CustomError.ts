'use strict'

class CustomError extends Error {
  private _status: number
  private _message: string
  private _stack?: string

  constructor (status: number, message: string) {
    super(message)

    this._status = status
    this._stack = (<any> new Error())?.stack
    this.init()
  }

  private init () : void {
    switch (this._status) {
      case 400: {
        this._message = 'ERR_BAD_REQUEST'
        break
      }

      case 401: {
        this._message = 'ERR_UNAUTHORIZED'
        break
      }

      case 404: {
        this._message = 'ERR_NOT_FOUND'
        break
      }

      case 409: {
        this._message = 'ERR_CONFLICT'
        break
      }

      case 500: {
        this._message = 'ERR_INTERNAL_SERVER'
        break
      }

      case 503: {
        this._message = 'ERR_SERVICE_UNAVAILABLE'
        break
      }
    }
  }

  public get status () {
    return this._status
  }

  public get message () {
    return this._message
  }

  public get stack () {
    return this._stack
  }
}

export default CustomError
