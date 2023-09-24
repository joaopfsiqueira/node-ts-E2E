import express from 'express';
import morgan from 'morgan';
import { IController } from './interfaces/controller.interface'; //pegando tudo o que está implementado dentro do IController, que é a interface que é implementada em cada classe de controller

class App {
	app: express.Application; //pegando tudo o que tem dentro da interface application, métodos etc (express, use, listen, etc) (inversão de dependência)(aberto e fechado), esse app vai ser acesso quando instanciarmos a classe App no server

	//espera receber um array com todas as abstrações (instâncias) de controller
	//quando instância a classe de fora com new app, ele já roda as funções que estão dentro do constructor
	constructor(controllers: Array<IController>) {
		this.app = express(); //iniciando app no this.app, vamos chamar esse método ao chamar o app no server, para ele rodar o express!
		this.middlewares(); //inicializando middlewares
		this.routes(); // inicializando rotas
		this.initializeControllers(controllers); // inicializando todos os routers dos controllers
	}

	// faz a mesma coisa que a lib body-parser, mas nas novas versões do express ele já tem um método que faz isso! Passa a receber e enviar json.
	// todos os middlewares que são executados junto da app.
	middlewares(): void {
		this.app.use(express.json());
		this.app.use(morgan('dev'));
	}

	routes() {
		this.app.get('/ping', (_req, res) => {
			return res.status(200).send('pong');
		});

		// this.app.use(algumRouterAntigo);
	}

	// função que recebe o array de controller, e ai ele passa controller por controller, e rodando o router de dentro dele (aquela rota que criamos), o ideal é padronizar todos os controllers para isso.
	initializeControllers(controllers: Array<any>) {
		controllers.forEach((controller) => {
			this.app.use(controller.router);
		});
	}
}

export default App;
