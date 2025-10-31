import React, { useState } from "react";
import { Link } from "react-router-dom";

const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
};

export default function TaskCard({ task, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const priority = task.priority || "UNKNOWN";
    const status = task.status || "TODO";

    const priorityColorClass =
        priority.toLowerCase() === "high"
            ? "priority-high"
            : priority.toLowerCase() === "medium"
                ? "priority-medium"
                : "priority-low";

    const handleDelete = () => {
        setShowConfirm(false);
        onDelete(task.id);
    };

    return (
        <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>{task.title}</h3>
                <span className={`chip ${priorityColorClass}`}>{priority}</span>
            </div>

            <p style={{ color: "#555", margin: "4px 0" }}>
                {task.description || <i>No description</i>}
            </p>

            <div className="meta">
                <div>👤 {task.ownerUsername}</div>
                <div>📅 Due: <b>{formatDate(task.dueDate)}</b></div>
                <div>🕒 Created: {formatDate(task.createdAt)}</div>
                <div>🔁 Updated: {formatDate(task.updatedAt)}</div>
            </div>

            <div className="task-actions">
                <Link to={`/tasks/${task.id}`} className="btn btn-secondary">Details</Link>
                <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary">Edit</Link>
                <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>Delete</button>
            </div>

            {showConfirm && (
                <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Delete Task?</h3>
                        <p>Are you sure you want to delete <b>{task.title}</b>?</p>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className="btn btn-danger" onClick={handleDelete}>Yes, delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
