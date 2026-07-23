import { useRef, useState } from "react";
import { ArrowRight, Check, Mail, MapPin, MessagesSquare } from "lucide-react";
import { ChapterLabel } from "./components.jsx";
import { usePageMotion } from "./usePageMotion.js";

export function ContactPage() {
  const rootRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page contact-route">
      <section className="contact-route-hero">
        <ChapterLabel number="01" label="Contact" tone="oxblood" />
        <div className="contact-route-copy page-reveal">
          <span className="eyebrow">Product evaluation / design partnership</span>
          <h1>Bring the workflow<br />you need to<br /><em>govern.</em></h1>
          <p>Tell us what your agent can call today, where policy lives, and what evidence your team needs before production.</p>
          <div className="contact-meta">
            <div><Mail size={17} /><span>hello@toolclave.com</span></div>
            <div><MapPin size={17} /><span>Poland / European Union</span></div>
            <div><MessagesSquare size={17} /><span>Architecture and product evaluations</span></div>
          </div>
        </div>
        <div className="contact-form-wrap page-reveal">
          {submitted ? (
            <div className="contact-success">
              <Check size={34} />
              <h2>Conversation started.</h2>
              <p>This demo does not transmit data. In a production build, the request would enter the Toolclave team workflow.</p>
              <button className="button button-dark" type="button" onClick={() => setSubmitted(false)}>Send another request <ArrowRight size={15} /></button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <div><label>Work email<input type="email" name="email" placeholder="you@company.com" required /></label><label>Company<input type="text" name="company" placeholder="Company name" required /></label></div>
              <label>Team<select name="team" defaultValue="" required><option value="" disabled>Choose your team</option><option>AI-agent development</option><option>Enterprise platform</option><option>Security</option><option>SaaS product</option></select></label>
              <label>What should Toolclave help govern?<textarea name="workflow" rows="5" placeholder="Describe the tools, agent workflow, policy constraints, or evidence requirements." required /></label>
              <button className="button button-dark" type="submit">Start the conversation <ArrowRight size={15} /></button>
              <small>Synthetic demo form. No customer data is transmitted or stored.</small>
            </form>
          )}
        </div>
      </section>

      <section className="contact-routing-section">
        <ChapterLabel number="02" label="Route" tone="blue" />
        <div className="contact-route-item page-reveal"><span>01</span><strong>Product evaluation</strong><p>See Registry, Runtime, and Observe against a workflow your team knows.</p></div>
        <div className="contact-route-item page-reveal"><span>02</span><strong>Design partnership</strong><p>Shape product priorities with direct technical and product collaboration.</p></div>
        <div className="contact-route-item page-reveal"><span>03</span><strong>Security review</strong><p>Discuss architecture, deployment assumptions, and required evidence.</p></div>
      </section>
    </main>
  );
}
