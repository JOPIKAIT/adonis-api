import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario';

export default class AuthController {

  public async refreshToken({ request }) {

    const refreshToken = request.input('refreshToken');
    return refreshToken;

  }

  public async autenticate({ request, auth }) {

    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token;

  }

  public async store({ request , response}: HttpContextContract) {

    const { name, email, password } = request.only(['name', 'email', 'password']);
    const usuario = await Usuario.create({
      name, email, password
    })

    return response.ok({ 
      success: true, 
      message: 'Usuario criado com sucess',
      data: usuario
    })

  }

  show({ auth, params }) {
    if (auth.usuario.id !== Number(params.id)) {
      return 'Nenhum perfil encontrado'
    }
    return auth.user
  }

  public async logout() {

  }

}
