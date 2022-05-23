import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Usuario extends BaseModel {

  //um ou varios produtos são registados por um usuario
  // produtos(){
  //   return this.hasMany('App/Models/Produto');
  // }

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name:string;

  @column({ serializeAs: null})
  public password:string;

  @column()
  public email:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static $columns: Pick<
  Usuario,
  'id' | 'name' |'email' |'password' 
>

}
