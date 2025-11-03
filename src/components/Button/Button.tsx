/* eslint-disable react/button-has-type */
import { HTMLAttributes } from 'react';
import { css } from '../../../styled-system/css';

//타입정의
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'beforeVerify' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={css({
        px: size === 'sm' ? 3 : size === 'md' ? 4 : 5,
        py: size === 'sm' ? 2 : size === 'md' ? 2.5 : 3,
        borderRadius: 'md',
        fontWeight: 'semibold',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s',
        bg:
          variant === 'primary'
            ? 'blue.500'
            : variant === 'secondary'
              ? 'gray.200'
              : variant === 'success'
                ? 'green.600'
                : variant === 'beforeVerify'
                  ? 'blue.300'
                  : variant === 'outline'
                    ? 'blue.100'
                    : 'transparent',
        color: variant === 'outline' ? 'blue.500' : variant === 'secondary' ? 'black' : 'white',
        border: variant === 'outline' ? '1px solid' : 'none',
        _hover: {
          bg:
            variant === 'primary'
              ? 'blue.600'
              : variant === 'secondary'
                ? 'gray.300'
                : variant === 'success'
                  ? 'green.700'
                  : 'blue.400',
        },
      })}
      {...props}
    >
      {children}
    </button>
  );
}
