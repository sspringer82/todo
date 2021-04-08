import { fireEvent, queryByTestId, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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

  it.skip("should call onEnableEdit, if the title is clicked", () => {});
  it.skip("should display the inline form, if editMode enabled is true", () => {});
  it.skip("should call onDelete, if delete is hit", () => {});
  it.skip("should navigate to edit, if edit is hit", () => {});
  it.skip("should navigate to detail, if detail is hit", () => {});
});
