import { useState, useEffect } from "react";
import {
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  Key,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Intern {
  id: number;
  internship_type: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  college: string;
  city: string;
  created_at: string;
}

export default function Admin() {
  const API_BASE = "https://internship.unicodetechnolab.com/API";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Auth form states
  const [authStep, setAuthStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [page, setPage] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin_auth.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check_auth" }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchInterns();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin_auth.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_otp" }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthStep("otp");
      } else {
        setAuthError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setAuthError("Server error.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin_auth.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_otp", otp }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchInterns();
      } else {
        setAuthError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setAuthError("Server error.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/admin_auth.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      setIsAuthenticated(false);
      setAuthStep("email");
      setOtp("");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInterns = async () => {
    setLoadingData(true);
    try {
      const res = await fetch(`${API_BASE}/get_interns.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setInterns(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const filteredInterns = interns.filter((intern) => {
    const matchQuery =
      intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.phone.includes(searchQuery) ||
      intern.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType =
      filterType === "all" || intern.internship_type === filterType;

    return matchQuery && matchType;
  });

  const uniqueTypes = Array.from(
    new Set(interns.map((i) => i.internship_type)),
  );

  const PAGE_SIZE = 15;
  const totalPages = Math.max(1, Math.ceil(filteredInterns.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1 >= 0 ? totalPages - 1 : 0);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredInterns.length);
  const paginatedInterns = filteredInterns.slice(startIndex, endIndex);

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <RefreshCw className="animate-spin text-brand" size={24} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-4 pt-32 pb-24">
        <div className="bg-white border border-border rounded-sm shadow-sm p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-black text-ink">Admin Portal</h1>
            <p className="text-sm text-muted mt-2">
              Secure access for administrators
            </p>
          </div>

          {authError && (
            <div className="mb-6 bg-red-50 text-red-600 text-sm p-3 rounded-sm border border-red-200">
              {authError}
            </div>
          )}

          {authStep === "email" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {authLoading
                  ? "Sending..."
                  : "Send Verification Code to Admin Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-ink mb-1 block">
                  Verification Code
                </label>
                <div className="relative">
                  <Key
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    size={16}
                  />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 p-3 border border-border rounded-sm bg-surface focus:outline-none focus:border-brand tracking-widest text-center"
                    placeholder="XXXXXX"
                    required
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-muted mt-2 text-center">
                  Code sent to Admin Email.{" "}
                  <button
                    type="button"
                    onClick={() => setAuthStep("email")}
                    className="text-brand hover:underline"
                  >
                    Resend Code
                  </button>
                </p>
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {authLoading ? "Verifying..." : "Verify & Login"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <div className="max-w-7xl mx-auto container-pad">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-ink mb-2">
              Registered Interns
            </h1>
            <p className="text-sm text-muted">
              Manage and view all internship applications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchInterns}
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-sm text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <RefreshCw
                size={14}
                className={loadingData ? "animate-spin" : ""}
              />{" "}
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-sm text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div className="bg-white border border-border rounded-sm shadow-sm overflow-hidden flex flex-col">
          {/* Filters */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by name, email, phone, college, or city..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                className="w-full pl-10 p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setPage(0);
              }}
              className="p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand sm:w-48 bg-white"
            >
              <option value="all">All Programs</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Table Container for Responsiveness */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted font-bold border-b border-border">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">#</th>
                  <th className="px-4 py-3">Applicant Name</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Contact Details</th>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">College & City</th>
                  <th className="px-4 py-3">Applied On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loadingData ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-muted"
                    >
                      <RefreshCw
                        className="animate-spin inline-block mr-2"
                        size={16}
                      />{" "}
                      Loading data...
                    </td>
                  </tr>
                ) : paginatedInterns.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-muted"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  paginatedInterns.map((intern, index) => (
                    <tr
                      key={intern.id}
                      className="hover:bg-surface/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-muted text-center font-medium">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-3 font-semibold text-ink">
                        {intern.name}
                      </td>
                      <td className="px-4 py-3 text-muted">{intern.gender}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <a
                            href={`mailto:${intern.email}`}
                            className="text-brand hover:underline"
                          >
                            {intern.email}
                          </a>
                          <span className="text-muted text-xs">
                            {intern.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-sm text-[0.65rem] font-bold uppercase tracking-widest bg-brand/5 text-brand border border-brand/20">
                          {intern.internship_type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-ink truncate max-w-50"
                            title={intern.college}
                          >
                            {intern.college}
                          </span>
                          <span className="text-muted text-xs">
                            {intern.city}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">
                        {new Date(intern.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredInterns.length > 0 && (
            <div className="border-t border-border px-4 py-4 bg-surface/70 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-muted">
                  Showing {startIndex + 1}-{endIndex} of{" "}
                  {filteredInterns.length} records
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(currentPage - 1, 0))}
                  disabled={currentPage === 0}
                  className="h-9 px-3 inline-flex items-center gap-1.5 border border-border rounded-sm text-xs font-semibold uppercase tracking-wide text-ink hover:border-brand hover:text-brand transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <p className="text-xs font-semibold text-ink min-w-12 text-center">
                  {currentPage + 1} / {totalPages}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setPage(Math.min(currentPage + 1, totalPages - 1))
                  }
                  disabled={currentPage === totalPages - 1}
                  className="h-9 px-3 inline-flex items-center gap-1.5 border border-border rounded-sm text-xs font-semibold uppercase tracking-wide text-ink hover:border-brand hover:text-brand transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
