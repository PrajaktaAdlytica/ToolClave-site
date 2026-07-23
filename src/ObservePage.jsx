import { useRef } from "react";
import { ArrowRight, Braces, Download, RadioTower, SearchCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ActionButton, ChapterLabel } from "./components.jsx";
import { TracePanel } from "./product-ui.jsx";
import { usePageMotion } from "./usePageMotion.js";

const evidence = [
  ["Intent", "What the agent tried to accomplish", "request + actor"],
  ["Decision", "Which policy evaluated and why it passed", "policy + reason"],
  ["Execution", "Which tool version ran with which scope", "version + latency"],
  ["Outcome", "What returned to the agent and user", "result + status"],
];

export function ObservePage({ onDemo }) {
  const rootRef = useRef(null);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page observe-route">
      <section className="expansion-hero observe-route-hero">
        <ChapterLabel number="01" label="Observe" tone="oxblood" />
        <div className="expansion-hero-copy page-reveal">
          <span className="eyebrow">Evidence plane / request to outcome</span>
          <h1>See every call.<br />Understand every<br /><em>decision.</em></h1>
          <p>Toolclave Observe connects agent intent, policy reasoning, execution details, and the returned outcome in one trace.</p>
          <div className="hero-actions">
            <ActionButton onClick={onDemo} tone="oxblood">Explore Observe</ActionButton>
            <Link className="text-link" to="/docs">Read trace docs <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="observe-hero-stage page-reveal"><TracePanel /></div>
      </section>

      <section className="route-section evidence-anatomy-section tone-blue">
        <ChapterLabel number="02" label="Anatomy" tone="blue" />
        <div className="route-section-heading page-reveal">
          <span className="eyebrow">One trace / four answers</span>
          <h2>From model intent<br />to external effect.</h2>
        </div>
        <div className="evidence-ledger">
          {evidence.map(([title, copy, meta], index) => (
            <article className="evidence-ledger-row page-reveal" key={title}>
              <span>0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <small>{meta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="route-section observe-export-section">
        <ChapterLabel number="03" label="Exports" />
        <div className="export-copy page-reveal">
          <h2>Keep Toolclave evidence.<br />Use your existing stack.</h2>
          <p>Search operational traces in Toolclave, then hand evidence to the systems your platform and security teams already use.</p>
        </div>
        <div className="export-rail page-reveal">
          <div><SearchCheck size={20} /><strong>Trace search</strong><span>Filter by agent, tool, tenant, policy, or status.</span></div>
          <div><RadioTower size={20} /><strong>Live signals</strong><span>Route runtime events toward alerts and incident workflows.</span></div>
          <div><Braces size={20} /><strong>OpenTelemetry</strong><span>Use familiar trace conventions across the wider platform.</span></div>
          <div><Download size={20} /><strong>Evidence export</strong><span>Package selected records for review and audit.</span></div>
        </div>
      </section>

      <section className="conversion-band conversion-band--pink">
        <ChapterLabel number="04" label="Trace" tone="oxblood" />
        <h2>Bring a failed call.<br />Leave with the story.</h2>
        <p>Walk through a real agent invocation with the Toolclave team.</p>
        <ActionButton onClick={onDemo} tone="oxblood">Request trace review</ActionButton>
      </section>
    </main>
  );
}
