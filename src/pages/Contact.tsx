import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    lines: ["Unicode, MG Road", "Porbandar, Gujarat, India — 360575"],
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 7874444005"],
    href: "tel:+917874444005",
  },
  {
    icon: Mail,
    label: "Email",
    lines: [
      "(For query, feedback, visit)",
      "contact@unicodetechnolab.com",
      "(For Service, freelance, project)",
      "consult@unicodetechnolab.com",
    ],
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    lines: ["Mon – Sat: 9 AM – 8 PM", "Sunday: Closed"],
    href: null,
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
          <p className="label-tag text-accent! mb-4">Reach Out</p>
          <h1
            className="text-white font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Contact Us
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
            Have a question or want to enroll? We're here, and we respond fast.
          </p>
        </div>
      </section>

      {/* ── Contact info strip ── */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {CONTACT_INFO.map(({ icon: Icon, label, lines, href }) => (
              <div key={label} className="py-8 px-6 first:pl-0 last:pr-0">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                    {label}
                  </span>
                </div>
                {lines.map((line, i) =>
                  line.includes("@") ? (
                    <a
                      key={i}
                      href={`mailto:${line}`}
                      className="block text-sm font-medium text-ink hover:text-accent transition-colors"
                    >
                      {line}
                    </a>
                  ) : href && i === 0 ? (
                    <a
                      key={i}
                      href={href}
                      className="block text-sm font-medium text-ink hover:text-accent transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={i} className="text-sm text-muted">
                      {line}
                    </p>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main section: form + map ── */}
      <section className="section-pad bg-bg">
        <div className="max-w-7xl mx-auto container-pad">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* ── Contact Form ── */}
            <div>
              <p className="label-tag mb-4">Send a Message</p>
              <h2 className="text-3xl font-black tracking-tight mb-8">
                Let's Talk.
              </h2>

              {submitted && (
                <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-sm p-4">
                  <CheckCircle size={18} className="text-green-600 shrink-0" />
                  <p className="text-sm text-green-800 font-medium">
                    Message received! We'll get back to you shortly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="field">
                    <label>Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
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
                    />
                  </div>
                  <div className="field">
                    <label>Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3.5"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            </div>

            {/* ── Map + extra info ── */}
            <div className="space-y-6">
              {/* Map embed */}
              <div>
                <p className="label-tag mb-4">Find Us</p>
                <h2 className="text-3xl font-black tracking-tight mb-6">
                  Our Location
                </h2>
                <div className="rounded-sm overflow-hidden border border-border h-80">
                  <iframe
                    title="Unicode Technolab Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.6382803568!2d69.5996!3d21.6393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM4JzIxLjUiTiA2OcKwMzUnNTguNiJF!5e0!3m2!1sen!2sin!4v1615000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Reassurance block */}
              <div className="bg-surface border border-border rounded-sm p-6 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  What to expect
                </p>
                {[
                  "Response within 24 hours on all working days",
                  "Free initial consultation — no commitment needed",
                  "Course guidance tailored to your background",
                  "Transparent fee structure, zero hidden charges",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={14}
                      className="text-accent mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
