import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './auth';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { Search } from './pages/search/Search.tsx';
import { Torrents } from './pages/torrents/Torrents.tsx';
import { Login } from './pages/login/Login.tsx';
import { Layout } from './components/Layout.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <App />
			},
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'search',
				element: <Search />
			},
			{
				path: 'torrents',
				element: <Torrents />
			}
		]
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);
