import React from "react";
import { colors } from '../../colors';
import Corner from './Corner';


type Props = {
  title: string;
}

const Form: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="relative" style={{minWidth:446}}>
      <div className="relative flex justify-center" style={{ top: 0, height: 15 }}>
        <Corner position="top-left" />
        <div className="relative" style={{color: colors.active, top: -11}}>{title}</div>
        <Corner position="top-right" />
      </div>
      <div style={{ padding: '10px 12px 5px 12px' }}>{children}</div>
      <div className="relative" style={{ bottom: 0, height: 15 }}>
        <Corner position="bottom-left" />
        <Corner position="bottom-right" />
      </div>
    </div>
  );
};

export default Form;
