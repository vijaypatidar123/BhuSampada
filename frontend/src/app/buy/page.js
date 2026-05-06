import Image from "next/image";
import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { fetchProperties } from "@/lib/api";

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export const metadata = {
  title: "Buy | BhuSampada",
};

export default async function BuyPage() {
  const properties = await fetchProperties();

  return (
    <SiteShell>
      <main className="site-container section">
        <div className="section-head" style={{ paddingTop: "2rem" }}>
          <div>
            <h2>Property listings</h2>
            <p>The local listing page is already reading the captured live property records through FastAPI.</p>
          </div>
        </div>
        <div className="card-grid">
          {properties.map((property) => (
            <Link className="story-card" key={property.id} href={`/properties-details/${property.slug_id}`}>
              <Image src={property.title_image} alt={property.title} width={640} height={400} />
              <div className="story-body">
                <div className="story-meta">
                  <span className="tag">{property.category?.category || property.property_type}</span>
                  <span>{property.city}, {property.state}</span>
                </div>
                <h3 className="story-title">{property.title}</h3>
                <p className="story-copy">{property.description?.slice(0, 160)}...</p>
                <p className="price">{formatPrice(property.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
