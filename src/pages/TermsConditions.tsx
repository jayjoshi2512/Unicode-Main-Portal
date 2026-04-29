import { useEffect } from "react";

const termsSections = [
  {
    title: "1. Definitions",
    points: [
      "Company refers to Unicode TechnoLab.",
      "Website refers to https://unicodetechnolab.com.",
      "Client refers to individuals, businesses, or organizations using our IT development services.",
      "Student/Trainee refers to individuals enrolled in our training or internship programs.",
      "Services include software development, API integration, IT consulting, internships, and training programs offered by the company.",
    ],
  },
  {
    title: "2. Use of Website",
    points: [
      "Use the website only for lawful purposes.",
      "Do not attempt unauthorized access to servers, databases, or internal systems.",
      "Do not distribute malicious software, viruses, or harmful code.",
      "Do not copy, reproduce, or redistribute website content without written permission.",
      "We reserve the right to restrict or terminate access for users who violate these terms.",
    ],
  },
  {
    title: "3. IT Services & Project Development",
    points: [
      "Clients must provide clear and accurate project requirements and documentation.",
      "All client-provided content/material must comply with copyright and legal regulations.",
      "Payments must follow agreed project quotation or contract terms.",
      "Clients should provide timely feedback and approvals.",
      "Project timelines can vary based on requirement changes, client response time, and third-party dependencies.",
    ],
  },
  {
    title: "4. Intellectual Property",
    points: [
      "Unless otherwise stated in writing, all custom software, applications, APIs, and web systems developed by Unicode TechnoLab become client intellectual property after full payment.",
      "Unicode TechnoLab may showcase completed projects in its portfolio unless restricted by confidentiality agreement.",
      "Unauthorized copying, resale, or distribution of proprietary frameworks, templates, or training materials is prohibited.",
    ],
  },
  {
    title: "5. Training, Internship & Certification Programs",
    points: [
      "Course fees must be paid according to the enrollment agreement.",
      "Attendance and project participation may be required for certification.",
      "Certificates are issued upon successful completion.",
      "Internship or training does not guarantee job placement, though placement assistance may be provided.",
      "Students must maintain professional conduct during sessions.",
    ],
  },
  {
    title: "6. Payment Terms",
    points: [
      "Payments may be made through approved methods.",
      "Advance payment may be required before project/training starts.",
      "Development projects may use milestone-based payments.",
      "Delayed payments may result in suspension or interruption.",
      "Payments are processed securely through authorized platforms.",
    ],
  },
  {
    title: "7. Refund Policy",
    points: [
      "IT Development Projects: Refunds are generally not applicable once development work starts; partial refunds may be considered only by mutual agreement.",
      "Training & Internship Programs: Fees are generally non-refundable unless specified in the enrollment agreement.",
    ],
  },
  {
    title: "8. Third-Party Services",
    points: [
      "Projects may integrate third-party platforms such as payment gateways, cloud hosting providers, analytics tools, or map/authentication services.",
      "Unicode TechnoLab is not responsible for interruptions, policy changes, or failures of these third-party providers.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    points: [
      "Unicode TechnoLab is not liable for indirect or consequential losses, business interruption, data loss caused by third-party systems, or security breaches beyond reasonable control.",
      "Clients are responsible for regular backups and proper system management.",
    ],
  },
  {
    title: "10. Termination of Services",
    points: [
      "Services may be terminated or suspended if terms are violated, payments are incomplete, or illegal/unethical activities are detected.",
      "Outstanding payments remain payable upon termination.",
    ],
  },
  {
    title: "11. Privacy Policy",
    points: [
      "Use of our website and services is also governed by our Privacy Policy.",
    ],
  },
  {
    title: "12. Changes to Terms & Conditions",
    points: [
      "We may update these Terms & Conditions to reflect service changes, legal compliance updates, or business policy modifications.",
      "Users are encouraged to review this page periodically.",
    ],
  },
];

export default function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="relative bg-brand overflow-hidden pt-36 pb-20">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto container-pad">
          <p className="label-tag text-accent! mb-4">Legal</p>
          <h1 className="text-white font-black tracking-tight leading-tight text-4xl md:text-6xl">
            Terms & Conditions
          </h1>
          <p className="text-white/60 mt-5 text-sm md:text-base">
            Last Updated: 10-March-2026
          </p>
          <p className="text-white/60 mt-4 leading-relaxed max-w-3xl text-sm md:text-base">
            By accessing this website or engaging in our IT services, training
            programs, or development solutions, you agree to comply with these
            Terms and Conditions. If you do not agree, please do not use our
            services.
          </p>
        </div>
      </section>

      <section className="section-pad bg-bg">
        <div className="max-w-5xl mx-auto container-pad space-y-10">
          {termsSections.map(({ title, points }) => (
            <article
              key={title}
              className="bg-surface border border-border rounded-sm p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-black tracking-tight mb-4">
                {title}
              </h2>
              <ul className="space-y-3">
                {points.map((point) => (
                  <li
                    key={point}
                    className="text-sm md:text-base text-muted leading-relaxed flex items-start gap-3"
                  >
                    <span className="text-accent mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
