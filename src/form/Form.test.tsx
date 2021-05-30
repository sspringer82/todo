import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { Todo } from "../Todo";
import Form from "./Form.container";

describe("Form", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should perform a snapshot test", () => {
    const { container } = render(
      <MemoryRouter>
        <Form></Form>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render an empty form", async () => {
    act(() => {
      render(
        <MemoryRouter>
          <Form></Form>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("title")).toHaveValue("");
    expect(screen.getByTestId("done")).not.toBeChecked();
    expect(screen.getByTestId("comment")).toHaveValue("");
  });
  it("should load an existing entry into the form", async () => {
    (fetch as any).mockResponse(
      JSON.stringify([
        { id: 1, title: "first todo", done: true, comment: "comment" },
      ])
    );
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/edit/1"]}>
          <Route path="/edit/:id">
            <Form></Form>
          </Route>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("title")).toHaveValue("first todo");
    expect(screen.getByTestId("done")).toBeChecked();
    expect(screen.getByTestId("comment")).toHaveValue("comment");
  });
  it("should save a new entry", async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Form></Form>
        </MemoryRouter>
      )
    );
    act(() => {
      fireEvent.change(screen.getByTestId("title"), {
        target: { value: "New Title" },
      });
      fireEvent.click(screen.getByTestId("done"));
      fireEvent.change(screen.getByTestId("comment"), {
        target: { value: "New Comment" },
      });
    });
    expect(screen.getByTestId("title")).toHaveValue("New Title");
    expect(screen.getByTestId("done")).toBeChecked();
    expect(screen.getByTestId("comment")).toHaveValue("New Comment");
    (fetch as any).mockResponse(
      JSON.stringify([
        { id: 1, title: "New Title", done: true, comment: "New Comment" },
      ])
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("submit"));
    });
    expect(fetchMock.mock.calls[0][1].method).toBe("POST");
    expect(fetchMock.mock.calls[0][1].headers["Content-Type"]).toBe(
      "Application/json"
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.title).toBe("New Title");
    expect(body.done).toBe(true);
    expect(body.comment).toBe("New Comment");
  });
  it("should save an existing entry", async () => {
    (fetch as any).mockResponseOnce(
      JSON.stringify([
        {
          id: 2,
          title: "Existing Todo",
          done: true,
          comment: "Existing Comment",
        },
      ])
    );
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/edit/2"]}>
          <Route path="/edit/:id">
            <Form></Form>
          </Route>
        </MemoryRouter>
      );
    });
    expect(screen.getByTestId("title")).toHaveValue("Existing Todo");
    expect(screen.getByTestId("done")).toBeChecked();
    expect(screen.getByTestId("comment")).toHaveValue("Existing Comment");
    act(() => {
      fireEvent.change(screen.getByTestId("title"), {
        target: { value: "Existing Todo Modified" },
      });
      fireEvent.click(screen.getByTestId("done"));
      fireEvent.change(screen.getByTestId("comment"), {
        target: { value: "Existing Comment Modified" },
      });
    });
    expect(screen.getByTestId("title")).toHaveValue("Existing Todo Modified");
    expect(screen.getByTestId("done")).not.toBeChecked();
    expect(screen.getByTestId("comment")).toHaveValue(
      "Existing Comment Modified"
    );
    (fetch as any).mockResponseOnce(
      JSON.stringify([
        {
          id: 2,
          title: "Existing Todo Modified",
          done: false,
          comment: "Existing Comment Modified",
        },
      ])
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("submit"));
    });
    expect(fetchMock.mock.calls[1][1].method).toBe("PUT");
    expect(fetchMock.mock.calls[1][1].headers["Content-Type"]).toBe(
      "Application/json"
    );
    const body = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(body.title).toBe("Existing Todo Modified");
    expect(body.done).toBe(false);
    expect(body.comment).toBe("Existing Comment Modified");
  });
  it("should show a list of subtasks", async () => {
    const response: Todo[] = [
      {
        id: 1,
        title: "Get up",
        done: true,
        subtasks: [],
      },
      {
        id: 2,
        title: "Eat",
        done: true,
        subtasks: [
          {
            id: 1,
            title: "sit down",
            todoId: 1,
            done: false,
          },
          {
            id: 2,
            title: "open your mouth",
            todoId: 1,
            done: false,
          },
        ],
      },
      {
        id: 3,
        title: "Sleep",
        done: false,
        subtasks: [],
      },
    ];

    (fetch as any).mockResponse(JSON.stringify(response));
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/edit/2"]}>
          <Route path="/edit/:id">
            <Form></Form>
          </Route>
        </MemoryRouter>
      );
    });
    expect(screen.getAllByTestId("title")[0]).toHaveValue("Eat");
    expect(screen.getByTestId("done")).toBeChecked();
    expect(screen.getByTestId("comment")).toHaveValue("");

    expect(screen.getAllByTestId("listItem-container")).toHaveLength(2);
    expect(screen.getAllByTestId("title")[1]).toHaveTextContent("sit down");
    expect(screen.getAllByTestId("title")[2]).toHaveTextContent(
      "open your mouth"
    );
  });
});
