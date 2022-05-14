'use strict'

import { Router } from 'express'
import AuthenticationController from '../app/controllers/AuthenticationController'

export class AuthenticationRouter {
  private _router: Router

  constructor () {
    this._router = Router()
    this.init()
  }

  public get router () : Router {
    return this._router
  }

  private init () : void {
    const authenticationController = new AuthenticationController()
    this._router.post('/create', authenticationController.create)
    this._router.post('/login', authenticationController.login)
  }
}

const authenticationRouter = new AuthenticationRouter()
export default authenticationRouter.router
