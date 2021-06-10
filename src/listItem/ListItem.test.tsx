import { fireEvent, queryByTestId, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, BrowserRouter, MemoryRouter } from "react-router-dom";
import { Todo } from "../Todo";
import ListItem, { Props } from "./ListItem";

jest.unmock('proposal-temporal')

describe("ListItem", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      editModeEnabled: false,
      todo: {
        id: 1,
        title: "Test Title",
        done: false,
        created: "2021-06-01T08:15:00",
        due: "",
      } as Todo,
      canEdit: true,
      onEditModeEnable: jest.fn(),
      onDelete: jest.fn(),
      onSave: jest.fn(),
    };
  });

  it("should display the title of the todo", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    expect(getByTestId("title")).toHaveTextContent("Test Title");
  });

  it("it should call onSave with a changed object if done was hit", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("done-button"));
    const expected = {
      id: 1,
      title: "Test Title",
      done: true,
      created: "2021-06-01T08:15:00",
      due: "",
    };
    expect(props.onSave).toHaveBeenCalledWith(expected);
  });

  it("should render all controls (done, delete, edit and detail)", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    expect(getByTestId("done-button")).toBeInTheDocument();
    expect(getByTestId("delete-button")).toBeInTheDocument();
    expect(getByTestId("edit-link")).toBeInTheDocument();
    expect(getByTestId("detail-link")).toBeInTheDocument();
  });

  it("should not contain an edit link if canEdit is false", () => {
    props.canEdit = false;
    const { queryByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    expect(queryByTestId("edit-link")).toBeNull();
  });

  it("should call onEnableEdit, if the title is clicked", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("title"));
    expect(props.onEditModeEnable).toHaveBeenCalledWith(1);
  });
  it("should display the inline form, if editMode enabled is true", () => {
    props.editModeEnabled = true;
    const { queryByTestId, getByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    expect(queryByTestId("listItem-container")).toBeNull();
    expect(getByTestId("inline-form-1")).toBeInTheDocument();
  });
  it("should call onDelete, if delete is hit", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ListItem {...props} />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("delete-button"));
    expect(props.onDelete).toHaveBeenCalledWith(1);
  });
  it("should navigate to edit, if edit is hit", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <ListItem {...props} />
      </Router>
    );
    fireEvent.click(getByTestId("edit-link"));
    expect(history.location.pathname).toBe("/edit/1");
  });
  it("should navigate to detail, if detail is hit", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <ListItem {...props} />
      </Router>
    );
    fireEvent.click(getByTestId("detail-link"));
    expect(history.location.pathname).toBe("/detail/1");
  });

  describe("due date", () => {
    it("should not show the due container, if no due date is set", () => {
      const { queryByTestId } = render(
        <MemoryRouter>
          <ListItem {...props} />
        </MemoryRouter>
      );
      expect(queryByTestId("listitem-due")).toBeNull();
    });

    it("should show the due container, if no due date is set", () => {
      (props.todo as Todo).due = "2021-06-01T08:15:00";

      const { getByTestId } = render(
        <MemoryRouter>
          <ListItem {...props} />
        </MemoryRouter>
      );
      const dueElement = getByTestId("listitem-due");
      expect(dueElement).toBeInTheDocument();
      expect(dueElement).toHaveTextContent("01/06");
    });
  });
});
