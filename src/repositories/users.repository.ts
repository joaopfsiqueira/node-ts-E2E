import { IUser } from '../utils/interfaces/infra/models/user-collection.interface';
import Users from '../infra/mongoose/models/users';

export class UserRepository {
	async create(user: IUser): Promise<IUser> {
		const newUser = new Users(user);
		return newUser.save();
	}

	async findByUsername(username: string): Promise<IUser> {
		try {
			const user = await Users.findOne({ username });
			if (user) {
				return user;
			} else {
				throw new Error(`Usuário não encontrado!`);
			}
		} catch (error) {
			throw new Error(`error`);
		}
	}
}
