import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Produto extends BaseModel {

  public serializeExtras = true;

  @column({ isPrimary: true })
  public id: number

  @column()  
  public nome:string

  @column()  
  public descricao:string
  
  @column()  
  public qtd: number
  
  @column()  
  public validade: Date

  @column()  
  public preco: number
  
  @column()  
  public status: string
  
  @column()  
  public img_product: string
 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static $columns: Pick<
    Produto,
    'id' | 'nome' |'descricao' |'qtd' | 'validade' | 'preco' | 'status' | 'img_product' | 'createdAt' | 'updatedAt'
  >
}