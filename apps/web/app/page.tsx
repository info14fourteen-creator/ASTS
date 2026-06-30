import { Sidebar } from "./app-shell";
import { OverviewWorkspace } from "./overview-sections";

export default function Home() {
  return (
    <main className="app-shell">
      <Sidebar active="overview" />
      <OverviewWorkspace />
    </main>
  );
}
