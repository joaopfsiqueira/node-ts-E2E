import { model, Schema } from 'mongoose';
import { IUser } from '../../../utils/interfaces/infra/models/user-collection.interface';

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		created_at: { type: Date, required: true },
	},
	{
		versionKey: false,
	},
);

UserSchema.index({ username: 1 });

export default model<IUser>('Users', UserSchema);
