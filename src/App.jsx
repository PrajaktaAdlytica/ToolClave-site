import { useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Footer, Header } from "./components.jsx";
import { CompanyPage } from "./CompanyPage.jsx";
import { ContactPage } from "./ContactPage.jsx";
import { DocsPage } from "./DocsPage.jsx";
import { DemoPage } from "./DemoPage.jsx";
import { HomePage } from "./HomePage.jsx";
import { ObservePage } from "./ObservePage.jsx";
import { PricingPage } from "./PricingPage.jsx";
import { RegistryPage } from "./RegistryPage.jsx";
import { RuntimePage } from "./RuntimePage.jsx";
import { SecurityPage } from "./SecurityPage.jsx";
import { SignInPage } from "./SignInPage.jsx";
import { SolutionsPage } from "./SolutionsPage.jsx";
import { TipHubAnnouncementPage } from "./TipHubAnnouncementPage.jsx";

export function App() {
  return (
    <BrowserRouter>
      <ToolclaveSite />
    </BrowserRouter>
  );
}

function ToolclaveSite() {
  const navigate = useNavigate();
  const requestDemo = () => navigate("/demo");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 0.92,
    });
    lenis.on("scroll", ScrollTrigger.update);
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="site-shell">
      <ScrollManager />
      <PageProgress />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onDemo={requestDemo} />} />
        <Route path="/registry" element={<RegistryPage onDemo={requestDemo} />} />
        <Route path="/runtime" element={<RuntimePage onDemo={requestDemo} />} />
        <Route path="/observe" element={<ObservePage onDemo={requestDemo} />} />
        <Route path="/solutions" element={<SolutionsPage onDemo={requestDemo} />} />
        <Route path="/security" element={<SecurityPage onDemo={requestDemo} />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/pricing" element={<PricingPage onDemo={requestDemo} />} />
        <Route path="/company" element={<CompanyPage onDemo={requestDemo} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/news/tiphub-allocation" element={<TipHubAnnouncementPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function PageProgress() {
  const barRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  return <div className="page-scroll-progress" ref={barRef} aria-hidden="true" />;
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    const target = location.hash ? document.querySelector(location.hash) : null;
    const id = requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.hash]);
  return null;
}

function NotFound() {
  return (
    <main className="not-found">
      <img src="/brand/toolclave-mark.svg" alt="" />
      <span className="eyebrow">404 / Outside policy</span>
      <h1>This route is not registered.</h1>
      <p>Return to the governed path and continue exploring Toolclave.</p>
      <Link className="button button-dark" to="/">Back to homepage <ArrowRight size={15} /></Link>
    </main>
  );
}
