import { fireEvent, queryByTestId, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router, BrowserRouter } from "react-router-dom";
import ListItem, { Props } from "./ListItem";

describe("ListItem", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      editModeEnabled: false,
      todo: {
        id: 1,
        title: "Test Title",
        done: false,
      },
      canEdit: true,
      onEditModeEnable: jest.fn(),
      onDelete: jest.fn(),
      onSave: jest.fn(),
    };
  });

  it("should display the title of the todo", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    expect(getByTestId("title")).toHaveTextContent("Test Title");
  });

  it("it should call onSave with a changed object if done was hit", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId('done-button'));
    const expected = {
      id: 1,
      title: 'Test Title',
      done: true
    }
    expect(props.onSave).toHaveBeenCalledWith(expected);
  });

  it('should render all controls (done, delete, edit and detail)', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    expect(getByTestId('done-button')).toBeInTheDocument();
    expect(getByTestId('delete-button')).toBeInTheDocument();
    expect(getByTestId('edit-link')).toBeInTheDocument();
    expect(getByTestId('detail-link')).toBeInTheDocument();
  });

  it("should not contain an edit link if canEdit is false", () => {
    props.canEdit = false;
    const { queryByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    expect(queryByTestId('edit-link')).toBeNull(); 
  });

  it("should call onEnableEdit, if the title is clicked", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId('title'));
    expect(props.onEditModeEnable).toHaveBeenCalledWith(1);
  });
  it("should display the inline form, if editMode enabled is true", () => {
    props.editModeEnabled = true;
    const { queryByTestId, getByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    expect(queryByTestId('listItem-container')).toBeNull();
    expect(getByTestId('inline-form-1')).toBeInTheDocument();
  });
  it("should call onDelete, if delete is hit", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ListItem {...props} />
      </BrowserRouter>
    );
    fireEvent.click(getByTestId('delete-button'));
    expect(props.onDelete).toHaveBeenCalledWith(1);
  });
  it("should navigate to edit, if edit is hit", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <ListItem {...props} />
      </Router>
    );
    fireEvent.click(getByTestId('edit-link'));
    expect(history.location.pathname).toBe('/edit/1');
  });
  it("should navigate to detail, if detail is hit", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <ListItem {...props} />
      </Router>
    );
    fireEvent.click(getByTestId('detail-link'));
    expect(history.location.pathname).toBe('/detail/1');
  });
});

