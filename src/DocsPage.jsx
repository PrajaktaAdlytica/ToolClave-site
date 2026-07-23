import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Braces, Check, Copy, FileCode2, TerminalSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { ChapterLabel } from "./components.jsx";
import { usePageMotion } from "./usePageMotion.js";

const quickstarts = [
  ["Register a tool", "Create an owned profile with capabilities and schemas.", FileCode2],
  ["Evaluate a call", "Send identity and intent through a policy decision.", TerminalSquare],
  ["Read a trace", "Follow a request from agent intent to returned outcome.", BookOpen],
];

const codeSample = `import { Toolclave } from "@toolclave/sdk";

const toolclave = new Toolclave({
  environment: "production"
});

const result = await toolclave.invoke({
  tool: "payments.refund",
  actor: { agent: "support-prod", tenant: "tenant_42" },
  input: { paymentId: "pay_8421", amount: 149 }
});`;

export function DocsPage() {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);
  usePageMotion(rootRef);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyCode = async () => {
    try {
      await navigator.clipboard?.writeText(codeSample);
    } catch {
      // The visual demo state remains useful when browser clipboard access is unavailable.
    }
    setCopied(true);
  };

  return (
    <main ref={rootRef} className="inner-page docs-route">
      <section className="docs-route-hero">
        <ChapterLabel number="01" label="Docs" />
        <div className="docs-route-copy page-reveal">
          <span className="eyebrow">Developer preview / illustrative API</span>
          <h1>Build the governed<br />tool path.</h1>
          <p>Start with a verified tool profile, evaluate calls through Runtime, and keep the resulting evidence in Observe.</p>
          <div className="docs-search"><span>/</span><input type="search" aria-label="Search documentation" placeholder="Search docs, guides, and concepts" /><kbd>⌘ K</kbd></div>
        </div>
        <div className="code-window page-reveal">
          <div className="code-window-bar"><span>quickstart.ts</span><button type="button" onClick={copyCode}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}</button></div>
          <pre><code>{codeSample}</code></pre>
        </div>
      </section>

      <section className="docs-index-section" id="guides">
        <ChapterLabel number="02" label="Start" tone="blue" />
        <aside className="docs-sidebar page-reveal">
          <strong>Documentation</strong>
          <a href="#guides">Quickstarts</a>
          <a href="#concepts">Core concepts</a>
          <a href="#api-reference">API reference</a>
          <Link to="/security">Security model</Link>
        </aside>
        <div className="quickstart-grid">
          {quickstarts.map(([title, copy, Icon], index) => (
            <article className="quickstart-item page-reveal" key={title}>
              <span>0{index + 1}</span><Icon size={21} /><h2>{title}</h2><p>{copy}</p><ArrowRight size={15} />
            </article>
          ))}
        </div>
      </section>

      <section className="route-section docs-concepts-section tone-blue" id="concepts">
        <ChapterLabel number="03" label="Concepts" tone="blue" />
        <div className="route-section-heading page-reveal"><h2>Three products.<br />One evidence chain.</h2></div>
        <div className="docs-concept-rail page-reveal">
          <div><Braces size={19} /><strong>Registry</strong><p>Identity, ownership, capabilities, schemas, risk, and versions.</p></div>
          <div><Braces size={19} /><strong>Runtime</strong><p>Actor context, policy evaluation, approvals, isolation, and execution.</p></div>
          <div id="api-reference"><Braces size={19} /><strong>Observe</strong><p>Intent, decision, tool execution, outcome, and evidence export.</p></div>
        </div>
      </section>
    </main>
  );
}
