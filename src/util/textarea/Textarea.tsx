import React from 'react';
import { colors } from '../../colors';

type Props = {
  label: string;
}

const Textarea: React.FC<React.InputHTMLAttributes<HTMLTextAreaElement> & Props> = (props) => {
  return <div className="border relative p-1" style={{borderColor: colors.active}}>
    <label className="absolute bg-gray-800 text-xs px-1" style={{top: -12, left: 0, color: colors.active}}>{props.label}</label>
    <textarea className="bg-gray-900 py-1 pl-1 focus:outline-none" {...props} style={{marginBottom: -7, ...props.style}}  />
  </div>
}

export default Textarea;