import mongoose from 'mongoose';
import { INoSqlConn } from '../../utils/interfaces/infra/mongodb.interface';

export class MongoDbConn implements INoSqlConn<Promise<void>> {
	private options: mongoose.ConnectOptions | undefined;
	private _connection!: mongoose.Mongoose;

	constructor(options?: mongoose.ConnectOptions) {
		this.options = options;
	}

	public get connection(): mongoose.Mongoose {
		return this._connection;
	}

	public set connection(value: mongoose.Mongoose) {
		this._connection = value;
	}

	public async connect(): Promise<void> {
		const uri = String(process.env.MONGO_URI);

		const defaultOptions = {};

		try {
			mongoose.connection.on('connected', () => {
				console.log('info', `Connection Mongoose has been established`);
			});

			mongoose.connection.on('error', (e) => {
				console.log('error', `Connection Mongoose threw an error -> ${e}`);
				process.exit(1);
			});

			mongoose.connection.on('disconnected', () => {
				console.log('error', 'Connection Mongoose disconnected');
				process.exit(1);
			});

			if (!uri) throw new Error('A connection uri was not provided');

			this.connection = await mongoose.connect(
				uri,
				!this.options ? defaultOptions : this.options,
			);
		} catch (error) {
			const isError = error instanceof Error;

			console.log('error', `can't connect to mongo - ${isError ? error.message : error}`);

			throw isError ? error : new Error(`can't connect to mongo - ${error}`);
		}
	}
}
