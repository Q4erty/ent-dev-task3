import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const PRIORITIES = ["LOW", "MEDIUM", "HIGH"];
const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

export default function TaskForm() {
    const nav = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "TODO",
        dueDate: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOne = async () => {
            const { data } = await api.get(`/api/tasks/${id}`);
            setForm({
                title: data.title ?? "",
                description: data.description ?? "",
                priority: data.priority ?? "MEDIUM",
                status: data.status ?? "TODO",
                dueDate: data.dueDate ?? "",
            });
        };
        if (isEdit) fetchOne();
    }, [id, isEdit]);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isEdit) {
                await api.put(`/api/tasks/${id}`, form);
            } else {
                await api.post("/api/tasks", form);
            }
            nav("/");
        } catch {
            setError("⚠️ Failed to save task. Please try again.");
        }
    };

    return (
        <div className="taskform-wrapper">
            <div className="taskform-card">
                <h2 className="taskform-title">{isEdit ? "✏️ Edit Task" : "Create Task"}</h2>

                <form onSubmit={submit} className="taskform-form">
                    <label>Title</label>
                    <input
                        placeholder="Enter task title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        placeholder="Describe the task..."
                        rows={5}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    <div className="taskform-row">
                        <div>
                            <label>Priority</label>
                            <select
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            >
                                {PRIORITIES.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <label>Due Date</label>
                    <input
                        type="date"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    />

                    {error && <div className="taskform-error">{error}</div>}

                    <button type="submit">
                        {isEdit ? "💾 Update Task" : "➕ Create Task"}
                    </button>
                </form>
            </div>
        </div>
    );
}
