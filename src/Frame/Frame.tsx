import React from 'react';
import { colors } from '../colors';

const Form: React.FC = ({ children }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <div
            style={{
              height: 5,
              width: 5,
              backgroundColor: colors.active,
              paddingTop: 4,
            }}
          ></div>
          <div
            style={{ height: 1, width: 40, backgroundColor: colors.active }}
          ></div>
        </div>
        <div className="flex">
          <div
            style={{ height: 1, width: 40, backgroundColor: colors.active }}
          ></div>
          <div
            style={{
              height: 5,
              width: 5,
              backgroundColor: colors.active,
              paddingTop: 4,
            }}
          ></div>
        </div>
      </div>
      {children}
      <div></div>
    </div>
  );
};

export default Form;
