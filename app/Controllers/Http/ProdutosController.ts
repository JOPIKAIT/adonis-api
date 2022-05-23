
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from "App/Models/Produto";
import Application from '@ioc:Adonis/Core/Application'

export default class ProdutosController {

    //list produtos
    public async index({ response }) {
        const products = await Produto.all()
        return await response.status(200).json(products)
    }

    //see detail of one produt by is
    public async show({ params }: HttpContextContract) {

        try {

            const produto = await Produto.find(params.id);
            return produto;

        } catch (error) {
            console.log(error)
        }
    }

    //store the produt to database
    public async store({ request, response }) {

        try {

            //capturando todos os inputs
            const data = request.only(
                [ "nome", "descricao", "qtd", "validade", "preco", "status", "img_product" ]);

            const isExists = await Produto.findBy('nome', data.nome);

            if (isExists) {
                return response
                    .status(400)
                    .send(['message', "Já existem um produto com esse nome registado no sistema"]);
            } else {

                // const coverImage = request.file('img_product',{
                //     size: '2mb',
                //     extnames: ['jpg', 'png', 'gif',]
                // })

                // if (coverImage) {
                //     await coverImage.move(Application.tmpPath('uploads'))
                // }else{
                //     return coverImage.errors
                // }

                const produto = await Produto.create(data);
                return response.status(200).json({msg: `Produto ${data.nome} foi criado com sucesso`});
            }

        } catch (error) {
            return response
                .status(400)
                .send(error)

        }
    }

    public async update({params, request, response}){

        const produto = await Produto.find(params.id);

        const data = request.only(
            [ "nome", "descricao", "qtd", "validade", "preco", "status", "img_product" ]);

        if(produto){
            produto.merge(data);
            produto.save();

            return response.status(200).json({msg: `Produto ${data.nome} foi actualizado com sucesso`});
        }else{
            return response.status(400).send(['message', `Erro ao atualizar o produto ${data.nome}`]);
        }
    }

    public async destroy({params, response}){

        const produto_id = await Produto.find(params.id);

        if(produto_id){

            await produto_id.delete();
            return response.status(200).json({msg: `Produto ${produto_id} foi eliminado`});

        }else{

            return response.status(400).send(['message', 'Erro ao eliminar o produto']);
        }
    }

}
