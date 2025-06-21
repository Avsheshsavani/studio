import { Dashboard } from "@/components/dashboard";
import { ProtectedRoute } from "@/components/protected-route";
import { initialNotes } from "@/lib/data";

export default function Home() {
  return (
    <ProtectedRoute>
      <Dashboard initialNotes={initialNotes} />
    </ProtectedRoute>
  );
}
