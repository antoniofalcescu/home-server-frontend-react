import { cn } from '../../lib/utils.ts';
import type { LabelHTMLAttributes, ReactNode } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
	children: ReactNode;
};

export function Label({ children, className, ...props }: LabelProps) {
	return (
		<label className={cn('text-left text-sm font-medium select-none', className)} {...props}>
			{children}
		</label>
	);
}
