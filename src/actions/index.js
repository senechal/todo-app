import {
  ADD_ITEM,
  CHANGE_ITEM,
  REMOVE_ITEM,
  TOGGLE_DONE,
  TOOGLE_ALL_DONE,
  START_EDITING,
  END_EDITING,
} from './actionTypes';

export const addItem = () => ({ type: ADD_ITEM });

export const changeItem = (value, id) => ({
  type: CHANGE_ITEM,
  value,
  id,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
});

export const toggleItem = (id) => ({ type: TOGGLE_DONE, id });

export const toggleAll = () => ({ type: TOOGLE_ALL_DONE });

export const startEditing = (id) => ({ type: START_EDITING, id });

export const endEditing = () => ({ type: END_EDITING });
