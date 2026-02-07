import { SearchForm } from './components/SearchForm.tsx';
import { useSearchTorrents } from './useSearchTorrents.ts';
import { SEARCH_STATUS } from './constants.ts';

export function Search() {
	const { state, search } = useSearchTorrents();

	return (
		<>
			<SearchForm onSearch={search} />
			{state.status === SEARCH_STATUS.SUCCESS &&
				state.data.map((torrent) => (
					<div>
						{torrent.title} {torrent.size}
					</div>
				))}
		</>
	);
}
