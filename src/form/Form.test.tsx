import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Form from './Form.container';

describe('Form', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  it('should render an empty form', async () => {
    act(() => {render(<MemoryRouter>
      <Form></Form>
    </MemoryRouter>);
    });
    expect(screen.getByTestId('title')).toHaveValue('');
    expect(screen.getByTestId('done')).not.toBeChecked();
    expect(screen.getByTestId('comment')).toHaveValue('');
  });
  it('should load an existing entry into the form', async () => {
    (fetch as any).mockResponse(JSON.stringify([{ id: 1, title: "first todo", done: true, comment: 'comment' }]));
    await act(async () => {
      render(<MemoryRouter initialEntries={["/edit/1"]}>
        <Route path="/edit/:id">
          <Form></Form>
        </Route>
      </MemoryRouter>);
    });
    expect(screen.getByTestId('title')).toHaveValue('first todo');
    expect(screen.getByTestId('done')).toBeChecked();
    expect(screen.getByTestId('comment')).toHaveValue('comment');
  });
  it('should save a new entry', () => {});
  it('should save an existing entry', () => {});
  it('should show a list of subtasks', () => {});
})