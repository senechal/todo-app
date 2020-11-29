import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCounterText } from 'utils';
import { addItem, toggleAll } from 'actions';
import {
  EMPTY_STRING,
  EMPTY_COUNTER,
  TEXT_ADD_ITEM,
  TEXT_HEADER_MSG,
  TEST_ID_TODO_LIST_ADD_BUTTON,
  TEST_ID_TODO_LIST_CHECKBOX,
} from 'utils/constants';
import {
  Container, ListHeader, ListFooter, List, Checkbox, AddButton,
} from './styles';
import TodoItem from './TodoItem';

const TodoList = () => {
  const counter = useSelector((state) => state.counter);
  const items = useSelector((state) => state.items);
  const details = useSelector((state) => state.details);
  const editing = useSelector((state) => state.editing);
  const dispatch = useDispatch();

  const handleAddItem = useCallback(() => {
    dispatch(addItem());
  }, [dispatch]);

  const handleToggleAll = useCallback(() => {
    dispatch(toggleAll());
  }, [dispatch]);

  const isDone = counter === EMPTY_COUNTER && items.length !== EMPTY_COUNTER;
  const isButtonDisabled = editing !== null && details[editing].value === EMPTY_STRING;

  return (
    <Container>
      <ListHeader>
        <Checkbox data-testid={TEST_ID_TODO_LIST_CHECKBOX} checked={isDone} onChange={handleToggleAll} />
        {TEXT_HEADER_MSG}
      </ListHeader>
      <List>
        {items.map((itemId) => {
          const { value, done } = details[itemId];
          return <TodoItem key={itemId} value={value} id={itemId} done={done} />;
        })}
      </List>
      <ListFooter>
        {getCounterText(counter, items.length)}
        <AddButton
          data-testid={TEST_ID_TODO_LIST_ADD_BUTTON}
          title={TEXT_ADD_ITEM}
          disabled={isButtonDisabled}
          onClick={handleAddItem}
        >
          +
        </AddButton>
      </ListFooter>
    </Container>
  );
};

export default TodoList;
