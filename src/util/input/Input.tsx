import { colors } from '../../colors';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input style={{borderColor: colors.active}} className="border bg-black py-1 focus:outline-none" {...props} />
}

export default Input;