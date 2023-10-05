import request from 'supertest';
import express from 'express';
import { describe, it, beforeAll, expect } from 'vitest';
import App from '../app'; // Importe sua aplicação Express
import UserController from './users.controller'; // Importe o controller
import UserService from '../service/users.service'; // Importe o serviço
import { UserRepository } from '../repositories/users.repository'; // Importe o repositório
import { MongoDbConn } from '../infra/mongoose/mongodb';
import dotenv from 'dotenv';

describe('UserController E2E Tests', () => {
	let app: express.Application;
	let api: request.SuperTest<request.Test>; // Variável para a configuração do supertest
	const mongo = new MongoDbConn();

	beforeAll(async () => {
		// Configure a instância da aplicação Express com os controladores e serviços reais
		const userRepository = new UserRepository();
		const userService = new UserService(userRepository);
		const userController = new UserController(userService);
		app = new App([userController]).app;

		dotenv.config({ path: '../../.env.test' });

		await mongo.connect();

		// Configure o supertest com a aplicação Express
		api = request(app);
	});

	it('should create a new user via POST request', async () => {
		const newUser = {
			name: 'John Doe',
			username: 'teste1',
			password: 'password',
		};

		const response = await api.post('/users').send(newUser).expect(200);

		expect(response.body).toHaveProperty('Message');
		expect(response.body.Message).toBe('User created successfully');
	}, 15000);

	it('should not create a new user via POST request because already exists', async () => {
		const newUser = {
			name: 'John Doe',
			username: 'teste3',
			password: 'password',
		};

		const response = await api.post('/users').send(newUser).expect(200);

		expect(response.body).toHaveProperty('Message');
		expect(response.body.Message).toBe('User created successfully');
	}, 15000);

	it('should get a user by username via GET request', async () => {
		const username = { username: 'joaosiq' }; // Suponha que você tenha um usuário com este nome

		const response = await api.get(`/users/username`).send(username).expect(200);

		// Verifique a resposta ou o banco de dados conforme necessário
		expect(response.status).toBe(200);
	});

	// Adicione mais testes E2E conforme necessário para outras rotas e casos de uso
});
