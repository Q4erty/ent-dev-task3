import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function TaskDetails() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await api.get(`/api/tasks/${id}`);
                setTask(data);
            } catch {
                setError("Failed to load task");
            }
        };
        load();
    }, [id]);

    if (error) return <p style={{ padding: 24, color: "#b00" }}>{error}</p>;
    if (!task) return <p style={{ padding: 24 }}>Loading…</p>;

    return (
        <div className="container">
            <h2>{task.title}</h2>
            <div style={{ display: "flex", gap: 12 }}>
                <span>Priority: <b>{task.priority}</b></span>
                <span>Status: <b>{task.status}</b></span>
            </div>
            {task.description && <p>{task.description}</p>}
            {task.user && (
                <div style={{ fontSize: 14, color: "#666" }}>
                    Owner: {task.user.username} (id: {task.user.id})
                </div>
            )}
            <Link to={`/tasks/${task.id}/edit`}>Edit</Link>
        </div>
    );
}
