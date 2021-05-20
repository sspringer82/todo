import React from "react";
import Corner from "./Corner";

const Form: React.FC = ({ children }) => {
  return (
    <div className="relative">
      <div className="relative" style={{ top: 0, height: 15 }}>
        <Corner position="top-left" />
        <Corner position="top-right" />
      </div>
      <div style={{ paddingLeft: 10 }}>{children}</div>
      <div className="relative" style={{ bottom: 0, height: 15 }}>
        <Corner position="bottom-left" />
        <Corner position="bottom-right" />
        
      </div>
    </div>
  );
};

export default Form;
