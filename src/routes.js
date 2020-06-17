import express from 'express';
import path from 'path';
import MailController from './controllers/MailController';
import LogController from './controllers/LogController';
import authMiddleware from './middlewares/auth';

const routes = express.Router();
routes.use('/', express.static(path.resolve('public')));
routes.post('/api/news', (req, res, next) => LogController.logRequest(req, res, next), authMiddleware, (req, res) => MailController.news(req, res));
routes.post('/api/contact', (req, res, next) => LogController.logRequest(req, res, next), authMiddleware, (req, res) => MailController.contact(req, res));
routes.post('/api/registerpf', (req, res, next) => LogController.logRequest(req, res, next), authMiddleware, (req, res) => MailController.registerPF(req, res));
routes.post('/api/registerpj', (req, res, next) => LogController.logRequest(req, res, next), authMiddleware, (req, res) => MailController.registerPJ(req, res));

export default routes;