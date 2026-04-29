import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center">
      <div className="max-w-lg mx-auto container-pad text-center">
        {/* Big 404 */}
        <p
          aria-hidden
          className="font-black text-slate-200 select-none leading-none mb-8"
          style={{
            fontSize: "clamp(8rem, 20vw, 14rem)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </p>

        <p className="label-tag justify-center mb-4">Page Not Found</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
          Nothing here.
        </h1>
        <p className="text-muted text-sm leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn-outline inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Go Back
          </button>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <Home size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
