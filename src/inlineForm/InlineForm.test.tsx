import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import InlineForm, { Props } from './InlineForm';

describe('InlineForm', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      onSave: jest.fn(),
      onCancel: jest.fn(),
    };
  });

  it("should perform a snapshot test", () => {
    const {container} = render(<InlineForm {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should show an empty form if no todo is handed over', () => {
    const { getByTestId } = render(<InlineForm {...props} />);
    expect(getByTestId('title-input')).toHaveValue('');
  });
  it('should call onSave with a new item if one should be created', async () => {
    await act(async () => {
      render(<InlineForm {...props} />);
    });

    act(() => {
      fireEvent.change(screen.getByTestId('title-input'), {
        target: { value: 'New Todo' },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });
    expect(props.onSave).toHaveBeenCalledWith({
      title: 'New Todo',
      done: false,
      comment: '',
    });
  });
  it('should call onCancel if the cancel button is hit', () => {
    act(() => {
      render(<InlineForm {...props} />);
    });

    act(() => {
      fireEvent.click(screen.getByTestId('cancel-button'));
    });
    expect(props.onCancel).toHaveBeenCalledWith();
  });

  it('should clear the form if the cancel button is hit', () => {
    act(() => {
      render(<InlineForm {...props} />);
    });

    act(() => {
      fireEvent.change(screen.getByTestId('title-input'), {
        target: { value: 'New Todo' },
      });
    });
    expect(screen.getByTestId('title-input')).toHaveValue('New Todo');

    act(() => {
      fireEvent.click(screen.getByTestId('cancel-button'));
    });
    expect(screen.getByTestId('title-input')).toHaveValue('');
  });
  
  it('should call onSave with a changed todo on edit', async () => {
    props.todo = {
      id: 1,
      title: 'New Todo',
      done: true,
      comment: '',
    };

    await act(async () => {
      render(<InlineForm {...props} />);
    });

    act(() => {
      fireEvent.change(screen.getByTestId('title-input'), {
        target: { value: 'Changed Todo' },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });
    expect(props.onSave).toHaveBeenCalledWith({
      id: 1,
      title: 'Changed Todo',
      done: true,
      comment: '',
    });
  });
});
