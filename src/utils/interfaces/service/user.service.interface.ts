import { IUser } from '../infra/models/user-collection.interface';
import { body } from '../../../service/users.service';
export interface IUserService {
	createUser({ name, username, password }: body): Promise<IUser>;
	getUserByUsername(username: string): Promise<IUser>;
}
