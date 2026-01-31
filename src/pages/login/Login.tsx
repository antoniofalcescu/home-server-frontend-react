import { LoginForm } from "./components/LoginForm.tsx";

export function Login() {
    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full items-center justify-between p-4">
								<div className="flex items-center gap-2">
                    <img src="/home_server_logo.png" alt="Home Server" className="h-24 w-24"/>
                    <h1 className="text-2xl font-bold">Home Server</h1>
                </div>
            </div>

            <div className="w-full flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-muted-foreground">Log in to access your home server</p>
                <LoginForm />
            </div>
        </div>
    )
}