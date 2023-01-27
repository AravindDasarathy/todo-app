import './TodoForm.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';

function TodoForm({ saveTodoInServer }) {
  // default values of a todo
  const defaultTodoValues = {
    title: '',
    description: '',
    due_date: '',
    time: ''
  };

  const [todo, setTodo] = useState(defaultTodoValues);

  const setTodoValue = incomingTodo => {
    setTodo({
      ...todo,
      ...incomingTodo
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setTodoValue({ [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setTodo(defaultTodoValues);
    saveTodoInServer({ ...todo, isCompleted: false });
  };

  return (
    <form id="form" className="border-bottom flex-column" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a title"
        name="title"
        required
        value={todo.title}
        onChange={handleChange} />
      <input
        type="text"
        placeholder="Add description"
        name="description"
        required
        value={todo.description}
        onChange={handleChange} />
      <input
        type="text"
        placeholder="Add due date"
        name="due_date"
        required
        value={todo.due_date}
        onFocus={e => e.currentTarget.type = 'date'}
        onBlur={e => {
          if (e.target.value === '') {
            e.currentTarget.type = 'text';
          }
        }}
        onChange={handleChange} />
      <input
        type="text"
        placeholder="Add time"
        name="time"
        required
        value={todo.time}
        onFocus={e => e.currentTarget.type = 'time'}
        onBlur={e => {
          if (e.currentTarget.value === '') {
            e.currentTarget.type = 'text';
          }
        }}
        onChange={handleChange}/>
      <button>Add</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  saveTodoInServer: todo => dispatch({ type: 'SAVE_TODO_IN_SERVER', payload: todo, dispatch })
});

export default connect(null, mapDispatchToProps)(TodoForm);