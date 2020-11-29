import {
  ADD_ITEM,
  CHANGE_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE,
  TOOGLE_ALL_DONE,
  START_EDITING,
  END_EDITING,
} from 'actions/actionTypes';
import { EMPTY_STRING, INCREMENT, EMPTY_COUNTER } from 'utils/constants';

export const initialState = {
  autoIncrement: 0,
  counter: 0,
  items: [],
  details: {},
  editing: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const id = state.autoIncrement;
      return {
        ...state,
        counter: state.counter + INCREMENT,
        autoIncrement: state.autoIncrement + INCREMENT,
        details: {
          ...state.details, [id]: { id, value: EMPTY_STRING, done: false },
        },
        items: [...state.items, id],
      };
    }
    case CHANGE_ITEM: {
      const { id, value } = action;
      return {
        ...state,
        details: {
          ...state.details,
          [id]: {
            ...state.details[id], value,
          },
        },
      };
    }
    case REMOVE_ITEM: {
      const { id } = action;
      const { [id]: toBeRemoved, ...details } = state.details;
      return {
        ...state,
        items: state.items.filter((item) => item !== id),
        details,
        counter: state.counter - INCREMENT,
      };
    }
    case TOGGLE_DONE: {
      const { id } = action;
      const { details: { [id]: { done } }, counter } = state;
      return {
        ...state,
        counter: done ? counter + INCREMENT : counter - INCREMENT,
        details: {
          ...state.details,
          [id]: {
            ...state.details[id], done: !done,
          },
        },
      };
    }
    case TOOGLE_ALL_DONE: {
      const { counter, items } = state;
      const done = counter !== EMPTY_COUNTER;
      return {
        ...state,
        counter: done ? EMPTY_COUNTER : items.length,
        details: state.items.reduce((acc, id) => {
          const { details: { [id]: item } } = state;
          return { ...acc, [id]: { ...item, done } };
        }, {}),
      };
    }
    case START_EDITING: {
      const { id } = action;
      return {
        ...state,
        editing: id,
      };
    }
    case END_EDITING:
      return {
        ...state,
        editing: null,
      };
    default:
      return state;
  }
};
