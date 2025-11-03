import { InputHTMLAttributes } from 'react';
import { css } from '../../../styled-system/css';

//타입 정의
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; //에러메세지
  helperText?: string; //안내메세지
}
export default function Input({ label, error, helperText, ...props }: InputProps) {
  return (
    <div className={css({ width: 'full' })}>
      {label && (
        <label
          htmlFor={props.id}
          className={css({
            width: 'full',
            display: 'block',
            mb: 2,
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'gray.700',
          })}
        >
          {label}
        </label>
      )}
      <input
        id={props.id}
        className={css({
          display: 'block',
          w: 'full',
          boxSizing: 'border-box',
          px: 3,
          py: 2,
          border: '1px solid',
          borderColor: error ? 'red.500' : 'gray.300',
          borderRadius: 'md',
          fontSize: 'sm',
          _focus: {
            outline: 'none',
            borderColor: error ? 'red.500' : 'blue.500',
            boxShadow: error
              ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
              : '0 0 0 3px rgba(59, 130, 246, 0.1)',
          },
        })}
        {...props}
      />
      {error && <p className={css({ mt: 1, fontSize: 'sm', color: 'red.500' })}>{error}</p>}

      {helperText && !error && (
        <p className={css({ mt: 1, fontSize: 'sm', color: 'gray.500' })}>{helperText}</p>
      )}
    </div>
  );
}
