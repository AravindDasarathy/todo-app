import './App.scss';
import TodoForm from './components/TodoForm/TodoForm.js';
import TodoSection from './components/TodoSection/TodoSection.js';
import { connect } from 'react-redux';

function App({todos}) {
  // renders the todo sections
  const renderTodos = () =>
    todos.map((todo, idx) =>
      ( <TodoSection key={idx} todoDetails={todo} /> ));

  return (
    <div className="todo-container">
      <h1 className="border-bottom">TODO</h1>

      <TodoForm />

      <div className="todo-list-container">
        {todos.length === 0
          ? <p className="empty">No todos present</p>
          : renderTodos()
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({ todos: state.todos });

export default connect(mapStateToProps)(App);
