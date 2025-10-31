import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

const formatDate = (date) =>
    date ? new Date(date).toLocaleString() : "—";

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
        <div className="centered">
            <h2>{task.title}</h2>
            <p style={{ color: "#555" }}>{task.description || "No description"}</p>
            <div className="meta">
                <p><b>Status:</b> {task.status}</p>
                <p><b>Due date:</b> {formatDate(task.dueDate)}</p>
                <p><b>Owner:</b> {task.ownerUsername}</p>
                <p><b>Created:</b> {formatDate(task.createdAt)}</p>
                <p><b>Updated:</b> {formatDate(task.updatedAt)}</p>
            </div>
            <Link to={`/tasks/${task.id}/edit`} style={{ color: "var(--primary)" }}>
                ✏️ Edit Task
            </Link>
        </div>
    );
}
