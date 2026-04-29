import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Products", path: "/products" },
  { label: "Internship", path: "/internship" },
  { label: "Accreditations", path: "/accreditations" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  const location = useLocation();
  const isMenuOpen = menuOpen && openedOnPath === location.pathname;

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      setMenuOpen(false);
      return;
    }

    setOpenedOnPath(location.pathname);
    setMenuOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-bg border-b border-border py-3"
            : "bg-transparent py-5",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto container-pad flex items-center justify-between">
          {/* ── Logo ── */}
          <NavLink to="/" className="flex items-center gap-2 select-none group">
            <span className="w-2.5 h-2.5 rounded-sm bg-accent shrink-0 transition-transform duration-300 group-hover:rotate-45" />
            <span
              className={[
                "text-lg font-black tracking-tight transition-colors duration-200",
                scrolled ? "text-ink" : "text-white",
              ].join(" ")}
            >
              Unicode Technolab
            </span>
          </NavLink>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  [
                    "nav-link",
                    isActive ? "active" : "",
                    scrolled
                      ? "text-muted hover:text-ink after:bg-ink"
                      : "text-white/70! hover:text-white! after:bg-white!",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          {/* <NavLink
            to="/contact"
            className={[
              "hidden md:inline-flex btn-primary text-xs py-2.5 px-5",
              !scrolled &&
                "bg-white! text-brand! border-white! hover:bg-white/90!",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            Get Started
          </NavLink> */}

          {/* ── Mobile Hamburger ── */}
          <button
            className={[
              "md:hidden p-1.5 rounded-sm transition-colors",
              scrolled ? "text-ink" : "text-white",
            ].join(" ")}
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Full-screen Menu ── */}
      <div
        className={[
          "fixed inset-0 z-40 bg-brand flex flex-col transition-all duration-400",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-6 text-white p-1.5"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col justify-center h-full px-10 gap-8">
          {NAV_ITEMS.map(({ label, path }, i) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "text-4xl font-black text-white/80 hover:text-white transition-all duration-200",
                  "border-b border-white/10 pb-4",
                  isActive ? "text-white!" : "",
                  isMenuOpen ? `animate-fade-up delay-${(i + 1) * 100}` : "",
                ].join(" ")
              }
            >
              <span className="text-accent text-base font-normal mr-3">
                0{i + 1}
              </span>
              {label}
            </NavLink>
          ))}

          {/* <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-ghost w-fit mt-4 animate-fade-up delay-600"
          >
            Get Started
          </NavLink> */}
        </nav>

        {/* Decorative corner text */}
        <p className="absolute bottom-8 right-8 text-white/20 text-xs tracking-widest uppercase font-medium">
          Unicode Technolab
        </p>
      </div>
    </>
  );
}
