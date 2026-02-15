import type { TableHTMLAttributes } from 'react';
import type { Torrent } from '../types.ts';
import { cn } from '../../../lib/utils.ts';
import { SearchTorrentRow } from './SearchTorrentRow.tsx';

type SearchTorrentsTableProps = TableHTMLAttributes<HTMLTableElement> & { torrents: Torrent[] };

export function SearchTorrentsTable({ torrents, className, ...props }: SearchTorrentsTableProps) {
	return (
		<div className="bg-card text-card-foreground flex flex-col rounded-xl border text-sm shadow-sm">
			<table className={cn('relative w-full overflow-x-auto', className)} {...props}>
				<caption>Found {torrents.length} results</caption>
				<thead>
					<tr className="border-b">
						<th scope="col">Title</th>
						<th scope="col">Category</th>
						<th scope="col">Date</th>
						<th scope="col">Size</th>
						<th scope="col">Downloads</th>
					</tr>
				</thead>
				<tbody>
					{torrents.map((torrent) => (
						<SearchTorrentRow key={torrent.id} torrent={torrent} className="last:border-0" />
					))}
				</tbody>
			</table>
		</div>
	);
}
