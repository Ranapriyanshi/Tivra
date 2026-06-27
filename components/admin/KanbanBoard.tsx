"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import AddClientModal from "./AddClientModal";

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
  initialClients: Client[];
  userEmail: string;
};

const COLUMNS = [
  { id: "lead", label: "Lead", color: "#F4611A", bg: "#FEF0E7" },
  { id: "in_progress", label: "In Progress", color: "#8A6000", bg: "#FFF8D6" },
  { id: "review", label: "Review", color: "#007B6E", bg: "#E6F5F4" },
  { id: "delivered", label: "Delivered", color: "#1A0F3C", bg: "#EDEAF5" },
];

const TYPE_COLORS: Record<string, string> = {
  "Landing Page": "#F4611A",
  "E-Commerce": "#007B6E",
  Portfolio: "#8A6000",
  Blog: "#4B3B8C",
  "Booking Site": "#D93025",
  Other: "#6B5E7A",
};

export default function KanbanBoard({ initialClients, userEmail }: Props) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [displayCounts, setDisplayCounts] = useState<Record<string, number>>(
    Object.fromEntries(COLUMNS.map((c) => [c.id, 0]))
  );

  const supabase = createClient();

  // Count-up animation on mount
  useEffect(() => {
    const targets = Object.fromEntries(
      COLUMNS.map((c) => [c.id, initialClients.filter((cl) => cl.status === c.id).length])
    );
    const duration = 900;
    const start = performance.now();

    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setDisplayCounts(
        Object.fromEntries(COLUMNS.map((c) => [c.id, Math.round(targets[c.id] * ease)]))
      );
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  function handleDragStart(e: React.DragEvent, id: string) {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("clientId", id);
  }

  function handleDragOver(e: React.DragEvent, colId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(colId);
  }

  async function handleDrop(e: React.DragEvent, newStatus: string) {
    e.preventDefault();
    const id = e.dataTransfer.getData("clientId");
    setDragOverCol(null);
    setDraggingId(null);

    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );

    await supabase.from("clients").update({ status: newStatus }).eq("id", id);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this client from the board?")) return;
    setClients((prev) => prev.filter((c) => c.id !== id));
    await supabase.from("clients").delete().eq("id", id);
  }

  function onSave(saved: Client) {
    setClients((prev) => {
      const exists = prev.find((c) => c.id === saved.id);
      return exists
        ? prev.map((c) => (c.id === saved.id ? saved : c))
        : [saved, ...prev];
    });
    setShowModal(false);
    setEditingClient(null);
  }

  const stats = COLUMNS.map((col) => ({
    ...col,
    count: clients.filter((c) => c.status === col.id).length,
    displayCount: displayCounts[col.id] ?? 0,
  }));

  return (
    <div className="min-h-screen" style={{ background: "#F7F4FF" }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 h-14 sticky top-0 z-20"
        style={{ background: "#1A0F3C", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F4611A" }} />
          <span className="text-white font-bold tracking-tight">Tivra Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            {userEmail}
          </span>
          <button
            onClick={signOut}
            className="text-xs px-3 py-1.5 rounded-full transition-colors"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="p-6 max-w-[1400px] mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((col, i) => (
            <div
              key={col.id}
              className="rounded-xl p-4"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8D9C8",
                animation: `tivra-fade-up 0.5s ${i * 0.09}s cubic-bezier(.22,.68,0,1.1) both`,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: col.color }}>
                {col.label}
              </p>
              <p
                className="text-2xl font-black"
                style={{ color: "#1A0F3C", fontVariantNumeric: "tabular-nums" }}
              >
                {col.displayCount}
              </p>
            </div>
          ))}
        </div>

        {/* Board header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-black text-xl" style={{ color: "#1A0F3C" }}>
            Client Board
          </h1>
          <button
            onClick={() => { setEditingClient(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#F4611A" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Client
          </button>
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const colClients = clients.filter((c) => c.status === col.id);
            const isOver = dragOverCol === col.id;

            return (
              <div
                key={col.id}
                className="rounded-2xl flex flex-col overflow-hidden transition-all"
                style={{
                  border: isOver ? `2px solid ${col.color}` : "2px solid transparent",
                  background: isOver ? col.bg : "rgba(255,255,255,0.6)",
                  minHeight: 300,
                }}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                {/* Column header */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: `1px solid ${col.bg}`, background: col.bg }}
                >
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: col.color }}>
                    {col.label}
                  </span>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: col.color, color: "#fff" }}
                  >
                    {colClients.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 p-3 flex-1">
                  {colClients.map((client, cardIdx) => (
                    <div
                      key={client.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, client.id)}
                      className="rounded-xl cursor-grab active:cursor-grabbing transition-all"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E8D9C8",
                        opacity: draggingId === client.id ? 0.5 : 1,
                        boxShadow: draggingId === client.id ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                        animation: `tivra-fade-up 0.45s ${cardIdx * 0.07}s cubic-bezier(.22,.68,0,1.1) both`,
                      }}
                    >
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-bold text-sm" style={{ color: "#1A0F3C" }}>
                              {client.name}
                            </p>
                            {client.company && (
                              <p className="text-xs" style={{ color: "#6B5E7A" }}>
                                {client.company}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => { setEditingClient(client); setShowModal(true); }}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
                              style={{ background: "#FFF8F0", color: "#6B5E7A" }}
                              title="Edit"
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M7 1l2 2-5 5H2V6l5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(client.id)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors"
                              style={{ background: "#FDECEA", color: "#D93025" }}
                              title="Delete"
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Project type badge */}
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
                          style={{
                            background: `${TYPE_COLORS[client.project_type] ?? "#6B5E7A"}18`,
                            color: TYPE_COLORS[client.project_type] ?? "#6B5E7A",
                          }}
                        >
                          {client.project_type}
                        </span>

                        {client.assigned_dev && (
                          <p className="text-xs" style={{ color: "#6B5E7A" }}>
                            Dev: <strong style={{ color: "#1A0F3C" }}>{client.assigned_dev}</strong>
                          </p>
                        )}

                        {client.next_action && (
                          <p
                            className="text-xs mt-1 leading-relaxed line-clamp-2"
                            style={{ color: "#6B5E7A" }}
                          >
                            → {client.next_action}
                          </p>
                        )}

                        {/* Expand notes */}
                        {client.notes && (
                          <button
                            onClick={() =>
                              setExpandedId(expandedId === client.id ? null : client.id)
                            }
                            className="text-xs mt-2 font-semibold transition-colors"
                            style={{ color: "#F4611A" }}
                          >
                            {expandedId === client.id ? "Hide notes" : "Show notes"}
                          </button>
                        )}

                        {expandedId === client.id && client.notes && (
                          <p
                            className="text-xs mt-2 p-2 rounded-lg leading-relaxed"
                            style={{ background: "#FFF8F0", color: "#6B5E7A" }}
                          >
                            {client.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {colClients.length === 0 && (
                    <div
                      className="flex-1 flex items-center justify-center py-8 rounded-xl"
                      style={{
                        border: "1px dashed #E8D9C8",
                        color: "#E8D9C8",
                        fontSize: "0.75rem",
                      }}
                    >
                      Drop cards here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <AddClientModal
          onClose={() => { setShowModal(false); setEditingClient(null); }}
          onSave={onSave}
          existing={editingClient}
        />
      )}
    </div>
  );
}
