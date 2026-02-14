import type { Torrent } from './types.ts';

async function searchTorrentIds(query: string, token: string): Promise<string[]> {
	const searchResponse = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/search?name=${encodeURIComponent(query)}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);

	const parsedSearchResponse = await searchResponse.json();
	if (!searchResponse.ok) {
		throw new Error(parsedSearchResponse.message ?? 'Search failed');
	}

	return parsedSearchResponse.torrents;
}

async function getTorrentsDetails(torrentIds: string[], token: string): Promise<Torrent[]> {
	const detailsResponse = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/details?ids=${torrentIds.join(',')}`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);

	const parsedDetailsResponse = await detailsResponse.json();
	if (!detailsResponse.ok) {
		throw new Error(parsedDetailsResponse.message ?? 'Search failed');
	}

	return parsedDetailsResponse.details;
}

export async function searchTorrents(query: string, token: string): Promise<Torrent[]> {
	const torrentIds = await searchTorrentIds(query, token);
	if (torrentIds.length === 0) {
		return [];
	}

	return getTorrentsDetails(torrentIds, token);
}

export async function downloadTorrent(torrentId: string, token: string): Promise<void> {
	const downloadResponse = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/download`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ id: torrentId })
		}
	);
	const parsedResponse = await downloadResponse.json();

	if (!downloadResponse.ok) {
		console.error(parsedResponse);
		throw new Error(parsedResponse.message ?? 'Download failed');
	}
}
