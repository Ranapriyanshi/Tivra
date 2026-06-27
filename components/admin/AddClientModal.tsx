"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: string;
  name: string;
  company: string;
  project_type: string;
  status: string;
  assigned_dev: string;
  next_action: string;
  notes: string;
  created_at: string;
};

type Props = {
  onClose: () => void;
  onSave: (client: Client) => void;
  existing?: Client | null;
};

const PROJECT_TYPES = [
  "Landing Page",
  "E-Commerce",
  "Portfolio",
  "Blog",
  "Booking Site",
  "Other",
];

const STATUSES = [
  { value: "lead", label: "Lead" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "delivered", label: "Delivered" },
];

export default function AddClientModal({ onClose, onSave, existing }: Props) {
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    company: existing?.company ?? "",
    project_type: existing?.project_type ?? "Landing Page",
    status: existing?.status ?? "lead",
    assigned_dev: existing?.assigned_dev ?? "",
    next_action: existing?.next_action ?? "",
    notes: existing?.notes ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    if (existing) {
      const { data, error: err } = await supabase
        .from("clients")
        .update(form)
        .eq("id", existing.id)
        .select()
        .single();
      if (err) { setError(err.message); setLoading(false); return; }
      onSave(data as Client);
    } else {
      const { data, error: err } = await supabase
        .from("clients")
        .insert(form)
        .select()
        .single();
      if (err) { setError(err.message); setLoading(false); return; }
      onSave(data as Client);
    }

    setLoading(false);
  }

  const inputStyle = {
    background: "#FFF8F0",
    border: "1px solid #E8D9C8",
    color: "#1A0F3C",
    borderRadius: 10,
    padding: "0.6rem 0.9rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#6B5E7A",
    marginBottom: "0.35rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,15,60,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #E8D9C8" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #E8D9C8" }}
        >
          <h2 className="font-black text-base" style={{ color: "#1A0F3C" }}>
            {existing ? "Edit Client" : "Add New Client"}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "#FFF8F0", color: "#6B5E7A" }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Client Name *</label>
              <input style={inputStyle} value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Ravi Kumar" />
            </div>
            <div>
              <label style={labelStyle}>Company</label>
              <input style={inputStyle} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="TechSprint" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Project Type</label>
              <select style={inputStyle} value={form.project_type} onChange={(e) => update("project_type", e.target.value)}>
                {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={form.status} onChange={(e) => update("status", e.target.value)}>
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Assigned Dev</label>
            <input style={inputStyle} value={form.assigned_dev} onChange={(e) => update("assigned_dev", e.target.value)} placeholder="Priyanshi" />
          </div>

          <div>
            <label style={labelStyle}>Next Action</label>
            <input style={inputStyle} value={form.next_action} onChange={(e) => update("next_action", e.target.value)} placeholder="Send wireframes to client" />
          </div>

          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Any internal context..."
            />
          </div>

          {error && <p className="text-xs" style={{ color: "#D93025" }}>{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors"
              style={{ border: "1px solid #E8D9C8", color: "#6B5E7A", background: "#FFF8F0" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "#F4611A" }}
            >
              {loading ? "Saving…" : existing ? "Save Changes" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
