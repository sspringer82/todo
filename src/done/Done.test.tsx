import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Done, { Props } from './Done';
import { Todo } from '../Todo';

describe('Done', () => {

  let props: Props;

  beforeEach(() => {
    props = {
      onSave: jest.fn(),
      todo:  {
        id: 1,
        title: 'Test',
        done: false
      }
    }
  });

  it("should perform a snapshot test", () => {
    const {container} = render(<Done {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should toggle a not done task to done', () => {
    const {getByTestId} = render(<Done {...props} />);
    fireEvent.click(getByTestId('done-button'));

    const expected = {
      id: 1,
      title: 'Test',
      done: true
    }
    expect(props.onSave).toHaveBeenCalledWith(expected);
  });

  it('should toggle a done task to not done', () => {
    props.todo.done = true;
    
    const {getByTestId} = render(<Done {...props} />);
    fireEvent.click(getByTestId('done-button'));

    const expected = {
      id: 1,
      title: 'Test',
      done: false
    }
    expect(props.onSave).toHaveBeenCalledWith(expected);
  });

  it('should have the done icon if done', () => {
    props.todo.done = true;
    
    const {getByTestId, queryByTestId} = render(<Done {...props} />);

    const done = getByTestId('done-done');
    const notDone = queryByTestId('done-notdone');

    expect(done).toBeInTheDocument();
    expect(notDone).toBeNull();
  });

  it('should have the notdone icon if notdone', () => {
    const {getByTestId, queryByTestId} = render(<Done {...props} />);

    const notDone = getByTestId('done-notdone');
    const done = queryByTestId('done-done');

    expect(notDone).toBeInTheDocument();
    expect(done).toBeNull();
  });
});
