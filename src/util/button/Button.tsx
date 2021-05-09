import React from 'react';
import { colors } from '../../colors';

type Props = {
  variant?: "primary" | "secondary"
}

const Button: React.FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button {...props} style={{borderColor: colors.active, backgroundColor: props.variant === 'primary' ? colors.background : 'none', ...props.style }} className="px-5 py-1 bg-opacity-25 focus:outline-none border" />
}

export default Button;