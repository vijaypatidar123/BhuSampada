import Image from "next/image";

import { SiteShell } from "@/components/site-shell";
import { fetchAgent } from "@/lib/api";

export default async function AgentDetailPage({ params }) {
  const agent = await fetchAgent(params.slug);

  return (
    <SiteShell>
      <main className="site-container detail-wrap">
        <article className="detail-card">
          <div className="detail-hero">
            <div style={{ background: "#f6f1e7", padding: "2rem", borderRadius: "1.25rem" }}>
              <Image
                src={agent.profile || "/favicon.ico"}
                alt={agent.name}
                width={220}
                height={220}
                style={{ borderRadius: "999px", margin: "0 auto" }}
              />
            </div>
            <div className="detail-side">
              <div>
                <span className="tag">Agent profile</span>
                <h1 style={{ marginTop: "0.8rem", fontSize: "2.6rem" }}>{agent.name}</h1>
                <p className="story-copy">{agent.email}</p>
              </div>
              <div className="info-list">
                <div>
                  <strong>Mobile</strong>
                  <span>{agent.mobile || "Not available"}</span>
                </div>
                <div>
                  <strong>Properties</strong>
                  <span>{agent.property_count}</span>
                </div>
                <div>
                  <strong>Projects</strong>
                  <span>{agent.projects_count}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </SiteShell>
  );
}
