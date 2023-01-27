import express from 'express';
import * as todoController from '../controllers/todo-controller.js';

const Router = express.Router();

Router.route('/').post(todoController.post);
Router.route('/').get(todoController.getAll);
Router.route('/:id').get(todoController.get);
Router.route('/:id').put(todoController.put);
Router.route('/:id').delete(todoController.remove);

export default Router;