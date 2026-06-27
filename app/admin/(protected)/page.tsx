import { createClient } from "@/lib/supabase/server";
import KanbanBoard from "@/components/admin/KanbanBoard";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <KanbanBoard
      initialClients={clients ?? []}
      userEmail={user?.email ?? ""}
    />
  );
}
