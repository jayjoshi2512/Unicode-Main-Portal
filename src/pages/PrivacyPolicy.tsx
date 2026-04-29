import { useEffect } from "react";

const sections = [
  {
    title: "1. Information We Collect",
    points: [
      "Personal Identification Information: Name, email address, phone number, and mailing address provided during inquiries or registration.",
      "Academic/Professional Information: Resumes, educational background, and skill sets provided specifically for Internships and Specialization Course Training.",
      "Project Data: Technical requirements, API documentation, and business logic shared for App/Web Development and API Integration projects.",
      "Log Files: Standard internet log files including IP addresses, browser type, and time stamps.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    points: [
      "Provide, operate, and maintain our website and IT services.",
      "Process and manage Internship applications and Training enrollments.",
      "Communicate with you regarding project updates, Web Services, or API technical support.",
      "Send emails regarding new service offerings or educational batches (with your consent).",
      "Find and prevent fraudulent activities.",
    ],
  },
  {
    title: "3. Data Protection for Clients & Students",
    points: [
      "For Development Clients: We treat all proprietary code and API data as strictly confidential. We do not share project-specific data with third parties unless required for API integration or cloud hosting as per the project scope.",
      "For Students & Interns: Data collected during training (both Paid and Free) is used solely for certification and placement assistance.",
    ],
  },
  {
    title: "4. Cookies and Web Beacons",
    points: [
      "Like any other website, Unicode TechnoLab uses cookies to store visitor preferences and page activity data.",
      "This information helps us optimize user experience by customizing content based on browser type and related information.",
    ],
  },
  {
    title: "5. Third-Party Privacy Policies",
    points: [
      "Our Privacy Policy does not apply to other advertisers or websites.",
      "If our App or Web development includes third-party API integrations (for example Payment Gateways, Google Maps, Firebase), please review those providers' privacy policies.",
    ],
  },
  {
    title: "6. Data Security",
    points: [
      "We implement a variety of security measures to maintain the safety of your personal information.",
      "No method of transmission over the Internet or electronic storage is 100% secure, and absolute security cannot be guaranteed.",
    ],
  },
  {
    title: "7. Your Rights (GDPR/CCPA)",
    points: [
      "Right to access: You may request copies of your personal data.",
      "Right to rectification: You may request correction of inaccurate data.",
      "Right to erasure: You may request deletion of your personal data under certain conditions.",
    ],
  },
  {
    title: "8. Consent",
    points: [
      "By using our website or engaging in our services/training, you consent to this Privacy Policy and agree to its terms.",
    ],
  },
];

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-white/60 mt-5 text-sm md:text-base">
            Last Updated: 10-March-2026
          </p>
          <p className="text-white/60 mt-4 leading-relaxed max-w-3xl text-sm md:text-base">
            At Unicode TechnoLab, accessible from https://unicodetechnolab.com,
            one of our main priorities is the privacy of our visitors, clients,
            and students. This Privacy Policy describes the information we
            collect and how we use it.
          </p>
        </div>
      </section>

      <section className="section-pad bg-bg">
        <div className="max-w-5xl mx-auto container-pad space-y-10">
          {sections.map(({ title, points }) => (
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
