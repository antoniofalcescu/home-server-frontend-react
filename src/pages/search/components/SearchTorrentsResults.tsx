import type { TableHTMLAttributes } from 'react';
import type { Torrent } from '../types.ts';

type SearchTorrentsResultsProps = TableHTMLAttributes<HTMLTableElement> & { torrents: Torrent[] };

export function SearchTorrentsResults({
	torrents,
	className,
	...props
}: SearchTorrentsResultsProps) {
	return (
		<table>
			<thead></thead>
		</table>
	);
}
