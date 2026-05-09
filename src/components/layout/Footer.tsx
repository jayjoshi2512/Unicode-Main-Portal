import { NavLink, Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Internship", path: "/internship" },
  { label: "Contact", path: "/contact" },
];

const SERVICES = [
  "UI/UX Design",
  "Web Development",
  "App Development",
  "Graphic Design",
  "Domain & Hosting",
  "SEO Optimization",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      {/* Top accent line */}
      <div className="h-px bg-accent opacity-60" />

      <div className="max-w-7xl mx-auto container-pad py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight">Unicode</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Empowering individuals with cutting-edge IT skills. Building
              careers, one skill at a time.
            </p>
            <div className="flex items-center gap-1 text-accent text-xs font-semibold tracking-widest uppercase">
              <span>Est. 2013</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Navigate
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="group flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-accent"
                    />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/60">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-snug">
                  MG Road, Porbandar,
                  <br />
                  Gujarat, India — 360575
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-accent shrink-0" />
                <a
                  href="tel:+919723092721"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  +91 9723092721
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-accent shrink-0" />
                <div className="text-sm text-white/60 leading-snug">
                  <p className="text-[11px] text-white/40">
                    (For query, feedback, visit)
                  </p>
                  <a
                    href="mailto:contact@unicodetechnolab.com"
                    className="hover:text-white transition-colors"
                  >
                    contact@unicodetechnolab.com
                  </a>
                  <p className="text-[11px] text-white/40 mt-1">
                    (For Service, freelance, project)
                  </p>
                  <a
                    href="mailto:consult@unicodetechnolab.com"
                    className="hover:text-white transition-colors"
                  >
                    consult@unicodetechnolab.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {year} Unicode Technolab. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
