import React from "react";

import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import { colors } from "../../colors";

type Props = {
  label: string;
  onChange: (e: CheckboxChangeEvent) => void;
  checked: boolean;
  name: string;
  ["data-testid"]: string;
};

const Checkbox: React.FC<Props> = (props) => {
  return (
    <div className="border relative p-1" style={{ borderColor: colors.active }}>
      <label
        className="absolute bg-gray-800 text-xs px-1"
        style={{ top: -12, left: 0, color: colors.active }}
      >
        {props.label}
      </label>
      <div
        role="checkbox"
        aria-checked={props.checked}
        data-testid={props["data-testid"]}
        onClick={() => {
          props.onChange!({
            type: "checkboxEvent",
            target: { checked: !props.checked, name: props.name, value: "" },
          });
        }}
      >
        {props.checked ? (
          <CheckIcon style={{ color: "limegreen" }} />
        ) : (
          <ClearIcon style={{ color: "red" }} />
        )}
      </div>
    </div>
  );
};

export default Checkbox;

export type CheckboxChangeEvent = {
  target: {
    name: string;
    checked: boolean;
    value: string;
  };
  type: "checkboxEvent";
};
