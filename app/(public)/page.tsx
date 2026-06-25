export const dynamic = "force-dynamic";
import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedListings } from "@/components/home/featured-listings";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";
import { getFeaturedProperties } from "@/services/property.service";
import { findFeaturedTestimonials } from "@/repositories/testimonial.repository";
import { getAgents } from "@/services/agent.service";
import { AgentCard } from "@/components/agent/agent-card";

export default async function HomePage() {
  const [featuredProperties, testimonials, agents] = await Promise.all([
    getFeaturedProperties(6),
    findFeaturedTestimonials(3),
    getAgents(),
  ]);

  const spotlightAgents = agents.slice(0, 3);

  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedListings properties={featuredProperties} />

      {spotlightAgents.length > 0 && (
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-2">
                Meet the Team
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                Our Top Agents
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlightAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  );
}
