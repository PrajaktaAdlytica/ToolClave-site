import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Database,
  FileCheck2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { ActionButton, ChapterLabel, Status } from "./components.jsx";
import { SecurityLayerGrid, TracePanel } from "./product-ui.jsx";
import { usePageMotion } from "./usePageMotion.js";

export function SecurityPage({ onDemo }) {
  const rootRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(0);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page security-page">
      <section className="page-hero security-page-hero">
        <ChapterLabel number="01" label="Security" tone="oxblood" />
        <div className="page-hero-copy">
          <span className="eyebrow">Security architecture / reviewable evidence</span>
          <h1>Security by design.<br />Evidence by default.</h1>
          <p>Toolclave places identity, policy, runtime isolation, and trace evidence around every external tool call.</p>
          <div className="hero-actions">
            <ActionButton onClick={onDemo} tone="oxblood">View security</ActionButton>
            <a className="text-link" href="#trust-room">Read the trust overview <ArrowRight size={14} /></a>
          </div>
        </div>
        <div className="evidence-room page-reveal">
          <span className="eyebrow">The evidence room</span>
          <h2>Controls are useful.<br />Proof makes them usable.</h2>
          <div className="evidence-documents">
            <EvidenceDocument number="01" title="Identity" lines={["Tool ownership", "Caller context", "Least privilege"]} />
            <EvidenceDocument number="02" title="Policy" lines={["Guardrails", "Approvals", "Context rules"]} featured />
            <EvidenceDocument number="03" title="Trace" lines={["Decision span", "Tool result", "Audit export"]} blue />
          </div>
        </div>
      </section>

      <section className="page-section security-layers-section">
        <ChapterLabel number="02" label="Layers" tone="oxblood" />
        <div className="page-section-heading page-reveal">
          <h2>Four layers.<br />One governed path.</h2>
          <p>Select a layer to see how evidence accumulates around a tool call.</p>
        </div>
        <div className="architecture-lanes">
          {[
            ["Identity", "Know the tool and caller", ["Tool identity", "Caller context", "Least privilege"], <Fingerprint size={18} />],
            ["Policy", "Evaluate intent and constraints", ["Guardrails", "Approvals", "Tenant rules"], <FileCheck2 size={18} />],
            ["Runtime", "Execute inside boundaries", ["Secrets isolation", "Sandbox controls", "Egress limits"], <KeyRound size={18} />],
            ["Observability", "Preserve the evidence", ["Decision trace", "Tamper-evident log", "SIEM export"], <ScrollText size={18} />],
          ].map(([title, description, items, icon], index) => (
            <button
              type="button"
              className={activeLayer === index ? `architecture-lane tone-${index} is-active page-reveal` : `architecture-lane tone-${index} page-reveal`}
              key={title}
              onClick={() => setActiveLayer(index)}
            >
              <span>0{index + 1}</span>
              {icon}
              <div><strong>{title}</strong><small>{description}</small></div>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="page-section decision-section tone-blue">
        <ChapterLabel number="03" label="Decision" tone="blue" />
        <div className="decision-copy page-reveal">
          <h2>See why the call<br />was allowed.</h2>
          <p>A decision is not a black box. Toolclave records the caller, policy, approval path, execution, and outcome as one span.</p>
          <ActionButton tone="blue">Open sample trace</ActionButton>
          <div className="decision-inputs">
            <div><span>Policy input</span><p>Role: support_agent<br />Tenant: 42<br />Amount: €420</p></div>
            <div><span>Evidence output</span><p>Decision: allow<br />Rule: refund-under-€500<br />Export: available</p></div>
          </div>
        </div>
        <div className="page-reveal"><TracePanel title="Policy decision trace" /></div>
      </section>

      <section className="page-section data-section">
        <ChapterLabel number="04" label="Data" tone="oxblood" />
        <div className="page-section-heading page-reveal">
          <h2>Keep data paths<br />visible and deliberate.</h2>
          <p>Deployment and retention choices should be explicit. This demo describes controls without inventing certifications.</p>
        </div>
        <div className="data-control-grid">
          <DataControl icon={<Database size={17} />} number="01" title="Minimize" copy="Collect only the fields needed for policy and trace." tone="pink" />
          <DataControl icon={<ScrollText size={17} />} number="02" title="Retain" copy="Set evidence windows by environment and workload." tone="amber" />
          <DataControl icon={<LockKeyhole size={17} />} number="03" title="Encrypt" copy="Protect data in transit and at rest." tone="mint" />
          <DataControl icon={<ShieldCheck size={17} />} number="04" title="Control" copy="Use role-based access and exportable audit trails." tone="blue" />
        </div>
        <TrustRoom />
      </section>

      <section className="honest-band">
        <ChapterLabel number="05" label="Trust" tone="pink" />
        <h2>Trust, <em>honestly.</em></h2>
        <ul>
          {["No invented certifications", "No hidden proof", "No blanket compliance claim", "Evidence before assertion"].map((item) => (
            <li key={item}><Check size={13} /> {item}</li>
          ))}
        </ul>
        <ActionButton tone="light">Review security</ActionButton>
      </section>

      <section className="conversion-band conversion-band--pink">
        <ChapterLabel number="06" label="Next" tone="oxblood" />
        <h2>Bring your reviewers.</h2>
        <p>We will walk through the architecture and the evidence.</p>
        <ActionButton onClick={onDemo} tone="oxblood">Request demo</ActionButton>
      </section>
    </main>
  );
}

function EvidenceDocument({ number, title, lines, featured = false, blue = false }) {
  return (
    <article className={`evidence-document${featured ? " is-featured" : ""}${blue ? " is-blue" : ""}`}>
      <span>{number}</span>
      <h3>{title}</h3>
      <ul>{lines.map((line) => <li key={line}>{line}</li>)}</ul>
      <Status tone="allowed">Reviewable</Status>
    </article>
  );
}

function DataControl({ icon, number, title, copy, tone }) {
  return (
    <article className={`data-control data-control--${tone} page-reveal`}>
      <div><span>{number}</span>{icon}</div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function TrustRoom() {
  const documents = [
    ["Architecture overview", "Available", "allowed"],
    ["Data handling notes", "Available", "allowed"],
    ["Subprocessor register", "Demo", "critical"],
    ["Retention controls", "Documented", "info"],
    ["Security questionnaire", "Sample", "critical"],
    ["Incident process", "Draft", "critical"],
  ];
  return (
    <div id="trust-room" className="trust-room page-reveal">
      <span className="eyebrow">Trust review room</span>
      <h2>Open the evidence your reviewers actually ask for.</h2>
      <div>
        {documents.map(([name, status, tone]) => (
          <button type="button" key={name}>
            <span>{name}</span><Status tone={tone}>{status}</Status>
          </button>
        ))}
      </div>
    </div>
  );
}
