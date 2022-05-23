/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UsuariosController from 'App/Controllers/Http/UsuariosController';

Route.get('/', async () => {
  return { hello: 'world' }
})

//Rotas para criacao de produtos
Route.post('add-produto', 'ProdutosController.store');
Route.get('list-produto', 'ProdutosController.index');
Route.get('detail-produto/:id', 'ProdutosController.show');
Route.post('atualizar-produto/:id', 'ProdutosController.update');
Route.delete('apagar-produto/:id', 'ProdutoController.destroy');

//Criar conta de usuarios
Route.post('add-usuario', 'UsuariosController.register');
Route.get('list-usuario', 'UsuariosController.index');
Route.get('list-usuario/:id', 'UsuariosController.showUser');
Route.put('update-usuario/:id', 'UsuariosController.update')
Route.delete('delete-usuario/:id', 'UsuariosController.delete')

//Auth
Route.post('autenticate', 'AuthController.autenticate');
Route.post('store', 'AuthController.store');
Route.get('index', 'AuthController.index');
Route.post('refresh-token', 'AuthController.refreshToken');