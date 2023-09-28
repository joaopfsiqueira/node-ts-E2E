import { IUserService } from '../utils/interfaces/service/user.service.interface';
import { IUser } from '../utils/interfaces/infra/models/user-collection.interface';
import { IUserRepository } from '../utils/interfaces/repository/users.interface';
import { createUserError, getUserByUsernameError } from '../utils/errors/users.service.errors';

export type body = {
	name: string;
	username: string;
	password: string;
};

class UserService implements IUserService {
	constructor(private userRepository: IUserRepository) {}

	async createUser({ name, username, password }: body): Promise<IUser> {
		try {
			const user = await this.userRepository.findByUsername(username);
			if (user) {
				throw new Error('User already exists');
			}
			const created_at = new Date();
			const newUser = this.userRepository.create(name, username, password, created_at);
			return newUser;
		} catch (error) {
			throw new createUserError(error);
		}
	}

	async getUserByUsername(username: string): Promise<IUser> {
		try {
			return await this.userRepository.findByUsername(username);
		} catch (error) {
			throw new getUserByUsernameError(error);
		}
	}
}

export default UserService;
