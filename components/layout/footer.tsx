import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const propertyLinks = [
  { href: "/properties?listingType=FOR_SALE", label: "Homes for Sale" },
  { href: "/properties?listingType=FOR_RENT", label: "Homes for Rent" },
  { href: "/properties?propertyType=CONDO", label: "Condos" },
  { href: "/properties?propertyType=TOWNHOUSE", label: "Townhouses" },
  { href: "/properties?propertyType=COMMERCIAL", label: "Commercial" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/agents", label: "Our Agents" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/login", label: "Agent Portal" },
];

const socialLinks = [
  { label: "FB", href: "#", fullLabel: "Facebook" },
  { label: "IG", href: "#", fullLabel: "Instagram" },
  { label: "X", href: "#", fullLabel: "Twitter / X" },
  { label: "in", href: "#", fullLabel: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RE</span>
              </div>
              <span className="text-white font-bold text-lg">PrimeRealty</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Toronto&apos;s premier real estate brokerage. We help families find their perfect home and investors build lasting wealth through property.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, fullLabel }) => (
                <a
                  key={fullLabel}
                  href={href}
                  aria-label={fullLabel}
                  className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Properties</h3>
            <ul className="space-y-2.5">
              {propertyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
                <span>123 Bay Street, Suite 800<br />Toronto, ON M5J 2T3</span>
              </li>
              <li>
                <a href="tel:+14165550100" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                  (416) 555-0100
                </a>
              </li>
              <li>
                <a href="mailto:info@primerealty.ca" className="flex items-center gap-3 text-sm hover:text-amber-400 transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                  info@primerealty.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} PrimeRealty. All rights reserved.</p>
          <p>
            Designed &amp; Managed by{" "}
            <a
              href="https://omnigriddigital.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-400 transition-colors"
            >
              Omnigrid Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
