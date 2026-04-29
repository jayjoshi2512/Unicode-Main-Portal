import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  GraduationCap,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";

const MISSION_POINTS = [
  "Deliver high-quality IT education and training",
  "Equip students with industry-relevant skills",
  "Provide meaningful internship experiences",
  "Support businesses with comprehensive IT solutions",
  "Foster a culture of innovation and continuous learning",
];

const VALUES = [
  {
    icon: GraduationCap,
    title: "Excellence in Education",
    desc: "We are committed to providing the highest quality education - not half-measures, not shortcuts.",
  },
  {
    icon: Briefcase,
    title: "Industry Relevance",
    desc: "Our curriculum is designed around current industry demands, preparing students for genuine real-world challenges.",
  },
  {
    icon: Users,
    title: "Student Success",
    desc: "We prioritize outcomes. Every program, every session is built around one question: is this making the student better?",
  },
];

const TIMELINE = [
  {
    year: "2003 - 2010",
    title: "Phase 1: The Foundation",
    role: "Founder & Lead Trainer | Madhav Institute & Web Technologies (MIWT)",
    points: [
      "Established an ISO Certified Training Centre focused on core computing and early web logic.",
      "Specialized in foundational languages including HTML, CSS, and early PHP with logic building.",
      "Empowered hundreds of students with industry-standard certifications.",
    ],
  },
  {
    year: "2011 - 2017",
    title: "Phase 2: The Shift to Development",
    role: "Senior Web Developer & Consultant",
    points: [
      "Moved from pure training into high-level web design and development projects for regional and international clients.",
      "Expanded into CMS platforms like WordPress/Joomla and responsive design.",
      "Started integrating third-party services into custom web applications.",
    ],
  },
  {
    year: "2018 - 2024",
    title: "Phase 3: Scaling & Specialization",
    role: "Full-Stack Architect & Internship Director",
    points: [
      "Expanded services into mobile app development and complex system architecture.",
      "Formalized paid and free internship programs as a talent pipeline.",
      "Specialized in secure API integration and custom backend solutions.",
    ],
  },
  {
    year: "2025 - Present",
    title: "Phase 4: The Unicode Era",
    role: "Founder & CEO | Unicode Technolab",
    points: [
      "Launched Unicode Technolab as a strategic rebrand to unify IT services.",
      "Built a 360-degree offering: web and app development, specialization training, and IT consulting.",
      "Adopted modern stacks and AI-driven integrations to keep clients ahead.",
    ],
  },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Page Header */}
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
          <p className="label-tag text-accent! mb-4">Our story</p>
          <h1
            className="text-white font-black tracking-tight leading-tight max-w-2xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            About
            <br />
            Unicode
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
            Empowering individuals with cutting-edge IT skills and providing
            comprehensive solutions for businesses - since 2013.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="label-tag mb-4">Mission & Vision</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                Bridging Knowledge
                <br />
                and Industry.
              </h2>
              <p className="text-muted leading-relaxed mb-8 text-sm md:text-base">
                At Unicode, we are dedicated to bridging the gap between
                theoretical knowledge and practical application in the IT
                industry. Our mission is to provide comprehensive training and
                education that empowers individuals to excel in the digital
                world.
              </p>
              <ul className="space-y-3">
                {MISSION_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      className="text-accent mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-ink">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-4/3 rounded-sm overflow-hidden bg-surface border border-border">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                  alt="Unicode Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand text-white px-6 py-4 rounded-sm shadow-xl">
                <p className="text-3xl font-black text-accent">500+</p>
                <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mt-1">
                  Students Trained
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">What Drives Us</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={[
                  "rounded-sm p-8 flex flex-col gap-5",
                  i === 0
                    ? "bg-brand text-white"
                    : "bg-white border border-border",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-11 h-11 rounded-sm flex items-center justify-center",
                    i === 0 ? "bg-white/10" : "bg-surface",
                  ].join(" ")}
                >
                  <Icon
                    size={20}
                    className={i === 0 ? "text-accent" : "text-brand"}
                  />
                </div>
                <div>
                  <h3
                    className={[
                      "text-lg font-bold mb-2",
                      i === 0 ? "text-white" : "text-ink",
                    ].join(" ")}
                  >
                    {title}
                  </h3>
                  <p
                    className={[
                      "text-sm leading-relaxed",
                      i === 0 ? "text-white/60" : "text-muted",
                    ].join(" ")}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Credentials */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">Recognised & Verified</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Accreditations &amp; Credentials
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: "ISO Certified",
                value: "9001:2015",
                sub: "Quality Management Standard",
                note: "Certification validating our training standards and educational processes.",
              },
              {
                label: "Institutional Email",
                value: "contact@unicodetechnolab.com",
                sub: "Official Institute Domain",
                note: "All enrolled students receive an institutional email address upon registration.",
              },
              {
                label: "Student Enrollment ID",
                value: "Issued on Admission",
                sub: "Unique Per Student",
                note: "Every student is assigned an ID used for certificates, records, and portal access.",
              },
              {
                label: "Established",
                value: "2013",
                sub: "Porbandar, Gujarat, India",
                note: "Over a decade of structured IT education and professional training.",
              },
            ].map(({ label, value, sub, note }) => (
              <div
                key={label}
                className="bg-surface border border-border rounded-sm p-6 flex flex-col gap-3"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                  {label}
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className={[
                      "text-accent font-black text-lg leading-snug tracking-tight",
                      label === "Institutional Email"
                        ? "break-all text-base"
                        : "",
                    ].join(" ")}
                  >
                    {value}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted/70">
                    {sub}
                  </span>
                </div>
                <div className="h-px bg-border" />
                <p className="text-xs text-muted leading-relaxed">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-brand rounded-sm p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                Registered Institute Address
              </p>
              <p className="text-white font-bold text-lg">Unicode Technolab</p>
              <p className="text-white/60 text-sm mt-1">
                MG Road, Porbandar, Gujarat, India - 360575
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm text-white/60 shrink-0">
              <span>Phone: +91 7874444005</span>
              <span>Email: contact@unicodetechnolab.com</span>
              <span>Email: consult@unicodetechnolab.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty & Instructors */}
      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">The Team</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Faculty &amp; Instructors
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {[
              {
                name: "Bhavesh Joshi",
                role: "CEO & Senior Faculty",
                exp: "20+ years",
                courses: [
                  "Diploma Subjects",
                  "Specialization PHP",
                  "Graphic Designing",
                ],
              },
              {
                name: "Ashish Thanki",
                role: "IT Expert Faculty",
                exp: "2+ years",
                courses: [
                  "Fullstack Development",
                  "Advance Technologies",
                  "App Development",
                ],
              },
              {
                name: "Jayesh Rangwani",
                role: "Non-IT Faculty",
                exp: "10+ years",
                courses: [
                  "Basic Maths",
                  "Advance Maths",
                  "Maths for Degree Engg.",
                ],
              },
              {
                name: "Khyati Bhundiya",
                role: "Non-IT Faculty",
                exp: "2+ years",
                courses: [
                  "Diploma Subjects",
                  "Specialization Chemistry",
                  "Electronics",
                ],
              },
            ].map(({ name, role, exp, courses }) => (
              <div
                key={name}
                className="bg-white border border-border rounded-sm p-8 flex flex-col gap-5"
              >
                <div className="w-14 h-14 rounded-sm bg-brand flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-xl">
                    {name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base">{name}</h3>
                  <p className="text-muted text-xs mt-0.5">{role}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/30 rounded-sm px-2 py-0.5">
                    {exp} experience
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">
                    Teaches
                  </p>
                  <ul className="space-y-1">
                    {courses.map((c) => (
                      <li
                        key={c}
                        className="flex items-center gap-2 text-xs text-ink"
                      >
                        <CheckCircle
                          size={11}
                          className="text-accent shrink-0"
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">Career Evolution: 2003 - Present</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Our Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-22 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="flex flex-col gap-0">
              {TIMELINE.map(({ year, title, role, points }, i) => (
                <div
                  key={year}
                  className={[
                    "flex flex-col md:flex-row gap-4 md:gap-10 py-8",
                    i !== TIMELINE.length - 1
                      ? "border-b border-border-light md:border-none"
                      : "",
                  ].join(" ")}
                >
                  <div className="md:w-32 shrink-0 relative">
                    <span className="text-xl md:text-2xl font-black text-accent">
                      {year}
                    </span>
                    <div className="hidden md:block absolute right-0 top-2.5 w-3 h-3 rounded-full bg-brand border-2 border-bg translate-x-1.5" />
                  </div>
                  <div className="md:pl-10 flex-1">
                    <h3 className="text-lg font-bold mb-1.5">{title}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                      {role}
                    </p>
                    <ul className="space-y-2 max-w-2xl">
                      {points.map((point) => (
                        <li
                          key={point}
                          className="text-sm text-muted leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-accent mt-0.5">-</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto container-pad flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Ready to be part of our story?
            </h2>
            <p className="text-muted mt-2 text-sm">
              Explore courses or reach out to start your journey.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/courses" className="btn-primary">
              View Courses <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
