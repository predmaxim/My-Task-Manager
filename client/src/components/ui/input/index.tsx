import { forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';
import styles from './styles.module.scss';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, className, label, required, topLabel, placeholder, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text');
      }

      if (type === 'password' && !showPassword) {
        setInputType('password');
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className={styles.inputContainer}>
        {topLabel && <label className={styles.label}>{topLabel}</label>}
        <div className={styles.inputWrapper}>
          <label htmlFor={name} onClick={() => inputRef.current?.focus()} className={styles.label}>
            {label}
            {required && <span className={styles.required}>&nbsp;*</span>}
          </label>
          <input
            type={inputType}
            name={name}
            placeholder={placeholder || ' '}
            required={required}
            className={`${styles.input} ${styles.inputBordered} ${className} ${type === 'password' ? styles.passwordShift : ''}`}
            ref={inputRef}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.btn}
            >
              {showPassword ? <PiEye /> : <PiEyeSlash />}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
