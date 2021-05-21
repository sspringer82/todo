import React, { CSSProperties } from "react";
import { colors } from "../../colors";

type Props = {
  containerStyle?: CSSProperties;
};

export const Divider: React.FC<Props> = ({ children, containerStyle }) => {
  return (
    <div className="flex mb-2" style={containerStyle}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: colors.active,
          marginTop: 18,
        }}
      ></div>
      <div
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 1,
          marginTop: 18,
        }}
      ></div>
      <div
        style={{
          marginTop: 11,
          marginLeft: 7,
          marginRight: 10,
          height: 8,
          width: 16,
          backgroundColor: colors.active,
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 1,
          marginTop: 11,
        }}
      ></div>
      <div className="mx-2" style={{ color: colors.active }}>
        {children}
      </div>
      <div
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 1,
          marginTop: 11,
        }}
      ></div>
      <div
        style={{
          marginTop: 11,
          marginLeft: 7,
          marginRight: 10,
          height: 8,
          width: 16,
          backgroundColor: colors.active,
          transform: "skew(70deg)",
        }}
      ></div>
      <div
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 1,
          marginTop: 18,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: colors.active,
          marginTop: 18,
        }}
      ></div>
    </div>
  );
};

export const BottomDivider: React.FC<Props> = ({ containerStyle }) => {
  return (
    <div style={containerStyle} className="flex">
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: colors.active,
        }}
      ></div>
      <div
        style={{
          marginTop:4,
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 1,
        }}
      ></div>
      <div
        style={{
          marginTop:4,
          marginLeft: 7,
          marginRight: 10,
          height: 8,
          width: 16,
          backgroundColor: colors.active,
          transform: "skew(70deg)",
        }}
      ></div>
      <div
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 2,
          marginTop: 11,
        }}
      ></div>
      <div
        style={{
          marginTop: 4,
          marginLeft: 7,
          marginRight: 10,
          height: 8,
          width: 16,
          backgroundColor: colors.active,
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        style={{
          height: 0,
          borderTop: `1px solid ${colors.active}`,
          flexGrow: 1,
          marginTop: 4,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: colors.active,
        }}
      ></div>
    </div>
  );
};
