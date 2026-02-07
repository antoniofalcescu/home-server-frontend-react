import { useState } from 'react';
import type { SearchState, Torrent, UseSearch } from './types.ts';
import { SEARCH_STATUS } from './constants.ts';
import { useAuth } from '../../auth';

export function useSearchTorrents(): UseSearch<Torrent> {
	const {
		state: { token }
	} = useAuth();
	const [state, setState] = useState<SearchState<Torrent>>({ status: SEARCH_STATUS.IDLE });

	const search = async (query: string | null | undefined) => {
		if (!query) {
			return;
		}

		setState({ status: SEARCH_STATUS.LOADING });

		try {
			// TODO: extract this in a separate search.api.ts file
			const searchResponse = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/search`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({ name: query, searchLimit: 10 })
				}
			);
			const parsedSearchResponse = await searchResponse.json();

			if (!searchResponse.ok) {
				console.error(parsedSearchResponse);
				setState({
					status: SEARCH_STATUS.ERROR,
					error: parsedSearchResponse.message ?? 'Search failed'
				});

				return;
			}

			const detailsResponse = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/details?ids=${parsedSearchResponse.torrents.join(',')}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);

			const parsedDetailsResponse = await detailsResponse.json();
			if (!detailsResponse.ok) {
				console.error(parsedDetailsResponse);
				setState({
					status: SEARCH_STATUS.ERROR,
					error: parsedDetailsResponse.message ?? 'Search failed'
				});

				return;
			}

			setState({
				status: SEARCH_STATUS.SUCCESS,
				data: parsedDetailsResponse.details
			});
		} catch (error) {
			console.error(error);
			setState({
				status: SEARCH_STATUS.ERROR,
				error: 'Search failed'
			});
		}
	};

	return { state, search };
}
