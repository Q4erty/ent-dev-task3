import React from "react";
import { Link } from "react-router-dom";

const Chip = ({ children }) => (
    <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 12, background: "#f2f2f2" }}>
    {children}
  </span>
);

export default function TaskCard({ task, onDelete }) {
    return (
        <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 12, display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <div style={{ display: "flex", gap: 8 }}>
                    <Chip>{task.priority}</Chip>
                    <Chip>{task.status}</Chip>
                </div>
            </div>
            {task.description && <p style={{ margin: 0, color: "#555" }}>{task.description}</p>}
            <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/tasks/${task.id}`}>Details</Link>
                <Link to={`/tasks/${task.id}/edit`}>Edit</Link>
                <button onClick={() => onDelete(task.id)} style={{ color: "#b00" }}>Delete</button>
            </div>
        </div>
    );
}
