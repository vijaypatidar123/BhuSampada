import Image from "next/image";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import {
  fetchArticles,
  fetchContentSummary,
  fetchProjects,
  fetchProperties,
  fetchServices,
  fetchSettings,
} from "@/lib/api";

function formatPrice(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numeric);
}

export default async function HomePage() {
  const [settings, summary, properties, projects, articles, services] = await Promise.all([
    fetchSettings(),
    fetchContentSummary(),
    fetchProperties(),
    fetchProjects(),
    fetchArticles(),
    fetchServices(),
  ]);

  const brand = settings?.data || {};

  return (
    <SiteShell>
      <main className="site-container">
        <section className="hero-grid">
          <div className="hero-card">
            <div className="eyebrow">Live capture running locally</div>
            <h1 className="hero-title">Property, projects, agents, and content now routed through the new stack.</h1>
            <p className="hero-copy">
              This local build is already using the captured public BhuSampada content snapshot. The next phase is
              replacing snapshot-backed endpoints with MongoDB-backed FastAPI services and then mapping media into
              Cloudinary.
            </p>
            <div className="cta-row">
              <Link className="button-primary" href="/buy">
                Browse properties
              </Link>
              <Link className="button-secondary" href="/all-projects">
                View projects
              </Link>
            </div>
            <div className="metric-grid">
              <div className="metric-card">
                <strong>{summary.properties.count}</strong>
                <span>Captured properties</span>
              </div>
              <div className="metric-card">
                <strong>{summary.services.count}</strong>
                <span>Service providers</span>
              </div>
              <div className="metric-card">
                <strong>{summary.agents.count}</strong>
                <span>Agents in snapshot</span>
              </div>
            </div>
          </div>
          <div className="panel-card stack">
            <div>
              <div className="tag">Brand</div>
              <h3 style={{ marginTop: "0.75rem", fontSize: "1.65rem" }}>{brand.company_name || "BhuSampada"}</h3>
              <p className="story-copy">
                {brand.company_email || "Public settings captured from the live site are now available locally."}
              </p>
            </div>
            {brand.web_logo ? (
              <div style={{ background: "#f8f5ee", borderRadius: "1.2rem", padding: "1rem" }}>
                <Image src={brand.web_logo} alt="BhuSampada logo" width={220} height={80} />
              </div>
            ) : null}
            <div className="info-list">
              <div>
                <strong>Primary contact</strong>
                <span>{brand.company_tel1 || "Not captured"}</span>
              </div>
              <div>
                <strong>Secondary contact</strong>
                <span>{brand.company_tel2 || "Not captured"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>Featured properties</h2>
              <p>Served from the local FastAPI layer using the captured live property payloads.</p>
            </div>
            <Link className="button-secondary" href="/buy">
              Open listing
            </Link>
          </div>
          <div className="card-grid">
            {properties.slice(0, 3).map((property) => (
              <Link className="story-card" key={property.id} href={`/properties-details/${property.slug_id}`}>
                <Image src={property.title_image} alt={property.title} width={640} height={400} />
                <div className="story-body">
                  <div className="story-meta">
                    <span className="tag">{property.property_type}</span>
                    <span>{property.city}, {property.state}</span>
                  </div>
                  <h3 className="story-title">{property.title}</h3>
                  <p className="story-copy">{property.description?.slice(0, 120)}...</p>
                  <p className="price">{formatPrice(property.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>Projects and editorial content</h2>
              <p>The core public modules are already browsable locally.</p>
            </div>
          </div>
          <div className="story-grid">
            {projects.slice(0, 1).map((project) => (
              <Link className="story-card" key={project.id} href={`/project-details/${project.slug_id}`}>
                <Image src={project.image} alt={project.title} width={640} height={400} />
                <div className="story-body">
                  <div className="story-meta">
                    <span className="tag">Project</span>
                    <span>{project.city}</span>
                  </div>
                  <h3 className="story-title">{project.title}</h3>
                  <p className="story-copy">{project.description?.slice(0, 180)}...</p>
                </div>
              </Link>
            ))}
            {articles.slice(0, 1).map((article) => (
              <Link className="story-card" key={article.id} href={`/article-details/${article.slug_id}`}>
                <Image src={article.image} alt={article.title} width={640} height={400} />
                <div className="story-body">
                  <div className="story-meta">
                    <span className="tag">Article</span>
                    <span>{article.created_at}</span>
                  </div>
                  <h3 className="story-title">{article.title}</h3>
                  <p className="story-copy">Public article content was captured from the live API and is now local.</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <h2>Expert services</h2>
              <p>Service-provider content is also available through the same local API layer.</p>
            </div>
          </div>
          <div className="card-grid">
            {services.slice(0, 3).map((service) => (
              <article className="story-card" key={service.id}>
                <Image
                  src={`https://bhusampada.com/backend/${service.image}`}
                  alt={service.service_type?.service_type_name || service.user_name}
                  width={640}
                  height={400}
                />
                <div className="story-body">
                  <div className="story-meta">
                    <span className="tag">{service.service_type?.service_type_name}</span>
                    <span>{service.company_name}</span>
                  </div>
                  <h3 className="story-title">{service.user_name}</h3>
                  <p className="story-copy">{service.description?.slice(0, 140)}...</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
