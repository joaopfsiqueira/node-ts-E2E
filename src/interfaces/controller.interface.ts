import { Router } from 'express';

//! todos os controllers devem implementar a interface IController, seja o arquivo que for, além de ser Router
export interface IController {
	router: Router;
}
