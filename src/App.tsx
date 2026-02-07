import { Login } from './pages/login/Login.tsx';
import { useAuth } from './auth';
import { Search } from './pages/search/Search.tsx';

function App() {
	const currentYear = new Date().getFullYear();

	const {
		state: { user }
	} = useAuth();

	return (
		<div className="dark flex min-h-screen flex-col">
			<main className="flex flex-1 flex-col">{user ? <Search /> : <Login />}</main>

			<footer className="mb-0 flex h-16 w-full items-center justify-center border-t-2">
				<p className="text-muted-foreground text-center text-sm">
					© {currentYear} Antonio's Home Server
				</p>
			</footer>
		</div>
	);
}

export default App;
