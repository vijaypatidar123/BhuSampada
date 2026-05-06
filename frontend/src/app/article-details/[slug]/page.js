import Image from "next/image";

import { SiteShell } from "@/components/site-shell";
import { fetchArticle } from "@/lib/api";

export default async function ArticleDetailPage({ params }) {
  const article = await fetchArticle(params.slug);

  return (
    <SiteShell>
      <main className="site-container detail-wrap">
        <article className="detail-card">
          <div className="detail-hero">
            <div>
              <Image src={article.image} alt={article.title} width={900} height={620} />
            </div>
            <div className="detail-side">
              <div>
                <span className="tag">{article.category?.category || "General"}</span>
                <h1 style={{ marginTop: "0.8rem", fontSize: "2.6rem" }}>{article.title}</h1>
                <p className="story-copy">{article.created_at}</p>
              </div>
              <div className="info-list">
                <div>
                  <strong>Slug</strong>
                  <span>{article.slug_id}</span>
                </div>
                <div>
                  <strong>Category</strong>
                  <span>{article.category?.category || "General"}</span>
                </div>
              </div>
            </div>
          </div>
          <section style={{ marginTop: "1.5rem" }}>
            <h2 style={{ marginBottom: "0.75rem" }}>Content</h2>
            <div className="rich-text" dangerouslySetInnerHTML={{ __html: article.description }} />
          </section>
        </article>
      </main>
    </SiteShell>
  );
}
