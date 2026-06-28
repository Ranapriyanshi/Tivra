"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: string;
  name: string;
  email?: string;
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

export default function AddClientModal({ onClose, onSave, existing }: Props) {
  const [form, setForm] = useState({
    name: existing?.name ?? "",
    email: existing?.email ?? "",
    company: existing?.company ?? "",
    project_type: existing?.project_type ?? "Landing Page",
    status: existing?.status ?? "lead",
    assigned_dev: existing?.assigned_dev ?? "",
    next_action: existing?.next_action ?? "",
    notes: existing?.notes ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Email confirmation step — only shown after a new client is saved */
  const [savedClient, setSavedClient] = useState<Client | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<"sent" | "skipped" | null>(null);

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

      const client = data as Client;
      onSave(client);

      /* Show email confirmation only if an email was provided */
      if (form.email.trim()) {
        setSavedClient(client);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
  }

  async function handleSendEmail() {
    if (!savedClient) return;
    setSendingEmail(true);
    try {
      const res = await fetch("/api/send-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: savedClient.name,
          email: savedClient.email,
          company: savedClient.company,
          project_type: savedClient.project_type,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Send failed");
      setEmailResult("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setSendingEmail(false);
    }
  }

  /* ── Email confirmation step ── */
  if (savedClient && emailResult === null) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(26,15,60,0.6)", backdropFilter: "blur(4px)" }}
      >
        <div
          className="w-full max-w-md rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid #E8D9C8" }}
        >
          {/* Header */}
          <div style={{ background: "#F4611A", padding: "24px 28px 20px" }}>
            <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Client saved ✓
            </p>
            <h2 style={{ margin: "6px 0 0", fontSize: "1.1rem", fontWeight: 900, color: "#fff", lineHeight: 1.3 }}>
              Send an intro email to {savedClient.name.split(" ")[0]}?
            </h2>
          </div>

          {/* Preview */}
          <div style={{ padding: "20px 28px" }}>
            <div style={{ background: "#FFF8F0", border: "1px solid #E8D9C8", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
              <p style={{ margin: "0 0 4px", fontSize: "0.72rem", fontWeight: 700, color: "#6B5E7A", textTransform: "uppercase", letterSpacing: "0.06em" }}>To</p>
              <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: "#1A0F3C" }}>{savedClient.email}</p>
            </div>
            <div style={{ background: "#FFF8F0", border: "1px solid #E8D9C8", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <p style={{ margin: "0 0 6px", fontSize: "0.72rem", fontWeight: 700, color: "#6B5E7A", textTransform: "uppercase", letterSpacing: "0.06em" }}>Preview</p>
              <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#1A0F3C" }}>
                Hey {savedClient.name.split(" ")[0]}, let&apos;s build something remarkable.
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#787878", lineHeight: 1.5 }}>
                Intro to Tivra · 7-day delivery · Book a free call
              </p>
            </div>

            {error && <p style={{ margin: "0 0 12px", fontSize: "0.8rem", color: "#D93025" }}>{error}</p>}

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setEmailResult("skipped")}
                style={{ flex: 1, padding: "10px", borderRadius: 12, border: "1px solid #E8D9C8", background: "#FFF8F0", color: "#6B5E7A", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}
              >
                Skip
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                style={{ flex: 2, padding: "10px", borderRadius: 12, border: "none", background: "#1A0F3C", color: "#fff", fontSize: "0.875rem", fontWeight: 700, cursor: sendingEmail ? "not-allowed" : "pointer", opacity: sendingEmail ? 0.7 : 1 }}
              >
                {sendingEmail ? "Sending…" : "Send Email →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Sent confirmation ── */
  if (emailResult === "sent") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(26,15,60,0.6)", backdropFilter: "blur(4px)" }}
      >
        <div
          className="w-full max-w-sm rounded-2xl text-center"
          style={{ background: "#FFFFFF", border: "1px solid #E8D9C8", padding: "36px 28px" }}
        >
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F0FFF4", border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "1.4rem" }}>
            ✓
          </div>
          <h3 style={{ margin: "0 0 6px", fontWeight: 900, fontSize: "1rem", color: "#1A0F3C" }}>Email sent!</h3>
          <p style={{ margin: "0 0 20px", fontSize: "0.875rem", color: "#787878" }}>
            Intro email delivered to {savedClient?.email}
          </p>
          <button
            onClick={onClose}
            style={{ width: "100%", padding: "11px", borderRadius: 12, border: "none", background: "#F4611A", color: "#fff", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  /* ── Main form ── */
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

          <div>
            <label style={labelStyle}>Client Email</label>
            <input
              style={inputStyle}
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="ravi@techsprint.com"
            />
            <p style={{ margin: "4px 0 0", fontSize: "0.7rem", color: "#ABABAB" }}>
              Enter to send a welcome email after saving
            </p>
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
              className="flex-1 py-2.5 rounded-full text-sm font-semibold"
              style={{ border: "1px solid #E8D9C8", color: "#6B5E7A", background: "#FFF8F0" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-50"
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
