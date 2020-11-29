import {
  EMPTY_COUNTER,
  TEXT_EMPTY_LIST,
  TEXT_ALL_DONE,
  TEXT_ONE_ITEM_LEFT,
  TEXT_ITEMS_LEFT,
  SINGLE_LEFT,
} from './constants';

export const getCounterText = (counter, all) => {
  if (counter <= EMPTY_COUNTER && all === EMPTY_COUNTER) {
    return TEXT_EMPTY_LIST;
  }
  if (counter === EMPTY_COUNTER && all > EMPTY_COUNTER) {
    return TEXT_ALL_DONE;
  }
  if (counter === SINGLE_LEFT) {
    return TEXT_ONE_ITEM_LEFT;
  }
  return `${counter}${TEXT_ITEMS_LEFT}`;
};

export const focusComponent = (element) => {
  element.current.focus();
};
export const blurComponent = (element) => {
  element.current.blur();
};
