import { Document } from 'mongoose';

// do tipo document, todo document é um dado dentro do mongoose, estamos falando então que essa é a interface de um dado.
export interface IUser extends Document {
	name: string;
	username: string;
	password: string;
	created_at: Date;
}
