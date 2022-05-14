'use strict'

/**
 * Classe responsável por formatar a Data para o padrão dd/mm/aaaa - hh:mm:ss
 */
class FormattedDate {
  private _date: Date
  private _formattedDate = ''

  /**
     * @construtor Constrói a instância da classe inicializando a data padrão
     * do Javascript e chamando o método setFormattedDate
     */
  constructor () {
    this._date = new Date()
    this.setFormattedDate()
  }

  /**
     * Método que formata a data atual para o formato dd/mm/aaaa - hh:mm:ss
     */
  private setFormattedDate () {
    const dia = ('0' + this._date.getDate()).slice(-2)
    const mes = ('0' + (this._date.getMonth() + 1)).slice(-2)
    const ano = this._date.getFullYear()
    const shortDate = dia + '/' + mes + '/' + ano

    const hours = ('0' + this._date.getHours()).slice(-2)
    const minutes = ('0' + this._date.getMinutes()).slice(-2)
    const seconds = ('0' + this._date.getSeconds()).slice(-2)
    const shortTime = hours + ':' + minutes + ':' + seconds

    this._formattedDate = `${shortDate} - ${shortTime}`
  }

  /**
     * Método que retorna o atributo de data formatada
     *
     * @returns Retorna a string com a data formatada
     */
  public get formattedDate (): string {
    return this._formattedDate
  }
}

export default new FormattedDate()
