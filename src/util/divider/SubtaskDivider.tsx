import React from "react";
import { TodoInput } from "../../Todo";
import { Divider } from "./Divider";

type Props = {
  todo: TodoInput;
};

const SubtaskDivider: React.FC<Props> = ({ todo }) => {
  return (
    <Divider containerStyle={{ margin: "10px -10px" }}>
      Subtasks{" "}
      {todo &&
        todo.subtasks &&
        todo.subtasks?.length > 0 &&
        `(${todo.subtasks.length})`}
    </Divider>
  );
};

export default SubtaskDivider;
