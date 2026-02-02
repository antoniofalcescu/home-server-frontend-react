import { LoginForm } from './components/LoginForm.tsx';

export function Login() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="flex min-h-screen w-full flex-col">
			<div className="flex w-full items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<img src="/home_server_logo.png" alt="Home Server" className="h-24 w-24" />
					<h1 className="text-2xl font-bold">Home Server</h1>
				</div>
			</div>

			<div className="flex w-full flex-1 flex-col items-center justify-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Welcome</h1>
				<p className="text-muted-foreground">Log in to access your home server</p>
				<LoginForm />
			</div>

			<footer className="mb-0 flex h-16 w-full items-center justify-center border-t-2">
				<p className="text-muted-foreground text-center text-sm">
					© {currentYear} Antonio's Home Server
				</p>
			</footer>
		</div>
	);
}
