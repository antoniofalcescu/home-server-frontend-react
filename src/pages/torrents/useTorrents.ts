import { useAuth } from '../../auth';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import type { TorrentInfo } from './types.ts';
import {
	makeGetTorrentsStatusRequest,
	makePauseTorrentRequest,
	makeRemoveTorrentRequest,
	makeResumeTorrentRequest
} from './torrents.api.ts';
import { toast } from 'sonner'; // TODO: clean up this type and split to reuse exact parts

// TODO: clean up this type and split to reuse exact parts
type UseTorrents = {
	state: {
		torrents: TorrentInfo[] | undefined;
		isLoading: boolean;
	};
	actions: {
		pauseTorrent: (torrentId: string) => Promise<void>;
		resumeTorrent: (torrentId: string) => Promise<void>;
		convertTorrent: (torrentName: string, type: string) => Promise<void>;
		removeTorrent: (torrentId: string) => Promise<void>;
	};
};

// TODO: implement the actions
export function useTorrents(): UseTorrents {
	const {
		state: { token },
		logout
	} = useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [torrents, setTorrents] = useState<TorrentInfo[] | undefined>(undefined);

	const loadTorrents = useCallback(
		async (abortSignal: AbortSignal): Promise<void> => {
			if (!token) {
				navigate('login');
			}

			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			try {
				const data = await makeGetTorrentsStatusRequest(token as string, abortSignal);
				setTorrents(data);
			} catch (error) {
				if ((error as Error).name === 'AbortError') {
					return;
				}
				if ((error as Error).message === 'Forbidden') {
					logout();
					return navigate('login');
				}

				console.error(error);
				throw error;
			} finally {
				if (!abortSignal.aborted) {
					setIsLoading(false);
				}
			}
		},
		[token, logout, navigate]
	);

	const pauseTorrent = async (torrentId: string) => {
		const previousTorrents = torrents;

		setTorrents((prev) =>
			prev?.map((torrent) =>
				torrent.id === torrentId
					? { ...torrent, status: { ...torrent.status, state: 'pausedDL' } }
					: torrent
			)
		);

		try {
			await makePauseTorrentRequest(torrentId, token as string);
		} catch (error) {
			setTorrents(previousTorrents);
			console.error(error);
			throw error;
		}
	};

	const resumeTorrent = async (torrentId: string) => {
		const previousTorrents = torrents;

		setTorrents((prev) =>
			prev?.map((torrent) =>
				torrent.id === torrentId
					? { ...torrent, status: { ...torrent.status, state: 'downloading' } }
					: torrent
			)
		);

		try {
			await makeResumeTorrentRequest(torrentId, token as string);
		} catch (error) {
			setTorrents(previousTorrents);
			console.error(error);
			throw error;
		}
	};

	const convertTorrent = async (torrentName: string, type: string) => {
		console.log(torrentName, type, 'convert');
	};

	const removeTorrent = async (torrentId: string) => {
		const previousTorrents = torrents;

		setTorrents((prev) => prev?.filter((torrent) => torrent.id !== torrentId));

		try {
			await makeRemoveTorrentRequest(torrentId, token as string);
			toast.success('Torrent removed');
		} catch (error) {
			setTorrents(previousTorrents);
			toast.error('Failed to remove torrent');
			console.error(error);
			throw error;
		}
	};

	useEffect(() => {
		const abortController = new AbortController();

		loadTorrents(abortController.signal);
		const intervalId = setInterval(async () => await loadTorrents(abortController.signal), 5000);

		return () => {
			abortController.abort();
			clearInterval(intervalId);
		};
	}, [loadTorrents]);

	return {
		state: { torrents, isLoading },
		actions: { pauseTorrent, resumeTorrent, convertTorrent, removeTorrent }
	};
}
