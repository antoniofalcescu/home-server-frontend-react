import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export function Layout() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="dark flex min-h-screen flex-col">
			<Toaster position="bottom-right" richColors theme="dark" offset={10} />

			<main className="flex flex-1 flex-col">
				<Outlet />
			</main>

			<footer className="mb-0 flex h-16 w-full items-center justify-center border-t-2">
				<p className="text-muted-foreground text-center text-sm">
					© {currentYear} Antonio's Home Server
				</p>
			</footer>
		</div>
	);
}
