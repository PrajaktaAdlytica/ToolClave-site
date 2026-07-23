import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, CircleCheck, FileCheck2, GitCompareArrows, ShieldCheck } from "lucide-react";
import { ActionButton, ChapterLabel, DemoBadge, Status, VerificationList } from "./components.jsx";
import { RegistryTable } from "./product-ui.jsx";
import { tools } from "./data.js";
import { usePageMotion } from "./usePageMotion.js";

const tabs = ["Overview", "Capabilities", "Security", "Policies", "Versions"];

export function RegistryPage({ onDemo }) {
  const rootRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page registry-page">
      <section className="page-hero registry-page-hero">
        <ChapterLabel number="01" label="Registry" />
        <div className="page-hero-copy">
          <span className="eyebrow">Tool identity / verified before use</span>
          <h1>Every tool gets<br />a verified identity.</h1>
          <p>Registry turns external actions into owned, reviewable assets. Know what a tool can do before an agent can call it.</p>
          <div className="hero-actions">
            <ActionButton onClick={onDemo}>Explore Registry</ActionButton>
            <Link className="text-link" to="/docs">View developer docs <ArrowRight size={14} /></Link>
          </div>
        </div>
        <ToolDossier tool={selectedTool} activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>

      <section id="registry-catalog" className="page-section tone-pistachio">
        <ChapterLabel number="02" label="Discover" />
        <div className="page-section-heading page-reveal">
          <h2>Find the right tool.<br />See the risk before use.</h2>
          <p>Search by owner, capability, environment, or verification state. Select a row to inspect its identity above.</p>
        </div>
        <div className="page-reveal">
          <RegistryTable onSelect={setSelectedTool} />
        </div>
      </section>

      <section className="page-section registry-evidence-section">
        <ChapterLabel number="03" label="Verify" />
        <div className="evidence-layout">
          <div className="page-section-heading page-reveal">
            <h2>Evidence, attached<br />to the tool.</h2>
            <p>Ownership, schema, contracts, and policy readiness stay inspectable as one living verification record.</p>
          </div>
          <div className="evidence-cards">
            <EvidenceCard number="01" title="Ownership" icon={<CircleCheck size={17} />} lines={["Owner confirmed", selectedTool.owner, "Verified 23 Jul"]} />
            <EvidenceCard number="02" title="Security review" icon={<ShieldCheck size={17} />} lines={["Schema + secrets", "No embedded credentials", "Verified 23 Jul"]} featured />
            <EvidenceCard number="03" title="Policy readiness" icon={<FileCheck2 size={17} />} lines={["Runtime compatible", "Approval rule attached", "Verified 23 Jul"]} />
          </div>
        </div>
        <div className="schema-panel page-reveal">
          <SchemaBlock title="Input schema" code={'{\n  "amount": "number",\n  "currency": "string",\n  "customer_id": "string"\n}'} />
          <SchemaBlock title="Output schema" code={'{\n  "payment_id": "string",\n  "status": "string",\n  "captured_at": "string"\n}'} />
          <div className="schema-verification">
            <span className="eyebrow">Verification summary</span>
            <VerificationList compact />
          </div>
        </div>
      </section>

      <section className="page-section version-section tone-blue">
        <ChapterLabel number="04" label="Versions" tone="blue" />
        <div className="version-copy page-reveal">
          <h2>Change without<br />losing control.</h2>
          <p>Tool versions keep evidence, approvals, and rollback paths together. Breaking changes cannot quietly enter production.</p>
        </div>
        <VersionHistory />
      </section>

      <section className="conversion-band conversion-band--matcha">
        <ChapterLabel number="05" label="Next" />
        <h2>Make every tool<br />accountable.</h2>
        <p>Start with a verified catalog, then govern every invocation.</p>
        <ActionButton onClick={onDemo}>Request demo</ActionButton>
      </section>
    </main>
  );
}

function ToolDossier({ tool, activeTab, setActiveTab }) {
  return (
    <div className="tool-dossier page-reveal">
      <div className="dossier-heading">
        <div>
          <span className="eyebrow">Tool profile</span>
          <h2>{tool.name}</h2>
          <p>{tool.id} &nbsp;•&nbsp; Version 3.2.1</p>
        </div>
        <Status tone={tool.evidence === "Verified" ? "allowed" : "approval"}>{tool.evidence}</Status>
      </div>
      <div className="dossier-tabs" role="tablist" aria-label="Tool profile sections">
        {tabs.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? "is-active" : ""}
            onClick={() => setActiveTab(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="dossier-grid">
        <div><span>Ownership</span><strong>{tool.owner}</strong><p>Owner: Marta Nowak</p><p>Criticality: {tool.risk}</p></div>
        <div><span>Capabilities</span><strong>{tool.capability}</strong><p>subscriptions.write</p><p>refunds.create</p></div>
        <div><span>Evidence</span><p><Check size={13} /> Identity verified</p><p><Check size={13} /> Contract reviewed</p><p><Check size={13} /> Policy compatible</p></div>
      </div>
      <div className="dossier-notice">
        <div><span>Verification complete</span><strong>5 evidence checks passed. Ready for governed runtime.</strong></div>
        <button type="button">View evidence <ArrowRight size={13} /></button>
      </div>
    </div>
  );
}

function EvidenceCard({ number, title, icon, lines, featured = false }) {
  return (
    <article className={featured ? "evidence-card is-featured page-reveal" : "evidence-card page-reveal"}>
      <div className="evidence-card-heading"><span>{number}</span>{icon}</div>
      <h3>{title}</h3>
      {lines.map((line) => <p key={line}>{line}</p>)}
      <button type="button">Open record <ArrowRight size={12} /></button>
    </article>
  );
}

function SchemaBlock({ title, code }) {
  return (
    <div>
      <span className="eyebrow">{title}</span>
      <pre>{code}</pre>
    </div>
  );
}

function VersionHistory() {
  const versions = [
    ["3.2.1", "23 Jul 2026", "3DS authentication added", "Verified"],
    ["3.1.0", "30 Jun 2026", "Refunds API added", "Verified"],
    ["3.0.0", "15 May 2026", "Breaking schema change", "Approval"],
    ["2.8.4", "21 Mar 2026", "Webhook signature patch", "Verified"],
  ];
  return (
    <div className="version-panel page-reveal">
      <div className="panel-toolbar">
        <strong>Version history</strong>
        <DemoBadge />
      </div>
      {versions.map(([version, date, change, status]) => (
        <div className="version-row" key={version}>
          <strong>{version}</strong><span>{date}</span><p>{change}</p>
          <Status tone={status === "Verified" ? "allowed" : "approval"}>{status}</Status>
        </div>
      ))}
      <div className="version-actions">
        <button type="button"><GitCompareArrows size={14} /> Compare versions</button>
        <button type="button">Export evidence <ArrowRight size={13} /></button>
      </div>
    </div>
  );
}
