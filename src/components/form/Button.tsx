import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils.ts';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default';
	size?: 'default';
	children: ReactNode;
};

export function Button({
	children,
	className,
	variant = 'default',
	size = 'default',
	...props
}: ButtonProps) {
	const BASE_BUTTON =
		'focus-visible:ring-ring inline-flex shrink-0 cursor-pointer justify-center gap-2 rounded-md text-sm font-medium shadow-xs';

	const BUTTON_VARIANTS: Record<typeof variant, string> = {
		default: 'bg-primary hover:bg-primary/90 text-primary-foreground'
	};

	const BUTTON_SIZES: Record<typeof size, string> = {
		default: 'h-9 px-4 py-2'
	};

	return (
		<button
			className={cn(BASE_BUTTON, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
			{...props}
		>
			{children}
		</button>
	);
}
