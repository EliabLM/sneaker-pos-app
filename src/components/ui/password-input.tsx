import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Input } from './input';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    return (
      <Input
        className={className}
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        {...props}
        suffix={
          showPassword ? (
            <EyeIcon
              className='cursor-pointer select-none'
              onClick={toggleShowPassword}
            />
          ) : (
            <EyeOffIcon
              className='cursor-pointer select-none'
              onClick={toggleShowPassword}
            />
          )
        }
      />
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
