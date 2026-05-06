import Image from "next/image";

import { SiteShell } from "@/components/site-shell";
import { fetchProperty } from "@/lib/api";

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default async function PropertyDetailPage({ params }) {
  const property = await fetchProperty(params.slug);

  return (
    <SiteShell>
      <main className="site-container detail-wrap">
        <article className="detail-card">
          <div className="detail-hero">
            <div>
              <div className="detail-hero">
                <div>
                  <Image src={property.title_image} alt={property.title} width={900} height={620} />
                </div>
                <div className="detail-side">
                  <div>
                    <span className="tag">{property.category?.category || property.property_type}</span>
                    <h1 style={{ marginTop: "0.8rem", fontSize: "2.6rem" }}>{property.title}</h1>
                    <p className="price">{formatPrice(property.price)}</p>
                  </div>
                  <div className="info-list">
                    <div>
                      <strong>Location</strong>
                      <span>{property.address}</span>
                    </div>
                    <div>
                      <strong>City</strong>
                      <span>{property.city}, {property.state}, {property.country}</span>
                    </div>
                    <div>
                      <strong>Property type</strong>
                      <span>{property.property_type}</span>
                    </div>
                    <div>
                      <strong>Posted</strong>
                      <span>{property.post_created}</span>
                    </div>
                  </div>
                </div>
              </div>
              <section style={{ marginTop: "1.5rem" }}>
                <h2 style={{ marginBottom: "0.75rem" }}>Description</h2>
                <p className="rich-text">{property.description}</p>
              </section>
            </div>
          </div>
        </article>
      </main>
    </SiteShell>
  );
}
