import React from "react";
import List, { Props } from "./List";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("List", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      todos: [],
      save: jest.fn(),
      remove: jest.fn(),
    };
  });

  it("should render an empty list", () => {
    const { getByTestId, queryByTestId } = render(<List {...props} />);
    const emptyContainer = getByTestId("no-todos");
    const listContainer = queryByTestId("todo-list");
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer).toHaveTextContent("Keine Aufgaben gefunden.");
    expect(listContainer).toBeNull();
  });

  it("should render a list with one item", async () => {
    props.todos = [
      {
        id: 1,
        title: "New Todo",
        done: true,
        comment: "",
      },
    ];

    await act(async () => {
      render(
        <MemoryRouter>
          <List {...props} />
        </MemoryRouter>
      );
    });

    const emptyContainer = screen.queryByTestId("no-todos");
    const listContainer = screen.getByTestId("todo-list");
    const listItems = screen.getAllByTestId("listItem-container");
    expect(listContainer).toBeInTheDocument();
    expect(emptyContainer).toBeNull();
    expect(listItems).toHaveLength(1);
  });

  it("should render a list with multiple items", async () => {
    props.todos = [
      {
        id: 1,
        title: "First Todo",
        done: true,
        comment: "",
      },
      {
        id: 2,
        title: "Second Todo",
        done: false,
        comment: "",
      },
    ];

    await act(async () => {
      render(
        <MemoryRouter>
          <List {...props} />
        </MemoryRouter>
      );
    });

    const emptyContainer = screen.queryByTestId("no-todos");
    const listContainer = screen.getByTestId("todo-list");
    const listItems = screen.getAllByTestId("listItem-container");
    expect(listContainer).toBeInTheDocument();
    expect(emptyContainer).toBeNull();
    expect(listItems).toHaveLength(2);
  });

  it("should contain the form to create a new item", async () => {
    props.todos = [
      {
        id: 1,
        title: "New Todo",
        done: true,
        comment: "",
      },
    ];

    await act(async () => {
      render(
        <MemoryRouter>
          <List {...props} />
        </MemoryRouter>
      );
    });

    const inlineForm = screen.getByTestId("inline-form");
    expect(inlineForm).toBeInTheDocument();
  });

  it("should support inline editing", async () => {
    props.todos = [
      {
        id: 1,
        title: "First Todo",
        done: true,
        comment: "",
      },
      {
        id: 2,
        title: "Second Todo",
        done: false,
        comment: "",
      },
    ];

    await act(async () => {
      render(
        <MemoryRouter>
          <List {...props} />
        </MemoryRouter>
      );
    });

    const inlineForm = screen.getByTestId("inline-form");
    expect(inlineForm).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Second Todo'));
    });

    const notVisibleInlineForm = screen.queryByTestId('inline-form');
    expect(notVisibleInlineForm).toBeNull();
    const visibleInlineForm = screen.getByTestId('inline-form-2');
    expect(visibleInlineForm).toBeInTheDocument();
  });

  it("should only put one item in edit mode", async () => {
    props.todos = [
      {
        id: 1,
        title: "First Todo",
        done: true,
        comment: "",
      },
      {
        id: 2,
        title: "Second Todo",
        done: false,
        comment: "",
      },
    ];

    await act(async () => {
      render(
        <MemoryRouter>
          <List {...props} />
        </MemoryRouter>
      );
    });

    const inlineForm_0_0 = screen.getByTestId('inline-form');
    expect(inlineForm_0_0).toBeInTheDocument();
    const inlineForm_0_1 = screen.queryByTestId('inline-form-1');
    expect(inlineForm_0_1).toBeNull();
    const inlineForm_0_2 = screen.queryByTestId('inline-form-2');
    expect(inlineForm_0_2).toBeNull();

    await act(async () => {
      fireEvent.click(screen.getByText('First Todo'));
    });

    const inlineForm_1_0 = screen.queryByTestId('inline-form');
    expect(inlineForm_1_0).toBeNull();
    const inlineForm_1_1 = screen.getByTestId('inline-form-1');
    expect(inlineForm_1_1).toBeInTheDocument();
    const inlineForm_1_2 = screen.queryByTestId('inline-form-2');
    expect(inlineForm_1_2).toBeNull();

    await act(async () => {
      fireEvent.click(screen.getByText('Second Todo'));
    });

    const inlineForm_2_0 = screen.queryByTestId('inline-form');
    expect(inlineForm_2_0).toBeNull();
    const inlineForm_2_1 = screen.queryByTestId('inline-form-1');
    expect(inlineForm_2_1).toBeNull();
    const inlineForm_2_2 = screen.getByTestId('inline-form-2');
    expect(inlineForm_2_2).toBeInTheDocument();
  });
  
  it("should support the removal of an item", () => {});
  it("should be possible to change the state of an item", () => {});
});
