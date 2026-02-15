import { Login } from './pages/login/Login.tsx';
import { useAuth } from './auth';
import { Search } from './pages/search/Search.tsx';

function App() {
	const {
		state: { user }
	} = useAuth();

	if (!user) {
		return <Login />;
	}

	return <Search />;
}

export default App;
