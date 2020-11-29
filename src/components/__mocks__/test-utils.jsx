import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import reducer from '../../reducers';

export const renderWithRedux = (component, {
  initialState,
  store = createStore(reducer, initialState),
} = {}, options) => ({
  ...render(<Provider store={store}>{component}</Provider>, options),
  ...store,
});
