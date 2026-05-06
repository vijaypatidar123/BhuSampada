import Image from "next/image";

import { SiteShell } from "@/components/site-shell";
import { fetchProject } from "@/lib/api";

export default async function ProjectDetailPage({ params }) {
  const project = await fetchProject(params.slug);

  return (
    <SiteShell>
      <main className="site-container detail-wrap">
        <article className="detail-card">
          <div className="detail-hero">
            <div>
              <Image src={project.image} alt={project.title} width={900} height={620} />
            </div>
            <div className="detail-side">
              <div>
                <span className="tag">{project.type}</span>
                <h1 style={{ marginTop: "0.8rem", fontSize: "2.6rem" }}>{project.title}</h1>
                <p className="story-copy">{project.location}</p>
              </div>
              <div className="info-list">
                <div>
                  <strong>City</strong>
                  <span>{project.city}</span>
                </div>
                <div>
                  <strong>State</strong>
                  <span>{project.state}</span>
                </div>
                <div>
                  <strong>Country</strong>
                  <span>{project.country}</span>
                </div>
                <div>
                  <strong>Total clicks</strong>
                  <span>{project.total_click}</span>
                </div>
              </div>
            </div>
          </div>
          <section style={{ marginTop: "1.5rem" }}>
            <h2 style={{ marginBottom: "0.75rem" }}>Description</h2>
            <p className="rich-text">{project.description}</p>
          </section>
        </article>
      </main>
    </SiteShell>
  );
}
