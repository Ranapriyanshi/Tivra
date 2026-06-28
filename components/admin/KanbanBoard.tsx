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
  { id: "lead",        label: "Lead",        dot: "#F4611A", bg: "#FDEEE4", headerBg: "#FDEEE4" },
  { id: "in_progress", label: "In Progress", dot: "#D4900A", bg: "#FFF5D6", headerBg: "#FFF5D6" },
  { id: "review",      label: "In Review",   dot: "#007B6E", bg: "#E0F3F1", headerBg: "#E0F3F1" },
  { id: "delivered",   label: "Delivered",   dot: "#4B3B8C", bg: "#EAE7F5", headerBg: "#EAE7F5" },
];

const TYPE_COLORS: Record<string, { text: string; bg: string }> = {
  "Landing Page":  { text: "#C44F0E", bg: "#FDEEE4" },
  "E-Commerce":    { text: "#007B6E", bg: "#E0F3F1" },
  "Portfolio":     { text: "#8A6000", bg: "#FFF5D6" },
  "Blog":          { text: "#4B3B8C", bg: "#EAE7F5" },
  "Booking Site":  { text: "#D93025", bg: "#FDECEA" },
  "Other":         { text: "#6B5E7A", bg: "#F2EFF8" },
};

const PROGRESS: Record<string, number> = {
  lead: 10, in_progress: 50, review: 85, delivered: 100,
};

function avatar(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name[0].toUpperCase();
}

const AVATAR_COLORS = ["#F4611A", "#007B6E", "#4B3B8C", "#D4900A", "#D93025"];
function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── Icons ────────────────────────────────────────────────────────────────────
function IconHome() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
function IconBoard() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="2" width="6" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="12" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function IconTeam() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 4a3 3 0 010 6M17 16c0-2.5-1.5-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconCalendar() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 1v4M12 1v4M2 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconSettings() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function IconLogout() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 2H3a1 1 0 00-1 1v12a1 1 0 001 1h4M12 13l4-4-4-4M16 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconSearch() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function IconPlus() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>;
}
function IconDots() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="2" cy="7" r="1.2" fill="currentColor"/><circle cx="7" cy="7" r="1.2" fill="currentColor"/><circle cx="12" cy="7" r="1.2" fill="currentColor"/></svg>;
}
function IconBell() {
  return <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M8.5 1.5A5 5 0 003.5 6.5v3l-1.5 2h13l-1.5-2v-3a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 13.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function IconEdit() {
  return <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M7.5 1.5l2 2-5.5 5.5H2v-2l5.5-5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconTrash() {
  return <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 3h7M4.5 3V2h2v1M4 3l.5 6M7 3l-.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ onSignOut }: { onSignOut: () => void }) {
  const navItems = [
    { icon: <IconHome />, label: "Home" },
    { icon: <IconBoard />, label: "Board", active: true },
    { icon: <IconTeam />, label: "Team" },
    { icon: <IconCalendar />, label: "Calendar" },
  ];
  return (
    <aside
      className="flex flex-col items-center py-5 gap-1 shrink-0"
      style={{ width: 56, background: "#ffffff", borderRight: "1px solid #E8E4DE" }}
    >
      {/* Logo */}
      <div className="mb-5">
        <span
          className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-xs"
          style={{ background: "#F4611A" }}
        >
          T
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: item.active ? "#F4611A" : "transparent",
              color: item.active ? "#fff" : "#ABABAB",
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 mt-auto">
        <button
          title="Settings"
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ color: "#ABABAB" }}
        >
          <IconSettings />
        </button>
        <button
          onClick={onSignOut}
          title="Sign out"
          className="w-9 h-9 rounded-xl flex items-center justify-center hover:text-red-500 transition-colors"
          style={{ color: "#ABABAB" }}
        >
          <IconLogout />
        </button>
      </div>
    </aside>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function KanbanCard({
  client,
  dragging,
  onDragStart,
  onEdit,
  onDelete,
}: {
  client: Client;
  dragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const typeColor = TYPE_COLORS[client.project_type] ?? { text: "#6B5E7A", bg: "#F2EFF8" };
  const progress = PROGRESS[client.status] ?? 0;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="rounded-2xl cursor-grab active:cursor-grabbing"
      style={{
        background: "#ffffff",
        border: "1px solid #EDE9E3",
        opacity: dragging ? 0.45 : 1,
        boxShadow: dragging ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s, opacity 0.15s",
      }}
    >
      <div className="p-4">
        {/* Type badge + actions */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: typeColor.bg, color: typeColor.text }}
          >
            {client.project_type}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "#F2EFEA", color: "#787878" }}
              title="Edit"
            >
              <IconEdit />
            </button>
            <button
              onClick={onDelete}
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "#FDECEA", color: "#D93025" }}
              title="Delete"
            >
              <IconTrash />
            </button>
          </div>
          {/* Always-visible dots trigger edit */}
          <button
            onClick={onEdit}
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ color: "#ABABAB" }}
          >
            <IconDots />
          </button>
        </div>

        {/* Title */}
        <p className="font-bold text-sm leading-snug mb-1" style={{ color: "#111111" }}>
          {client.name}
        </p>
        {client.company && (
          <p className="text-xs mb-2" style={{ color: "#ABABAB" }}>
            {client.company}
          </p>
        )}

        {/* Note */}
        {client.next_action && (
          <p
            className="text-xs leading-relaxed mb-3 line-clamp-2"
            style={{ color: "#787878" }}
          >
            Note: {client.next_action}
          </p>
        )}

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs" style={{ color: "#ABABAB" }}>Progress</span>
            <span className="text-xs font-semibold" style={{ color: "#ABABAB" }}>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F2EFEA" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: progress === 100 ? "#007B6E" : "#F4611A",
                transition: "width 0.8s cubic-bezier(.22,.68,0,1.1)",
              }}
            />
          </div>
        </div>

        {/* Footer: avatar + meta */}
        <div className="flex items-center justify-between">
          {client.assigned_dev ? (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ background: avatarColor(client.assigned_dev) }}
              title={client.assigned_dev}
            >
              {avatar(client.assigned_dev)}
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full" style={{ background: "#F2EFEA" }} />
          )}
          <div className="flex items-center gap-3">
            <span className="text-xs flex items-center gap-1" style={{ color: "#ABABAB" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1h9v7H6l-2.5 2V8H1V1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              </svg>
              {client.notes ? 1 : 0}
            </span>
            <span className="text-xs flex items-center gap-1" style={{ color: "#ABABAB" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <rect x="1" y="1" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M3 4h5M3 7h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Board ────────────────────────────────────────────────────────────────
export default function KanbanBoard({ initialClients, userEmail }: Props) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [search, setSearch] = useState("");

  const supabase = createClient();

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
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
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

  const filtered = search.trim()
    ? clients.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.company.toLowerCase().includes(search.toLowerCase()) ||
          c.project_type.toLowerCase().includes(search.toLowerCase())
      )
    : clients;

  const userInitials = userEmail
    ? userEmail.split("@")[0].slice(0, 2).toUpperCase()
    : "AD";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F6F4F0" }}>
      <Sidebar onSignOut={signOut} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header
          className="flex items-center justify-between px-6 h-14 shrink-0"
          style={{ background: "#ffffff", borderBottom: "1px solid #E8E4DE" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "#F6F4F0", width: 240 }}
          >
            <span style={{ color: "#ABABAB" }}><IconSearch /></span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients…"
              className="text-sm bg-transparent outline-none flex-1"
              style={{ color: "#111111" }}
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "#F6F4F0", color: "#787878" }}
            >
              <IconBell />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                style={{ background: avatarColor(userEmail) }}
              >
                {userInitials}
              </div>
              <span className="text-sm font-semibold" style={{ color: "#111111" }}>
                {userEmail.split("@")[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Board header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: "#ffffff", borderBottom: "1px solid #E8E4DE" }}
        >
          <div>
            <h1 className="text-lg font-black" style={{ color: "#111111" }}>
              Client Board
            </h1>
            <p className="text-xs" style={{ color: "#ABABAB" }}>
              {clients.length} active project{clients.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab pill */}
            <div
              className="hidden sm:flex items-center gap-1 p-1 rounded-xl"
              style={{ background: "#F6F4F0" }}
            >
              {["Overview", "Board", "Calendar"].map((t) => (
                <button
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={
                    t === "Board"
                      ? { background: "#F4611A", color: "#fff" }
                      : { color: "#ABABAB" }
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setEditingClient(null); setShowModal(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#F4611A" }}
            >
              <IconPlus />
              Add Client
            </button>
          </div>
        </div>

        {/* Kanban area */}
        <div className="flex-1 overflow-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 min-w-[720px]">
            {COLUMNS.map((col) => {
              const colClients = filtered.filter((c) => c.status === col.id);
              const isOver = dragOverCol === col.id;

              return (
                <div
                  key={col.id}
                  className="flex flex-col rounded-2xl overflow-hidden transition-all"
                  style={{
                    background: col.bg,
                    border: isOver ? `1.5px solid ${col.dot}` : "1.5px solid transparent",
                    minHeight: 400,
                  }}
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragLeave={() => setDragOverCol(null)}
                  onDrop={(e) => handleDrop(e, col.id)}
                >
                  {/* Column header */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: col.dot }}
                      />
                      <span className="text-sm font-bold" style={{ color: "#111111" }}>
                        {col.label}
                      </span>
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(0,0,0,0.08)", color: "#555" }}
                      >
                        {colClients.length}
                      </span>
                    </div>
                    <button style={{ color: "#ABABAB" }}><IconDots /></button>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-3 px-3 pb-3 flex-1">
                    {colClients.map((client) => (
                      <KanbanCard
                        key={client.id}
                        client={client}
                        dragging={draggingId === client.id}
                        onDragStart={(e) => handleDragStart(e, client.id)}
                        onEdit={() => { setEditingClient(client); setShowModal(true); }}
                        onDelete={() => handleDelete(client.id)}
                      />
                    ))}

                    {colClients.length === 0 && (
                      <div
                        className="flex-1 flex items-center justify-center rounded-xl py-10 text-xs"
                        style={{ border: `1.5px dashed ${col.dot}40`, color: `${col.dot}80` }}
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
