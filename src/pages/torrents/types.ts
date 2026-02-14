export type TorrentInfo = {
	id: string;
	name: string;
	path: string;
	status: TorrentInfoStatus;
	history: TorrentInfoHistory;
};

export type TorrentInfoStatus = {
	state: string;
	percent: number;
	downloaded: number;
	totalSize: number;
	downloadSpeed: number;
	eta: number;
};

export type TorrentInfoHistory = {
	addedAt: number;
};
