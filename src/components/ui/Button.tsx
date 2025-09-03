'use client'

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    white: 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button 
      type={type}
      className={`px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 ${variantClasses[variant]} ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}