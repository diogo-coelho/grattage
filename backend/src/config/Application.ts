'use strict'

import Express from 'express'
import BodyParser from 'body-parser'
import cors from 'cors'

import AuthenticationRouter from '../router/AuthenticationRouter'
import CustomError from '../errors/CustomError'

/**
 * Classe responsável por instanciar a aplicação do Express
 */
class Application {
  private _express: Express.Application

  /**
   * @construtor Constrói a instância da classe inicializando o Express
   */
  constructor () {
    this._express = Express()
    this.middleware()
    this.routes()
  }

  /**
   * @returns a instãncia da aplicação do Express
   */
  public get express () : Express.Application {
    return this._express
  }

  /**
   * Aplica as middlewares do pacote body-parser
   */
  private middleware () : void {
    this._express.use(BodyParser.json())
    this._express.use(BodyParser.urlencoded({ extended: false }))
    this._express.use(cors())
  }

  /**
   * Configura as rotas da aplicação
   */
  private routes () : void {
    const router: Express.Router = Express.Router()

    this._express.use('/api/v1/', router)
    this._express.use('/api/v1/authentication', AuthenticationRouter)
    this._express.use('*', () => { throw new CustomError(404, 'Endpoint não encontrado') })
  }
}

export default new Application().express
