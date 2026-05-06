import Image from "next/image";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { fetchProjects } from "@/lib/api";

export const metadata = {
  title: "Projects | BhuSampada",
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <SiteShell>
      <main className="site-container section">
        <div className="section-head" style={{ paddingTop: "2rem" }}>
          <div>
            <h2>Projects</h2>
            <p>Projects are served locally from the captured public project feed.</p>
          </div>
        </div>
        <div className="card-grid">
          {projects.map((project) => (
            <Link className="story-card" key={project.id} href={`/project-details/${project.slug_id}`}>
              <Image src={project.image} alt={project.title} width={640} height={400} />
              <div className="story-body">
                <div className="story-meta">
                  <span className="tag">{project.type}</span>
                  <span>{project.city}</span>
                </div>
                <h3 className="story-title">{project.title}</h3>
                <p className="story-copy">{project.description?.slice(0, 180)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
