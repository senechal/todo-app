import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import * as styles from '../styles';

describe('Testing renders for style components', () => {
  const { ItemContent, Input, ...uncontrolledComponents } = styles;

  describe('Uncontrolled components', () => {
    Object.keys(uncontrolledComponents).forEach((displayName) => {
      describe(displayName, () => {
        it('should render correctly', () => {
          const Component = uncontrolledComponents[displayName];
          const { container } = render(<Component />);
          expect(container).toMatchSnapshot();
        });
      });
    });
  });
  describe('Controlled components', () => {
    describe('ItemContent', () => {
      it('should render correctly with hide = false', () => {
        const { container } = render(<ItemContent hide={false} />);
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with hide = true', () => {
        const { container } = render(<ItemContent hide />);
        expect(container).toMatchSnapshot();
      });
    });
    describe('Input', () => {
      it('should render correctly with hide = false', () => {
        const { container } = render(<Input hide={false} />);
        expect(container).toMatchSnapshot();
      });

      it('should render correctly with hide = true', () => {
        const { container } = render(<Input hide />);
        expect(container).toMatchSnapshot();
      });
    });
  });
});
