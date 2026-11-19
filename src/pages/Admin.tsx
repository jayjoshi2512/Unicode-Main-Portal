import { useState, useEffect, useRef } from "react";
import {
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  Key,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  BookOpen,
  Users,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Clock,
  Menu,
  AlertCircle,
  CheckCircle2,
  Globe,
  Upload,
  FileSpreadsheet,
  Download,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";
import * as XLSX from "xlsx";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { INTERNSHIP_RECORDS } from "@/data/internshipRecords";

interface InternApplication {
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

export interface Course {
  id: number;
  slug: string;
  title: string;
  duration_value: number;
  duration_unit: "Weeks" | "Days" | "Months" | "Hours";
  duration: string;
  mode: "On-site" | "Online" | "Hybrid";
  is_active: boolean;
  description: string;
  curriculum: string[];
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface PlacementStudent {
  id: number;
  student_name: string;
  course_semester: string;
  duration: string;
  college: string;
  sort_order: number;
  created_at?: string;
}

const DEFAULT_COURSES: Course[] = [
  {
    id: 1,
    slug: "html-tailwind",
    title: "HTML5 & Tailwind CSS Fundamentals",
    duration_value: 4,
    duration_unit: "Weeks",
    duration: "4 Weeks",
    mode: "On-site",
    is_active: false,
    description:
      "<p>Learn modern web development with HTML5 and Tailwind CSS. Master layout, responsive design, and creating beautiful interfaces.</p>",
    curriculum: [
      "HTML5 Fundamentals",
      "HTML5 Layout & Structure",
      "Introduction to Tailwind CSS",
      "Typography and Spacing",
      "Layout with Flexbox & Grid",
      "Responsive Design Patterns",
    ],
    sort_order: 1,
  },
  {
    id: 2,
    slug: "advance-php",
    title: "Web Development & API Integration",
    duration_value: 60,
    duration_unit: "Hours",
    duration: "60 Hours",
    mode: "On-site",
    is_active: true,
    description:
      "<p>Master advanced PHP techniques with real-world applications — API integration, payment gateways, and dynamic content generation. (Diploma Students)</p>",
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
    sort_order: 2,
  },
  {
    id: 3,
    slug: "mern-stack",
    title: "MERN Stack Development",
    duration_value: 3,
    duration_unit: "Months",
    duration: "3 Months",
    mode: "On-site",
    is_active: false,
    description:
      "<p>A comprehensive full-stack internship covering MongoDB, Express.js, React.js, and Node.js — build and deploy production-ready web applications.</p>",
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
    sort_order: 3,
  },
  {
    id: 4,
    slug: "django-web",
    title: "Django Web Development",
    duration_value: 60,
    duration_unit: "Hours",
    duration: "60 Hours",
    mode: "Online",
    is_active: true,
    description:
      "<p>Master backend development with Django framework — learn project setup, ORM, authentication, and build complete web applications.</p>",
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
    sort_order: 4,
  },
  {
    id: 5,
    slug: "ai-tools",
    title: "AI Tools & Automation with Real Use Cases",
    duration_value: 60,
    duration_unit: "Hours",
    duration: "60 Hours",
    mode: "Online",
    is_active: true,
    description:
      "<p>Explore hands-on AI tools, prompt engineering, and workflow automation tailored for real-world business and technical use cases.</p>",
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
    sort_order: 5,
  },
];

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  recordLabel?: string;
}

function TablePagination({
  currentPage,
  totalPages,
  totalRecords,
  startIndex,
  endIndex,
  onPageChange,
  recordLabel = "records",
}: TablePaginationProps) {
  const [jumpPage, setJumpPage] = useState(String(currentPage + 1));

  useEffect(() => {
    setJumpPage(String(currentPage + 1));
  }, [currentPage]);

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(jumpPage, 10);
    if (!isNaN(p)) {
      const target = Math.min(Math.max(1, p), totalPages) - 1;
      onPageChange(target);
      setJumpPage(String(target + 1));
    } else {
      setJumpPage(String(currentPage + 1));
    }
  };

  return (
    <div className="border-t border-border px-4 py-3.5 bg-surface/70 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs">
      <div className="flex items-center gap-2">
        <p className="font-medium text-muted">
          Showing <span className="font-bold text-ink">{totalRecords > 0 ? startIndex + 1 : 0}</span>-
          <span className="font-bold text-ink">{endIndex}</span> of{" "}
          <span className="font-bold text-ink">{totalRecords}</span> {recordLabel}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* First Button */}
        <button
          type="button"
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          title="Go to First Page"
          className="h-8 px-2.5 inline-flex items-center gap-1 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-ink bg-white hover:border-brand hover:text-brand transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronsLeft size={13} />
          <span className="hidden sm:inline">First</span>
        </button>

        {/* Prev Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          title="Previous Page"
          className="h-8 px-2.5 inline-flex items-center gap-1 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-ink bg-white hover:border-brand hover:text-brand transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={13} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Manual Go to Any Page */}
        <form onSubmit={handleJumpSubmit} className="flex items-center gap-1 px-1">
          <span className="text-muted font-medium">Page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            onBlur={() => {
              const p = parseInt(jumpPage, 10);
              if (!isNaN(p)) {
                const target = Math.min(Math.max(1, p), totalPages) - 1;
                onPageChange(target);
                setJumpPage(String(target + 1));
              } else {
                setJumpPage(String(currentPage + 1));
              }
            }}
            className="w-12 h-8 px-1 text-center font-bold text-ink bg-white border border-border rounded-sm focus:outline-none focus:border-brand"
            title="Type a page number and press Enter"
          />
          <span className="text-muted font-medium">of {totalPages}</span>
        </form>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          title="Next Page"
          className="h-8 px-2.5 inline-flex items-center gap-1 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-ink bg-white hover:border-brand hover:text-brand transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={13} />
        </button>

        {/* Last Button */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          title="Go to Last Page"
          className="h-8 px-2.5 inline-flex items-center gap-1 border border-border rounded-sm text-xs font-semibold uppercase tracking-wider text-ink bg-white hover:border-brand hover:text-brand transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Last</span>
          <ChevronsRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const API_BASE = "https://internship.unicodetechnolab.com/API";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Auth form states
  const [otp, setOtp] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const otpInputRef = useRef<HTMLInputElement>(null);

  // Navigation tab state (default: 'courses')
  const [activeTab, setActiveTab] = useState<
    "courses" | "registered_interns" | "applications"
  >("courses");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Notification feedback
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Delete Confirmation Dialog state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: "course" | "placement" | null;
    id: number | null;
    title: string;
  }>({
    isOpen: false,
    type: null,
    id: null,
    title: "",
  });

  // ──────────────────────────── COURSES STATE ────────────────────────────
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [coursePage, setCoursePage] = useState(0);

  // Course Modal state (for add / edit)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [courseForm, setCourseForm] = useState<{
    title: string;
    slug: string;
    duration_value: number;
    duration_unit: "Weeks" | "Days" | "Months" | "Hours";
    mode: "On-site" | "Online" | "Hybrid";
    is_active: boolean;
    description: string;
    curriculum: string[];
    sort_order: number;
  }>({
    title: "",
    slug: "",
    duration_value: 4,
    duration_unit: "Weeks",
    mode: "On-site",
    is_active: true,
    description: "",
    curriculum: [],
    sort_order: 0,
  });
  const [newCurriculumItem, setNewCurriculumItem] = useState("");
  const [savingCourse, setSavingCourse] = useState(false);

  // ──────────────────────────── REGISTERED INTERNS (PLACEMENTS) STATE ────────────────────────────
  const [registeredInterns, setRegisteredInterns] = useState<PlacementStudent[]>(
    () =>
      INTERNSHIP_RECORDS.map((r, i) => ({
        id: i + 1,
        student_name: r["Name of Student"],
        course_semester: r["Course & Semester"],
        duration: r["Duration"],
        college: r["College/University"],
        sort_order: i + 1,
      })),
  );
  const [loadingRegisteredInterns, setLoadingRegisteredInterns] = useState(false);
  const [internSearch, setInternSearch] = useState("");
  const [internCourseFilter, setInternCourseFilter] = useState("all");
  const [internCollegeFilter, setInternCollegeFilter] = useState("all");
  const [internPage, setInternPage] = useState(0);

  // Single Student Add/Edit Modal
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [studentForm, setStudentForm] = useState<{
    student_name: string;
    course_semester: string;
    duration: string;
    college: string;
    sort_order: number;
  }>({
    student_name: "",
    course_semester: "",
    duration: "",
    college: "",
    sort_order: 0,
  });
  const [savingStudent, setSavingStudent] = useState(false);

  // Bulk Upload Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [parsedUploadRecords, setParsedUploadRecords] = useState<
    Array<{
      student_name: string;
      course_semester: string;
      duration: string;
      college: string;
      sort_order?: number;
    }>
  >([]);
  const [uploadFileName, setUploadFileName] = useState("");
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [uploadingRecords, setUploadingRecords] = useState(false);

  // ──────────────────────────── APPLICATIONS (INQUIRIES) STATE ────────────────────────────
  const [applications, setApplications] = useState<InternApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationSearch, setApplicationSearch] = useState("");
  const [applicationFilterType, setApplicationFilterType] = useState("all");
  const [applicationPage, setApplicationPage] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  // Auto-focus OTP input whenever the login screen appears
  useEffect(() => {
    if (!isAuthenticated && !loadingAuth) {
      const timer = setTimeout(() => {
        otpInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loadingAuth]);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

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
        fetchCourses();
        fetchRegisteredInterns();
        fetchApplications();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAuth(false);
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
        fetchCourses();
        fetchRegisteredInterns();
        fetchApplications();
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
      setOtp("");
    } catch (err) {
      console.error(err);
    }
  };

  // ──────────────────────────── COURSES API ACTIONS ────────────────────────────
  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch(`${API_BASE}/manage_courses.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setCourses(data.data);
      } else {
        const publicRes = await fetch(`${API_BASE}/get_courses.php`);
        const publicData = await publicRes.json();
        if (
          publicData.success &&
          Array.isArray(publicData.data) &&
          publicData.data.length > 0
        ) {
          setCourses(publicData.data);
        }
      }
    } catch (err) {
      console.warn("Could not reach remote courses API.", err);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleToggleCourseStatus = async (course: Course) => {
    const updatedStatus = !course.is_active;
    setCourses((prev) =>
      prev.map((c) =>
        c.id === course.id ? { ...c, is_active: updatedStatus } : c,
      ),
    );

    try {
      const res = await fetch(`${API_BASE}/manage_courses.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_status",
          id: course.id,
          is_active: updatedStatus ? 1 : 0,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === course.id ? { ...c, is_active: course.is_active } : c,
          ),
        );
        showFeedback("error", data.message || "Failed to update course status.");
      } else {
        showFeedback(
          "success",
          `Course "${course.title}" is now ${updatedStatus ? "Active" : "Inactive"}.`,
        );
      }
    } catch (err) {
      showFeedback("error", "Server connection issue.");
    }
  };

  const openCreateCourseModal = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: "",
      slug: "",
      duration_value: 4,
      duration_unit: "Weeks",
      mode: "On-site",
      is_active: true,
      description: "",
      curriculum: [],
      sort_order: courses.length + 1,
    });
    setNewCurriculumItem("");
    setIsCourseModalOpen(true);
  };

  const openEditCourseModal = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      slug: course.slug,
      duration_value: course.duration_value || 1,
      duration_unit: course.duration_unit || "Weeks",
      mode: course.mode || "On-site",
      is_active: course.is_active,
      description: course.description || "",
      curriculum: [...course.curriculum],
      sort_order: course.sort_order || 0,
    });
    setNewCurriculumItem("");
    setIsCourseModalOpen(true);
  };

  const handleAddCurriculumItem = () => {
    if (newCurriculumItem.trim()) {
      setCourseForm((prev) => ({
        ...prev,
        curriculum: [...prev.curriculum, newCurriculumItem.trim()],
      }));
      setNewCurriculumItem("");
    }
  };

  const handleRemoveCurriculumItem = (index: number) => {
    setCourseForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index),
    }));
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      showFeedback("error", "Course title is required.");
      return;
    }

    setSavingCourse(true);
    const payload = {
      action: editingCourseId ? "update" : "create",
      id: editingCourseId,
      ...courseForm,
    };

    try {
      const res = await fetch(`${API_BASE}/manage_courses.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          editingCourseId
            ? "Course updated successfully."
            : "New course created successfully.",
        );
        setIsCourseModalOpen(false);
        fetchCourses();
      } else {
        showFeedback("error", data.message || "Failed to save course.");
      }
    } catch (err) {
      const formattedDuration = `${courseForm.duration_value} ${courseForm.duration_unit}`;
      if (editingCourseId) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === editingCourseId
              ? {
                  ...c,
                  ...courseForm,
                  duration: formattedDuration,
                }
              : c,
          ),
        );
      } else {
        const newCourse: Course = {
          id: Date.now(),
          ...courseForm,
          duration: formattedDuration,
        };
        setCourses((prev) => [...prev, newCourse]);
      }
      showFeedback("success", "Course saved locally.");
      setIsCourseModalOpen(false);
    } finally {
      setSavingCourse(false);
    }
  };

  // ──────────────────────────── REGISTERED INTERNS API ACTIONS ────────────────────────────
  const fetchRegisteredInterns = async () => {
    setLoadingRegisteredInterns(true);
    try {
      const res = await fetch(`${API_BASE}/manage_registered_interns.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setRegisteredInterns(data.data);
      } else {
        const publicRes = await fetch(`${API_BASE}/get_registered_interns.php`);
        const publicData = await publicRes.json();
        if (
          publicData.success &&
          Array.isArray(publicData.data) &&
          publicData.data.length > 0
        ) {
          setRegisteredInterns(publicData.data);
        }
      }
    } catch (err) {
      console.warn("Using local registered interns fallback.", err);
    } finally {
      setLoadingRegisteredInterns(false);
    }
  };

  const openCreateStudentModal = () => {
    setEditingStudentId(null);
    setStudentForm({
      student_name: "",
      course_semester: "",
      duration: "90 Days",
      college: "",
      sort_order: registeredInterns.length + 1,
    });
    setIsStudentModalOpen(true);
  };

  const openEditStudentModal = (student: PlacementStudent) => {
    setEditingStudentId(student.id);
    setStudentForm({
      student_name: student.student_name,
      course_semester: student.course_semester,
      duration: student.duration,
      college: student.college,
      sort_order: student.sort_order || 0,
    });
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.student_name.trim()) {
      showFeedback("error", "Student name is required.");
      return;
    }

    setSavingStudent(true);
    const payload = {
      action: editingStudentId ? "update" : "create",
      id: editingStudentId,
      ...studentForm,
    };

    try {
      const res = await fetch(`${API_BASE}/manage_registered_interns.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          editingStudentId
            ? "Student record updated."
            : "Student record added successfully.",
        );
        setIsStudentModalOpen(false);
        fetchRegisteredInterns();
      } else {
        showFeedback("error", data.message || "Failed to save record.");
      }
    } catch (err) {
      if (editingStudentId) {
        setRegisteredInterns((prev) =>
          prev.map((s) =>
            s.id === editingStudentId ? { ...s, ...studentForm } : s,
          ),
        );
      } else {
        const newStudent: PlacementStudent = {
          id: Date.now(),
          ...studentForm,
        };
        setRegisteredInterns((prev) => [newStudent, ...prev]);
      }
      showFeedback("success", "Saved locally.");
      setIsStudentModalOpen(false);
    } finally {
      setSavingStudent(false);
    }
  };

  // Handle File Upload (Excel or CSV)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json<Record<string, any>>(ws);

        if (!rawData || rawData.length === 0) {
          showFeedback("error", "No data found in uploaded file.");
          return;
        }

        // Standardize column names
        const parsed = rawData
          .map((row, idx) => {
            const student_name =
              row["Name of Student"] ||
              row["Student Name"] ||
              row["student_name"] ||
              row["Name"] ||
              "";
            const course_semester =
              row["Course & Semester"] ||
              row["Course"] ||
              row["course_semester"] ||
              row["Semester"] ||
              "";
            const duration = row["Duration"] || row["duration"] || "";
            const college =
              row["College/University"] ||
              row["College"] ||
              row["college"] ||
              row["University"] ||
              "";

            return {
              student_name: String(student_name).trim(),
              course_semester: String(course_semester).trim(),
              duration: String(duration).trim(),
              college: String(college).trim(),
              sort_order: idx + 1,
            };
          })
          .filter((r) => r.student_name.length > 0);

        setParsedUploadRecords(parsed);
      } catch (err) {
        showFeedback(
          "error",
          "Failed to parse file. Please upload a valid CSV or Excel file.",
        );
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleImportRecords = async () => {
    if (parsedUploadRecords.length === 0) {
      showFeedback("error", "No records to import.");
      return;
    }

    setUploadingRecords(true);
    try {
      const res = await fetch(`${API_BASE}/manage_registered_interns.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bulk_import",
          records: parsedUploadRecords,
          replace_all: replaceExisting,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(
          "success",
          `Successfully imported ${data.imported_count || parsedUploadRecords.length} student records!`,
        );
        setIsUploadModalOpen(false);
        setParsedUploadRecords([]);
        setUploadFileName("");
        fetchRegisteredInterns();
      } else {
        showFeedback("error", data.message || "Import failed.");
      }
    } catch (err) {
      const formatted = parsedUploadRecords.map((r, i) => ({
        id: Date.now() + i,
        ...r,
        sort_order: r.sort_order || i + 1,
      }));
      setRegisteredInterns((prev) =>
        replaceExisting ? formatted : [...prev, ...formatted],
      );
      showFeedback(
        "success",
        `Imported ${parsedUploadRecords.length} records locally.`,
      );
      setIsUploadModalOpen(false);
      setParsedUploadRecords([]);
      setUploadFileName("");
    } finally {
      setUploadingRecords(false);
    }
  };

  const downloadSampleCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Name of Student,Course & Semester,Duration,College/University",
        "Dhokia Dhirubhai,MScIT - Sem 4,120 Days,Dr. V. R. godhaniya IT College, Porbandar",
        "Thakar Pushti,Web Development Internship,90 Days,Dr. V. R. godhaniya IT College, Porbandar",
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_interns_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ──────────────────────────── DELETE CONFIRMATION ────────────────────────────
  const promptDeleteCourse = (course: Course) => {
    setDeleteConfirmation({
      isOpen: true,
      type: "course",
      id: course.id,
      title: course.title,
    });
  };

  const promptDeletePlacementStudent = (student: PlacementStudent) => {
    setDeleteConfirmation({
      isOpen: true,
      type: "placement",
      id: student.id,
      title: student.student_name,
    });
  };

  const handleConfirmDelete = async () => {
    const { type, id } = deleteConfirmation;
    if (!type || !id) return;

    if (type === "course") {
      try {
        const res = await fetch(`${API_BASE}/manage_courses.php`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", id }),
        });
        const data = await res.json();
        if (data.success) {
          setCourses((prev) => prev.filter((c) => c.id !== id));
          showFeedback("success", "Course deleted successfully.");
        } else {
          showFeedback("error", data.message || "Failed to delete course.");
        }
      } catch (err) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        showFeedback("success", "Course deleted locally.");
      }
    } else if (type === "placement") {
      try {
        const res = await fetch(`${API_BASE}/manage_registered_interns.php`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete", id }),
        });
        const data = await res.json();
        if (data.success) {
          setRegisteredInterns((prev) => prev.filter((s) => s.id !== id));
          showFeedback("success", "Student record deleted.");
        } else {
          showFeedback("error", data.message || "Failed to delete record.");
        }
      } catch (err) {
        setRegisteredInterns((prev) => prev.filter((s) => s.id !== id));
        showFeedback("success", "Student record removed locally.");
      }
    }

    setDeleteConfirmation({
      isOpen: false,
      type: null,
      id: null,
      title: "",
    });
  };

  // ──────────────────────────── APPLICATIONS (INQUIRIES) ────────────────────────────
  const fetchApplications = async () => {
    setLoadingApplications(true);
    try {
      const res = await fetch(`${API_BASE}/get_interns.php`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApplications(false);
    }
  };

  // ──────────────────────────── FILTERING & PAGINATION (10 ROWS PER PAGE) ────────────────────────────
  const ROW_LIMIT = 10;

  // 1. Filtered & Paginated Courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.slug.toLowerCase().includes(courseSearch.toLowerCase());

    const matchesStatus =
      courseStatusFilter === "all"
        ? true
        : courseStatusFilter === "active"
        ? course.is_active
        : !course.is_active;

    return matchesSearch && matchesStatus;
  });

  const totalCoursePages = Math.max(
    1,
    Math.ceil(filteredCourses.length / ROW_LIMIT),
  );
  const currentCoursePage = Math.min(
    coursePage,
    totalCoursePages - 1 >= 0 ? totalCoursePages - 1 : 0,
  );
  const startCourseIndex = currentCoursePage * ROW_LIMIT;
  const endCourseIndex = Math.min(
    startCourseIndex + ROW_LIMIT,
    filteredCourses.length,
  );
  const paginatedCourses = filteredCourses.slice(
    startCourseIndex,
    endCourseIndex,
  );

  // 2. Filtered & Paginated Registered Interns
  const uniqueInternCourses = Array.from(
    new Set(registeredInterns.map((i) => i.course_semester).filter(Boolean)),
  ).sort();

  const uniqueInternColleges = Array.from(
    new Set(registeredInterns.map((i) => i.college).filter(Boolean)),
  ).sort();

  const filteredRegisteredInterns = registeredInterns.filter((intern) => {
    const q = internSearch.toLowerCase();
    const matchesSearch =
      intern.student_name.toLowerCase().includes(q) ||
      intern.course_semester.toLowerCase().includes(q) ||
      intern.college.toLowerCase().includes(q) ||
      intern.duration.toLowerCase().includes(q);

    const matchesCourse =
      internCourseFilter === "all" ||
      intern.course_semester === internCourseFilter;

    const matchesCollege =
      internCollegeFilter === "all" || intern.college === internCollegeFilter;

    return matchesSearch && matchesCourse && matchesCollege;
  });

  const totalInternPages = Math.max(
    1,
    Math.ceil(filteredRegisteredInterns.length / ROW_LIMIT),
  );
  const currentInternPage = Math.min(
    internPage,
    totalInternPages - 1 >= 0 ? totalInternPages - 1 : 0,
  );
  const startInternIndex = currentInternPage * ROW_LIMIT;
  const endInternIndex = Math.min(
    startInternIndex + ROW_LIMIT,
    filteredRegisteredInterns.length,
  );
  const paginatedInterns = filteredRegisteredInterns.slice(
    startInternIndex,
    endInternIndex,
  );

  // 3. Filtered & Paginated Applications
  const uniqueApplicationTypes = Array.from(
    new Set(applications.map((i) => i.internship_type)),
  );

  const filteredApplications = applications.filter((app) => {
    const q = applicationSearch.toLowerCase();
    const matchQuery =
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.phone.includes(q) ||
      app.college.toLowerCase().includes(q) ||
      app.city.toLowerCase().includes(q);

    const matchType =
      applicationFilterType === "all" ||
      app.internship_type === applicationFilterType;

    return matchQuery && matchType;
  });

  const totalAppPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / ROW_LIMIT),
  );
  const currentAppPage = Math.min(
    applicationPage,
    totalAppPages - 1 >= 0 ? totalAppPages - 1 : 0,
  );
  const startAppIndex = currentAppPage * ROW_LIMIT;
  const endAppIndex = Math.min(
    startAppIndex + ROW_LIMIT,
    filteredApplications.length,
  );
  const paginatedApplications = filteredApplications.slice(
    startAppIndex,
    endAppIndex,
  );

  // ──────────────────────────── AUTH SCREEN ────────────────────────────
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <RefreshCw className="animate-spin text-brand" size={26} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-4">
        <div className="bg-white border border-border rounded-sm shadow-sm p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-black text-ink">Admin Portal</h1>
            <p className="text-sm text-muted mt-2">
              Authentication required for administrative access
            </p>
          </div>

          {authError && (
            <div className="mb-6 bg-red-50 text-red-600 text-sm p-3 rounded-sm border border-red-200">
              {authError}
            </div>
          )}

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
                  ref={otpInputRef}
                  autoFocus
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 p-3 border border-border rounded-sm bg-surface focus:outline-none focus:border-brand tracking-widest text-center text-lg font-bold"
                  placeholder="XXXXXX"
                  required
                  maxLength={6}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="btn-primary w-full justify-center disabled:opacity-70 cursor-pointer"
            >
              {authLoading ? "Verifying..." : "Verify & Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ──────────────────────────── AUTHENTICATED ADMIN LAYOUT ────────────────────────────
  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      {/* Feedback Toast */}
      {feedback && (
        <div
          className={[
            "fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-sm shadow-md text-sm font-semibold transition-all duration-300",
            feedback.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white",
          ].join(" ")}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          {feedback.message}
        </div>
      )}

      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-white border-b border-border p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-brand text-white flex items-center justify-center font-black text-sm">
            U
          </div>
          <span className="font-black text-ink text-base">Admin Panel</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 border border-border rounded-sm text-ink hover:bg-surface cursor-pointer"
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-border flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:min-h-screen",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-brand text-white flex items-center justify-center font-black text-base shadow-xs">
              U
            </div>
            <div>
              <h2 className="font-black text-ink text-base leading-tight">
                Unicode Portal
              </h2>
              <p className="text-[0.65rem] uppercase tracking-widest text-muted font-bold">
                Admin Control Hub
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-muted hover:text-ink cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <p className="px-3 text-[0.65rem] font-bold uppercase tracking-wider text-muted mb-2">
            Modules
          </p>

          {/* Module 1: Internship Courses (DEFAULT) */}
          <button
            onClick={() => {
              setActiveTab("courses");
              setMobileSidebarOpen(false);
            }}
            className={[
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-sm font-semibold transition-colors cursor-pointer",
              activeTab === "courses"
                ? "bg-brand text-white shadow-xs"
                : "text-ink/80 hover:bg-surface hover:text-ink",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <BookOpen size={16} />
              <span>Internship Courses</span>
            </div>
            <span
              className={[
                "text-xs px-1.5 py-0.5 rounded-xs font-bold",
                activeTab === "courses"
                  ? "bg-white/20 text-white"
                  : "bg-surface text-muted",
              ].join(" ")}
            >
              {courses.length}
            </span>
          </button>

          {/* Module 2: Registered Interns (Placements) */}
          <button
            onClick={() => {
              setActiveTab("registered_interns");
              setMobileSidebarOpen(false);
            }}
            className={[
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-sm font-semibold transition-colors cursor-pointer",
              activeTab === "registered_interns"
                ? "bg-brand text-white shadow-xs"
                : "text-ink/80 hover:bg-surface hover:text-ink",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <GraduationCap size={16} />
              <span>Registered Interns</span>
            </div>
            <span
              className={[
                "text-xs px-1.5 py-0.5 rounded-xs font-bold",
                activeTab === "registered_interns"
                  ? "bg-white/20 text-white"
                  : "bg-surface text-muted",
              ].join(" ")}
            >
              {registeredInterns.length}
            </span>
          </button>

          {/* Module 3: Intern Applications */}
          <button
            onClick={() => {
              setActiveTab("applications");
              setMobileSidebarOpen(false);
            }}
            className={[
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-sm font-semibold transition-colors cursor-pointer",
              activeTab === "applications"
                ? "bg-brand text-white shadow-xs"
                : "text-ink/80 hover:bg-surface hover:text-ink",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <Users size={16} />
              <span>Intern Applications</span>
            </div>
            <span
              className={[
                "text-xs px-1.5 py-0.5 rounded-xs font-bold",
                activeTab === "applications"
                  ? "bg-white/20 text-white"
                  : "bg-surface text-muted",
              ].join(" ")}
            >
              {applications.length}
            </span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border bg-surface/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 rounded-sm hover:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-10 overflow-y-auto">
        {/* ─────────────────── TAB 1: COURSES MANAGEMENT ─────────────────── */}
        {activeTab === "courses" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-ink tracking-tight">
                  Internship Courses
                </h1>
                <p className="text-sm text-muted mt-1">
                  Manage course names, modes, durations, active toggles, and curriculum.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchCourses}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface transition-colors cursor-pointer"
                >
                  <RefreshCw
                    size={14}
                    className={loadingCourses ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={openCreateCourseModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-brand/90 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus size={15} /> Add New Course
                </button>
              </div>
            </div>

            {/* Connected Card: Search, Filter, Table & Pagination */}
            <div className="bg-white border border-border rounded-sm shadow-xs overflow-hidden flex flex-col">
              {/* Connected Header Toolbar */}
              <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search course by name or slug..."
                    value={courseSearch}
                    onChange={(e) => {
                      setCourseSearch(e.target.value);
                      setCoursePage(0);
                    }}
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted shrink-0">
                    Status:
                  </label>
                  <select
                    value={courseStatusFilter}
                    onChange={(e) => {
                      setCourseStatusFilter(e.target.value as any);
                      setCoursePage(0);
                    }}
                    className="p-2 border border-border rounded-sm text-xs font-semibold focus:outline-none focus:border-brand bg-white cursor-pointer"
                  >
                    <option value="all">All ({courses.length})</option>
                    <option value="active">
                      Active ({courses.filter((c) => c.is_active).length})
                    </option>
                    <option value="inactive">
                      Inactive ({courses.filter((c) => !c.is_active).length})
                    </option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-surface text-xs uppercase tracking-wider text-muted font-bold border-b border-border">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center">#</th>
                      <th className="px-4 py-3">Course Name</th>
                      <th className="px-4 py-3">Mode</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3 text-center">Status (Toggle)</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loadingCourses ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted"
                        >
                          <RefreshCw
                            className="animate-spin inline-block mr-2"
                            size={16}
                          />{" "}
                          Loading courses...
                        </td>
                      </tr>
                    ) : paginatedCourses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted"
                        >
                          No courses found.
                        </td>
                      </tr>
                    ) : (
                      paginatedCourses.map((course, index) => (
                        <tr
                          key={course.id}
                          className="hover:bg-surface/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-muted text-center font-medium">
                            {startCourseIndex + index + 1}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-bold text-ink text-sm">
                                {course.title}
                              </span>
                              <span className="text-[0.7rem] text-muted font-mono">
                                slug: {course.slug}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[0.65rem] font-bold uppercase tracking-widest text-brand bg-brand/5 border border-brand/20">
                              <Globe size={10} />
                              {course.mode}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[0.65rem] font-bold uppercase tracking-widest text-muted bg-surface border border-border">
                              <Clock size={10} />
                              {course.duration}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleCourseStatus(course)}
                              className={[
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[0.7rem] font-bold uppercase tracking-wider transition-all border cursor-pointer",
                                course.is_active
                                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200",
                              ].join(" ")}
                              title="Click to toggle active/inactive"
                            >
                              <span
                                className={[
                                  "w-2 h-2 rounded-full",
                                  course.is_active
                                    ? "bg-green-500"
                                    : "bg-gray-400",
                                ].join(" ")}
                              />
                              {course.is_active ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditCourseModal(course)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-border text-xs font-bold text-ink hover:border-brand hover:text-brand transition-colors bg-surface cursor-pointer"
                                title="Edit course"
                              >
                                <Edit3 size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => promptDeleteCourse(course)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete course"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Connected Pagination Footer (10 Rows Limit) */}
              {filteredCourses.length > 0 && (
                <TablePagination
                  currentPage={currentCoursePage}
                  totalPages={totalCoursePages}
                  totalRecords={filteredCourses.length}
                  startIndex={startCourseIndex}
                  endIndex={endCourseIndex}
                  onPageChange={setCoursePage}
                  recordLabel="courses"
                />
              )}
            </div>
          </div>
        )}

        {/* ─────────────────── TAB 2: REGISTERED INTERNS (PLACEMENTS) ─────────────────── */}
        {activeTab === "registered_interns" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-ink tracking-tight">
                  Registered Interns
                </h1>
                <p className="text-sm text-muted mt-1">
                  Students Who Trained With Us (Internship Placements Records).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={fetchRegisteredInterns}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface transition-colors cursor-pointer"
                >
                  <RefreshCw
                    size={14}
                    className={loadingRegisteredInterns ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-surface border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-gray-100 transition-colors shadow-xs cursor-pointer"
                >
                  <Upload size={14} /> Upload Excel / CSV
                </button>
                <button
                  type="button"
                  onClick={openCreateStudentModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-brand/90 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus size={15} /> Add Student Manually
                </button>
              </div>
            </div>

            {/* Connected Card: Search, Filters, Table & Pagination */}
            <div className="bg-white border border-border rounded-sm shadow-xs overflow-hidden flex flex-col">
              {/* Connected Header Toolbar with Search & Multiple Required Filters */}
              <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search by student name, course, college, or duration..."
                    value={internSearch}
                    onChange={(e) => {
                      setInternSearch(e.target.value);
                      setInternPage(0);
                    }}
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Course Filter */}
                  <select
                    value={internCourseFilter}
                    onChange={(e) => {
                      setInternCourseFilter(e.target.value);
                      setInternPage(0);
                    }}
                    className="p-2 border border-border rounded-sm text-xs font-semibold focus:outline-none focus:border-brand bg-white cursor-pointer max-w-[200px] truncate"
                    title="Filter by Course"
                  >
                    <option value="all">All Courses ({uniqueInternCourses.length})</option>
                    {uniqueInternCourses.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  {/* College Filter */}
                  <select
                    value={internCollegeFilter}
                    onChange={(e) => {
                      setInternCollegeFilter(e.target.value);
                      setInternPage(0);
                    }}
                    className="p-2 border border-border rounded-sm text-xs font-semibold focus:outline-none focus:border-brand bg-white cursor-pointer max-w-[200px] truncate"
                    title="Filter by College"
                  >
                    <option value="all">All Colleges ({uniqueInternColleges.length})</option>
                    {uniqueInternColleges.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-surface text-xs uppercase tracking-wider text-muted font-bold border-b border-border">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center">No.</th>
                      <th className="px-4 py-3">Name of Student</th>
                      <th className="px-4 py-3">Course & Semester</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">College / University</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {loadingRegisteredInterns ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted"
                        >
                          <RefreshCw
                            className="animate-spin inline-block mr-2"
                            size={16}
                          />{" "}
                          Loading records...
                        </td>
                      </tr>
                    ) : paginatedInterns.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-muted"
                        >
                          No student placement records found.
                        </td>
                      </tr>
                    ) : (
                      paginatedInterns.map((student, index) => (
                        <tr
                          key={student.id}
                          className="hover:bg-surface/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-muted text-center font-medium">
                            {startInternIndex + index + 1}
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">
                            {student.student_name}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold bg-brand/5 text-brand border border-brand/20">
                              {student.course_semester}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted text-xs font-medium">
                            {student.duration}
                          </td>
                          <td
                            className="px-4 py-3 text-ink text-xs max-w-xs truncate"
                            title={student.college}
                          >
                            {student.college}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditStudentModal(student)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-border text-xs font-bold text-ink hover:border-brand hover:text-brand transition-colors bg-surface cursor-pointer"
                                title="Edit record"
                              >
                                <Edit3 size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  promptDeletePlacementStudent(student)
                                }
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete record"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Connected Pagination Footer (10 Rows Limit) */}
              {filteredRegisteredInterns.length > 0 && (
                <TablePagination
                  currentPage={currentInternPage}
                  totalPages={totalInternPages}
                  totalRecords={filteredRegisteredInterns.length}
                  startIndex={startInternIndex}
                  endIndex={endInternIndex}
                  onPageChange={setInternPage}
                  recordLabel="intern records"
                />
              )}
            </div>
          </div>
        )}

        {/* ─────────────────── TAB 3: INTERN APPLICATIONS ─────────────────── */}
        {activeTab === "applications" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-ink tracking-tight">
                  Intern Applications
                </h1>
                <p className="text-sm text-muted mt-1">
                  Incoming internship inquiries submitted through the website form.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchApplications}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface transition-colors cursor-pointer self-start"
              >
                <RefreshCw
                  size={14}
                  className={loadingApplications ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>
            </div>

            {/* Connected Card: Search, Filter, Table & Pagination */}
            <div className="bg-white border border-border rounded-sm shadow-xs overflow-hidden flex flex-col">
              {/* Connected Header Toolbar */}
              <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, college, or city..."
                    value={applicationSearch}
                    onChange={(e) => {
                      setApplicationSearch(e.target.value);
                      setApplicationPage(0);
                    }}
                    className="w-full pl-10 p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <select
                  value={applicationFilterType}
                  onChange={(e) => {
                    setApplicationFilterType(e.target.value);
                    setApplicationPage(0);
                  }}
                  className="p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand sm:w-48 bg-white cursor-pointer"
                >
                  <option value="all">All Programs</option>
                  {uniqueApplicationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table */}
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
                    {loadingApplications ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-muted"
                        >
                          <RefreshCw
                            className="animate-spin inline-block mr-2"
                            size={16}
                          />{" "}
                          Loading applications...
                        </td>
                      </tr>
                    ) : paginatedApplications.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-muted"
                        >
                          No applications found.
                        </td>
                      </tr>
                    ) : (
                      paginatedApplications.map((intern, index) => (
                        <tr
                          key={intern.id}
                          className="hover:bg-surface/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-muted text-center font-medium">
                            {startAppIndex + index + 1}
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">
                            {intern.name}
                          </td>
                          <td className="px-4 py-3 text-muted">
                            {intern.gender}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              <a
                                href={`mailto:${intern.email}`}
                                className="text-brand hover:underline cursor-pointer"
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

              {/* Connected Pagination Footer (10 Rows Limit) */}
              {filteredApplications.length > 0 && (
                <TablePagination
                  currentPage={currentAppPage}
                  totalPages={totalAppPages}
                  totalRecords={filteredApplications.length}
                  startIndex={startAppIndex}
                  endIndex={endAppIndex}
                  onPageChange={setApplicationPage}
                  recordLabel="applications"
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* ─────────────────── ADD / EDIT COURSE MODAL ─────────────────── */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-border rounded-sm shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col my-auto">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-ink">
                  {editingCourseId ? "Edit Internship Course" : "Add New Course"}
                </h2>
                <p className="text-xs text-muted">
                  Update course name, duration, active status, and curriculum.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(false)}
                className="text-muted hover:text-ink p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSaveCourse}
              className="p-6 space-y-5 overflow-y-auto flex-1"
            >
              {/* Active Toggle Switch */}
              <div className="flex items-center justify-between p-3.5 bg-surface border border-border rounded-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink block">
                    Enrollment Status
                  </span>
                  <span className="text-xs text-muted">
                    {courseForm.is_active
                      ? "Active (Visible & open for applications on portal)"
                      : "Inactive (Grayscale & closed for applications)"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCourseForm((prev) => ({
                      ...prev,
                      is_active: !prev.is_active,
                    }))
                  }
                  className={[
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer",
                    courseForm.is_active ? "bg-green-600" : "bg-gray-300",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      courseForm.is_active ? "translate-x-6" : "translate-x-1",
                    ].join(" ")}
                  />
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Course Title / Track Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="e.g. Full-Stack Python & Django"
                  className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              {/* Slug and Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                    Slug ID (Unique Identifier)
                  </label>
                  <input
                    type="text"
                    value={courseForm.slug}
                    onChange={(e) =>
                      setCourseForm((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }))
                    }
                    placeholder="Leave empty to auto-generate"
                    className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                    Delivery Mode
                  </label>
                  <select
                    value={courseForm.mode}
                    onChange={(e) =>
                      setCourseForm((prev) => ({
                        ...prev,
                        mode: e.target.value as any,
                      }))
                    }
                    className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand bg-white cursor-pointer"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Duration: Value and Unit */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Course Duration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      min={1}
                      max={365}
                      required
                      value={courseForm.duration_value}
                      onChange={(e) =>
                        setCourseForm((prev) => ({
                          ...prev,
                          duration_value: Math.max(
                            1,
                            parseInt(e.target.value) || 1,
                          ),
                        }))
                      }
                      className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <select
                      value={courseForm.duration_unit}
                      onChange={(e) =>
                        setCourseForm((prev) => ({
                          ...prev,
                          duration_unit: e.target.value as any,
                        }))
                      }
                      className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand bg-white cursor-pointer"
                    >
                      <option value="Weeks">Weeks</option>
                      <option value="Days">Days</option>
                      <option value="Months">Months</option>
                      <option value="Hours">Hours</option>
                    </select>
                  </div>
                </div>
                <p className="text-[0.7rem] text-muted mt-1">
                  Formatted duration:{" "}
                  <strong className="text-ink">
                    {courseForm.duration_value} {courseForm.duration_unit}
                  </strong>
                </p>
              </div>

              {/* Rich Text Description */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Course Description (Rich Text Editor)
                </label>
                <RichTextEditor
                  value={courseForm.description}
                  onChange={(html) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      description: html,
                    }))
                  }
                  placeholder="Describe prerequisites, technologies, key outcomes..."
                />
              </div>

              {/* Curriculum List */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Curriculum Topics ({courseForm.curriculum.length})
                </label>

                <div className="flex gap-2 mb-2.5">
                  <input
                    type="text"
                    value={newCurriculumItem}
                    onChange={(e) => setNewCurriculumItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCurriculumItem();
                      }
                    }}
                    placeholder="e.g. RESTful API design & development"
                    className="flex-1 p-2 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                  />
                  <button
                    type="button"
                    onClick={handleAddCurriculumItem}
                    className="px-3.5 py-2 bg-surface border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-gray-100 cursor-pointer"
                  >
                    Add Topic
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 bg-surface/50 border border-border rounded-sm">
                  {courseForm.curriculum.length === 0 ? (
                    <p className="text-xs text-muted italic p-2 text-center">
                      No topics added yet.
                    </p>
                  ) : (
                    courseForm.curriculum.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 p-1.5 bg-white border border-border rounded-xs text-xs text-ink"
                      >
                        <span className="truncate flex items-center gap-1.5">
                          <Check size={12} className="text-brand shrink-0" />
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCurriculumItem(index)}
                          className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={courseForm.sort_order}
                  onChange={(e) =>
                    setCourseForm((prev) => ({
                      ...prev,
                      sort_order: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-24 p-2 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCourse}
                  className="btn-primary px-6 py-2 text-xs uppercase tracking-wider disabled:opacity-60 cursor-pointer"
                >
                  {savingCourse
                    ? "Saving..."
                    : editingCourseId
                    ? "Update Course"
                    : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────── ADD / EDIT STUDENT MODAL ─────────────────── */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-border rounded-sm shadow-xl max-w-lg w-full p-6 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
              <h2 className="text-lg font-black text-ink">
                {editingStudentId ? "Edit Student Record" : "Add Student Manually"}
              </h2>
              <button
                type="button"
                onClick={() => setIsStudentModalOpen(false)}
                className="text-muted hover:text-ink cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentForm.student_name}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      student_name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Dhokia Dhirubhai"
                  className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Course & Semester
                </label>
                <input
                  type="text"
                  value={studentForm.course_semester}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      course_semester: e.target.value,
                    }))
                  }
                  placeholder="e.g. MScIT - Sem 4 or Web Development"
                  className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={studentForm.duration}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="e.g. 90 Days or 120 Days"
                  className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  value={studentForm.college}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      college: e.target.value,
                    }))
                  }
                  placeholder="e.g. Dr. V. R. godhaniya IT College, Porbandar"
                  className="w-full p-2.5 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink block mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={studentForm.sort_order}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      sort_order: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-24 p-2 border border-border rounded-sm text-sm focus:outline-none focus:border-brand"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-4 py-2 border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStudent}
                  className="btn-primary px-5 py-2 text-xs uppercase tracking-wider disabled:opacity-60 cursor-pointer"
                >
                  {savingStudent ? "Saving..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────── BULK UPLOAD EXCEL / CSV MODAL ─────────────────── */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-border rounded-sm shadow-xl max-w-xl w-full p-6 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="text-brand" size={20} />
                <h2 className="text-lg font-black text-ink">
                  Bulk Import Interns (Excel / CSV)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setParsedUploadRecords([]);
                  setUploadFileName("");
                }}
                className="text-muted hover:text-ink cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              {/* File Dropzone */}
              <div className="border-2 border-dashed border-border hover:border-brand rounded-sm p-6 text-center transition-colors bg-surface/50">
                <input
                  type="file"
                  id="excelFileInput"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="excelFileInput"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload size={32} className="text-brand mb-2" />
                  <span className="text-sm font-bold text-ink">
                    {uploadFileName || "Click to browse or drop file here"}
                  </span>
                  <span className="text-xs text-muted mt-1">
                    Supports .xlsx, .xls, and .csv files
                  </span>
                </label>
              </div>

              {/* Sample Download Button */}
              <div className="flex items-center justify-between p-3 bg-surface rounded-sm border border-border text-xs">
                <span className="text-muted">
                  Need a template with correct column names?
                </span>
                <button
                  type="button"
                  onClick={downloadSampleCsv}
                  className="inline-flex items-center gap-1.5 font-bold text-brand hover:underline cursor-pointer"
                >
                  <Download size={13} /> Download Sample CSV
                </button>
              </div>

              {/* Preview Status */}
              {parsedUploadRecords.length > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-sm">
                  <p className="text-xs font-bold text-green-800 flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Ready to import{" "}
                    {parsedUploadRecords.length} student records from "{uploadFileName}".
                  </p>
                  <div className="mt-2 text-[0.7rem] text-green-700 max-h-24 overflow-y-auto font-mono bg-white p-2 rounded-xs border border-green-100">
                    Preview (First 3 entries):
                    {parsedUploadRecords.slice(0, 3).map((r, i) => (
                      <div key={i} className="truncate">
                        {i + 1}. {r.student_name} | {r.course_semester} | {r.duration} | {r.college}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Import Mode Options */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-ink block">
                  Import Action
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                    <input
                      type="radio"
                      name="replaceMode"
                      checked={!replaceExisting}
                      onChange={() => setReplaceExisting(false)}
                      className="accent-brand cursor-pointer"
                    />
                    <span>Append to existing records</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-red-600 cursor-pointer">
                    <input
                      type="radio"
                      name="replaceMode"
                      checked={replaceExisting}
                      onChange={() => setReplaceExisting(true)}
                      className="accent-brand cursor-pointer"
                    />
                    <span>Replace all existing records (Clears table first)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setParsedUploadRecords([]);
                    setUploadFileName("");
                  }}
                  className="px-4 py-2 border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={parsedUploadRecords.length === 0 || uploadingRecords}
                  onClick={handleImportRecords}
                  className="btn-primary px-5 py-2 text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                >
                  {uploadingRecords
                    ? "Importing..."
                    : `Import ${parsedUploadRecords.length} Records`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── DELETE CONFIRMATION DIALOG ─────────────────── */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white border border-border rounded-sm shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-ink text-base">Confirm Deletion</h3>
                <p className="text-xs text-muted">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-ink/80 mb-6">
              Are you sure you want to delete{" "}
              <strong className="text-ink">"{deleteConfirmation.title}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteConfirmation({
                    isOpen: false,
                    type: null,
                    id: null,
                    title: "",
                  })
                }
                className="px-4 py-2 border border-border rounded-sm text-xs font-bold uppercase tracking-wider text-ink hover:bg-surface cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={13} /> Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
