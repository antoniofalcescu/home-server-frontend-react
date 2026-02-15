import { SearchForm } from './components/SearchForm.tsx';
import { SEARCH_STATUS } from './constants.ts';
import { SearchTorrentsTable } from './components/SearchTorrentsTable.tsx';
import { useActionState } from 'react';
import { searchTorrents } from './search.api.ts';
import { useAuth } from '../../auth';
import type { SearchState, Torrent } from './types.ts';

export function Search() {
	const {
		state: { token }
	} = useAuth();

	const [state, searchAction, isPending] = useActionState<SearchState<Torrent>, FormData>(
		async (_, formData: FormData): Promise<SearchState<Torrent>> => {
			const query = formData.get('query');
			if (!query) {
				return {
					status: SEARCH_STATUS.ERROR,
					error: 'Invalid query'
				};
			}

			try {
				const torrents = await searchTorrents(query as string, token as string);

				return {
					status: SEARCH_STATUS.SUCCESS,
					data: torrents
				};
			} catch (error) {
				console.error(error);

				return {
					status: SEARCH_STATUS.ERROR,
					error: (error as Error).message
				};
			}
		},
		{ status: SEARCH_STATUS.IDLE }
	);

	return (
		<div className="flex flex-col gap-6 px-6">
			<SearchForm action={searchAction} disabled={isPending} />
			{isPending && <div>Loading...</div>}
			{!isPending && state.status === SEARCH_STATUS.SUCCESS && (
				<SearchTorrentsTable torrents={state.data} />
			)}
			{!isPending && state.status === SEARCH_STATUS.ERROR && <div>{state.error}</div>}
		</div>
	);
}
