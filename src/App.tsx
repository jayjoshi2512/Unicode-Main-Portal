import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Products from "@/pages/Products";
import Internship from "@/pages/Internship";
import Contact from "@/pages/Contact";
import Accreditations from "@/pages/Accreditations";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const is404 =
    pathname !== "/" &&
    ![
      "/about",
      "/courses",
      "/products",
      "/internship",
      "/contact",
      "/accreditations",
      "/privacy-policy",
      "/terms-conditions",
    ].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!is404 && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/products" element={<Products />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accreditations" element={<Accreditations />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!is404 && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
