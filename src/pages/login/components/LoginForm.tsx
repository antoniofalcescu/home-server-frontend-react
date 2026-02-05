import { Label } from '../../../components/form/Label.tsx';
import { Input } from '../../../components/form/Input.tsx';
import { Button } from '../../../components/form/Button.tsx';
import { useAuth } from '../../../auth';

// TODO: implement local storage and in-memory cache with react context for jwt and user data
export function LoginForm() {
	const { login } = useAuth();

	async function handleLogin(formData: FormData) {
		const email = formData.get('email');
		const password = formData.get('password');

		const response = await fetch('http://localhost:4000/api/v1/authentication/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ login: email, password })
		});

		const { token } = await response.json();
		login(token);
	}

	return (
		<div className="bg-card w-md gap-6 rounded-xl border py-6 shadow-sm">
			<h3>Log In</h3>
			<p className="text-muted-foreground text-sm">Enter your credentials to continue</p>
			<form action={handleLogin} className="flex flex-col gap-6 px-6">
				<div className="grid gap-1">
					<Label htmlFor="email">Email</Label>
					<Input
						name="email"
						id="email"
						type="email"
						placeholder="email@example.com"
						required={true}
					/>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="password">Password</Label>
					<Input name="password" id="password" type="password" required={true} />
				</div>
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}
