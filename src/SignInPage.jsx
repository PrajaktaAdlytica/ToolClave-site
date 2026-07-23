import { useRef, useState } from "react";
import { ArrowRight, Check, ExternalLink, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ChapterLabel } from "./components.jsx";
import { usePageMotion } from "./usePageMotion.js";

export function SignInPage() {
  const rootRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  usePageMotion(rootRef);

  return (
    <main ref={rootRef} className="inner-page signin-route">
      <section className="signin-route-hero">
        <ChapterLabel number="01" label="Sign in" tone="blue" />
        <div className="signin-context page-reveal">
          <Link className="signin-brand" to="/"><img src="/brand/toolclave-mark.svg" alt="" /><span>Toolclave</span></Link>
          <span className="eyebrow">Workspace access / demo environment</span>
          <h1>Return to the<br />governed tool plane.</h1>
          <p>Review tool identities, policy decisions, execution evidence, and operational traces in one workspace.</p>
          <div className="signin-context-ledger">
            <div><ShieldCheck size={17} /><span>Verified Registry</span><strong>Identity</strong></div>
            <div><LockKeyhole size={17} /><span>Policy Runtime</span><strong>Control</strong></div>
            <div><KeyRound size={17} /><span>Observe</span><strong>Evidence</strong></div>
          </div>
        </div>

        <div className="signin-form-stage page-reveal">
          {submitted ? (
            <div className="access-success">
              <Check size={38} />
              <span className="eyebrow">Demo access complete</span>
              <h2>Workspace authentication simulated.</h2>
              <p>No account or session was created. Authentication will be connected when the product backend is implemented.</p>
              <Link className="button button-dark" to="/registry">Enter demo Registry <ArrowRight size={15} /></Link>
            </div>
          ) : (
            <>
              <div className="signin-form-heading"><span className="eyebrow">Toolclave workspace</span><h2>Sign in to continue.</h2><p>Use synthetic credentials for this frontend demonstration.</p></div>
              <form className="access-form signin-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                <label>Email<input name="email" type="email" placeholder="you@company.com" required /></label>
                <label>Password<input name="password" type="password" placeholder="Enter your password" required /></label>
                <div className="signin-options"><label><input type="checkbox" name="remember" /> Remember this device</label><button type="button">Forgot password?</button></div>
                <button className="button button-dark" type="submit">Continue <ArrowRight size={15} /></button>
                <div className="signin-divider"><span>or</span></div>
                <button className="sso-button" type="button">Continue with enterprise SSO <ExternalLink size={14} /></button>
                <small>Demo access only. Credentials are not transmitted or stored.</small>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="signin-trust-band">
        <div><ShieldCheck size={18} /><strong>Workspace isolation</strong><span>Separate environments and tenant context.</span></div>
        <div><LockKeyhole size={18} /><strong>Enterprise identity</strong><span>Direction supports SSO and role-based access.</span></div>
        <div><KeyRound size={18} /><strong>Auditable access</strong><span>Authentication events belong in the evidence chain.</span></div>
      </section>
    </main>
  );
}
