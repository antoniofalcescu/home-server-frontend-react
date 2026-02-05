import { type ReactNode, useCallback, useMemo, useState } from 'react';
import type { AuthContextType, AuthState, User } from './types.ts';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './useAuth.ts';

export function AuthProvider({ children }: { children: ReactNode }) {
	const [authState, setAuthState] = useState<AuthContextType['state']>(loadAuthState);

	const login = useCallback((token: string): void => {
		localStorage.setItem('token', token);

		const user = jwtDecode<User>(token);
		setAuthState({ user, token });
	}, []);

	const logout = useCallback((): void => {
		localStorage.removeItem('token');
		setAuthState({
			user: null,
			token: null
		});
	}, []);

	const memoizedValue = useMemo(
		() => ({
			state: authState,
			login,
			logout
		}),
		[authState, login, logout]
	);

	return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

function loadAuthState(): AuthState {
	try {
		const token = localStorage.getItem('token');
		if (token) {
			const user = jwtDecode<User>(token);
			return { user, token };
		}
	} catch (error) {
		localStorage.removeItem('token');
		console.error('Auth initialization failed', error);
	}

	return {
		user: null,
		token: null
	};
}
