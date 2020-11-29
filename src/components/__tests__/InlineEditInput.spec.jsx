import React from 'react';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';
import { focusComponent, blurComponent } from 'utils';
import {
  TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT,
  TEST_ID_INLINE_EDIT_INPUT,
  INLINE_EDIT_ENTER_KEY,
} from 'utils/constants';
import InlineEditInput from '../InlineEditInput';

jest.mock('lodash/delay', () => (fn) => { fn(); });
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  blurComponent: jest.fn(),
  focusComponent: jest.fn(),
}));

describe('Testing InlineEditInput', () => {
  const props = {
    value: 'value',
    onStartEdit: jest.fn(),
    onEndEdit: jest.fn(),
    onChange: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly without props', () => {
    const { container } = render(<InlineEditInput />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const { container } = render(<InlineEditInput {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly, focus on input and call onStartEdit after user click on content', () => {
    const { container, getByTestId } = render(<InlineEditInput {...props} />);

    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);

    expect(props.onStartEdit).toBeCalled();
    expect(focusComponent).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  it('should render correctly and call onEndEdit after user blur from input', () => {
    const { container, getByTestId } = render(<InlineEditInput {...props} />);

    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);

    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.blur(input);

    expect(props.onEndEdit).toBeCalled();
    expect(container).toMatchSnapshot();
  });

  it('should blur from input on press enter', () => {
    const { container, getByTestId } = render(<InlineEditInput {...props} />);

    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);

    const input = getByTestId(TEST_ID_INLINE_EDIT_INPUT);
    fireEvent.keyPress(input, { charCode: 33 });

    expect(blurComponent).not.toBeCalled();

    fireEvent.keyPress(input, { charCode: INLINE_EDIT_ENTER_KEY });
    expect(blurComponent).toBeCalled();

    expect(container).toMatchSnapshot();
  });

  it('should render correctly, focus on input and call onStartEdit if value is empty without and not editing', () => {
    const { container, getByTestId } = render(<InlineEditInput {...{ ...props, value: '' }} />);
    const itemContainer = getByTestId(TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT);
    fireEvent.click(itemContainer);

    expect(props.onStartEdit).toBeCalled();
    expect(focusComponent).toBeCalled();
    expect(container).toMatchSnapshot();
  });
});
