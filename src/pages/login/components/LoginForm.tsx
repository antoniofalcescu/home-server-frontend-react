export function LoginForm() {
    return (
			<div className="w-md bg-card">
				<h3>Log In</h3>
				<p className="text-muted-foreground text-sm">Enter your credentials to continue</p>
				<div className="flex flex-col px-6">
					<div className="grid gap-2">
						<label htmlFor="email" className="text-left">
							Email
						</label>
						<input name="email" id="email" type="email" placeholder="email@example.com" required={true} className="placeholder:text-muted-foreground placeholder:text-sm" />
					</div>

					<div className="grid gap-2">
						<label htmlFor="password" className="text-left">
							Password
						</label>
						<input name="password" id="password" type="password" required={true} />
					</div>
				</div>
			</div>
    )
}