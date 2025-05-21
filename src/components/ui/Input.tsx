'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const inputVariants = cva(
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants:{
            inputSize:{
                default: 'h-10 px-3 py-2 text-sm',
                sm: 'h-8 px-2 text-sm',
                lg: 'h-12 px-4 text-base',
            },
        },
        defaultVariants:{
            inputSize: 'default',
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants>{}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
) 


Input.displayName = 'Input'

export { Input, inputVariants }