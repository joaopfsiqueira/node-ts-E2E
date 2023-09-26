import { IUser } from '../infra/models/user-collection.interface';

export interface IUserRepository {
	create(user: IUser): Promise<IUser>;
	findByUsername(username: string): Promise<IUser>;
}
