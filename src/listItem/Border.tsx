import React from 'react';

const colors = {
  active: "#34D399",
  inactive: "#064E3B",
};

const TitleBorderTop = () => {
  return (
    <div style={{ display: "flex", position: "relative", top: 0 }}>
      <div style={{ height: 5, width: 5, backgroundColor: "#34D399" }}></div>
      <div style={{ width: 100, height: 1, backgroundColor: "#34D399" }}></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: "#34D399",
          transform: "skew(70deg)",
        }}
      ></div>
      <div
        style={{
          width: 100,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

const TitleBorderBottom = () => {
  return (
    <div style={{ display: "flex", position: "relative", bottom: 0 }}>
      <div style={{ height: 5, width: 5, backgroundColor: "#34D399" }}></div>
      <div
        style={{
          width: 110,
          height: 1,
          backgroundColor: "#34D399",
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
          backgroundColor: "#34D399",
          transform: "skew(70deg)",
        }}
      ></div>
      <div
        style={{
          width: 90,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 11,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

export const TitleContainer: React.FC = ({ children }) => {
  return (
    <div>
      <TitleBorderTop />
      <div style={{ marginLeft: 10, position: "relative" }}>{children}</div>
      <TitleBorderBottom />
    </div>
  );
};

const ButtonContainerTop = () => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
    </div>
  );
};

const ButtonContainerBottom = () => {
  return (
    <div style={{ display: "flex", position: "relative", bottom: 0 }}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 8,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 12,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 8,
        }}
      ></div>
    </div>
  );
};

export const ButtonContainer: React.FC = ({children}) => {
  return (
    <div style={{ position: "relative", marginLeft: 5 }}>
      <ButtonContainerTop />
      <div style={{ position: "relative" }}>
        &nbsp;
        <div
          style={{
            position: "absolute",
            top: 1,
            left: 12,
          }}
        >
          {children}
        </div>
      </div>
      <ButtonContainerBottom />
    </div>
  );
};

const ActionsContainerTop = () => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          marginLeft: 7,
          marginRight: 7,
          height: 8,
          width: 16,
          backgroundColor: "#34D399",
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        style={{
          width: 40,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 0,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 0,
        }}
      ></div>
    </div>
  );
};

const ActionsContainerBottom = () => {
  return (
    <div style={{ display: "flex", position: "relative", bottom: 0 }}>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 7,
        }}
      ></div>
      <div
        style={{
          width: 30,
          height: 1,
          backgroundColor: "#34D399",
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
          backgroundColor: "#34D399",
          transform: "skew(-70deg)",
        }}
      ></div>
      <div
        style={{
          width: 50,
          height: 1,
          backgroundColor: "#34D399",
          marginTop: 4,
        }}
      ></div>
      <div
        style={{
          height: 5,
          width: 5,
          backgroundColor: "#34D399",
          marginTop: 0,
        }}
      ></div>
    </div>
  );
};

const InnerButtonContainer: React.FC = ({children}) => {
  return <div style={{margin: '0 7px'}}>
    {children}
  </div>
}

export const ActionsContainer: React.FC<{children: JSX.Element[]}> = ({children}) => {
  return (
    <div style={{ position: "relative", marginLeft: 5 }}>
      <ActionsContainerTop />
      <div className="flex">
        {children && children.map((child, i) => <InnerButtonContainer key={i}>{child}</InnerButtonContainer>)}
      </div>
      <ActionsContainerBottom />
    </div>
  );
};
