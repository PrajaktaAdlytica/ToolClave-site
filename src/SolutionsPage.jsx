import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Code2, Layers3, PackageCheck, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ActionButton, ChapterLabel } from "./components.jsx";
import { solutionColumns } from "./data.js";
import { usePageMotion } from "./usePageMotion.js";

const solutionIcons = [Code2, Layers3, ShieldCheck, PackageCheck];

export function SolutionsPage({ onDemo }) {
  const rootRef = useRef(null);
  const [activeSolution, setActiveSolution] = useState(0);
  const location = useLocation();
  usePageMotion(rootRef);
  const solution = solutionColumns[activeSolution];

  useEffect(() => {
    const indexByHash = { "#developers": 0, "#platform-teams": 1, "#saas-vendors": 3 };
    if (location.hash in indexByHash) setActiveSolution(indexByHash[location.hash]);
  }, [location.hash]);

  return (
    <main ref={rootRef} className="inner-page solutions-route">
      <section className="solutions-route-hero">
        <ChapterLabel number="01" label="Solutions" tone="blue" />
        <div className="solutions-route-copy page-reveal">
          <span className="eyebrow">One tool plane / four operating teams</span>
          <h1>Shared control for<br />the teams behind<br /><em>every agent.</em></h1>
          <p>Toolclave gives builders, platform owners, security teams, and SaaS vendors one operating model for external tool use.</p>
          <ActionButton onClick={onDemo} tone="blue">Find your starting point</ActionButton>
        </div>
        <div className="solution-selector page-reveal" role="tablist" aria-label="Solution audiences">
          {solutionColumns.map((item, index) => {
            const Icon = solutionIcons[index];
            return (
              <button
                id={index === 0 ? "developers" : index === 1 ? "platform-teams" : index === 3 ? "saas-vendors" : undefined}
                className={activeSolution === index ? "solution-selector-item is-active" : "solution-selector-item"}
                type="button"
                role="tab"
                aria-selected={activeSolution === index}
                key={item.title}
                onClick={() => setActiveSolution(index)}
              >
                <span>{item.number}</span><Icon size={18} /><strong>{item.title}</strong><ArrowRight size={14} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="solution-focus-section">
        <ChapterLabel number="02" label="Focus" tone="blue" />
        <div className="solution-focus-copy page-reveal">
          <span className="eyebrow">Selected operating view</span>
          <h2>{solution.title}</h2>
          <p>{solution.description}</p>
          <ul>{solution.bullets.map((bullet) => <li key={bullet}><Check size={14} /> {bullet}</li>)}</ul>
          <Link className="text-link" to="/docs">Open implementation guides <ArrowRight size={14} /></Link>
        </div>
        <div className="solution-operating-map page-reveal">
          <div><span>01</span><strong>Discover</strong><p>Find a verified capability with a clear owner and contract.</p></div>
          <div><span>02</span><strong>Govern</strong><p>Apply identity, policy, approvals, and tenant constraints.</p></div>
          <div><span>03</span><strong>Execute</strong><p>Run with isolated credentials and bounded controls.</p></div>
          <div><span>04</span><strong>Prove</strong><p>Connect intent, decision, execution, and outcome.</p></div>
        </div>
      </section>

      <section className="route-section solution-outcomes-section tone-pistachio">
        <ChapterLabel number="03" label="Outcomes" />
        <div className="route-section-heading page-reveal"><h2>One infrastructure layer.<br />Different team outcomes.</h2></div>
        <div className="outcome-grid page-reveal">
          <div><strong>Ship faster</strong><p>Reuse verified tools and policy paths instead of rebuilding controls per workflow.</p></div>
          <div><strong>Reduce risk</strong><p>Make capabilities, ownership, approvals, and evidence visible before production.</p></div>
          <div><strong>Operate clearly</strong><p>Give incidents and reviews a trace that connects decisions to external effects.</p></div>
        </div>
      </section>

      <section className="conversion-band">
        <ChapterLabel number="04" label="Workshop" tone="oxblood" />
        <h2>Map one agent.<br />Find the control gaps.</h2>
        <p>Bring a production-bound workflow to a focused architecture session.</p>
        <ActionButton onClick={onDemo} tone="outline">Book a workshop</ActionButton>
      </section>
    </main>
  );
}
