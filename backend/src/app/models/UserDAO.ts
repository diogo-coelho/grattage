'use strict'

import { model, Schema, Model } from 'mongoose'
import { IUserDAO } from '../../types/types'

class UserDAO {
  private _schema: Schema
  private _model : Model<IUserDAO>

  constructor () {
    this.initSchema()
    this._model = model('User', this._schema)
  }

  private initSchema () : void {
    this._schema = new Schema({
      _name: {
        type: String
      },
      _avatar: {
        type: String
      },
      _username: {
        type: String
      },
      _email: {
        type: String
      },
      _password: {
        type: String,
        required: true
      },
      created_at: {
        type: Date
      },
      updated_at: {
        type: Date
      }
    })
  }

  public get model () : Model<IUserDAO> {
    return this._model
  }
}

export default UserDAO
