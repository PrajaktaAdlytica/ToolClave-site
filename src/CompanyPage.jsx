import { useRef } from "react";
import { ArrowRight, Building2, Compass, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ActionButton, ChapterLabel } from "./components.jsx";
import { usePageMotion } from "./usePageMotion.js";

const principles = [
  ["Make ownership visible", "Every consequential tool should have a responsible team, declared capability, and review history."],
  ["Put policy in the path", "Controls should evaluate the call at execution time, not live only in documents and dashboards."],
  ["Keep evidence honest", "A trace should explain the decision and outcome without claiming certainty the system does not have."],
];

export function CompanyPage({ onDemo }) {
  const rootRef = useRef(null);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page company-route">
      <section className="company-route-hero">
        <ChapterLabel number="01" label="Company" />
        <div className="company-route-copy page-reveal">
          <span className="eyebrow">Poland / European Union</span>
          <h1>Infrastructure for<br />agents that can<br /><em>change the world.</em></h1>
          <p>Toolclave is a product startup building the verified registry, governed runtime, and evidence layer for AI agents using external tools.</p>
          <div className="hero-actions">
            <ActionButton onClick={onDemo}>Meet the product</ActionButton>
            <Link className="text-link" to="/contact">Contact Toolclave <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="company-manifesto page-reveal">
          <span>Our position</span>
          <p>Agents become useful when they can act. They become operable when every action has an identity, a policy decision, and evidence.</p>
          <div><MapPin size={18} /><strong>Built in Poland<br />for European and global teams</strong></div>
        </div>
      </section>

      <section className="route-section company-principles-section tone-pistachio">
        <ChapterLabel number="02" label="Principles" />
        <div className="route-section-heading page-reveal"><h2>Build the control plane<br />we would trust ourselves.</h2></div>
        <div className="principle-ledger">
          {principles.map(([title, copy], index) => (
            <article className="principle-ledger-item page-reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="company-stage-section">
        <ChapterLabel number="03" label="Stage" tone="oxblood" />
        <div className="company-stage-copy page-reveal">
          <span className="eyebrow">Building with design partners</span>
          <h2>Early enough to shape.<br />Serious enough to test.</h2>
          <p>Toolclave is presented as a demo-stage company concept. Product claims, certifications, customer logos, and commercial terms remain intentionally evidence-led.</p>
        </div>
        <div className="company-stage-grid page-reveal">
          <div><Compass size={20} /><strong>Category</strong><p>AI-agent tool infrastructure</p></div>
          <div><Building2 size={20} /><strong>Buyers</strong><p>Developers, platform teams, security, SaaS vendors</p></div>
          <div><ShieldCheck size={20} /><strong>Focus</strong><p>Registry, runtime governance, and observability</p></div>
        </div>
      </section>

      <section className="conversion-band conversion-band--pink" id="careers">
        <ChapterLabel number="04" label="Build with us" tone="oxblood" />
        <h2>Help make agent<br />actions governable.</h2>
        <p>We are mapping the founding team and early design-partner network.</p>
        <Link className="button button-oxblood" to="/contact">Start a conversation <ArrowRight size={15} /></Link>
      </section>
    </main>
  );
}
