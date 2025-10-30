import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const login = ({ token, username }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setToken(token);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setUsername(null);
    };

    useEffect(() => {
        const onStorage = () => {
            setToken(localStorage.getItem("token"));
            setUsername(localStorage.getItem("username"));
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <AuthContext.Provider value={{ token, username, isAuthed: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
