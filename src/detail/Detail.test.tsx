import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Detail, { Props } from "./Detail";

describe("Detail", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      todo: { id: 1, title: "New Todo", done: true, comment: "Todo Comment" },
      onSave: jest.fn(),
    };
  });

  it("should render details of a todo", async () => {
    const {getByTestId} = render(<Detail {...props} />);
    const title = getByTestId('detail-title');
    const comment = getByTestId('detail-comment');
    const done = getByTestId('done-done');
    const noSubtasks = getByTestId('detail-nosubtasks');
    expect(title).toHaveTextContent('New Todo');
    expect(comment).toHaveTextContent('Todo Comment');
    expect(done).toBeInTheDocument();
    expect(noSubtasks).toBeInTheDocument();
  });
  it("should render details of a todo with subtasks", () => {
    props.todo.subtask =  [
      {
        "id": 11,
        "done": true,
        "title": "Subtask one",
        "todoId": 1
      },
      {
        "id": 12,
        "done": false,
        "title": "Subtask two",
        "todoId": 1
      }
    ];
    const {getAllByTestId, getByText, queryByTestId} = render(<MemoryRouter><Detail {...props} /></MemoryRouter>);
    const items = getAllByTestId('listItem-container');
    const todo = getByText('New Todo');
    const st1 = getByText('Subtask one');
    const st2 = getByText('Subtask two');
    const noSubtasks = queryByTestId('detail-nosubtasks');
    expect(items).toHaveLength(2);
    expect(todo).toBeInTheDocument();
    expect(st1).toBeInTheDocument();
    expect(st2).toBeInTheDocument();
    expect(noSubtasks).toBeNull();
  });
  it("should be possible to change the state of the todo", () => {});
});
