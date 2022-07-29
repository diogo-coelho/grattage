'use strict'

import fs from 'fs'
import path from 'path'

import { Request, Response } from 'express'
import date from '../../utils/FormattedDate'
import UserDAO from '../models/UserDAO'
import User from '../models/User'
import AuthenticationControllerError from '../../errors/AuthenticationControllerError'
import JsonWebToken from '../middleware/JsonWebToken'
import bcrypt from 'bcrypt'

class AuthenticationController {
  static _userDAO = new UserDAO()

  /**
   * Método que cria um usuário no banco de dados
   */
  public async create (req: Request, res: Response) : Promise<void> {
    try {
      console.log(`[ ${date.formattedDate} ] : Nova requisição de criação de usuário`)
      fs.appendFileSync(path.join(__dirname, '../../../logs/authentication.log'), `[ ${date.formattedDate} ] : Nova requisição de criação de usuário \r\n`)

      const user = new User()
      user.setName(req.body.name)
      user.setUserName(req.body.username)
      user.setEmail(req.body.email)
      await user.setPassword(req.body.password)

      const userHasAlreadyBeenCreated = await AuthenticationController._userDAO.model.find({
        $or: [
          { _username: user.userName },
          { _email: user.email }
        ]
      })

      if (userHasAlreadyBeenCreated.length > 0) {
        throw new AuthenticationControllerError(409, 'Usuário existente')
      }

      const record = await AuthenticationController._userDAO.model.create({
        ...user,
        created_at: new Date(),
        updated_at: new Date()
      })

      console.log(`[ ${date.formattedDate} ] : Fim da requisição de criação de usuário`)
      fs.appendFileSync(path.join(__dirname, '../../../logs/authentication.log'), `[ ${date.formattedDate} ] : Fim da requisição de criação de usuário \r\n`)

      res.status(201).json({ _id: record._id })
    } catch (err: any) {
      console.log(err)
      res.status(err.status).json({ statusCode: err._status, message: err._message, stack: err._stack })
    }
  }

  /**
   * Método que autentica um usuário no sistema e retorna um token de acesso
   */
  public async login (req: Request, res: Response) : Promise<void> {
    try {
      console.log(`[ ${date.formattedDate} ] : Nova requisição de login`)
      fs.appendFileSync(path.join(__dirname, '../../../logs/authentication.log'), `[ ${date.formattedDate} ] : Nova requisição de login \r\n`)

      if (!req.body.password || (!req.body.username && !req.body.email)) throw new AuthenticationControllerError(400, 'Parâmetros incorretos')

      const user = new User()
      if (req.body.username) user.setUserName(req.body.username)
      if (req.body.email) user.setEmail(req.body.email)

      const userFound = await AuthenticationController._userDAO.model.findOne({
        $or: [
          { _username: user.userName },
          { _email: user.email }
        ]
      })

      if (!userFound) throw new AuthenticationControllerError(401, 'Credenciais inválidas')
      const isValidPassword = await bcrypt.compare(req.body.password, userFound._password)
      if (!isValidPassword) throw new AuthenticationControllerError(401, 'Credenciais inválidas')

      const token = new JsonWebToken().getToken({ name: userFound._name, username: userFound._username, email: userFound._email })

      console.log(`[ ${date.formattedDate} ] : Fim da requisição de login`)
      fs.appendFileSync(path.join(__dirname, '../../../logs/authentication.log'), `[ ${date.formattedDate} ] : Fim da requisição de login \r\n`)

      res.status(200).json({ token })
    } catch (err: any) {
      console.log(err)
      res.status(err.status).json({ statusCode: err._status, message: err._message, stack: err._stack })
    }
  }
}

export default AuthenticationController
