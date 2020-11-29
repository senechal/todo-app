import React from 'react';
import 'jest-styled-components';
import { fireEvent } from '@testing-library/react';
import { initialState } from 'reducers';
import * as actions from 'actions';
import {
  TEST_ID_TODO_LIST_ADD_BUTTON,
  TEST_ID_TODO_LIST_CHECKBOX,
  TEST_ID_INLINE_EDIT_INPUT,
  INLINE_EDIT_ENTER_KEY,
  TEST_ID_TODO_ITEM_CHECKBOX,
} from 'utils/constants';
import { renderWithRedux } from '../__mocks__/test-utils';
import TodoList from '../TodoList';

jest.mock('lodash/delay', () => (fn) => { fn(); });

describe('Testing TodoItem', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly with empty store', () => {
    const { container } = renderWithRedux(<TodoList />, { initialState });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly after user add item', () => {
    const addItemAction = jest.spyOn(actions, 'addItem');
    const { container, getByTestId } = renderWithRedux(<TodoList />, { initialState });
    const button = getByTestId(TEST_ID_TODO_LIST_ADD_BUTTON);
    fireEvent.click(button);

    expect(addItemAction).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  it('should prevent from add new item if the value of a new on is empty', () => {
    const addItemAction = jest.spyOn(actions, 'addItem');
    const { getByTestId } = renderWithRedux(<TodoList />, { initialState });
    const button = getByTestId(TEST_ID_TODO_LIST_ADD_BUTTON);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(addItemAction).toBeCalledTimes(1);
  });

  it('should render correctly adding new item when user changes current value', () => {
    const addItemAction = jest.spyOn(actions, 'addItem');
    const { container, getByTestId } = renderWithRedux(<TodoList />, { initialState });
    const button = getByTestId(TEST_ID_TODO_LIST_ADD_BUTTON);
    fireEvent.click(button);
    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.change(input, { target: { value: ' new value' } });
    fireEvent.click(button);
    expect(addItemAction).toBeCalledTimes(2);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly without new item when user blur from the input if it is empty', () => {
    const { container, getByTestId } = renderWithRedux(<TodoList />, { initialState });
    const button = getByTestId(TEST_ID_TODO_LIST_ADD_BUTTON);
    fireEvent.click(button);
    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.blur(input);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly without new item when user press enter if it is empty', () => {
    const { container, getByTestId } = renderWithRedux(<TodoList />, { initialState });
    const button = getByTestId(TEST_ID_TODO_LIST_ADD_BUTTON);
    fireEvent.click(button);
    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.keyPress(input, { charCode: INLINE_EDIT_ENTER_KEY });
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with all checkbox checked when user click on list checkbox and counter is not 0 ', () => {
    const toggleAllAction = jest.spyOn(actions, 'toggleAll');
    const reduxState = {
      autoIncrement: 0,
      counter: 2,
      items: [0, 1, 2],
      details: {
        0: { id: 0, value: 'item 1', done: false },
        1: { id: 1, value: 'item 2', done: true },
        2: { id: 2, value: 'item 3', done: false },
      },
      editing: null,
    };
    const { container, getByTestId } = renderWithRedux(<TodoList />, { initialState: reduxState });
    const checkbox = getByTestId(TEST_ID_TODO_LIST_CHECKBOX);
    fireEvent.click(checkbox);
    expect(toggleAllAction).toBeCalled();
    expect(container).toMatchSnapshot();
  });
  it('should render correctly when user click on a item checkbox ', () => {
    const reduxState = {
      autoIncrement: 0,
      counter: 2,
      items: [0, 1, 2],
      details: {
        0: { id: 0, value: 'item 1', done: false },
        1: { id: 1, value: 'item 2', done: true },
        2: { id: 2, value: 'item 3', done: false },
      },
      editing: null,
    };
    const { container, getAllByTestId } = renderWithRedux(<TodoList />, { initialState: reduxState });
    const [firstCheckbox, secondCheckbox] = getAllByTestId(TEST_ID_TODO_ITEM_CHECKBOX);
    fireEvent.click(firstCheckbox);
    fireEvent.click(secondCheckbox);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with all checkbox checked when user click on list checkbox and counter is  0', () => {
    const toggleAllAction = jest.spyOn(actions, 'toggleAll');
    const reduxState = {
      autoIncrement: 0,
      counter: 0,
      items: [0, 1, 2],
      details: {
        0: { id: 0, value: 'item 1', done: false },
        1: { id: 1, value: 'item 2', done: true },
        2: { id: 2, value: 'item 3', done: false },
      },
      editing: null,
    };
    const { container, getByTestId } = renderWithRedux(<TodoList />, { initialState: reduxState });
    const checkbox = getByTestId(TEST_ID_TODO_LIST_CHECKBOX);
    fireEvent.click(checkbox);
    expect(toggleAllAction).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
