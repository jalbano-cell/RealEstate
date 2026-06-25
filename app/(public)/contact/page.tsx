import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PrimeRealty. We're here to help you buy, sell, or rent your next property.",
};

const contactInfo = [
  { icon: Phone, label: "Phone", value: "(416) 555-0100", href: "tel:+14165550100" },
  { icon: Mail, label: "Email", value: "info@primerealty.ca", href: "mailto:info@primerealty.ca" },
  { icon: MapPin, label: "Office", value: "123 Bay Street, Suite 800\nToronto, ON M5J 2T3", href: null },
  { icon: Clock, label: "Hours", value: "Mon–Fri: 9am–6pm\nSat: 10am–4pm", href: null },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Contact PrimeRealty</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Whether you&apos;re buying, selling, or just exploring your options, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-neutral-800 font-medium hover:text-amber-600 transition-colors whitespace-pre-line">
                        {value}
                      </a>
                    ) : (
                      <p className="text-neutral-800 font-medium whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-neutral-100 rounded-xl h-64 flex items-center justify-center border border-neutral-200">
              <div className="text-center text-neutral-400">
                <MapPin className="h-10 w-10 mx-auto mb-2" />
                <p className="text-sm font-medium">123 Bay Street, Suite 800</p>
                <p className="text-xs">Toronto, ON M5J 2T3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
