import 'dotenv/config'; //responsável por importar as variáveis de ambiente do .env e colocar na app.
import App from './app';
import { MongoDbConn } from './infra/mongoose/mongodb';
import { UserRepository } from './repositories/users.repository';
import UserController from './controller/users.controller';
import UserService from './service/users.service';

/* Main Function, responsável por juntar TODAS as abstrações (instâncias) e usa-las em seus serviços que esperam receber uma instância de uma classe abstrata.

 Ouuuu, simplesmente rodar a conexão de um banco, executar uma função, etc.
 */
export async function server(): Promise<void> {
	/**
	 * Instance of Connections
	 */
	const mongo = new MongoDbConn();

	/**
	 * Up connections
	 */

	await mongo.connect();

	/**
	 * Instance of Repositories
	 */
	const userRepository = new UserRepository();

	/**
	 * Inicilização das Services
	 */
	const userService = new UserService(userRepository);

	/**
	 * Inicialização das Controllers
	 */

	const controllers = new UserController(userService);

	/**
	 * Inicialização do Servidor, o servidor deve receber as controllers a serem carregadas
	 */
	const app = new App([controllers]).app; //acessando a propriedade publica da app que contem o express()

	app.listen(process.env.PORT, () => {
		console.log(`Server is running on port ${process.env.PORT}`);
	});
}

server();
