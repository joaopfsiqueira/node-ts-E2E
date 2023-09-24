import { Request, Response, Router } from 'express';
import { Http } from '../utils/enum/http';
import { IController } from '../interfaces/controller.interface';
// import { IHelloWorldService } from 'helloworld.service.ts'

class HelloWorldController implements IController {
	public router: Router;
	private readonly basePath = '/';
	// private service: IHelloWorldService;

	//constructor(service: IHelloWorldService)
	constructor() {
		this.router = Router();
		this.initializeRouter();
		// this.service = service; aqui eu atribuiria o service que eu importaria la de cima no atributo da classe, para ter contexto dentro dela e usar com o this.service, é a abstração da classe, que fornece acesso aos métodos publicos dela.
	}

	//método criado para inicializar nova subrota!
	private initializeRouter(): void {
		this.router.get(`${this.basePath}`, this.helloWorld.bind(this));
		//fazendo um binding para a função que será chamada quando a requisição for recebida.
	}

	private async helloWorld(_req: Request, res: Response): Promise<Response | Error> {
		try {
			return res.status(Http.OK).send('hello world!');
		} catch (error) {
			// validando se error é uma instância de Error, para fazer o ternário abaixo e conseguir acessar as propriedades do erro, como error.message! Isso é uma das chatices desse typescript, é uma forma de explicitar o tipo do erro, para evitar erros de tipagem. No javascript normal não seria necessário fazer isso, só precisando fazer um res.status(Http.INTERNAL_SERVER_ERROR).send(error.message).
			const isError = error instanceof Error;

			return isError
				? res.status(Http.INTERNAL_SERVER_ERROR).send(error.message)
				: res.status(Http.INTERNAL_SERVER_ERROR).send(String(error));
		}
	}
}

export default HelloWorldController;
