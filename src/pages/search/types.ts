import type { SEARCH_STATUS } from './constants.ts';

type SearchIdleState = { status: typeof SEARCH_STATUS.IDLE };
type SearchSuccessState<T> = {
	status: typeof SEARCH_STATUS.SUCCESS;
	data: T[];
};
type SearchErrorState = {
	status: typeof SEARCH_STATUS.ERROR;
	error: string;
};

export type SearchState<T> = SearchIdleState | SearchSuccessState<T> | SearchErrorState;

export type UseSearch<T> = {
	state: SearchState<T>;
	search: (query: string | null | undefined) => Promise<void>;
};

export type Torrent = {
	id: string;
	title: string;
	date: string;
	rating: number;
	poster: string;
	genre: string;
	duration: string;
	description: string;
	size: string;
	snatches: number;
};
