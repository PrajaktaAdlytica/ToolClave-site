import { useEffect, useRef } from "react";
import { ArrowRight, ExternalLink, Globe2, Landmark, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { ChapterLabel } from "./components.jsx";
import { usePageMotion } from "./usePageMotion.js";

const ANNOUNCEMENT_URL = "https://tiphub-prototype-review.vercel.app/companies/toolclave";
const COMPANY_URL = "https://www.toolclave.com";
const CANONICAL_URL = `${COMPANY_URL}/news/tiphub-allocation`;
const META_TITLE = "Toolclave joins the TipHub portfolio";
const META_DESCRIPTION = "TipHub announces a $600K portfolio allocation to Toolclave, supporting its work across AI agent infrastructure.";

const facts = [
  ["Company", "Toolclave"],
  ["Sector", "AI agent infrastructure"],
  ["TipHub-announced allocation", "$600K"],
  ["Stage", "Early stage"],
  ["Scope", "Global"],
  ["Portfolio", "TipHub"],
];

export function TipHubAnnouncementPage() {
  const rootRef = useRef(null);
  usePageMotion(rootRef);

  useEffect(() => {
    const previousTitle = document.title;
    const managed = [];
    document.title = META_TITLE;

    const setMeta = (attribute, key, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      const created = !element;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      const previousContent = element.getAttribute("content");
      element.setAttribute("content", content);
      managed.push(() => {
        if (created) element.remove();
        else if (previousContent === null) element.removeAttribute("content");
        else element.setAttribute("content", previousContent);
      });
    };

    setMeta("name", "description", META_DESCRIPTION);
    setMeta("property", "og:title", META_TITLE);
    setMeta("property", "og:description", META_DESCRIPTION);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:url", CANONICAL_URL);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const canonicalCreated = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", CANONICAL_URL);

    return () => {
      document.title = previousTitle;
      managed.reverse().forEach((restore) => restore());
      if (canonicalCreated) canonical.remove();
      else if (previousCanonical === null) canonical.removeAttribute("href");
      else canonical.setAttribute("href", previousCanonical);
    };
  }, []);

  return (
    <main ref={rootRef} className="inner-page news-route">
      <article>
        <header className="news-route-hero">
          <ChapterLabel number="01" label="Portfolio announcement" tone="oxblood" />
          <div className="news-route-copy">
            <span className="eyebrow">Portfolio announcement</span>
            <h1>TipHub announces a <em>$600K allocation</em> to Toolclave.</h1>
            <p>Toolclave is joining the TipHub portfolio following a $600K TipHub-announced allocation. The partnership supports the company’s work across AI agent infrastructure.</p>
            <div className="hero-actions">
              <a className="button button-oxblood" href={ANNOUNCEMENT_URL} target="_blank" rel="noreferrer">
                Visit TipHub announcement <ExternalLink size={14} />
              </a>
              <Link className="text-link" to="/company">About Toolclave <ArrowRight size={14} /></Link>
            </div>
          </div>

          <aside className="news-allocation-dossier page-reveal" aria-label="TipHub-announced allocation summary">
            <span>TipHub-announced<br />portfolio allocation</span>
            <strong>$600K</strong>
            <p>AI agent infrastructure</p>
            <div>
              <Landmark size={18} />
              <span>Early stage<br />Global scope</span>
            </div>
          </aside>
        </header>

        <section className="news-story-section">
          <ChapterLabel number="02" label="Context" />
          <div className="news-story-copy page-reveal">
            <span className="eyebrow">Why this relationship</span>
            <h2>Focused infrastructure.<br />Built for durable use.</h2>
            <p>We are building Toolclave to address an important operating problem within AI agent infrastructure. TipHub’s early-stage, global perspective aligns with our ambition to turn a focused insight into durable infrastructure.</p>
            <p>The relationship extends beyond capital to company-building support across product, market development, talent, and future growth.</p>
          </div>

          <dl className="news-facts-grid page-reveal">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="news-links-section">
          <ChapterLabel number="03" label="Sources" tone="blue" />
          <div className="news-links-heading page-reveal">
            <span className="eyebrow">Official links</span>
            <h2>Read the source.<br />Explore the company.</h2>
          </div>
          <div className="news-source-links page-reveal">
            <a href={ANNOUNCEMENT_URL} target="_blank" rel="noreferrer">
              <Landmark size={19} />
              <span><small>Official source</small><strong>Visit TipHub announcement</strong></span>
              <ExternalLink size={15} />
            </a>
            <a href={COMPANY_URL}>
              <Globe2 size={19} />
              <span><small>Company website</small><strong>Visit Toolclave</strong></span>
              <ArrowRight size={15} />
            </a>
          </div>
          <aside className="news-disclosure page-reveal">
            <Layers3 size={18} />
            <div>
              <span>Disclosure</span>
              <p>The allocation displayed is information supplied and announced by TipHub. It does not independently represent the company’s total financing and may be updated if an official company disclosure differs.</p>
            </div>
          </aside>
        </section>
      </article>
    </main>
  );
}
