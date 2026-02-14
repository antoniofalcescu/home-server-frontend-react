import type { TableHTMLAttributes } from 'react';
import type { TorrentInfo } from '../types.ts';
import { cn } from '../../../lib/utils.ts';
import { TorrentRow } from './TorrentRow.tsx';

type TorrentsTableProps = TableHTMLAttributes<HTMLTableElement> & {
	torrents: TorrentInfo[];
	actions: {
		pauseTorrent: (torrentId: string) => Promise<void>;
		resumeTorrent: (torrentId: string) => Promise<void>;
		convertTorrent: (torrentName: string, type: string) => Promise<void>;
		removeTorrent: (torrentId: string) => Promise<void>;
	};
};

export function TorrentsTable({ torrents, actions, className, ...props }: TorrentsTableProps) {
	return (
		<table
			className={cn('table-auto whitespace-nowrap [&_th,td]:px-4 [&_th,td]:py-2', className)}
			{...props}
		>
			<thead>
				<tr className="border-b">
					<th scope="col">Name</th>
					<th scope="col">State</th>
					<th scope="col">Progress</th>
					<th scope="col">Download Speed</th>
					<th scope="col">ETA</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				{torrents.map((torrent) => (
					<TorrentRow key={torrent.id} torrent={torrent} actions={actions} />
				))}
			</tbody>
		</table>
	);
}
