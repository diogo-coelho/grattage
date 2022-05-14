'use strict'

import 'dotenv/config'
import fs from 'fs'
import path from 'path'

import mongoose, { Mongoose } from 'mongoose'
import date from '../utils/FormattedDate'

/**
 * Classe responsável por configurar o banco de dados via Mongoose
 */
class Database {
  private _database: Promise<Mongoose>

  /**
     * @construtor Constrói a instância do banco de dados
     */
  constructor () {
    this._database = mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DATABASE}`)
  }

  public get database () : Promise<Mongoose> {
    return this._database
  }

  /**
     * Método que conecta ao banco de dados do MongoDB
     */
  public async connect () : Promise<void> {
    this._database.then(database => {
      database.connection.on('connected', () => {
        console.error(`[ ${date.formattedDate} ] : Conexão estabelecida com sucesso`)
        fs.appendFileSync(path.join(__dirname, '../../logs/server.log'), `[ ${date.formattedDate} ] : Conexão estabelecida com sucesso \r\n`)
      })
    })

    this._database.then(database => {
      database.connection.on('disconnected', () => {
        console.error(`[ ${date.formattedDate} ] : Conexão desconectada`)
        fs.appendFileSync(path.join(__dirname, '../../logs/server.log'), `[ ${date.formattedDate} ] : Conexão desconectada \r\n`)
      })
    })

    this._database.then(database => {
      database.connection.on('error', () => {
        console.error(`[ ${date.formattedDate} ] : Erro de conexão`)
        fs.appendFileSync(path.join(__dirname, '../../logs/error.log'), `[ ${date.formattedDate} ] : Erro de conexão \r\n`)
      })
    })
  }

  /**
     * Método que encerra a conexão
     */
  public closeConnection () : void {
    process.on('SIGINT', () => {
      this._database.then(database => {
        database.connection.close(() => {
          console.error(`[ ${date.formattedDate} ] : Mongoose encerrado`)
          fs.appendFileSync(path.join(__dirname, '../../logs/server.log'), `[ ${date.formattedDate} ] : Mongoose encerrado \r\n`)
          process.exit(0)
        })
      })
    })
  }
}

export default new Database()
