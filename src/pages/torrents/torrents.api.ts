import type { TorrentInfo } from './types.ts';

export async function makeGetTorrentsStatusRequest(
	token: string,
	abortSignal?: AbortSignal
): Promise<TorrentInfo[]> {
	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/status`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		signal: abortSignal
	});
	const parsedResponse = await response.json();

	if (!response.ok) {
		throw new Error(parsedResponse.message ?? 'Get torrents status failed');
	}

	return parsedResponse.torrents;
}

export async function makePauseTorrentRequest(torrentId: string, token: string) {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/pause/${torrentId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);

	if (!response.ok) {
		const parsedResponse = await response.json();
		throw new Error(parsedResponse.message ?? 'Pause torrent failed');
	}
}

export async function makeResumeTorrentRequest(torrentId: string, token: string) {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/resume/${torrentId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);

	if (!response.ok) {
		const parsedResponse = await response.json();
		throw new Error(parsedResponse.message ?? 'Resume torrent failed');
	}
}

export async function makeConvertTorrentRequest(
	torrentName: string,
	type: string,
	token: string
): Promise<{ parsingSucceeded: boolean }> {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/media/onDownloadFinished`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: torrentName,
				type
			})
		}
	);
	const parsedResponse = await response.json();

	if (!response.ok) {
		throw new Error(parsedResponse.message ?? 'Convert torrent failed');
	}

	const { parsingSucceeded } = parsedResponse;

	return {
		parsingSucceeded
	};
}

export async function makeRemoveTorrentRequest(torrentId: string, token: string) {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/api/v1/torrent/remove/${torrentId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				options: {
					shouldDeleteFiles: true
				}
			})
		}
	);

	if (!response.ok) {
		const parsedResponse = await response.json();
		throw new Error(parsedResponse.message ?? 'Remove torrent failed');
	}
}
