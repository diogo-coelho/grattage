'use strict'

import fs from 'fs'
import path from 'path'

import jwt from 'jsonwebtoken'
import { PayloadUserToken } from '../../types/types'

class JsonWebToken {
  public getToken (payload: PayloadUserToken) : string {
    const secret = fs.readFileSync(path.join(__dirname, '../../../private/secret.key'))
    return jwt.sign({ ...payload, iat: Math.floor(Date.now() / 1000) + 300 }, secret, { algorithm: 'RS256' })
  }
}

export default JsonWebToken
