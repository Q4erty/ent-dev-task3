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
            setError("Save failed");
        }
    };

    return (
        <div className="centered">
            <h2>{isEdit ? "Edit task" : "Create task"}</h2>
            <form onSubmit={submit} className="form">
                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <div style={{ display: "flex", gap: 12 }}>
                    <select
                        value={form.priority}
                        onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    >
                        {PRIORITIES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <button>{isEdit ? "Update" : "Create"}</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}
