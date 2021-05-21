import { colors } from '../../colors';

type Props = {
  label: string;
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & Props> = (props) => {
  return <div className="border relative p-1" style={{borderColor: colors.active}}>
    <label className="absolute bg-gray-800 text-xs px-1" style={{top: -12, left: 0, color: colors.active}}>{props.label}</label>
    <input className="bg-gray-900 py-1 pl-1 focus:outline-none" {...props} style={{...props.style}}  />
  </div>
}

export default Input;