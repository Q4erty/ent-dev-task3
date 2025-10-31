import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
    const { isAuthed, username, logout } = useAuth();

    return (
        <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
            <Link to="/">Tasks</Link>
            {isAuthed ? (
                <>
                    <Link to="/tasks/new">Create</Link>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
                        <span>👤 {username}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                </>
            ) : (
                <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </nav>
    );
}
