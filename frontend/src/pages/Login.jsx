import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const nav = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const { data } = await api.post("/auth/login", form);
            login({ token: data.token, username: form.username });
            nav("/");
        } catch {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back 👋</h2>
                <p className="subtitle">Login to continue to your tasks</p>
                <form onSubmit={submit} className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">Login</button>
                </form>
                <p className="register-text">
                    No account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}
