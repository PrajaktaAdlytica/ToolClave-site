import { useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { ActionButton, ChapterLabel } from "./components.jsx";
import { plans } from "./data.js";
import { usePageMotion } from "./usePageMotion.js";

export function PricingPage({ onDemo }) {
  const rootRef = useRef(null);
  const [annual, setAnnual] = useState(false);
  const [verifiedTools, setVerifiedTools] = useState(180);
  const [calls, setCalls] = useState(120);
  const [retention, setRetention] = useState(30);
  usePageMotion(rootRef);

  const estimate = useMemo(() => {
    if (verifiedTools <= 10 && calls <= 10 && retention <= 7) return ["Starter", "Free"];
    if (verifiedTools <= 250 && calls <= 250 && retention <= 30) {
      return ["Growth", annual ? "$169 / month" : "$199 / month"];
    }
    return ["Enterprise", "Custom"];
  }, [annual, verifiedTools, calls, retention]);

  return (
    <main ref={rootRef} className="inner-page pricing-page">
      <section className="pricing-hero">
        <ChapterLabel number="01" label="Pricing" tone="oxblood" />
        <div className="pricing-heading page-hero-copy">
          <span className="eyebrow">Illustrative pricing / transparent controls</span>
          <h1>Simple pricing.<br />Serious control.</h1>
          <p>Start with a verified catalog. Add governed calls, evidence retention, and support as your agent footprint grows.</p>
        </div>
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button type="button" className={!annual ? "is-active" : ""} aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
          <button type="button" className={annual ? "is-active" : ""} aria-pressed={annual} onClick={() => setAnnual(true)}>Annual −15%</button>
        </div>
        <div className="plan-ledger page-reveal">
          {plans.map((plan, index) => (
            <PlanColumn key={plan.name} plan={plan} index={index} annual={annual} onAction={onDemo} />
          ))}
        </div>
        <small className="pricing-disclaimer">Illustrative demo pricing. Final plans and limits require product validation.</small>
      </section>

      <section className="page-section configurator-section tone-pistachio">
        <ChapterLabel number="02" label="Configure" />
        <div className="configurator-copy page-reveal">
          <h2>Price the governed<br />tool plane you need.</h2>
          <p>Move from a small approved catalog to a multi-team platform. Inventory, calls, and evidence retention stay visible.</p>
        </div>
        <div className="configurator-panel page-reveal">
          <div className="panel-toolbar"><strong>Usage configurator</strong><span>{estimate[0]}</span></div>
          <RangeControl label="Verified tools" value={verifiedTools} min={1} max={500} suffix="" note="250 included in Growth" onChange={setVerifiedTools} />
          <RangeControl label="Governed calls / month" value={calls} min={1} max={500} suffix="k" note="250k included in Growth" onChange={setCalls} />
          <RangeControl label="Evidence retention" value={retention} min={1} max={365} suffix=" days" note="30 days included in Growth" onChange={setRetention} />
          <div className="estimate-row">
            <div><span>Estimated plan</span><strong>{estimate[0]}</strong></div>
            <strong>{estimate[1]}</strong>
            <ActionButton onClick={onDemo}>Talk to sales</ActionButton>
          </div>
        </div>
      </section>

      <section className="page-section compare-section">
        <ChapterLabel number="03" label="Compare" tone="oxblood" />
        <div className="compare-copy page-reveal">
          <h2>Compare the controls,<br />not just the limits.</h2>
          <p>Every plan starts with the same governed model. Higher tiers add scale, collaboration, retention, and operating support.</p>
        </div>
        <CapabilityMatrix />
      </section>

      <section className="page-section procurement-section tone-blue">
        <ChapterLabel number="04" label="Procure" tone="blue" />
        <div className="procurement-copy page-reveal">
          <h2>Two ways to<br />move forward.</h2>
          <p>Choose a standard commercial path or work directly with the team while the product and category are still forming.</p>
        </div>
        <ProcurementCard number="01" title="Enterprise" subtitle="For teams ready to evaluate" items={["Architecture review", "Custom limits", "Security questionnaire", "Commercial proposal"]} cta="Contact sales" onAction={onDemo} />
        <ProcurementCard number="02" title="Design Partner" subtitle="For teams shaping the category" items={["Early feature access", "Co-design roadmap", "Technical enablement", "Joint go-to-market"]} cta="Apply to partner" partner onAction={onDemo} />
      </section>

      <section className="page-section faq-section">
        <ChapterLabel number="05" label="Questions" tone="oxblood" />
        <div className="faq-copy page-reveal"><h2>Questions before<br />procurement.</h2></div>
        <FaqList />
      </section>
    </main>
  );
}

function PlanColumn({ plan, index, annual, onAction }) {
  const price = plan.featured && annual ? "$169 / mo" : plan.price;
  return (
    <article className={`plan-column${plan.featured ? " is-featured" : ""}${plan.partner ? " is-partner" : ""}`}>
      <span>0{index + 1}</span>
      <h2>{plan.name}</h2>
      <p>{plan.audience}</p>
      <strong className="plan-price">{price}</strong>
      {[plan.tools, plan.calls, plan.retention, plan.support].map((item) => (
        <div className="plan-feature" key={item}><Check size={13} /> {item}</div>
      ))}
      <ActionButton onClick={onAction} tone={plan.partner ? "oxblood" : plan.featured ? "matcha" : "dark"}>{plan.cta}</ActionButton>
    </article>
  );
}

function RangeControl({ label, value, min, max, suffix, note, onChange }) {
  return (
    <label className="range-control">
      <span>{label}</span>
      <strong>{value}{suffix}</strong>
      <small>{note}</small>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function CapabilityMatrix() {
  const groups = [
    ["Registry", ["Verified tool profiles", "Ownership + capabilities", "Version history"]],
    ["Runtime", ["Policy enforcement", "Approval workflows", "Secrets isolation"]],
    ["Observe", ["End-to-end traces", "Evidence export", "Retention controls"]],
    ["Operations", ["Team roles", "SSO / SCIM", "Priority support"]],
  ];
  return (
    <div className="capability-matrix page-reveal">
      <div className="matrix-header"><span>Capability</span><span>Starter</span><span>Growth</span><span>Enterprise</span><span>Partner</span></div>
      {groups.map(([group, rows], groupIndex) => (
        <div className="matrix-group" key={group}>
          <strong>{group}</strong>
          {rows.map((row, rowIndex) => (
            <div className="matrix-row" key={row}>
              <span>{row}</span>
              {[0, 1, 2, 3].map((column) => {
                const excluded = (groupIndex === 1 && rowIndex === 2 && column < 2) || (groupIndex === 3 && rowIndex < 2 && column < 2);
                return <span key={column}>{excluded ? "—" : <Check size={13} />}</span>;
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProcurementCard({ number, title, subtitle, items, cta, partner = false, onAction }) {
  return (
    <article className={partner ? "procurement-card is-partner page-reveal" : "procurement-card page-reveal"}>
      <span>{number}</span><h3>{title}</h3><p>{subtitle}</p>
      <ul>{items.map((item) => <li key={item}><Check size={13} /> {item}</li>)}</ul>
      <ActionButton onClick={onAction} tone={partner ? "oxblood" : "dark"}>{cta}</ActionButton>
    </article>
  );
}

function FaqList() {
  const [open, setOpen] = useState(0);
  const items = [
    ["What counts as a governed tool call?", "A request evaluated by Toolclave Runtime and forwarded to an external tool counts as one governed call."],
    ["Can we export traces to our observability stack?", "The product direction includes OpenTelemetry-friendly exports and evidence handoff to existing observability systems."],
    ["Do you offer EU deployment options?", "EU deployment and data-location choices are part of the enterprise evaluation rather than a blanket public claim."],
    ["Can we begin with a design partnership?", "Yes. Design partners work directly with the team on roadmap, architecture, and technical enablement."],
  ];
  return (
    <div className="faq-list page-reveal">
      {items.map(([question, answer], index) => (
        <div className={open === index ? "faq-item is-open" : "faq-item"} key={question}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
            {question}<ChevronDown size={16} />
          </button>
          {open === index && <p>{answer}</p>}
        </div>
      ))}
    </div>
  );
}
