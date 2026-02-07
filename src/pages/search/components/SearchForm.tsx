import { Input } from '../../../components/form/Input.tsx';
import { Button } from '../../../components/form/Button.tsx';
import { type FormHTMLAttributes, useTransition } from 'react';
import { cn } from '../../../lib/utils.ts';

type SearchFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'action'> & {
	onSearch: (query: string) => Promise<void>;
};

export function SearchForm({ onSearch, className, ...props }: SearchFormProps) {
	const [isPending, startTransition] = useTransition();

	async function handleSearch(formData: FormData) {
		const query = formData.get('query') as string;
		startTransition(async () => {
			await onSearch(query);
		});
	}

	return (
		<form action={handleSearch} className={cn('flex flex-col gap-6 px-6', className)} {...props}>
			<Input name="query" id="query" type="search" required={true} disabled={isPending} />
			<Button type="submit" disabled={isPending}>
				{isPending ? 'Searching...' : 'Search'}
			</Button>
		</form>
	);
}
