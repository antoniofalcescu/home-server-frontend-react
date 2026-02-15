import { type TableHTMLAttributes, useState } from 'react';
import type { TorrentInfo } from '../types.ts';
import { cn } from '../../../lib/utils.ts';
import { Button } from '../../../components/form/Button.tsx';
import { Monitor, PauseCircleIcon, PlayCircleIcon, Trash } from 'lucide-react';

type TorrentRowProps = TableHTMLAttributes<HTMLTableRowElement> & {
	torrent: TorrentInfo;
	actions: {
		pauseTorrent: (torrentId: string) => Promise<void>;
		resumeTorrent: (torrentId: string) => Promise<void>;
		convertTorrent: (torrentName: string, type: string) => Promise<void>;
		removeTorrent: (torrentId: string) => Promise<void>;
	};
};

export const TORRENT_STATUS = {
	DOWNLOADING: 'downloading',
	PAUSED: 'paused',
	COMPLETED: 'completed',
	ERROR: 'error'
} as const;

type TorrentStatus = (typeof TORRENT_STATUS)[keyof typeof TORRENT_STATUS];

function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatSpeed(bytesPerSecond: number): string {
	return `${formatBytes(bytesPerSecond)}/s`;
}

function formatETA(seconds: number): string {
	const INFINITY = 8640000;
	if (seconds >= INFINITY) return '∞';

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	} else if (minutes > 0) {
		return `${minutes}m`;
	} else {
		return '< 1m';
	}
}

function formatStatus(rawState: string): TorrentStatus {
	if (['downloading', 'stalledDL'].includes(rawState)) {
		return TORRENT_STATUS.DOWNLOADING;
	} else if (['pausedDL', 'pausedUP', 'stoppedDL'].includes(rawState)) {
		return TORRENT_STATUS.PAUSED;
	} else if (['completed', 'stoppedUP', 'uploading', 'stalledUP', 'queuedUP'].includes(rawState)) {
		return TORRENT_STATUS.COMPLETED;
	} else if (['error', 'missingfiles'].includes(rawState)) {
		return TORRENT_STATUS.ERROR;
	} else {
		return TORRENT_STATUS.ERROR;
	}
}

export function TorrentRow({ torrent, actions, className, ...props }: TorrentRowProps) {
	const [isActionRunning, setIsActionRunning] = useState<boolean>(false);
	const { pauseTorrent, resumeTorrent, convertTorrent, removeTorrent } = actions;

	const torrentStatus = formatStatus(torrent.status.state);
	const isPaused = torrentStatus === TORRENT_STATUS.PAUSED;
	const isDownloading = torrentStatus === TORRENT_STATUS.DOWNLOADING;
	const isCompleted = torrentStatus === TORRENT_STATUS.COMPLETED;

	async function resumeHandler() {
		try {
			setIsActionRunning(true);
			await resumeTorrent(torrent.id);
		} catch {
			// Nothing
		} finally {
			setIsActionRunning(false);
		}
	}

	async function pauseHandler() {
		try {
			setIsActionRunning(true);
			await pauseTorrent(torrent.id);
		} catch {
			// Nothing
		} finally {
			setIsActionRunning(false);
		}
	}

	async function convertHandler() {
		await convertTorrent(torrent.name, 'movie');
	}

	async function removeHandler() {
		try {
			setIsActionRunning(true);
			await removeTorrent(torrent.id);
		} catch {
			// Nothing
		} finally {
			setIsActionRunning(false);
		}
	}

	return (
		<tr className={cn(className)} {...props}>
			<th scope="row">{torrent.name}</th>
			<td>{torrentStatus}</td>
			<td>{torrent.status.percent}%</td>
			<td>{formatSpeed(torrent.status.downloadSpeed)}</td>
			<td>{formatETA(torrent.status.eta)}</td>
			<td className="flex flex-row gap-2">
				{isPaused && (
					<Button onClick={resumeHandler} disabled={isActionRunning}>
						<PlayCircleIcon />
					</Button>
				)}
				{isDownloading && (
					<Button onClick={pauseHandler} disabled={isActionRunning}>
						<PauseCircleIcon />
					</Button>
				)}
				{isCompleted && (
					<Button onClick={convertHandler} disabled={isActionRunning}>
						<Monitor />
					</Button>
				)}
				<Button onClick={removeHandler} disabled={isActionRunning}>
					<Trash />
				</Button>
			</td>
		</tr>
	);
}
