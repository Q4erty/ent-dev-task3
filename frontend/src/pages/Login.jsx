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
            setError("Invalid credentials");
        }
    };

    return (
        <div className="centered">
            <h2>Login</h2>
            <form onSubmit={submit} className="form">
                <input
                    placeholder="username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />
                <input
                    placeholder="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
            <p>No account? <Link to="/register">Register</Link></p>
        </div>
    );
}
