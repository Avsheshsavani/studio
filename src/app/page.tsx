import { Dashboard } from "@/components/dashboard";
import { initialNotes } from "@/lib/data";

export default function Home() {
  return <Dashboard initialNotes={initialNotes} />;
}
