import { useRef, useState } from "react";
import { ArrowRight, Check, CircleCheck, Clock3, MessagesSquare, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ChapterLabel } from "./components.jsx";
import { usePageMotion } from "./usePageMotion.js";

const expectations = [
  ["A focused architecture review", "Map one real agent, its external tools, policy boundaries, and evidence needs.", MessagesSquare],
  ["A product walkthrough", "See Registry, Runtime, and Observe using realistic synthetic data.", CircleCheck],
  ["A practical next step", "Leave with an evaluation path, open questions, and the right product starting point.", Clock3],
];

export function DemoPage() {
  const rootRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page demo-route">
      <section className="demo-route-hero">
        <ChapterLabel number="01" label="Request demo" tone="oxblood" />
        <div className="demo-route-copy page-reveal">
          <span className="eyebrow">Focused evaluation / no generic sales tour</span>
          <h1>Bring one agent.<br />Govern the tools<br /><em>it can call.</em></h1>
          <p>Tell us where the workflow is today. We will shape the session around tool identity, runtime policy, observability, or the complete control plane.</p>
          <div className="demo-proof-rail">
            <div><ShieldCheck size={17} /><span>Architecture-led</span></div>
            <div><Check size={17} /><span>Evidence-aware</span></div>
            <div><Clock3 size={17} /><span>45-minute working session</span></div>
          </div>
        </div>

        <div className="demo-form-stage page-reveal">
          {submitted ? (
            <div className="access-success">
              <CircleCheck size={38} />
              <span className="eyebrow">Request received</span>
              <h2>Your evaluation brief is ready.</h2>
              <p>This is a synthetic demo flow, so no information was transmitted. A production submission would route the brief to the Toolclave team.</p>
              <button className="button button-oxblood" type="button" onClick={() => setSubmitted(false)}>Submit another brief <ArrowRight size={15} /></button>
            </div>
          ) : (
            <form className="access-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <div className="access-form-row">
                <label>Work email<input name="email" type="email" placeholder="you@company.com" required /></label>
                <label>Company<input name="company" type="text" placeholder="Company name" required /></label>
              </div>
              <div className="access-form-row">
                <label>Team<select name="team" defaultValue="" required><option value="" disabled>Choose your team</option><option>AI-agent development</option><option>Enterprise platform</option><option>Security</option><option>SaaS product</option></select></label>
                <label>Agent stage<select name="stage" defaultValue="" required><option value="" disabled>Choose current stage</option><option>Exploring</option><option>Prototype</option><option>Production-bound</option><option>Production</option></select></label>
              </div>
              <fieldset>
                <legend>Primary focus</legend>
                <label><input type="radio" name="focus" value="registry" required /> Registry</label>
                <label><input type="radio" name="focus" value="runtime" /> Runtime</label>
                <label><input type="radio" name="focus" value="observe" /> Observe</label>
                <label><input type="radio" name="focus" value="platform" /> Full platform</label>
              </fieldset>
              <label>What can the agent call today?<textarea name="workflow" rows="4" placeholder="Describe the workflow, external tools, policy constraints, and evidence requirements." required /></label>
              <button className="button button-oxblood" type="submit">Request focused demo <ArrowRight size={15} /></button>
              <small>Synthetic demo form. No customer data is transmitted or stored.</small>
            </form>
          )}
        </div>
      </section>

      <section className="demo-expectation-section">
        <ChapterLabel number="02" label="Session" tone="blue" />
        <div className="demo-expectation-heading page-reveal"><span className="eyebrow">What to expect</span><h2>A working session,<br />not a slide deck.</h2></div>
        <div className="demo-expectation-grid">
          {expectations.map(([title, copy, Icon], index) => (
            <article className="demo-expectation-item page-reveal" key={title}><span>0{index + 1}</span><Icon size={21} /><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="access-note-band">
        <span>Prefer to explore first?</span>
        <Link className="text-link" to="/docs">Read developer documentation <ArrowRight size={14} /></Link>
        <Link className="text-link" to="/security">Review the security model <ArrowRight size={14} /></Link>
      </section>
    </main>
  );
}
