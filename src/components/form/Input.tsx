import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils.ts';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			className={cn(
				'bg-input focus-visible:ring-ring selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground border-input outline-nones h-9 w-full rounded-md border px-3 text-sm font-medium shadow-xs',
				className
			)}
			{...props}
		/>
	);
}
