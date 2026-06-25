import { prisma } from "@/lib/prisma";

export async function findFeaturedTestimonials(limit = 6) {
  return prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function findAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}
