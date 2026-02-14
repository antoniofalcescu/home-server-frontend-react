import type { Torrent } from '../types.ts';
import { type TableHTMLAttributes, useState } from 'react';
import { cn } from '../../../lib/utils.ts';
import { Button } from '../../../components/form/Button.tsx';
import { downloadTorrent } from '../search.api.ts';
import { useAuth } from '../../../auth';

type SearchTorrentRowProps = TableHTMLAttributes<HTMLTableRowElement> & { torrent: Torrent };

export function SearchTorrentRow({ torrent, className, ...props }: SearchTorrentRowProps) {
	const {
		state: { token }
	} = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onDownloadClick() {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		try {
			await downloadTorrent(torrent.id, token as string);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<tr className={cn('bg-red border-b p-2 align-middle whitespace-nowrap', className)} {...props}>
			<th scope="row">{torrent.title}</th>
			<th>{torrent.genre}</th>
			<th>{torrent.date}</th>
			<th>{torrent.size}</th>
			<th>{torrent.snatches}</th>
			<th>
				<Button onClick={onDownloadClick} disabled={isLoading}>
					{isLoading ? 'Downloading...' : 'Download'}
				</Button>
			</th>
		</tr>
	);
}
