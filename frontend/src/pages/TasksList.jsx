import React, { useEffect, useState } from "react";
import api from "../api";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

export default function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        try {
            setLoading(true);
            setError("");
            const { data } = await api.get("/api/tasks");
            setTasks(data);
        } catch {
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const remove = async (id) => {
        try {
            await api.delete(`/api/tasks/${id}`);
            setTasks((prev) => prev.filter((x) => x.id !== id));
        } catch (err) {
            console.error("Failed to delete task:", err);
            alert("Failed to delete task");
        }
    };

    if (loading) return <p style={{ padding: 24 }}>Loading…</p>;
    if (error) return <p style={{ padding: 24, color: "#b00" }}>{error}</p>;

    return (
        <div className="container">
            <div className="toprow">
                <h2>My Tasks</h2>
                <Link to="/tasks/new" className="btn btn-primary">+ New</Link>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                <div className="grid">
                    {tasks.map((t) => (
                        <TaskCard key={t.id} task={t} onDelete={remove} />
                    ))}
                </div>
            )}
        </div>
    );
}
