import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Done from './Done';

describe('Done', () => {
  it('should toggle a not done task to done', () => {
    const todo = {
      id: 1,
      title: 'Test',
      done: false
    };
    const onSave = jest.fn();
    
    const {getByTestId} = render(<Done todo={todo} onSave={onSave} />);
    fireEvent.click(getByTestId('done-button'));

    const expected = {
      id: 1,
      title: 'Test',
      done: true
    }
    expect(onSave).toHaveBeenCalledWith(expected);
  });

  it('should toggle a done task to not done', () => {
    const todo = {
      id: 1,
      title: 'Test',
      done: true
    };
    const onSave = jest.fn();
    
    const {getByTestId} = render(<Done todo={todo} onSave={onSave} />);
    fireEvent.click(getByTestId('done-button'));

    const expected = {
      id: 1,
      title: 'Test',
      done: false
    }
    expect(onSave).toHaveBeenCalledWith(expected);
  });
});
