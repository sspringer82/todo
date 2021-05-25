import React, { CSSProperties } from "react";
import { colors } from "../../colors";

type Props = {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const Corner: React.FC<Props> = ({ position }) => {
  let style: CSSProperties = {};
  switch (position) {
    case "top-left":
      style.top = 0;
      style.left = 0;
      break;
    case "top-right":
      style.top = 0;
      style.right = 0;
      style.transform = "scale(-1, 1)";
      break;
    case "bottom-left":
      style.bottom = 0;
      style.left = 0;
      style.transform = "scale(1, -1)";
      break;
    case "bottom-right":
      style.bottom = 0;
      style.right = 0;
      style.transform = "scale(-1, -1)";
      break;
  }

  return (
    <div className="absolute" style={style}>
      <div
        className="absolute"
        style={{
          height: 55,
          width: 40,
          top: 7,
          left: 0,
          borderTop: `1px solid ${colors.active}`,
          borderLeft: `1px solid ${colors.active}`,
        }}
      ></div>
      <div
        className="absolute"
        style={{
          left: 40,
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: colors.active,
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        className="absolute"
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          width: 40,
          left: 71,
        }}
      ></div>
      <div
        className="absolute"
        style={{
          height: 5,
          width: 5,
          backgroundColor: colors.active,
          left: 111,
        }}
      ></div>
      <div
        className="absolute"
        style={{
          height: 5,
          width: 5,
          backgroundColor: colors.active,
          top: 62,
        }}
      ></div>
    </div>
  );
};

export default Corner;
