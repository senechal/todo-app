import React from 'react';
import 'jest-styled-components';
import { fireEvent } from '@testing-library/react';
import * as actions from 'actions';
import {
  TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT,
  TEST_ID_INLINE_EDIT_INPUT,
  TEST_ID_TODO_ITEM_CHECKBOX,
  TEST_ID_TODO_ITEM_DELETE_BUTTON,
  EMPTY_STRING,
} from 'utils/constants';
import TodoItem from '../TodoItem';
import { renderWithRedux } from '../__mocks__/test-utils';

jest.mock('lodash/delay', () => (fn) => { fn(); });

describe('Testing TodoItem', () => {
  let props;
  let initialState;
  beforeEach(() => {
    props = {
      value: 'value',
      id: 0,
      done: false,
    };
    initialState = {
      autoIncrement: 0,
      counter: 1,
      items: [props.id],
      details: {
        [props.id]: props,
      },
      editing: null,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly with required props', () => {
    const { container } = renderWithRedux(<TodoItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with changed value and id', () => {
    props.value = 'new value';
    props.id = 2;
    const { container } = renderWithRedux(<TodoItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with changed done state', () => {
    props.done = true;
    const { container } = renderWithRedux(<TodoItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it(`should change editing state when user start editing value and
  should change value on the store when user change input`, () => {
    const startEditingAction = jest.spyOn(actions, 'startEditing');
    const changeItemAction = jest.spyOn(actions, 'changeItem');
    const targetValue = 'change Value';
    const { getByTestId } = renderWithRedux(<TodoItem {...props} />);

    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);
    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    expect(startEditingAction).toBeCalledWith(props.id);
    fireEvent.change(input, { target: { value: targetValue } });

    expect(changeItemAction).toBeCalledWith(targetValue, props.id);
  });

  it('should toggle done when user click on delete button', () => {
    const removeItemAction = jest.spyOn(actions, 'removeItem');
    const { getByTestId } = renderWithRedux(<TodoItem {...props} />, { initialState });

    const button = getByTestId(TEST_ID_TODO_ITEM_DELETE_BUTTON);
    fireEvent.click(button);

    expect(removeItemAction).toBeCalledWith(props.id);
  });

  it('should delete item when user click on delete button', () => {
    const toggleItemAction = jest.spyOn(actions, 'toggleItem');
    const { getByTestId } = renderWithRedux(<TodoItem {...props} />, { initialState });

    const checkbox = getByTestId(TEST_ID_TODO_ITEM_CHECKBOX);
    fireEvent.click(checkbox);

    expect(toggleItemAction).toBeCalledWith(props.id);
  });

  it('should endEditing when user blur input', () => {
    const endEditingAction = jest.spyOn(actions, 'endEditing');
    const { getByTestId } = renderWithRedux(<TodoItem {...props} />);
    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);

    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.blur(input);
    expect(endEditingAction).toBeCalled();
  });

  it('should endEditing when user blur input and should call remove item if the value is empty', () => {
    const endEditingAction = jest.spyOn(actions, 'endEditing');
    const removeItemAction = jest.spyOn(actions, 'removeItem');
    props.value = EMPTY_STRING;
    const { getByTestId } = renderWithRedux(<TodoItem {...props} />, { initialState });
    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);

    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.blur(input);
    expect(endEditingAction).toBeCalled();
    expect(removeItemAction).toBeCalledWith(props.id);
  });
});
