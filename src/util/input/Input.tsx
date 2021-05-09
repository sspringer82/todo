import { colors } from '../../colors';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = () => {
  return <input style={{border: `1px solid ${colors.active}`}} className="bg-black py-1 focus:outline-none"/>
}

export default Input;