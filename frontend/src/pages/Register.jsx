import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await api.post("/auth/register", form);
            nav("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="centered">
            <h2>Register</h2>
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
                <button>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
