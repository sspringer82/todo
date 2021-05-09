import { colors } from '../../colors';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className="border bg-black py-1 focus:outline-none" {...props} style={{...props.style, borderColor: colors.active}}  />
}

export default Input;