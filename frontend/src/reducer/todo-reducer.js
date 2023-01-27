import configs from '../configs.json';

/**
 * A request wrapper that uses fetch to make requests.
 * @param {*} options options pertaining to the request
 * @returns {Promise} a promise that resolves or rejects based on the response
 */
const makeRequest = (options) => {
  return fetch(options.url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: options.body ? JSON.stringify(options.body) : null
  });
};

/**
 * A function that fetches all the existing todos
 * @param {*} dispatch the dispatch function from the store
 */
const fetchTodos = async dispatch => {
  try {
    const response = await (await makeRequest({ url: `${configs.backend.url}/todo` })).json();

    dispatch({ type: 'FETCH_TODOS', payload: response.data });
  } catch (error) {
    console.error('Error in preloading data - ', error);
  }
};

/**
 * A functio that updates an existing todo resource
 * @param {*} id id of the todo resource to be updated
 * @param {*} payload the payload that will be updated with the todo
 * @param {*} dispatch the dispatch function from the store
 */
const updateTodo = async (id, payload, dispatch) => {
  try {
    const response = await (await makeRequest({
      url: `${configs.backend.url}/todo/${id}`,
      method: 'PUT',
      body: payload
    })).json();

    dispatch({ type: 'UPDATE_TODO', payload: response.data });
  } catch (error) {
    console.error('Error in updating todo - ', error);
  }
};

/**
 * A function that creates a new todo resource
 * @param {*} todo the todo to be created
 * @param {*} dispatch the dispatch function from the store
 */
const saveTodo = async (todo, dispatch) => {
  try {
    const response = await (await makeRequest({
      url: `${configs.backend.url}/todo`,
      method: 'POST',
      body: todo
    })).json();

    dispatch({ type: 'SAVE_TODO', payload: response.data });
  } catch (error) {
    console.error('Error in saving todo - ', error);
  }
};

/**
 * A reducer function that handles the state of the todo
 * @param {*} state the todo state
 * @param {*} action a string that represents the action to be performed
 * @returns {Object} the new state
 */
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TODOS':
      return action.payload || state;

    case 'SAVE_TODO_IN_SERVER':
      saveTodo(action.payload, action.dispatch);
      return state;

    case 'SAVE_TODO':
      return [...state, action.payload];

    case 'UPDATE_TODO_IN_SERVER':
      updateTodo(action.id, action.payload, action.dispatch);
      return state;

    case 'UPDATE_TODO':
      state[action.payload.id] = action.payload;

      return [...state];

    default:
      return state;
  }
};

export {
  todoReducer,
  fetchTodos
};