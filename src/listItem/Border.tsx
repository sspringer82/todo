import React from "react";
import { colors, textColor } from "../colors";
import { Todo } from "../Todo";

type Props = {
  todo: Todo;
};

const TitleBorderTop: React.FC<Props> = ({ todo: { done } }) => {
  return (
    <div className="flex relative top-0">
      <div
        style={{
          width: 5,
          height: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          zIndex: 1
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active, 
        }}
      ></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: done ? colors.inactive : colors.active,
          transform: 'skew(70deg)',
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

const TitleBorderBottom: React.FC<Props> = ({ todo: { done } }) => {
  return (
    <div style={{ display: "flex", position: "relative", bottom: 0 }}>
      <div
        style={{
          width: 5,
          height: 5,
          backgroundColor: done ? colors.inactive : colors.active,
        }}
      ></div>
      <div
        style={{
          width: 110,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 4,
        }}
      ></div>
      <div
        style={{
          marginTop: 4,
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: done ? colors.inactive : colors.active,
          transform: 'skew(70deg)',
        }}
      ></div>
      <div
        style={{
          width: 90,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 11,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

export const TitleContainer: React.FC<Props> = ({ todo }) => {
  const backgroundColor = todo.color ? todo.color : "rgb(31, 41, 55)";
  const marginLeft = 10 ;
  return (
    <div>
      <TitleBorderTop todo={todo} />
      <div className="flex">
        {todo && (
          <div
            style={{
              height: 31,
              width: 5,
              top: 5,
              backgroundColor,
              zIndex: todo.color ? 100 : 0,
            }}
            className="absolute"
          ></div>
        )}
        <div
          style={{
            marginLeft,
            color: todo.done ? textColor.inactive : textColor.active,
          }}
          className="relative"
        >
          {todo?.title}
        </div>
      </div>
      <TitleBorderBottom todo={todo} />
    </div>
  );
};

const ButtonContainerTop: React.FC<Props> = ({ todo: { done } }) => {
  return (
    <div className="flex relative">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

const ButtonContainerBottom: React.FC<Props> = ({ todo: { done } }) => {
  return (
    <div className="flex relative bottom-0">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 8,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 12,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 8,
        }}
      ></div>
    </div>
  );
};

export const ButtonContainer: React.FC<Props> = ({ children, todo }) => {
  return (
    <div style={{ marginLeft: 5 }} className="relative">
      <ButtonContainerTop todo={todo} />
      <div className="relative">
        &nbsp;
        <div
          style={{
            top: 1,
            left: 12,
          }}
          className="absolute"
        >
          {children}
        </div>
      </div>
      <ButtonContainerBottom todo={todo} />
    </div>
  );
};

const ActionsContainerTop: React.FC<Props> = ({ todo: { done } }) => {
  return (
    <div className="flex relative">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: done ? colors.inactive : colors.active,
          transform: 'skew(-70deg)',
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 0,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 0,
        }}
      ></div>
    </div>
  );
};

const ActionsContainerBottom: React.FC<Props> = ({ todo: { done } }) => {
  return (
    <div className="flex relative bottom-0">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 30,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 11,
        }}
      ></div>
      <div
        style={{
          marginTop: 4,
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: done ? colors.inactive : colors.active,
          transform: 'skew(-70deg)',
        }}
      ></div>
      <div
        style={{
          width: 50,
          height: 1,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 4,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: done ? colors.inactive : colors.active,
          marginTop: 0,
        }}
      ></div>
    </div>
  );
};

const InnerButtonContainer: React.FC = ({ children }) => {
  return <div style={{ margin: "0 7px" }}>{children}</div>;
};

export const ActionsContainer: React.FC<
  { children: JSX.Element[] } & Props
> = ({ children, todo }) => {
  return (
    <div style={{ marginLeft: 5 }} className="relative">
      <ActionsContainerTop todo={todo} />
      <div className="flex">
        {children &&
          children.map((child, i) => (
            <InnerButtonContainer key={i}>{child}</InnerButtonContainer>
          ))}
      </div>
      <ActionsContainerBottom todo={todo} />
    </div>
  );
};
