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
		const userRepository = new UserRepository();
		const userService = new UserService(userRepository);
		const userController = new UserController(userService);
		app = new App([userController]).app;

		// importando dotenv e falando que o caminho do dotenv a ser utilizado é o seguinte:
		dotenv.config({ path: '../../.env.test' });

		//connecta no banco de dados
		await mongo.connect();

		api = request(app);
	});

	it('should create a new user via POST request', async () => {
		const newUser = {
			name: 'John Doe2',
			username: 'teste12',
			password: 'password',
		};

		const response = await api.post('/users').send(newUser).expect(200);

		expect(response.body).toHaveProperty('Message');
		expect(response.body.Message).toBe('User created successfully');
	});

	it('should not create a new user via POST request because already exists', async () => {
		const newUser = {
			name: 'John Doe',
			username: 'teste3',
			password: 'password',
		};

		const response = await api.post('/users').send(newUser).expect(400);

		expect(response.body.Message).toBe('Erro ao criar usuário - User already exists');
	});

	it('should get a user by username via GET request', async () => {
		const username = { username: 'joaosiq' }; // Suponha que você tenha um usuário com este nome

		const response = await api.get(`/users/username`).send(username);

		// Verifique a resposta ou o banco de dados conforme necessário
		expect(response.status).toBe(200);
	});

	it('should not be able to find a user by username via GET request because not exist', async () => {
		const username = { username: 'joaosiq2' }; // Suponha que você tenha um usuário com este nome

		const response = await api.get(`/users/username`).send(username).expect(400);

		expect(response.body.Message).toBe('Usuário não encontrado! - User does not exist');
	});
});
