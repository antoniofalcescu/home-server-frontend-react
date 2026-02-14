import { Input } from '../../../components/form/Input.tsx';
import { Button } from '../../../components/form/Button.tsx';
import { type FormHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils.ts';

type SearchFormProps = FormHTMLAttributes<HTMLFormElement> & { disabled?: boolean };

export function SearchForm({ disabled = false, className, ...props }: SearchFormProps) {
	return (
		<form className={cn(className)} {...props}>
			<Input name="query" id="query" type="search" required={true} disabled={disabled} />
			<Button type="submit" disabled={disabled}>
				{disabled ? 'Searching...' : 'Search'}
			</Button>
		</form>
	);
}
