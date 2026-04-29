import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  Code2,
  Server,
  Layers,
  Smartphone,
  Image,
  TrendingUp,
  BarChart,
  Clock,
  Users,
  Check,
  ArrowRight,
  Calendar,
} from "lucide-react";

const COURSES = [
  {
    id: "01",
    icon: Palette,
    title: "UI/UX Design Mastery",
    desc: "Create intuitive and visually appealing user interfaces with industry-standard tools like Figma and Adobe XD.",
    duration: "12 Weeks",
    students: "250+",
    tag: "Design",
    popular: true,
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    icon: Code2,
    title: "Front-End Development",
    desc: "Master HTML, CSS, JavaScript, and React to build responsive, interactive websites from the ground up.",
    duration: "16 Weeks",
    students: "320+",
    tag: "Development",
    popular: true,
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    icon: Server,
    title: "Back-End Development",
    desc: "Learn server-side programming with Node.js, Express, and databases to build robust, scalable applications.",
    duration: "14 Weeks",
    students: "180+",
    tag: "Development",
    popular: false,
    img: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "04",
    icon: Layers,
    title: "Full-Stack Development",
    desc: "Comprehensive training covering both front-end and back-end to build and ship complete web applications.",
    duration: "24 Weeks",
    students: "200+",
    tag: "Development",
    popular: true,
    img: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "05",
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Build native and cross-platform apps for iOS and Android using React Native and Flutter.",
    duration: "16 Weeks",
    students: "150+",
    tag: "Mobile",
    popular: false,
    img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "06",
    icon: Image,
    title: "Graphic Design",
    desc: "Master design principles, color theory, typography, and tools like Adobe Photoshop and Illustrator.",
    duration: "10 Weeks",
    students: "280+",
    tag: "Design",
    popular: false,
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "07",
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Master SEO, social media marketing, content creation, and analytics to grow businesses online.",
    duration: "8 Weeks",
    students: "120+",
    tag: "Marketing",
    popular: false,
    img: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "08",
    icon: BarChart,
    title: "Data Analysis",
    desc: "Collect, process, and analyze data to derive meaningful insights and build compelling visualizations.",
    duration: "12 Weeks",
    students: "90+",
    tag: "Data",
    popular: false,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

const TAGS = ["All", "Design", "Development", "Mobile", "Marketing", "Data"];

const FAQS = [
  {
    q: "How are the courses structured?",
    a: "Balanced blend of theory and practical work — lectures, hands-on exercises, real projects, and assessments.",
  },
  {
    q: "Do you provide job assistance after completion?",
    a: "Yes. Resume building, interview prep, and connections with our industry partners for placement opportunities.",
  },
  {
    q: "Are there prerequisites for joining?",
    a: "Basic courses have none. Advanced courses may require prior domain knowledge — listed per course.",
  },
  {
    q: "Do you offer certificates?",
    a: "Yes — every completed course comes with a certificate validating your skills and knowledge.",
  },
  {
    q: "Are there flexible schedule options?",
    a: "Morning, evening, and weekend batches available to accommodate work and study commitments.",
  },
];

export default function Courses() {
  const [activeTag, setActiveTag] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeTag === "All" ? COURSES : COURSES.filter((c) => c.tag === activeTag);

  return (
    <main>
      {/* ── Header ── */}
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
          <p className="label-tag text-accent! mb-4">What We Teach</p>
          <h1
            className="text-white font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Courses
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            Comprehensive training programs designed to equip you with in-demand
            IT skills and advance your career.
          </p>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          {/* Filter tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={[
                  "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200",
                  activeTag === tag
                    ? "bg-brand text-white border-brand"
                    : "bg-transparent text-muted border-border hover:border-brand hover:text-ink",
                ].join(" ")}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(
              ({
                id,
                icon: Icon,
                title,
                desc,
                duration,
                students,
                popular,
                img,
              }) => (
                <div
                  key={id}
                  className="card group overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-3/2 overflow-hidden bg-surface">
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Index overlay */}
                    <span className="absolute top-3 left-3 text-white/90 font-black text-xs bg-brand/70 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                      {id}
                    </span>
                    {popular && (
                      <span className="absolute top-3 right-3 bg-accent text-ink text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-sm bg-surface flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors duration-300">
                        <Icon
                          size={14}
                          className="text-brand group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-sm leading-tight">
                        {title}
                      </h3>
                    </div>
                    <p className="text-muted text-xs leading-relaxed mb-4 flex-1">
                      {desc}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border-light">
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Clock size={11} />
                        <span>{duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Users size={11} />
                        <span>{students}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Course Benefits ── */}
      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">Why Learn With Us</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Course Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Expert Instructors",
                desc: "Learn from practitioners who bring current, real-world knowledge into every session.",
              },
              {
                icon: Code2,
                title: "Practical Projects",
                desc: "Build a portfolio of real-world work that speaks louder than any certificate.",
              },
              {
                icon: Calendar,
                title: "Flexible Schedule",
                desc: "Morning, evening, or weekend batches to fit around your life.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-border rounded-sm p-7 hover:shadow-sm transition-shadow"
              >
                <div className="w-10 h-10 rounded-sm bg-surface flex items-center justify-center mb-5">
                  <Icon size={18} className="text-brand" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificates ── */}
      <section className="section-pad bg-brand">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-tag text-accent! mb-4">Upon Completion</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Training &amp;
                <br />
                Completion
                <br />
                Certificates
              </h2>
              <p className="text-white/60 text-sm mt-6 leading-relaxed max-w-md">
                Every student who successfully completes a course at Unicode
                Technolab receives an official certificate issued by the
                institute. Certificates include the student's full name, course
                title, duration, and institute seal — valid for academic,
                internship, and job applications.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/30 rounded-sm px-3 py-1.5">
                  Unicode Technolab
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 rounded-sm px-3 py-1.5">
                  Est. 2013 · Porbandar, Gujarat
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Training Certificate",
                  detail:
                    "Issued after completing any standalone training module or short course.",
                },
                {
                  label: "Course Completion",
                  detail:
                    "Awarded on successful completion of a full structured course with assessment.",
                },
                {
                  label: "Internship Certificate",
                  detail:
                    "Issued to students who complete an internship program with our institute.",
                },
                {
                  label: "Student Enrollment ID",
                  detail:
                    "Each enrolled student receives a unique student ID and an institutional email address for the duration of their program.",
                },
              ].map(({ label, detail }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-sm p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Check size={12} className="text-accent shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                      {label}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-pad bg-bg">
        <div className="max-w-3xl mx-auto container-pad">
          <div className="mb-10">
            <p className="label-tag mb-3">Common Queries</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Frequently Asked
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="py-5">
                <button
                  className="w-full flex items-start justify-between gap-4 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm text-ink group-hover:text-brand transition-colors">
                    {q}
                  </span>
                  <span
                    className={[
                      "text-muted shrink-0 mt-0.5 font-bold text-lg leading-none transition-transform duration-200",
                      openFaq === i ? "rotate-45" : "",
                    ].join(" ")}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-sm text-muted leading-relaxed pr-8">
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand py-16">
        <div className="max-w-7xl mx-auto container-pad flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Not sure which course is right for you?
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              Get in touch and we'll help you choose the perfect path.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-primary bg-accent! border-accent! text-ink! shrink-0"
          >
            Talk to Us <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
