import React from 'react';
import List, { Props } from './List';
import {act, render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router';

describe('List', () => {

  let props: Props;

  beforeEach(() => {
    props = {
      todos: [],
      save: jest.fn(),
      remove: jest.fn()
    };
  });

  it('should render an empty list', () => {
    const {getByTestId, queryByTestId} = render(<List {...props} />);
    const emptyContainer = getByTestId('no-todos');
    const listContainer = queryByTestId('todo-list');
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer).toHaveTextContent('Keine Aufgaben gefunden.');
    expect(listContainer).toBeNull();
  });

  it('should render a list with one item', async () => {
    props.todos = [{
      id: 1,
      title: 'New Todo',
      done: true,
      comment: '',
    }];

    await act(async () => {
      render(<MemoryRouter><List {...props} /></MemoryRouter>);
    });

    const emptyContainer = screen.queryByTestId('no-todos');
    const listContainer = screen.getByTestId('todo-list');
    const listItems = screen.getAllByTestId('listItem-container');
    expect(listContainer).toBeInTheDocument();
    expect(emptyContainer).toBeNull();
    expect(listItems).toHaveLength(1);
  });

  it('should render a list with multiple items', () => {});
  it('should contain the form to create a new item', () => {});
  it('should support inline editing', () => {});
  it('should only put one item in edit mode', () => {});
  it('should support the removal of an item', () => {});
  it('should be possible to change the state of an item', () => {});

});