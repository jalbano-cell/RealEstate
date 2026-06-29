import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-600 text-xs font-semibold uppercase tracking-[0.2em]">
              Client Stories
            </span>
            <div className="h-px w-8 bg-amber-500" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-7 border border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all duration-300 flex flex-col group"
            >
              <div className="flex items-start justify-between mb-5">
                <Quote className="h-7 w-7 text-amber-200 group-hover:text-amber-400 transition-colors duration-300 shrink-0" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed flex-1 mb-6 text-sm italic">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-neutral-900">{t.name}</p>
                  {t.role && <p className="text-xs text-neutral-400 mt-0.5">{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
