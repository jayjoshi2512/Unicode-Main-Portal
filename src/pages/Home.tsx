import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Palette,
  Code2,
  Smartphone,
  Image,
  Globe,
  TrendingUp,
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Laptop,
  BarChart,
  ChevronRight,
} from "lucide-react";

/* ─── Animated Counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const step = Math.ceil(duration / target);
          let cur = 0;
          const timer = setInterval(() => {
            cur = Math.min(cur + Math.ceil(target / 60), target);
            setVal(cur);
            if (cur >= target) clearInterval(timer);
          }, step);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─── Service card data ── */
const SERVICES = [
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Create intuitive, engaging experiences with industry-standard design tools.",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Build responsive, dynamic websites using modern frameworks and technologies.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Cross-platform mobile applications for iOS & Android with expert guidance.",
  },
  {
    icon: Image,
    title: "Graphic Design",
    desc: "Master visual communication and create stunning graphics for every medium.",
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    desc: "Professional domain registration and reliable web hosting solutions.",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    desc: "Improve search visibility and drive organic traffic with proven strategies.",
  },
  {
    icon: GraduationCap,
    title: "Internship Programs",
    desc: "Structured internships for engineering students to gain real-world experience.",
  },
  {
    icon: Clock,
    title: "Training Programs",
    desc: "Specialized training programs to sharpen skills and accelerate your career.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Students Trained" },
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Job Assistance" },
  { value: 15, suffix: "+", label: "Courses Offered" },
];

const FEATURES = [
  {
    icon: Laptop,
    title: "Expert-Led Training",
    desc: "Industry veterans with years of hands-on experience guide every session.",
  },
  {
    icon: BarChart,
    title: "Hands-on Learning",
    desc: "Work on real-world projects that solve genuine business problems.",
  },
  {
    icon: Users,
    title: "Career Support",
    desc: "Portfolio development, interview prep, and a strong placement network.",
  },
];

/* Ticker strip content */
const TICKER_ITEMS = [
  "UI/UX Design",
  "Web Development",
  "App Development",
  "Graphic Design",
  "SEO & Marketing",
  "Internship Programs",
  "Domain & Hosting",
  "Full-Stack Development",
  "Data Analysis",
];

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-brand overflow-hidden flex flex-col justify-center">
        {/* Subtle dot-grid background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Large ghost text behind content */}
        <span
          aria-hidden
          className="absolute select-none pointer-events-none text-white/3 font-black leading-none"
          style={{
            fontSize: "clamp(8rem, 22vw, 24rem)",
            bottom: "-2rem",
            right: "-1rem",
            letterSpacing: "-0.05em",
          }}
        >
          UNICODE
        </span>

        <div className="relative z-10 max-w-7xl mx-auto container-pad w-full pt-32 pb-16">
          {/* Tag */}
          <div className="animate-fade-up flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-white/80 text-xs font-medium tracking-wide">
                IT Skills &amp; Training Institute · Est. 2013
              </span>
            </span>
          </div>

          {/* Main heading */}
          <div className="mb-8 max-w-4xl">
            <h1
              className="animate-fade-up delay-100 text-white leading-[1.02] text-balance"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Transforming Ideas
              <br />
              <span className="text-accent">Into Digital</span>
              <br />
              Reality.
            </h1>
          </div>

          {/* Divider row */}
          <div className="animate-fade-up delay-200 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/10 pt-6 mb-10">
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md">
              Expert training in UI/UX, Web &amp; App Development, Graphic
              Design, and professional internship programs for engineering
              students.
            </p>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/courses"
                className="btn-primary bg-accent! border-accent! text-ink! hover:opacity-90!"
              >
                Explore Courses <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-300 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-sm overflow-hidden">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="bg-brand px-6 py-5">
                <p className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  <Counter target={value} suffix={suffix} />
                </p>
                <p className="text-white/50 text-xs font-medium tracking-wide mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="animate-fade-up delay-500 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TICKER STRIP
      ══════════════════════════════════════════════ */}
      <div className="bg-accent py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-6 text-ink text-xs font-bold uppercase tracking-widest"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-ink/40" />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════ */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="label-tag mb-3">What We Offer</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Services &amp;
                <br />
                Courses
              </h2>
            </div>
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors"
            >
              View all courses
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="card group p-6 flex flex-col gap-4"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors duration-300">
                  <Icon
                    size={18}
                    className="text-brand group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
                <Link
                  to="/courses"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:gap-2.5 transition-all"
                >
                  Learn more <ChevronRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════ */}
      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="label-tag mb-4">Why Unicode</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Built for
                <br />
                Real Careers.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-10 max-w-md">
                We don't teach theory in isolation. Every lesson, every project,
                every interaction is engineered to make you industry-ready.
              </p>
              <div className="flex flex-col gap-6">
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-border-light flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={17} className="text-brand" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{title}</h4>
                      <p className="text-muted text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: responsive stat blocks */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map(({ value, suffix, label }, i) => (
                <div
                  key={label}
                  className={[
                    "flex flex-col justify-center items-center text-center sm:items-start sm:text-left sm:justify-between p-4 sm:p-6 lg:p-7 min-h-30 sm:min-h-36 rounded-sm border border-border",
                    i === 0 ? "bg-brand text-white" : "bg-white",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "font-black tracking-tight leading-none",
                      i === 0 ? "text-accent" : "text-ink",
                    ].join(" ")}
                    style={{ fontSize: "clamp(1.7rem, 4.8vw, 3.2rem)" }}
                  >
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p
                    className={[
                      "text-[0.65rem] sm:text-xs font-semibold uppercase tracking-widest mt-2 sm:mt-3",
                      i === 0 ? "text-white/50" : "text-muted",
                    ].join(" ")}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTERNSHIP CALLOUT
      ══════════════════════════════════════════════ */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* HTML & Tailwind card */}
            <div className="border border-gray-200 grayscale opacity-70 rounded-sm p-8 flex flex-col gap-4 transition-colors group">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 border border-gray-200 rounded-sm">Inactive</span>
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">On-site</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                HTML5 &amp;
                <br />
                Tailwind CSS
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                4-week deep-dive into modern front-end fundamentals — layouts,
                responsive design, and building beautiful interfaces from
                scratch.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  4 Weeks
                </span>
              </div>
            </div>

            {/* Advanced PHP card */}
            <div className="border border-border rounded-sm p-8 flex flex-col gap-4 hover:border-brand transition-colors group bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-green-600 bg-green-50 border border-green-200 rounded-sm">Active</span>
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">On-site</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                Web Development &
                <br />
                API Integration
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                60-Hours intensive covering real-world PHP — AJAX, JSON, jQuery,
                Google Maps, payment gateways, PDF generation, and more.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  60 Hours
                </span>
              </div>
            </div>

            {/* MERN Stack card */}
            <div className="border border-gray-200 grayscale opacity-70 rounded-sm p-8 flex flex-col gap-4 transition-colors group">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 border border-gray-200 rounded-sm">Inactive</span>
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">On-site</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                MERN
                <br />
                Stack
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                3-month full-stack program — MongoDB, Express.js, React.js &amp;
                Node.js. Build, deploy, and ship real-world applications end to
                end.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  3 Months
                </span>
              </div>
            </div>

            {/* Django Web Development card */}
            <div className="border border-border rounded-sm p-8 flex flex-col gap-4 hover:border-brand transition-colors group bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-green-600 bg-green-50 border border-green-200 rounded-sm">Active</span>
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">Online</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                Django
                <br />
                Web Development
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                Comprehensive backend development with Django — learn project
                setup, ORM, authentication, forms, admin panel, and deploy
                production applications.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  60 Hours
                </span>
              </div>
            </div>

            {/* UI Design with Figma card */}
            <div className="border border-border rounded-sm p-8 flex flex-col gap-4 hover:border-brand transition-colors group bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-green-600 bg-green-50 border border-green-200 rounded-sm">Active</span>
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">Online</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                UI Design
                <br />
                with Figma
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                Master modern UI design using Figma — from wireframing and
                layout planning to prototyping, components, and responsive
                design for web &amp; mobile.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  60 Hours
                </span>
              </div>
            </div>

            {/* AI Tools & Automation card */}
            <div className="border border-border rounded-sm p-8 flex flex-col gap-4 hover:border-brand transition-colors group bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-green-600 bg-green-50 border border-green-200 rounded-sm">Active</span>
                <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">Online</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">
                AI Tools &amp;
                <br />
                Automation
              </h3>
              <p className="text-muted text-sm leading-relaxed flex-1">
                Master AI automation, prompt engineering, and build real-world workflows, chatbots, and AI solutions.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                  60 Hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA — DARK SOLID
      ══════════════════════════════════════════════ */}
      <section className="bg-dark py-24">
        <div className="max-w-7xl mx-auto container-pad flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="label-tag text-accent! mb-4">Start Today</p>
            <h2
              className="text-white font-black leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Ready to Start
              <br />
              Your Tech Journey?
            </h2>
            <p className="text-white/50 mt-5 text-base leading-relaxed">
              Join Unicode and gain skills that open real doors — not just
              certificates. Your career transformation starts here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/courses"
              className="btn-primary bg-accent! border-accent! text-ink!"
            >
              Browse Courses <BookOpen size={15} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
