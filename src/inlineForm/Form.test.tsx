import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from 'react-dom/test-utils';
import Form, { Props } from "./Form";

describe("InlineForm", () => {
  let props: Props;

  beforeEach(() => {
    props = {
      onSave: jest.fn(),
      onCancel: jest.fn(),
    };
  });

  it("should show an empty form if no todo is handed over", () => {
    const { getByTestId } = render(<Form {...props} />);
    expect(getByTestId("title-input")).toHaveValue("");
  });
  it.skip("should call onSave with a new item if one should be created", () => {
    const { getByTestId } = render(<Form {...props} />);
    act(() => {
      fireEvent.change(getByTestId("title-input"), {
        target: { value: "New Todo" },
      });
    });
    fireEvent.click(getByTestId("submit-button"));
    expect(props.onSave).toHaveBeenCalledWith({
      title: "New Todo",
      done: false,
    });
  });
  it.skip("should call onCancel if the cancel button is hit", () => {});
  it.skip("should call onSave with a changed todo on edit", () => {});
});
