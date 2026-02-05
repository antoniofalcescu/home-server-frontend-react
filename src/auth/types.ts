import { USER_ROLE } from './constants.ts';

type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type User = {
	id: string;
	username: string;
	email: string;
	role: UserRole;
};

export type AuthContextType = {
	state: AuthState;
	login: (token: string) => void;
	logout: () => void;
};

export type AuthState = {
	user: User | null;
	token: string | null;
};
