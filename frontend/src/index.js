import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import { fetchTodos } from './reducer/todo-reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

// writing as an anonymous function to await fetching todos from backend
(async () => {
  await store.dispatch(fetchTodos);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
})();
