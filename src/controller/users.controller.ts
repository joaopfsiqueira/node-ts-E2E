import { Request, Response, Router } from 'express';
import { Http } from '../utils/enum/http';
import { IUserService } from '../utils/interfaces/service/user.service.interface';
import { IController } from '../utils/interfaces/controller/controller.interface';

class UserController implements IController {
	public router: Router;
	private readonly basePath = '/users';
	private service: IUserService;

	constructor(service: IUserService) {
		this.service = service;
		this.router = Router();
		this.initializeRouter();
	}

	private initializeRouter(): void {
		this.router.post(`${this.basePath}`, this.createUser.bind(this));
		this.router.get(`${this.basePath}/username`, this.getUser.bind(this));
	}

	private async createUser(req: Request, res: Response): Promise<Response | Error> {
		try {
			await this.service.createUser(req.body);
			return res.status(Http.OK).send({ Message: 'User created successfully' });
		} catch (error) {
			const isError = error instanceof Error;
			return isError
				? res.status(Http.BAD_REQUEST).send({ Message: `${error.message}` })
				: res.status(Http.BAD_REQUEST).send(String(error));
		}
	}

	private async getUser(req: Request, res: Response): Promise<Response | Error> {
		const { username } = req.body;
		try {
			const user = await this.service.getUserByUsername(username);
			return res.status(Http.OK).json(user);
		} catch (error) {
			const isError = error instanceof Error;
			return isError
				? res.status(Http.BAD_REQUEST).send({ Message: `${error.message}` })
				: res.status(Http.BAD_REQUEST).send(String(error));
		}
	}
}

export default UserController;
