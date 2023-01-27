import * as todosService from '../services/todo-service.js';

/**
 *
 * @param {*} obj the body to be sent back as response
 * @param {*} response the response object
 * @param {*} code  the status code to be sent back
 */
const setResponse = (obj, response, code = 200) => {
  response.status(code);
  response.json(obj);
};

/**
 *
 * @param {*} err error to be sent back
 * @param {*} response the response object
 * @param {*} code the status code to be sent back
 */
const setError = (err, response, code = 500) => {
  const message = err || 'Something went wrong';

  response.status(code);
  response.json(message);
};

/**
 * Get all todos
 * @param {*} req request object
 * @param {*} res response object
 */
export const getAll = async (req, res) => {
  try {
    const todos = await todosService.getAll();

    setResponse({
      message: 'Todos retrieved successfully',
      data: todos
    }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Get a todo by id
 * @param {*} req request object
 * @param {*} res response object
 */
export const get = async (req, res) => {
  try {
    const todo = await todosService.get(req.params.id);

    if (!todo) {
      return setError({ error: 'Todo not found' }, res, 404);
    }

    setResponse({
      message: 'Todo retrieved successfully',
      data: todo
    }, res);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Create a todo
 * @param {*} req request object
 * @param {*} res response object
 */
export const post = async (req, res) => {
  try {
    if (!req.body) {
      return setError({ error: 'Content cannot be empty' }, res, 400);
    }

    if (!req.body.title) {
      return setError({ error: 'Title cannot be empty' }, res, 400);
    }

    if (!req.body.description) {
      return setError({ error: 'Description cannot be empty' }, res, 400);
    }

    const todo =req.body;
    const savedtodo = await todosService.save(todo);

    setResponse({
      message: 'Todo saved successfully',
      data: savedtodo
    }, res, 201);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Update a todo
 * @param {*} req request object
 * @param {*} res response object
 */
export const put = async (req, res) => {
  try {
    const todo = req.body;
    const updatedTodo = await todosService.update(req.params.id, todo, { new: true });

    if (!updatedTodo) {
      return setError({ error: 'Todo not found' }, res, 404);
    }

    setResponse({
      message: 'Todo updated successfully',
      data: updatedTodo
    }, res, 204);
  } catch (error) {
    setError(error, res);
  }
};

/**
 * Delete a todo
 * @param {*} req request object
 * @param {*} res response object
 */
export const remove = async (req, res) => {
  try {
    const todo = await todosService.remove(req.params.id);

    setResponse({
      message: 'Todo deleted successfully',
      data: todo
    }, res, 200);
  } catch (error) {
    setError(error, res);
  }
};