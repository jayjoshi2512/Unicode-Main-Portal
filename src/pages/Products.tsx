import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Monitor,
  ShieldCheck,
  QrCode,
  LayoutDashboard,
  UserCog,
  CreditCard,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  images: string[];
  icon: React.ElementType;
}

const PRODUCTS: Product[] = [
  {
    id: "01",
    name: "UniGuard",
    tagline: "Smart Security & Visitor Management",
    category: "Security",
    description:
      "UniGuard is a comprehensive security and visitor management system purpose-built for educational institutions. It digitalises gate operations, visitor check-ins, and guard monitoring — replacing paper registers with a fast, accountable, and fully auditable digital workflow that keeps campuses safe and organised.",
    features: [
      "Digital visitor registration & gate pass generation",
      "Real-time entry & exit tracking with timestamps",
      "Guard duty roster & patrol management",
      "Photo capture & identity verification at entry points",
      "Security incident log with detailed audit trail",
      "Daily, weekly & monthly security reports",
    ],
    images: [
      "/images/UniGuard-1.jpg",
      "/images/UniGuard-2.jpg",
      "/images/UniGuard-3.jpg",
      "/images/UniGuard-4.jpg",
      "/images/UniGuard-5.jpg",
      "/images/UniGuard-6.jpg",
      "/images/UniGuard-7.jpg",
    ],
    icon: ShieldCheck,
  },
  {
    id: "02",
    name: "UniClass",
    tagline: "Intelligent Classroom & Attendance Management",
    category: "Education",
    description:
      "UniClass streamlines day-to-day academic operations with smart classroom management tools. From digital attendance to timetable scheduling and student progress tracking, UniClass gives faculty and administrators complete visibility and control — eliminating pen-and-paper workflows entirely.",
    features: [
      "Per-lecture digital attendance tracking",
      "Automated timetable & schedule management",
      "Student performance and grade monitoring",
      "Batch, section & semester management",
      "Faculty workload assignment & tracking",
      "Automated low-attendance alerts to students",
    ],
    images: [
      "/images/UniClass-1.jpg",
      "/images/UniClass-2.jpg",
      "/images/UniClass-3.jpg",
      "/images/UniClass-4.jpg",
      "/images/UniClass-5.jpg",
    ],
    icon: Monitor,
  },
  {
    id: "03",
    name: "UniQR",
    tagline: "Contactless QR-Based Attendance System",
    category: "Attendance",
    description:
      "UniQR eliminates manual roll calls with a seamless QR code–based attendance system. Students scan a time-locked dynamic QR code to mark their presence — instantly, accurately, and without any room for proxy. Faculty receive live attendance data the moment the session begins.",
    features: [
      "Dynamic, time-locked QR generation per lecture session",
      "Mobile-first one-tap scanning for students",
      "Anti-proxy enforcement with session-bound codes",
      "Live attendance dashboard for faculty",
      "Exportable reports in CSV & PDF formats",
    ],
    images: [
      "/images/UniQR-1.jpg",
      "/images/UniQR-2.jpg",
    ],
    icon: QrCode,
  },
  {
    id: "04",
    name: "Admin Panel",
    tagline: "Centralised Administrative Control Hub",
    category: "Management",
    description:
      "The Admin Panel gives institution administrators a powerful single-window interface to oversee all operational data. Packed with real-time dashboards, analytics, and management tools, it keeps administrators fully in control of users, departments, courses, and system-wide settings.",
    features: [
      "Comprehensive user & role management",
      "Real-time analytics dashboards & visual charts",
      "Department, branch & course configuration",
      "Bulk data import & export tools",
      "Internal notification & broadcast hub",
      "System audit logs & complete access history",
    ],
    images: [
      "/images/Admin-1.png",
      "/images/Admin-2.png",
      "/images/Admin-3.png",
      "/images/Admin-4.png",
      "/images/Admin-5.png",
    ],
    icon: LayoutDashboard,
  },
  {
    id: "05",
    name: "Super Admin",
    tagline: "Enterprise-Level Platform Governance",
    category: "Management",
    description:
      "The Super Admin panel sits at the top of the platform hierarchy, providing supreme authority over the entire system. Built for system owners and enterprise clients, it enables oversight of multiple institutional accounts, platform-wide configurations, and deep performance insights all in one place.",
    features: [
      "Multi-institution account management",
      "Platform-wide configuration & feature toggles",
      "System health, uptime & performance monitoring",
      "Advanced role-based permission & access control",
      "Billing, subscription & licence management",
    ],
    images: [
      "/images/Super-Admin-1.png",
    ],
    icon: UserCog,
  },
  {
    id: "06",
    name: "ID Card Generator",
    tagline: "Professional Identity Card Design & Printing",
    category: "Utilities",
    description:
      "The ID Card Generator makes it effortless to design and produce professional identity cards for students and staff. With customisable templates, photo integration, and batch generation capabilities, institutions can produce print-ready, branded ID cards in minutes — no design skills required.",
    features: [
      "Customisable card templates with institute branding",
      "Bulk generation for entire student batches",
      "Student & staff photo integration",
      "QR code & barcode embedding on each card",
      "Print-ready high-resolution PDF export",
    ],
    images: [
      "/images/IDcard-1.png",
    ],
    icon: CreditCard,
  },
];

/* ── Product Gallery ── */
function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const multi = images.length > 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Main viewer */}
      <div
        className="relative bg-surface border border-border rounded-sm overflow-hidden flex items-center justify-center"
        style={{ height: "360px" }}
      >
        <img
          key={active}
          src={images[active]}
          alt={`${name} – screen ${active + 1}`}
          className="w-full h-full object-contain animate-fade-in"
        />

        {/* Counter badge */}
        {multi && (
          <span className="absolute bottom-3 right-3 bg-brand/75 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-sm pointer-events-none">
            {active + 1} / {images.length}
          </span>
        )}

        {/* Prev / Next */}
        {multi && (
          <>
            <button
              aria-label="Previous image"
              onClick={() =>
                setActive((p) => (p - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-brand/70 hover:bg-brand text-white rounded-sm flex items-center justify-center transition-colors duration-200"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              aria-label="Next image"
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-brand/70 hover:bg-brand text-white rounded-sm flex items-center justify-center transition-colors duration-200"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {multi && (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                "shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200",
                i === active
                  ? "border-brand shadow-sm"
                  : "border-border opacity-50 hover:opacity-90 hover:border-brand/40",
              ].join(" ")}
              style={{ width: "70px", height: "48px" }}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative bg-brand overflow-hidden pt-36 pb-24">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto container-pad">
          <p className="label-tag text-accent! mb-4">What We've Built</p>
          <h1
            className="text-white font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Our Products
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            Purpose-built software solutions for educational institutions —
            from campus security and attendance to classroom and administrative
            management.
          </p>
        </div>
      </section>

      {/* ── Product Sections ── */}
      {PRODUCTS.map(
        (
          { id, name, tagline, category, description, features, images, icon: Icon },
          idx
        ) => {
          const reversed = idx % 2 !== 0;
          return (
            <section
              key={id}
              className={[
                "py-16 md:py-24 border-t border-border-light",
                idx % 2 === 0 ? "bg-bg" : "bg-surface",
              ].join(" ")}
            >
              <div className="max-w-7xl mx-auto container-pad">
                <div
                  className={[
                    "flex flex-col gap-12 lg:gap-16 items-center",
                    reversed ? "lg:flex-row-reverse" : "lg:flex-row",
                  ].join(" ")}
                >
                  {/* Gallery */}
                  <div className="w-full lg:w-1/2">
                    <ProductGallery images={images} name={name} />
                  </div>

                  {/* Info */}
                  <div className="w-full lg:w-1/2">
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="label-tag">{category}</span>
                      <span className="text-border text-sm">—</span>
                      <span className="text-subtle text-xs font-mono tracking-widest">
                        {id}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-sm bg-brand flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                          {name}
                        </h2>
                        <p className="text-accent font-semibold text-sm mt-1">
                          {tagline}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted text-sm leading-relaxed mb-7">
                      {description}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-2.5">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-ink"
                        >
                          <span className="w-4 h-4 rounded-sm bg-brand flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-accent" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        }
      )}

      {/* ── CTA ── */}
      <section className="bg-brand py-16">
        <div className="max-w-7xl mx-auto container-pad flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Interested in our products?
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              Get in touch for a live demo or custom implementation.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-primary bg-accent! border-accent! text-ink! shrink-0"
          >
            Request a Demo <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
