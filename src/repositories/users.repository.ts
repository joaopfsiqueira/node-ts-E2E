import { IUser } from '../utils/interfaces/infra/models/user-collection.interface';
import Users from '../infra/mongoose/models/users';
import { IUserRepository } from '../utils/interfaces/repository/users.interface';

export class UserRepository implements IUserRepository {
	async create(
		name: string,
		username: string,
		password: string,
		created_at: Date,
	): Promise<IUser> {
		const newUser = new Users({ name, username, password, created_at });
		return newUser.save();
	}

	async findByUsername(username: string): Promise<IUser | Boolean> {
		const user = await Users.findOne({ username });
		if (user) {
			return user;
		} else {
			return false;
		}
	}
}
