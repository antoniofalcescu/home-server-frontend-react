import { TorrentsTable } from './components/TorrentsTable.tsx';
import { Spinner } from '../../components/Spinner.tsx';
import { useTorrents } from './useTorrents.ts';

export function Torrents() {
	const {
		state: { torrents, isLoading },
		actions
	} = useTorrents();

	return (
		<>
			{torrents === undefined && isLoading && <div>Loading page first time</div>}
			{torrents !== undefined && (
				<div className="bg-card text-card-foreground relative mx-auto mt-8 flex w-fit rounded-xl border p-4 text-sm">
					{isLoading && <Spinner className="absolute top-2 left-2" />}
					<TorrentsTable torrents={torrents} actions={actions} />
				</div>
			)}
		</>
	);
}
