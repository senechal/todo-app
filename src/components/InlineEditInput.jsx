import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import delay from 'lodash/delay';
import {
  INLINE_EDIT_FOCUS_DELAY,
  INLINE_EDIT_ENTER_KEY,
  EMPTY_STRING,
  TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT,
  TEST_ID_INLINE_EDIT_INPUT,
} from 'utils/constants';
import { focusComponent, blurComponent } from 'utils';
import { Input, ItemContent } from './styles';

const InlineEditInput = ({
  value, onStartEdit, onEndEdit, ...props
}) => {
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);

  const handleEdit = useCallback(() => {
    setEdit(true);
    delay(() => {
      focusComponent(inputRef);
      onStartEdit();
    }, INLINE_EDIT_FOCUS_DELAY);
  }, [onStartEdit]);

  const handleBlur = useCallback(() => {
    setEdit(false);
    onEndEdit();
  }, [onEndEdit]);

  const handleKeyPress = ({ charCode }) => {
    if (charCode === INLINE_EDIT_ENTER_KEY) {
      blurComponent(inputRef);
    }
  };

  useEffect(() => {
    if (value === EMPTY_STRING && edit === false) {
      handleEdit();
    }
  }, [value, edit, handleEdit]);

  return (
    <>
      <Input
        data-testid={TEST_ID_INLINE_EDIT_INPUT}
        ref={inputRef}
        {...props}
        value={value}
        onBlur={handleBlur}
        hide={!edit}
        onKeyPress={handleKeyPress}
      />
      <ItemContent
        data-testid={TEST_ID_INLINE_EDIT_INPUT_ITEM_CONTENT}
        onClick={handleEdit}
        hide={edit}
      >
        {value}
      </ItemContent>
    </>
  );
};

InlineEditInput.propTypes = {
  value: PropTypes.string,
  onStartEdit: PropTypes.func,
  onEndEdit: PropTypes.func,
};

InlineEditInput.defaultProps = {
  value: undefined,
  onStartEdit: Function.prototype,
  onEndEdit: Function.prototype,
};

export default InlineEditInput;
