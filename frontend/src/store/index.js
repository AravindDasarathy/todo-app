import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from '../reducer/todo-reducer.js'

export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});
