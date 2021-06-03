import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Detail, { Props } from "./Detail";

describe("Detail", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      todo: {
        id: 1,
        title: "New Todo",
        done: true,
        comment: "Todo Comment",
        due: "",
        created: "2021-06-01T08:15:00",
      },
      onSave: jest.fn(),
    };
  });

  it("should perform a snapshot test", () => {
    const { container } = render(<Detail {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render details of a todo", async () => {
    const { getByTestId } = render(<Detail {...props} />);
    const title = getByTestId("detail-title");
    const comment = getByTestId("detail-comment");
    const done = getByTestId("done-done");
    const noSubtasks = getByTestId("detail-nosubtasks");
    expect(title).toHaveTextContent("New Todo");
    expect(comment).toHaveTextContent("Todo Comment");
    expect(done).toBeInTheDocument();
    expect(noSubtasks).toBeInTheDocument();
  });
  it("should render details of a todo with subtasks", () => {
    props.todo.subtasks = [
      {
        id: 11,
        done: true,
        title: "Subtask one",
        todoId: 1,
        created: "2021-06-01T08:15:00",
      },
      {
        id: 12,
        done: false,
        title: "Subtask two",
        todoId: 1,
        created: "2021-06-01T08:15:00",
      },
    ];
    const { getAllByTestId, getByText, queryByTestId } = render(
      <MemoryRouter>
        <Detail {...props} />
      </MemoryRouter>
    );
    const items = getAllByTestId("listItem-container");
    const todo = getByText("New Todo");
    const st1 = getByText("Subtask one");
    const st2 = getByText("Subtask two");
    const noSubtasks = queryByTestId("detail-nosubtasks");
    expect(items).toHaveLength(2);
    expect(todo).toBeInTheDocument();
    expect(st1).toBeInTheDocument();
    expect(st2).toBeInTheDocument();
    expect(noSubtasks).toBeNull();
  });
  it("should be possible to change the state of the todo", async () => {
    const { getByTestId } = render(<Detail {...props} />);

    await act(async () => {
      await fireEvent.click(getByTestId("done-button"));
    });

    expect(props.onSave).toHaveBeenCalledWith({
      comment: "Todo Comment",
      done: false,
      id: 1,
      title: "New Todo",
      created: "2021-06-01T08:15:00",
      due: ""
    });
  });

  it("should show the due date if it is set", () => {
    props.todo.due = "2024-06-30T08:15:00";
    const { getByTestId } = render(<Detail {...props} />);
    const dueElement = getByTestId('detail-due');
    expect(dueElement).toBeInTheDocument();
    expect(dueElement).toHaveTextContent('Due: 2024-06-30T08:15:00');
  });

  it("should not contain a due date, if it is not set", () => {
    const { queryByTestId } = render(<Detail {...props} />);
    expect(queryByTestId('detail-due')).toBeNull();
  });
});
