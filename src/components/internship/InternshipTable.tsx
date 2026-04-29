import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { InternshipRecord } from "@/data/internshipRecords";

interface InternshipTableProps {
  columns: readonly string[];
  rows: InternshipRecord[];
  pageSize?: number;
}

type PageToken = number | "start-ellipsis" | "end-ellipsis";
type SortOption =
  | "default"
  | "course-asc"
  | "course-desc"
  | "duration-asc"
  | "duration-desc"
  | "college-asc"
  | "college-desc";

const DEFAULT_PAGE_SIZE = 10;
const COURSE_COLUMN = "Course & Semester";
const DURATION_COLUMN = "Duration";
const COLLEGE_COLUMN = "College/University";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "default", label: "Default order" },
  { value: "course-asc", label: "Course & Semester (A-Z)" },
  { value: "course-desc", label: "Course & Semester (Z-A)" },
  { value: "duration-asc", label: "Duration (Low to High)" },
  { value: "duration-desc", label: "Duration (High to Low)" },
  { value: "college-asc", label: "College/University (A-Z)" },
  { value: "college-desc", label: "College/University (Z-A)" },
];

function buildPageTokens(totalPages: number, currentPage: number): PageToken[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const tokens: PageToken[] = [0];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);

  if (start > 1) {
    tokens.push("start-ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    tokens.push(page);
  }

  if (end < totalPages - 2) {
    tokens.push("end-ellipsis");
  }

  tokens.push(totalPages - 1);
  return tokens;
}

function compareText(left: string, right: string) {
  return left.localeCompare(right, undefined, {
    sensitivity: "base",
    numeric: true,
  });
}

function extractDurationValue(duration: string) {
  const match = duration.match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : Number.NaN;
}

function compareDuration(left: string, right: string) {
  const leftValue = extractDurationValue(left);
  const rightValue = extractDurationValue(right);
  const leftHasNumber = Number.isFinite(leftValue);
  const rightHasNumber = Number.isFinite(rightValue);

  if (leftHasNumber && rightHasNumber && leftValue !== rightValue) {
    return leftValue - rightValue;
  }

  if (leftHasNumber && !rightHasNumber) {
    return -1;
  }

  if (!leftHasNumber && rightHasNumber) {
    return 1;
  }

  return compareText(left, right);
}

export default function InternshipTable({
  columns,
  rows,
  pageSize = DEFAULT_PAGE_SIZE,
}: InternshipTableProps) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const safePageSize = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) =>
      columns.some((column) =>
        (row[column] ?? "").toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [rows, columns, query]);

  const orderedRows = useMemo(() => {
    if (sortBy === "default") {
      return filteredRows;
    }

    const nextRows = [...filteredRows];

    switch (sortBy) {
      case "course-asc":
        nextRows.sort((left, right) =>
          compareText(left[COURSE_COLUMN] ?? "", right[COURSE_COLUMN] ?? ""),
        );
        break;
      case "course-desc":
        nextRows.sort((left, right) =>
          compareText(right[COURSE_COLUMN] ?? "", left[COURSE_COLUMN] ?? ""),
        );
        break;
      case "duration-asc":
        nextRows.sort((left, right) =>
          compareDuration(
            left[DURATION_COLUMN] ?? "",
            right[DURATION_COLUMN] ?? "",
          ),
        );
        break;
      case "duration-desc":
        nextRows.sort((left, right) =>
          compareDuration(
            right[DURATION_COLUMN] ?? "",
            left[DURATION_COLUMN] ?? "",
          ),
        );
        break;
      case "college-asc":
        nextRows.sort((left, right) =>
          compareText(left[COLLEGE_COLUMN] ?? "", right[COLLEGE_COLUMN] ?? ""),
        );
        break;
      case "college-desc":
        nextRows.sort((left, right) =>
          compareText(right[COLLEGE_COLUMN] ?? "", left[COLLEGE_COLUMN] ?? ""),
        );
        break;
      default:
        break;
    }

    return nextRows;
  }, [filteredRows, sortBy]);

  const totalRows = orderedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / safePageSize));
  const currentPage = Math.min(page, totalPages - 1);

  const startIndex = currentPage * safePageSize;
  const endIndex = Math.min(startIndex + safePageSize, totalRows);

  const paginatedRows = useMemo(
    () => orderedRows.slice(startIndex, endIndex),
    [orderedRows, startIndex, endIndex],
  );

  const pageTokens = useMemo(
    () => buildPageTokens(totalPages, currentPage),
    [totalPages, currentPage],
  );

  const hasRows = totalRows > 0;

  return (
    <div className="rounded-sm border border-border bg-white shadow-[0_16px_32px_rgba(15,23,42,0.06)] overflow-hidden">
      <div className="border-b border-border bg-linear-to-r from-surface to-white px-4 md:px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:w-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
              Search Records
            </p>
            <label className="relative block w-full lg:w-96">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
              />
              <input
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(0);
                }}
                placeholder="Search by student, course, duration, or college"
                className="w-full h-10 pl-9 pr-3 text-sm bg-white border border-border rounded-sm text-ink placeholder:text-subtle focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </label>
          </div>

          <div className="w-full sm:w-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
              Sort By
            </p>
            <div className="relative w-full sm:w-80">
              <ArrowUpDown
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle pointer-events-none"
              />
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value as SortOption);
                  setPage(0);
                }}
                className="w-full h-10 pl-9 pr-9 text-sm bg-white border border-border rounded-sm text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="min-w-180 w-full text-sm">
          <thead className="bg-brand/4 border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3.5 text-left text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-brand/75 whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row, rowIndex) => (
              <tr
                key={`${startIndex + rowIndex}-${row[columns[0]] ?? "row"}`}
                className={[
                  "border-b border-border last:border-b-0 transition-colors duration-150",
                  rowIndex % 2 === 0 ? "bg-white" : "bg-surface/45",
                  "hover:bg-brand/4.5",
                ].join(" ")}
              >
                {columns.map((column) => {
                  const cellValue = row[column] ?? "-";

                  return (
                    <td
                      key={`${startIndex + rowIndex}-${column}`}
                      className={[
                        "px-4 py-3.5 text-sm text-ink align-top",
                        column === columns[0] ? "font-semibold text-brand" : "",
                      ].join(" ")}
                    >
                      {cellValue || "-"}
                    </td>
                  );
                })}
              </tr>
            ))}

            {!hasRows && (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-4 py-10 text-center text-sm text-muted"
                >
                  {query.trim()
                    ? "No records found for your search."
                    : "No internship records available right now."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-4 py-4 bg-surface/70 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-muted">
            {hasRows
              ? `Showing ${startIndex + 1}-${endIndex} of ${totalRows} records`
              : "Showing 0 records"}
          </p>
          {query.trim() && (
            <span className="text-[11px] font-semibold uppercase tracking-widest text-subtle">
              Filtered from {rows.length}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage(Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
            className="h-9 px-3 inline-flex items-center gap-1.5 border border-border rounded-sm text-xs font-semibold uppercase tracking-wide text-ink hover:border-brand hover:text-brand transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Go to previous page"
          >
            <ChevronLeft size={14} /> Prev
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {pageTokens.map((token, tokenIndex) => {
              if (typeof token !== "number") {
                return (
                  <span
                    key={`${token}-${tokenIndex}`}
                    className="w-9 text-center text-sm text-muted"
                  >
                    ...
                  </span>
                );
              }

              const isActive = token === currentPage;

              return (
                <button
                  key={token}
                  type="button"
                  onClick={() => setPage(token)}
                  aria-label={`Go to page ${token + 1}`}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "w-9 h-9 border rounded-sm text-xs font-semibold transition-colors",
                    isActive
                      ? "border-brand bg-brand text-white"
                      : "border-border text-ink hover:border-brand hover:text-brand",
                  ].join(" ")}
                >
                  {token + 1}
                </button>
              );
            })}
          </div>

          <p className="sm:hidden text-xs font-semibold text-ink min-w-18 text-center">
            {currentPage + 1} / {totalPages}
          </p>

          <button
            type="button"
            onClick={() => setPage(Math.min(currentPage + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1 || !hasRows}
            className="h-9 px-3 inline-flex items-center gap-1.5 border border-border rounded-sm text-xs font-semibold uppercase tracking-wide text-ink hover:border-brand hover:text-brand transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Go to next page"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
