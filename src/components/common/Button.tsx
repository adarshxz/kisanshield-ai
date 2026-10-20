import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-forest-700/30 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-forest-700 hover:bg-forest-800 text-white shadow-sm hover:shadow dark:bg-forest-600 dark:hover:bg-forest-700',
    secondary: 'bg-forest-100 hover:bg-forest-200 text-forest-900 dark:bg-forest-900 dark:text-forest-100 dark:hover:bg-forest-800',
    outline: 'border-2 border-forest-700 text-forest-700 hover:bg-forest-50 hover:text-forest-900 dark:border-fresh dark:text-fresh dark:hover:bg-forest-900/60 dark:hover:text-white font-semibold',
    ghost: 'hover:bg-surface-warm text-kisan-muted hover:text-kisan-text dark:hover:bg-forest-900/60 dark:text-gray-300 dark:hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    accent: 'bg-fresh hover:bg-fresh-600 text-white shadow-sm'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
