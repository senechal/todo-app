import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeItem, removeItem, toggleItem, startEditing, endEditing,
} from 'actions';
import { TEXT_DELETE_ITERM, TEST_ID_TODO_ITEM_CHECKBOX, TEST_ID_TODO_ITEM_DELETE_BUTTON } from 'utils/constants';
import {
  Item, Checkbox, DeleteButton, DeleteIcon,
} from './styles';

import InlineEditInput from './InlineEditInput';

const TodoItem = ({ value, id, done }) => {
  const dispatch = useDispatch();

  const handleInputChange = useCallback((event) => {
    const { target: { value: eventValue } } = event;
    dispatch(changeItem(eventValue, id));
  }, [dispatch, id]);

  const handleRemove = useCallback(() => {
    dispatch(removeItem(id));
  }, [dispatch, id]);

  const handleToggleItem = useCallback(() => {
    dispatch(toggleItem(id));
  }, [dispatch, id]);

  const handleStartEdit = useCallback(() => {
    dispatch(startEditing(id));
  }, [dispatch, id]);

  const handleEndEdit = useCallback(() => {
    dispatch(endEditing());
    if (value === '') {
      dispatch(removeItem(id));
    }
  }, [dispatch, id, value]);

  return (
    <Item>
      <Checkbox data-testid={TEST_ID_TODO_ITEM_CHECKBOX} checked={done} onChange={handleToggleItem} />
      <InlineEditInput
        value={value}
        onChange={handleInputChange}
        onStartEdit={handleStartEdit}
        onEndEdit={handleEndEdit}
      />
      <DeleteButton
        data-testid={TEST_ID_TODO_ITEM_DELETE_BUTTON}
        title={TEXT_DELETE_ITERM}
        onClick={handleRemove}
      >
        <DeleteIcon />
      </DeleteButton>
    </Item>
  );
};

TodoItem.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
};

export default TodoItem;
