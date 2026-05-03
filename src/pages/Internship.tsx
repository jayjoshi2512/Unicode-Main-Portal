import { useEffect } from "react";
import { CheckCircle, GraduationCap, Users, Award, Clock } from "lucide-react";
import InternshipTable from "@/components/internship/InternshipTable";
import {
  INTERNSHIP_COLUMNS,
  INTERNSHIP_RECORDS,
} from "@/data/internshipRecords";

const PROGRAMS = [
  {
    id: "html-tailwind",
    title: "HTML5 & Tailwind CSS Fundamentals",
    duration: "4 Weeks",
    isActive: false,
    mode: "On-site",
    // desc: "Learn modern web development with HTML5 and Tailwind CSS. Master layout, responsive design, and creating beautiful interfaces.",
    curriculum: [
      "HTML5 Fundamentals",
      "HTML5 Layout & Structure",
      "Introduction to Tailwind CSS",
      "Typography and Spacing",
      "Layout with Flexbox & Grid",
      "Responsive Design Patterns",
    ],
  },
  {
    id: "advance-php",
    title: "Web Development & API Integration",
    duration: "60 Hours",
    isActive: true,
    mode: "On-site",
    // desc: "Master advanced PHP techniques with real-world applications — API integration, payment gateways, and dynamic content generation.(Diploma Students)",
    curriculum: [
      "Regular expressions",
      "AJAX & Async patterns",
      "JSON parsing & API calls",
      "Excel to database",
      "Captcha & Security",
      "Carousel & UI scripting",
      "Google Maps integration",
      "Payment Gateway integration",
      "PDF generation",
      "Email based user verification",
    ],
  },
  {
    id: "mern-stack",
    title: "MERN Stack Development",
    duration: "3 Months",
    isActive: false,
    mode: "On-site",
    // desc: "A comprehensive full-stack internship covering MongoDB, Express.js, React.js, and Node.js — build and deploy production-ready web applications.",
    curriculum: [
      "Node.js & Express.js fundamentals",
      "MongoDB & Mongoose ODM",
      "RESTful API design & development",
      "JWT Authentication & Authorization",
      "React.js with Hooks & Context API",
      "State management with Redux",
      "File uploads & Cloud storage",
      "Deployment (Vercel / Railway)",
    ],
  },
  {
    id: "django-web",
    title: "Django Web Development",
    duration: "60 Hours",
    isActive: true,
    mode: "Online",
    // desc: "Master backend development with Django framework — learn project setup, ORM, authentication, and build complete web applications.",
    curriculum: [
      "Introduction to Django",
      "Django project setup and app creation",
      "URL routing and basic views",
      "Templates and dynamic page rendering",
      "Static files handling",
      "Models and database connection",
      "ORM basics",
      "CRUD operations",
      "Forms and form validation",
      "User registration, login, and logout",
      "Password handling and authentication basics",
      "Admin panel usage and customization",
      "File and image upload basics",
      "Introduction to JSON response and API basics",
      "Basic deployment overview",
      "Final mini project",
    ],
  },
  {
    id: "figma-design",
    title: "UI Designing with Figma",
    duration: "60 Hours",
    isActive: true,
    mode: "Online",
    // desc: "Learn modern UI design principles using Figma — from wireframing to prototyping, creating professional designs for web and mobile.",
    curriculum: [
      "Introduction to Figma",
      "Figma interface and tools",
      "Wireframing basics",
      "Layout planning and page structure",
      "UI design principles",
      "Typography and color usage",
      "Spacing and alignment",
      "Components and reusable elements",
      "Auto layout",
      "Responsive design basics",
      "Prototyping and screen linking",
      "Designing for web and mobile",
      "Icons, images, and asset management",
      "Collaboration and sharing in Figma",
      "Exporting design assets",
      "Final UI project",
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools & Automation with Real Use Cases",
    duration: "60 Hours",
    isActive: true,
    mode: "Online",
    curriculum: [
      "Introduction to AI, Automation, and SaaS",
      "Real-world AI use cases (India-focused)",
      "Prompt engineering fundamentals",
      "Structured prompting and role-based prompts",
      "Controlling outputs (tables, JSON, formatted responses)",
      "Using AI for content creation (posts, captions, branding)",
      "Social media automation using AI tools",
      "Using AI for decision making and basic data analysis",
      "AI with Excel / Google Sheets (basic level)",
      "Building simple no-code AI workflows",
      "Creating chatbot / auto-reply systems",
      "Designing a basic AI solution (idea to prototype)",
      "Writing system logic using structured files (.md concept)",
      "Final project based on real-world use case",
    ],
  },
];

const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Practical Learning",
    desc: "Gain hands-on experience working on real-world projects and challenges under expert supervision.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    desc: "Receive guidance from industry professionals with years of hands-on experience.",
  },
  {
    icon: Award,
    title: "Certification",
    desc: "Earn a recognized internship completion certificate to differentiate yourself and boost your resume.",
  },
];

export default function Internship() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <p className="label-tag text-accent! mb-4">
            For Engineering Students
          </p>
          <h1
            className="text-white font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Internship
            <br />
            Programs
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            Gain valuable industry experience with our structured internship
            programs designed specifically for engineering students.
          </p>
        </div>
      </section>

      {/* ── Programs ── */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">Available Programs</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Choose Your Track
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={[
                  "rounded-sm border transition-all duration-300 overflow-hidden bg-white",
                  prog.isActive ? "border-border hover:border-brand" : "border-gray-200 grayscale opacity-70",
                ].join(" ")}
              >
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className={["px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest border rounded-sm", prog.isActive ? "text-green-600 bg-green-50 border-green-200" : "text-gray-500 bg-gray-50 border-gray-200"].join(" ")}>
                      {prog.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 rounded-sm">
                      {prog.mode}
                    </span>
                    <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-muted">
                      <Clock size={12} />
                      {prog.duration}
                    </div>
                  </div>

                  <h3
                    className={[
                      "text-2xl md:text-3xl font-black tracking-tight mb-3 text-ink",
                    ].join(" ")}
                  >
                    {prog.title}
                  </h3>
                  <p
                    className={["text-sm leading-relaxed mb-6 text-muted"].join(
                      " ",
                    )}
                  >
                    {/* {prog.desc} */}
                  </p>

                  {/* Curriculum */}
                  <ul className="space-y-2 mb-7">
                    {prog.curriculum.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle size={13} className="text-brand" />
                        <span className={["text-xs text-ink"].join(" ")}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* <a
                    href="#application-form"
                    className={[
                      "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
                      i === 0
                        ? "text-accent hover:text-white"
                        : "text-brand hover:text-accent",
                    ].join(" ")}
                    onClick={() => {
                      setForm((p) => ({ ...p, internshipType: prog.id }));
                    }}
                  >
                    Apply Now <ArrowRight size={13} />
                  </a> */}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="mb-8">
              <p className="label-tag mb-3">Internship Placements</p>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-ink">
                Students Who Trained With Us
              </h3>
            </div>

            <InternshipTable
              columns={INTERNSHIP_COLUMNS}
              rows={INTERNSHIP_RECORDS}
              pageSize={10}
            />
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section-pad bg-surface">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="mb-12">
            <p className="label-tag mb-3">Why Intern With Us</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Internship Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-border rounded-sm p-7"
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

      {/* ── Application Form ── */}
      {/* <section id="application-form" className="section-pad bg-bg">
        <div className="max-w-3xl mx-auto container-pad">
          <div className="mb-10">
            <p className="label-tag mb-3">Start Your Journey</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Apply for Internship
            </h2>
          </div>

          {submitted && (
            <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-sm p-4">
              <CheckCircle size={18} className="text-green-600 shrink-0" />
              <p className="text-sm text-green-800 font-medium">
                Application submitted! We'll review it and get back to you soon.
              </p>
            </div>
          )}

          <div className="bg-surface border border-border rounded-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink mb-3">
                  Internship Program
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROGRAMS.map((prog) => (
                    <label
                      key={prog.id}
                      className={[
                        "flex items-start gap-3 p-4 rounded-sm border cursor-pointer transition-all",
                        form.internshipType === prog.id
                          ? "border-brand bg-white shadow-sm"
                          : "border-border bg-white hover:border-brand/40",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="internshipType"
                        value={prog.id}
                        checked={form.internshipType === prog.id}
                        onChange={handleChange}
                        className="mt-0.5 accent-brand"
                      />
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {prog.title}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {prog.duration}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="field">
                  <label>College / University</label>
                  <input
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    placeholder="Institution name"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field">
                  <label>Current Course / Degree</label>
                  <input
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="e.g. B.E. Computer"
                    required
                  />
                </div>
                <div className="field">
                  <label>Current Semester</label>
                  <select
                    name="semester"
                    value={form.semester}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select semester</option>
                    {SEMESTERS.map((s) => (
                      <option key={s} value={s}>
                        {s} Semester
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Additional Message (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Anything you'd like us to know..."
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-3.5"
              >
                Submit Application <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </section> */}
    </main>
  );
}
