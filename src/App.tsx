import { Login } from './pages/login/Login.tsx';
import { useAuth } from './auth';

function App() {
	const {
		state: { user }
	} = useAuth();

	return (
		<div className="dark">
			{user ? (
				<div>
					{user.username} {user.email} {user.role}
				</div>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
