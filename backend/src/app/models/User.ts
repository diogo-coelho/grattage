import 'dotenv/config'
import bcrypt from 'bcrypt'
import CustomError from '../../errors/CustomError'

class User {
  private _name: string
  private _avatar?: string
  private _username: string
  private _email: string
  private _password: string

  public setName (name: string) {
    if (name.trim() === '') { throw new CustomError(400, 'O nome não pode estar vazio') }

    if (name.length > 5 && name.length < 50) {
      this._name = name
    } else {
      throw new CustomError(400, 'O nome de usuário deve ter entre 5 e 50 caracteres')
    }
  }

  public setAvatar (avatar: string) {
    this._avatar = avatar
  }

  public setUserName (username: string) {
    // eslint-disable-next-line
    const re = /^(?=.*[a-z])([a-z]{3,10})+([.\-_]{0,1})+([a-z0-9]{3,20})$/
    if (username.length < 3 || username.length > 50) { throw new CustomError(400, 'O username deve ter entre 3 e 50 caracteres') }

    if (re.test(username)) {
      this._username = username
    } else {
      throw new CustomError(400, 'O username deve ter apenas letras minúsculas, números, ponto, hífen ou underline')
    }
  }

  public setEmail (email: string) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (re.test(email)) {
      this._email = email
    } else {
      throw new CustomError(400, 'E-mail inválido')
    }
  }

  public async setPassword (password: string) {
    // eslint-disable-next-line
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\)\({}#%])[A-Za-z\d@$!%*?&\)\({}#%]{8,10}/
    if (re.test(password)) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string)
      const passwordHashed = await bcrypt.hash(password, saltRounds)
      this._password = passwordHashed
    } else {
      throw new CustomError(400, 'Senha inválida. A senha precisa ter entre 8 e 10 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
    }
  }

  public get name () {
    return this._name
  }

  public get avatar () {
    return this._avatar
  }

  public get userName () {
    return this._username
  }

  public get email () {
    return this._email
  }

  public get password () {
    return this._password
  }
}

export default User
