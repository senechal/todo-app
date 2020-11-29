import { createStore } from 'redux';
import rootReducers from 'reducers';
import { REDUX_PERSISTENT_STATE } from 'utils/constants';

const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem(REDUX_PERSISTENT_STATE, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem(REDUX_PERSISTENT_STATE);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = createStore(
  rootReducers,
  loadFromLocalStorage(),
  window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle
  && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
