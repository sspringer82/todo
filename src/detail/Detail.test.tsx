import { render, screen } from "@testing-library/react";
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
    expect(title).toHaveTextContent('New Todo');
    expect(comment).toHaveTextContent('Todo Comment');
    expect(done).toBeInTheDocument();
  });
  it("should render details of a todo with subtasks", () => {

  });
  it("should be possible to change the state of the todo", () => {});
});
