import React from "react";
import { textColor } from "../colors";
import { Subtask, Todo } from "../Todo";

type ColorProps = {
  color: string;
}

const TitleBorderTop: React.FC<ColorProps> = ({color}) => {
  return (
    <div className="flex relative top-0">
      <div
        style={{
          width: 5,
          height: 5,
          backgroundColor: color,
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: color,
        }}
      ></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: color,
          transform: "skew(70deg)",
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

const TitleBorderBottom: React.FC<ColorProps> = ({color }) => {
  return (
    <div style={{ display: "flex", position: "relative", bottom: 0 }}>
      <div
        style={{
          width: 5,
          height: 5,
          backgroundColor: color,
        }}
      ></div>
      <div
        style={{
          width: 110,
          height: 1,
          backgroundColor: color,
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
          backgroundColor: color,
          transform: "skew(70deg)",
        }}
      ></div>
      <div
        style={{
          width: 90,
          height: 1,
          backgroundColor: color,
          marginTop: 11,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};


type Props = {
  todo: Todo | Subtask;
  color: string;
  overdue: boolean;
};
export const TitleContainer: React.FC<Props> = ({ todo, color, overdue }) => {
  const backgroundColor = ((todo as Todo).category && (todo as Todo).category?.color)
    ? (todo as Todo).category?.color
    : "rgb(31, 41, 55)";
  let dueColor = textColor.active;
  if (todo.done) {
    dueColor = textColor.inactive;
  } else if (overdue) {
    dueColor = textColor.overdue;
  }

  const marginLeft = 10;
  return (
    <div>
      <TitleBorderTop color={color} />
      <div className="flex">
        {todo && (
          <div
            style={{
              height: 31,
              width: 5,
              top: 5,
              backgroundColor,
              zIndex: (todo as Todo).category && (todo as Todo).category?.color ? 100 : 0,
            }}
            className={'absolute ' + (todo.done ? 'opacity-30' : '')}
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
        {(todo as Todo).due && (
            <div className="transform rotate-90 text-xs absolute" style={{right: -5, top: 20, color: dueColor}} data-testid="listitem-due">
              {new Intl.DateTimeFormat(undefined, {
                day: "2-digit",
                month: "2-digit",
              }).format(new Date((todo as Todo).due))}
            </div>
          )}
      </div>
      <TitleBorderBottom color={color} />
    </div>
  );
};

const ButtonContainerTop: React.FC<ColorProps> = ({color}) => {
  return (
    <div className="flex relative">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

const ButtonContainerBottom: React.FC<ColorProps> = ({ color }) => {
  return (
    <div className="flex relative bottom-0">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 8,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: color,
          marginTop: 12,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 8,
        }}
      ></div>
    </div>
  );
};

export const ButtonContainer: React.FC<ColorProps> = ({ children, color }) => {
  return (
    <div style={{ marginLeft: 5 }} className="relative">
      <ButtonContainerTop color={color} />
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
      <ButtonContainerBottom color={color} />
    </div>
  );
};

const ActionsContainerTop: React.FC<ColorProps> = ({color}) => {
  return (
    <div className="flex relative">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: color,
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: color,
          marginTop: 0,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 0,
        }}
      ></div>
    </div>
  );
};

const ActionsContainerBottom: React.FC<ColorProps> = ({color}) => {
  return (
    <div className="flex relative bottom-0">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 30,
          height: 1,
          backgroundColor: color,
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
          backgroundColor: color,
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        style={{
          width: 50,
          height: 1,
          backgroundColor: color,
          marginTop: 4,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: color,
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
  { children: JSX.Element[] } & ColorProps
> = ({ children, color }) => {
  return (
    <div style={{ marginLeft: 5 }} className="relative">
      <ActionsContainerTop color={color} />
      <div className="flex">
        {children &&
          children.map((child, i) => (
            <InnerButtonContainer key={i}>{child}</InnerButtonContainer>
          ))}
      </div>
      <ActionsContainerBottom color={color} />
    </div>
  );
};
