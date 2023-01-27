import Todo from '../models/Todo.js';

/**
 * Get all todos
 * @returns all the todo resource in the 'todos' colection
 */
export const getAll = () => Todo.find({});

/**
 * Get a todo by id
 * @param {*} id id of the todo resource
 * @returns a todo resource
 */
export const get = (id) => {
  return Todo.findById(id);
};

/**
 * Create a todo
 * @param {*} todo a todo resource to be created
 * @returns a todo resource
 */
export const save = (todo) => {
  return new Todo(todo).save();
};

/**
 * Update a todo
 * @param {*} id id of the todo  resource to be updated
 * @param {*} todo the todo content to be updated
 * @param {*} opts options that configures mongoose update method
 * @returns the updated todo resource
 */
export const update = (id, todo, opts) => {
  return Todo.findByIdAndUpdate(id, todo, opts);
};

/**
 * Delete a todo
 * @param {*} id id of the todo resource to be deleted
 * @returns the todo resource that was deleted
 */
export const remove = (id) => {
  return Todo.findByIdAndDelete(id);
};
