import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import TodoList from 'components/TodoList';

const App = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

ReactDom.render(<App />, document.getElementById('root'));
