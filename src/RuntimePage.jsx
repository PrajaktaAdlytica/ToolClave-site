import { useRef, useState } from "react";
import { Check, KeyRound, LockKeyhole, Route, ShieldCheck, TimerReset } from "lucide-react";
import { ActionButton, ChapterLabel } from "./components.jsx";
import { PolicyPath } from "./product-ui.jsx";
import { usePageMotion } from "./usePageMotion.js";

const controls = [
  ["Identity context", "Bind every request to an agent, tenant, user, and environment.", KeyRound],
  ["Capability policy", "Match declared tool actions against the intent of the current call.", ShieldCheck],
  ["Approval paths", "Pause sensitive actions for a human or system decision before execution.", Route],
  ["Secret isolation", "Keep credentials outside the model context and execution payload.", LockKeyhole],
];

export function RuntimePage({ onDemo }) {
  const rootRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page runtime-route">
      <section className="expansion-hero runtime-route-hero">
        <ChapterLabel number="01" label="Runtime" />
        <div className="expansion-hero-copy page-reveal">
          <span className="eyebrow">Policy plane / intent before execution</span>
          <h1>Every call follows<br />a governed path.</h1>
          <p>Toolclave Runtime evaluates identity, capability, approval, and execution rules before an external tool receives the request.</p>
          <ActionButton onClick={onDemo}>Evaluate Runtime</ActionButton>
        </div>
        <div className="runtime-hero-stage page-reveal">
          <div className="stage-heading"><span>Live decision path</span><span>Policy evaluation</span></div>
          <PolicyPath activeStep={activeStep} onStepChange={setActiveStep} />
        </div>
      </section>

      <section className="route-section runtime-contract-section tone-pistachio">
        <ChapterLabel number="02" label="Controls" />
        <div className="route-section-heading page-reveal">
          <span className="eyebrow">Four controls / one decision</span>
          <h2>Policy is useful<br />when it travels<br /><em>with the call.</em></h2>
        </div>
        <div className="control-ledger">
          {controls.map(([title, copy, Icon], index) => (
            <article className="control-ledger-row page-reveal" key={title}>
              <span>0{index + 1}</span>
              <Icon size={19} />
              <div><h3>{title}</h3><p>{copy}</p></div>
              <Check size={15} />
            </article>
          ))}
        </div>
      </section>

      <section className="route-section runtime-sandbox-section">
        <ChapterLabel number="03" label="Isolation" tone="oxblood" />
        <div className="sandbox-copy page-reveal">
          <span className="eyebrow">Execution boundary</span>
          <h2>The model proposes.<br />Runtime decides.</h2>
          <p>Execution happens with scoped credentials, tenant-aware constraints, bounded timeouts, and a complete evidence trail.</p>
        </div>
        <div className="sandbox-console page-reveal">
          <div><span>REQUEST</span><strong>payments.refund</strong><small>agent:support-prod</small></div>
          <div><span>POLICY</span><strong>refund-under-eur-500</strong><small>decision:allow</small></div>
          <div><span>EXECUTION</span><strong>Payments API 3.2.1</strong><small>scope:refund:create</small></div>
          <div><span>OUTCOME</span><strong>refund_8421</strong><small>trace:evidence-ready</small></div>
          <TimerReset size={25} />
        </div>
      </section>

      <section className="conversion-band conversion-band--matcha">
        <ChapterLabel number="04" label="Evaluate" />
        <h2>Bring one policy.<br />Test one real call.</h2>
        <p>Evaluate Toolclave Runtime against a workflow your team already understands.</p>
        <ActionButton onClick={onDemo}>Request evaluation</ActionButton>
      </section>
    </main>
  );
}
