import { describe, it, beforeAll, expect } from 'vitest';
import express from 'express';
import request from 'supertest'; // Para fazer solicitações HTTP aos endpoints do Express
import App from './app'; // Importe a classe App que deseja testar
import { IController } from './utils/interfaces/controller/controller.interface';

describe('App', () => {
	let app: express.Application;
	const mockControllers: Array<IController> = []; // Substitua isso pelos controladores reais que você deseja testar

	beforeAll(() => {
		app = new App(mockControllers).app;
	});

	it('should respond with "pong" when GET /ping', async () => {
		const response = await request(app).get('/ping');
		expect(response.status).toBe(200);
		expect(response.text).toBe('pong');
	});

	// Adicione mais testes de acordo com suas necessidades
});
