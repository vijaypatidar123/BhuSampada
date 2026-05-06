import Image from "next/image";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { fetchArticles } from "@/lib/api";

export const metadata = {
  title: "Blogs | BhuSampada",
};

export default async function BlogsPage() {
  const articles = await fetchArticles();

  return (
    <SiteShell>
      <main className="site-container section">
        <div className="section-head" style={{ paddingTop: "2rem" }}>
          <div>
            <h2>Blogs and articles</h2>
            <p>Editorial content is now local and routed through the new API layer.</p>
          </div>
        </div>
        <div className="card-grid">
          {articles.map((article) => (
            <Link className="story-card" key={article.id} href={`/article-details/${article.slug_id}`}>
              <Image src={article.image} alt={article.title} width={640} height={400} />
              <div className="story-body">
                <div className="story-meta">
                  <span className="tag">{article.category?.category || "General"}</span>
                  <span>{article.created_at}</span>
                </div>
                <h3 className="story-title">{article.title}</h3>
                <p className="story-copy">Open the detail page to inspect the captured rich article HTML.</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
