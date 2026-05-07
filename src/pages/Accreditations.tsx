import { useEffect, useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, FileText } from "lucide-react";

const ACCREDITATIONS = [
  {
    id: 4,
    title: "Udyam Registration Certificate",
    pdf: "/Accreditations/Print _ Udyam Registration Certificate.pdf",
    category: "MSME",
  },
  {
    id: 1,
    title: "Sardar Vallabhbhai Patel National Service Award",
    image:
      "/Accreditations/Sardar Vallabhbhai Patel National Service Award 2026_20260428_171732_0000.png",
    category: "Awards",
  },
  {
    id: 2,
    title: "District Award 1",
    image: "/Accreditations/award1.jpg.jpeg",
    category: "Awards",
  },
  {
    id: 3,
    title: "District Award 2",
    image: "/Accreditations/award2.jpg.jpeg",
    category: "Awards",
  },
  {
    id: 5,
    title: "MSME UDYAM Registration",
    image: "/Accreditations/UDYAM.jpeg",
    category: "MSME",
  },
  {
    id: 6,
    title: "ISO Certification",
    image: "/Accreditations/UNICODE TECHNOLAB FINAL REGISTRSTION COPY.jpeg",
    category: "ISO",
  },
  {
    id: 7,
    title: "Accreditation 004",
    image: "/Accreditations/004.jpg.jpeg",
    category: "Certificates",
  },
  {
    id: 8,
    title: "Accreditation 003",
    image: "/Accreditations/003.jpg.jpeg",
    category: "Certificates",
  },
  {
    id: 9,
    title: "Accreditation 002",
    image: "/Accreditations/002.jpg.jpeg",
    category: "Certificates",
  },
  {
    id: 10,
    title: "Accreditation 001",
    image: "/Accreditations/001.jpg.jpeg",
    category: "Certificates",
  },
  {
    id: 11,
    title: "Research Contribution 1",
    image: "/Accreditations/Research-1.jpeg",
    category: "Research",
  },
  {
    id: 12,
    title: "Research Contribution 2",
    image: "/Accreditations/Research-2.jpeg",
    category: "Research",
  },
  {
    id: 13,
    title: "Reviewer Accreditation",
    image: "/Accreditations/Reviewer.jpeg",
    category: "Research",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(ACCREDITATIONS.map((a) => a.category))),
];

export default function Accreditations() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return ACCREDITATIONS;
    return ACCREDITATIONS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const activeItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;
  const activePdfViewerUrl = useMemo(() => {
    if (!activeItem?.pdf) return "";
    return `${activeItem.pdf}#toolbar=0&navpanes=0&statusbar=0&messages=0`;
  }, [activeItem]);

  const closeModal = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + filteredItems.length) % filteredItems.length,
      );
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight" && selectedIndex !== null) {
        setSelectedIndex((selectedIndex + 1) % filteredItems.length);
      }
      if (e.key === "ArrowLeft" && selectedIndex !== null) {
        setSelectedIndex(
          (selectedIndex - 1 + filteredItems.length) % filteredItems.length,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

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
          <p className="label-tag text-accent! mb-4">Recognised Excellence</p>
          <h1
            className="text-white font-black tracking-tight leading-tight max-w-2xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Our
            <br />
            Accreditations
          </h1>
          <p className="text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
            We take pride in our recognized excellence, certifications, and
            national awards that validate our commitment to quality education
            and innovation.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="pt-6 pb-16 md:section-pad bg-bg min-h-screen">
        <div className="max-w-7xl mx-auto container-pad">
          {/* Tabs Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12 w-full">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`grow sm:grow-0 basis-[30%] sm:basis-auto text-center px-2 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-brand text-white shadow-md transform scale-105"
                    : "bg-surface border border-border text-muted hover:text-ink hover:border-border-light hover:bg-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group card overflow-hidden cursor-pointer flex flex-col h-full animate-fade-up"
                style={{ animationDelay: `${(index % 4) * 50}ms` }}
                onClick={() => openModal(index)}
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-surface relative border-b border-border">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-brand to-brand/80 text-white px-4 text-center">
                      <FileText size={44} className="mb-3" />
                      <p className="text-sm font-semibold uppercase tracking-widest">
                        PDF Certificate
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/10 p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.pdf ? <FileText size={24} /> : <ZoomIn size={24} />}
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-ink line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted text-lg">
                No accreditations found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-100 bg-brand/98 backdrop-blur-md flex items-center justify-center animate-fade-in"
          onClick={closeModal}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-linear-to-b from-brand/80 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
              <span className="text-accent text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-sm">
                {filteredItems[selectedIndex].category}
              </span>
            </div>
            <button
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-sm transition-all pointer-events-auto"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-sm transition-all z-50 group pointer-events-auto"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft
                  size={32}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>

              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-sm transition-all z-50 group pointer-events-auto"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight
                  size={32}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="max-w-6xl w-full h-full p-4 md:p-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {activeItem?.pdf ? (
                <div
                  className="w-full h-[72vh] md:h-[76vh] bg-white rounded-sm shadow-2xl overflow-hidden pointer-events-auto animate-fade-up"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    title={activeItem.title}
                    src={activePdfViewerUrl}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <img
                  key={selectedIndex}
                  src={activeItem?.image}
                  alt={activeItem?.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl animate-fade-up pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              <div className="mt-8 text-center animate-fade-up delay-100 max-w-2xl px-4 pointer-events-auto">
                <h2 className="text-white text-xl md:text-2xl font-bold leading-tight">
                  {activeItem?.title}
                </h2>
                {filteredItems.length > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="h-px w-8 bg-white/20" />
                    <p className="text-white/40 text-xs font-medium tracking-widest uppercase">
                      {selectedIndex + 1} OF {filteredItems.length}
                    </p>
                    <div className="h-px w-8 bg-white/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
