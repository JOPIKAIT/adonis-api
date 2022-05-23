import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from "App/Models/Usuario";
import Hash from '@ioc:Adonis/Core/Hash';
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class UsuariosController {

    public async index({ response }) {

        const usuarios = await Usuario.all();

        if (usuarios) {
            return await response.ok({
                success: true,
                message: "Listage de usuarios",
                data: usuarios
            });
        } else {
            return response.ok({
                success: false,
                message: "Sem usuario para listar de momento"
            })
        }
    }

    public async register({ request, response }) {

        const dados = request.only(['name', 'email', 'password']);
        const verifyUser = await Usuario.findBy('email', dados.email);

        if (verifyUser) {

            return response.ok({
                success: false,
                message: `Já existe este e-mail ${dados.email} associado a um usuario que pretende registar`
            })

        } else {

            const utilizador = await Usuario.create(dados);
            return response.ok({
                success: true,
                message: `O utilizador ${dados.name} foi criado com sucesso`,
                data: utilizador
            });
        }
    }

    public async showUser({ params, response }: HttpContextContract) {

        try {

            const detailUsuario = await Usuario.find(params.id);

            if (detailUsuario) {
                return response.ok({
                    success: true, 
                    message: 'Dados encontrados',
                    data: detailUsuario
                }) 
            } else {
                return response.ok({
                    success: false,
                    message: "Nenhum usuario foi encontrado"
                })
            }

        } catch (error) {
            return "Erro: " + error;
        }
    }

    public async update({ request, response, params }) {

        const usuario = await Usuario.find(params.id);
        const email = request.input('email');
        const verifyEmailUser = await Usuario.findBy('email', email);

        if (verifyEmailUser) {

            return response.ok({
                success: false,
                message: `Já exite este email ${email} associado a um usuario`
            })

        } else {
            if (usuario) {

                usuario.name = request.input('name');
                usuario.email = request.input('email');
                usuario.password = request.input('password');
                usuario.save()

                return response.ok({
                    success: true,
                    message: 'Usuario actualizado com sucesso',
                    data: usuario
                })
            } else {
                return response.ok({
                    success: false,
                    message: 'Não foi possivel encontrar o usuario pretendido'
                })
            }
        }
    }

    public async delete({ params, response }) {

        const usuario = await Usuario.find(params.id);

        if (!usuario) return response.ok({ success: false, message: "Nenhum usuario com este ID" })

        await usuario?.delete()
        return response.ok({
            success: true,
            message: 'Usuario elimanado com sucesso'
        })
    }
}
