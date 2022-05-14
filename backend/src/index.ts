'use strict'

import * as http from 'http'
import fs from 'fs'
import path from 'path'

import Server from './config/Server'
import date from './utils/FormattedDate'

const httpServer = new Server()
httpServer.server.then((server: http.Server) => {
  server.listen(httpServer.port)
  server.on('error', onError)
  server.on('listening', onListening)
  server.setTimeout(0)

  function onError (error: NodeJS.ErrnoException) : void {
    if (error.syscall !== 'listen') throw error
    const bind = (typeof httpServer.port === 'string') ? 'Pipe ' + httpServer.port : 'Porta ' + httpServer.port
    switch (error.code) {
      case 'EACCES':
        httpServer.closeDatabase()

        console.error(`[ ${date.formattedDate} ] : ${bind} requer privilégios elevados de acesso`)
        fs.appendFileSync(path.join(__dirname, '../logs/server.log'), `[ ${date.formattedDate} ] : ${bind} requer privilégios elevados de acesso \r\n`)
        process.exit(1)
        break

      case 'EADDRINUSE':
        httpServer.closeDatabase()

        console.log(`[ ${date.formattedDate} ] : ${bind} já está em uso`)
        fs.appendFileSync(path.join(__dirname, '../logs/server.log'), `[ ${date.formattedDate} ] : ${bind} já está em uso \r\n`)
        process.exit(1)
        break

      default:
        httpServer.closeDatabase()
        throw error
    }
  }

  function onListening () : void {
    const addr = server.address()
    if (addr) {
      const bind = (typeof addr === 'string') ? `pipe ${addr}` : `porta ${addr.port}`
      console.log(`[ ${date.formattedDate} ] : Servidor rodando na ${bind}`)
      fs.appendFileSync(path.join(__dirname, '../logs/server.log'), `[ ${date.formattedDate} ] : Servidor rodando na ${bind} \r\n`)
    }
  }
})
  .catch((err: Error) => {
    console.log(`[ ${date.formattedDate} ] : Não foi possível inicializar o servidor ${err.stack}`)
    fs.appendFileSync(path.join(__dirname, '../logs/server.log'), `[ ${date.formattedDate} ] : Não foi possível inicializar o servidor ${err.stack} \r\n`)
  })
