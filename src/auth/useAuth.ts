import { createContext, useContext } from 'react';
import type { AuthContextType } from './types.ts';

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error('useAuth must be used inside AuthProvider');
	}

	return authContext;
}
