import Image from "next/image";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { fetchAgents } from "@/lib/api";

export const metadata = {
  title: "Agents | BhuSampada",
};

export default async function AgentsPage() {
  const agents = await fetchAgents();

  return (
    <SiteShell>
      <main className="site-container section">
        <div className="section-head" style={{ paddingTop: "2rem" }}>
          <div>
            <h2>Agents</h2>
            <p>Agent cards are now local and browsable through the rebuilt frontend.</p>
          </div>
        </div>
        <div className="card-grid">
          {agents.map((agent) => (
            <Link className="story-card" key={agent.id} href={`/agent-details/${agent.slug_id}`}>
              <div style={{ background: "#f6f1e7", padding: "1.5rem" }}>
                <Image src={agent.profile || "/favicon.ico"} alt={agent.name} width={140} height={140} style={{ borderRadius: "999px", margin: "0 auto" }} />
              </div>
              <div className="story-body">
                <div className="story-meta">
                  <span className="tag">Agent</span>
                  <span>{agent.email}</span>
                </div>
                <h3 className="story-title">{agent.name}</h3>
                <p className="story-copy">
                  {agent.property_count} properties, {agent.projects_count} projects
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
