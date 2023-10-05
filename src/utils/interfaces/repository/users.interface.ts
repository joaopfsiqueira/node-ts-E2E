import { IUser } from '../infra/models/user-collection.interface';

export interface IUserRepository {
	create(name: string, username: string, password: string, created_at: Date): Promise<IUser>;
	findByUsername(username: string): Promise<IUser | Boolean>;
}
