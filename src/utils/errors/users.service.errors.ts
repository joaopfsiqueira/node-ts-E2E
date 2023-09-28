export class createUserError extends Error {
	constructor(public error: unknown) {
		const isError = error instanceof Error;
		super(`Erro ao criar usuário - ${isError ? error.message : error}`);
		this.name = 'CREATE_USER_ERROR';
	}
}

export class getUserByUsernameError extends Error {
	constructor(public error: unknown) {
		const isError = error instanceof Error;
		super(`Usuário não encontrado! - ${isError ? error.message : error}`);
		this.name = 'CREATE_USER_ERROR';
	}
}
