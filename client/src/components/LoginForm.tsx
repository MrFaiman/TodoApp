import { useState } from "react";
import * as Api from "../api";

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const loginSuccess = await Api.login(username, password);
            if (loginSuccess) {
                onLoginSuccess();
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit(e as any);
        }
    };

    return (
        <div>
            <div className="login-form">
                <h2>Login to Todo App</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your username"
                            disabled={isLoading}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="login-help">
                    Don't have a user? Just enter a username and password to create one!
                </p>
            </div>
        </div>
    );
};

export default LoginForm;