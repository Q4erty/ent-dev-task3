import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import NavBar from "./components/NavBar";
import TasksList from "./pages/TasksList";
import TaskForm from "./pages/TaskForm";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./styles.css";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<ProtectedRoute><TasksList /></ProtectedRoute>} />
                    <Route path="/tasks/new" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
                    <Route path="/tasks/:id/edit" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
                    <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
