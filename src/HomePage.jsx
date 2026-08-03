import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowRight,
  Braces,
  Boxes,
  CircleHelp,
  CircleCheck,
  Eye,
  FileWarning,
  ExternalLink,
  LockKeyhole,
  Network,
  Quote,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Unplug,
} from "lucide-react";
import {
  ActionButton,
  ChapterLabel,
  DemoBadge,
  SectionIntro,
  VerificationList,
} from "./components.jsx";
import { CinematicEntry } from "./CinematicEntry.jsx";
import { PolicyPath, RegistryTable, SecurityLayerGrid, TracePanel } from "./product-ui.jsx";
import { plans, problemSignals, solutionColumns, testimonials } from "./data.js";

gsap.registerPlugin(ScrollTrigger);

export function HomePage({ onDemo }) {
  const rootRef = useRef(null);
  const [policyStep, setPolicyStep] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const context = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".home-hero",
          start: "top 78%",
          once: true,
        },
      });
      gsap.from(".hero-botanical img", {
        scale: 1.06,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".home-hero",
          start: "top 78%",
          once: true,
        },
      });
      gsap.utils.toArray(".scroll-reveal").forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 980px)", () => {
        gsap.to(".hero-botanical img", {
          yPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
        gsap.from(".registry-table-wrap", {
          clipPath: "inset(100% 0 0 0)",
          scrollTrigger: {
            trigger: ".registry-scene",
            start: "top 75%",
            end: "top 28%",
            scrub: 0.7,
          },
        });
        const policyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".runtime-scene",
            start: "top 45%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
        policyTimeline.to(".policy-track-line", { scaleX: 1, transformOrigin: "left center" });
        gsap.from(".trace-row", {
          opacity: 0,
          x: 20,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".observe-scene",
            start: "top 58%",
            once: true,
          },
        });
        gsap.from(".security-layer-row", {
          x: (index) => (index % 2 ? 28 : -28),
          opacity: 0,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".security-scene",
            start: "top 68%",
            once: true,
          },
        });
        gsap.utils.toArray(".problem-row").forEach((element, index) => {
          gsap.from(element, {
            x: index % 2 ? 54 : -54,
            opacity: 0,
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              end: "top 58%",
              scrub: 0.45,
            },
          });
        });
        gsap.from(".proof-persona", {
          x: -36,
          opacity: 0,
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".proof-scene",
            start: "top 68%",
            once: true,
          },
        });
        gsap.from(".pricing-preview-column", {
          y: 58,
          opacity: 0,
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".home-pricing-scene",
            start: "top 72%",
            once: true,
          },
        });
        gsap.utils.toArray(".story-section > .chapter-label").forEach((label) => {
          gsap.from(label, {
            x: -24,
            opacity: 0,
            duration: 0.55,
            immediateRender: false,
            scrollTrigger: {
              trigger: label.parentElement,
              start: "top 84%",
              once: true,
            },
          });
        });
        gsap.utils.toArray(".problem-copy, .section-intro, .home-pricing-heading").forEach((element, index) => {
          gsap.from(element, {
            x: index % 2 ? 42 : -42,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          });
        });
        gsap.from(".security-principles > div", {
          y: 24,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".security-principles",
            start: "top 82%",
            once: true,
          },
        });
        gsap.from(".conversion-band > *:not(.chapter-label)", {
          y: 22,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".conversion-band",
            start: "top 84%",
            once: true,
          },
        });
        gsap.to(".proof-quote", {
          y: -34,
          ease: "none",
          scrollTrigger: {
            trigger: ".proof-scene",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(".botanical-rail img", {
          y: -130,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
      });
      return () => mm.revert();
    }, rootRef);
    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className="home-page">
      <CinematicEntry />

      <aside className="botanical-rail" aria-hidden="true">
        <img src="/illustrations/botanical-chapter-rail.png" alt="" />
      </aside>

      <section className="home-hero" id="platform">
        <ChapterLabel number="01" label="Welcome" />
        <div className="hero-meta">
          <span>Matcha relay</span>
          <span>23 July 2026</span>
          <p>Verified tools.<br />Governed calls.<br />Observable by design.</p>
        </div>
        <div className="hero-copy">
          <h1>
            Govern every
            <br />
            tool your
            <br />
            AI agents can <em>call.</em>
          </h1>
          <p>
            Toolclave is the control plane for external tools. Register and verify every tool,
            govern every call at runtime, and observe every invocation across your systems.
          </p>
          <div className="hero-actions">
            <ActionButton onClick={onDemo}>Request demo</ActionButton>
            <a className="text-link" href="#registry">
              Explore the platform <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="hero-botanical" aria-label="Registry, Runtime, and Observe connected workflow">
          <img src="/illustrations/botanical-tool-network.png" alt="" />
          <div className="botanical-callout callout-registry">
            <span>Registry</span>
            <strong>Verified tool identities</strong>
          </div>
          <div className="botanical-callout callout-runtime">
            <span>Runtime</span>
            <strong>Policy-aware execution</strong>
          </div>
          <div className="botanical-callout callout-observe">
            <span>Observe</span>
            <strong>Complete call visibility</strong>
          </div>
        </div>
        <div className="product-strip scroll-reveal">
          <ProductStripItem icon={<ScanSearch size={18} />} number="01" title="Toolclave Registry" text="Verified tool catalog and risk intelligence" href="/registry" />
          <ProductStripItem icon={<Network size={18} />} number="02" title="Toolclave Runtime" text="Policy enforcement for every call" href="/runtime" />
          <ProductStripItem icon={<Eye size={18} />} number="03" title="Toolclave Observe" text="End-to-end traces and audit logs" href="/observe" />
        </div>
      </section>

      <section id="tiphub-announcement" className="home-announcement-section" aria-labelledby="tiphub-announcement-title">
        <div className="home-announcement-copy scroll-reveal">
          <span className="eyebrow">Portfolio announcement</span>
          <h2 id="tiphub-announcement-title">TipHub announces a <em>$500K allocation</em> to Toolclave.</h2>
          <p>Toolclave is joining the TipHub portfolio as it builds AI agent infrastructure.</p>
          <div className="home-announcement-actions">
            <Link className="button button-oxblood" to="/news/tiphub-allocation">Read the announcement <ArrowRight size={14} /></Link>
            <a className="text-link" href="https://tiphub-prototype-review.vercel.app/companies/toolclave" target="_blank" rel="noreferrer">Visit TipHub <ExternalLink size={13} /></a>
          </div>
        </div>
        <aside className="home-announcement-allocation scroll-reveal" aria-label="$500K TipHub-announced portfolio allocation">
          <span>TipHub-announced<br />portfolio allocation</span>
          <strong>$500K</strong>
          <small>AI agent infrastructure / Global</small>
        </aside>
      </section>

      <section id="problem" className="story-section problem-scene">
        <ChapterLabel number="02" label="Problem" tone="oxblood" />
        <div className="problem-layout">
          <div className="problem-copy">
            <span className="eyebrow">The unmanaged tool layer</span>
            <h2>Agents can act.<br />Infrastructure still<br /><em>cannot explain why.</em></h2>
            <p>As external tools multiply, teams lose a shared answer to four basic questions: what is trusted, what is allowed, what happened, and who can prove it.</p>
          </div>
          <div className="problem-ledger">
            {problemSignals.map((signal, index) => {
              const Icon = [Unplug, CircleHelp, ShieldAlert, FileWarning][index];
              return (
                <article className="problem-row" key={signal.title}>
                  <span className="problem-number">0{index + 1}</span>
                  <Icon size={20} />
                  <div>
                    <h3>{signal.title}</h3>
                    <p>{signal.description}</p>
                  </div>
                  <strong>{signal.consequence}</strong>
                </article>
              );
            })}
          </div>
        </div>
        <div className="problem-transition" aria-hidden="true">
          <span>Unknown</span><i /><span>Registered</span><i /><span>Governed</span><i /><span>Observable</span>
        </div>
      </section>

      <section id="registry" className="story-section registry-scene tone-pistachio">
        <ChapterLabel number="03" label="Registry" />
        <SectionIntro
          title={<>A verified registry<br />you can trust.</>}
          copy="Every tool has a clear owner, declared capabilities, risk profile, and verification status."
        />
        <div className="registry-layout scroll-reveal">
          <div className="registry-table-wrap">
            <RegistryTable compact />
          </div>
          <aside className="verification-aside">
            <div className="verification-seal">
              <CircleCheck size={30} />
              <span>Verified by</span>
              <strong>Toolclave</strong>
            </div>
            <span className="eyebrow">Verification checks</span>
            <VerificationList compact />
          </aside>
        </div>
      </section>

      <section id="runtime" className="story-section runtime-scene tone-paper">
        <ChapterLabel number="04" label="Runtime" />
        <div className="side-by-side">
          <div className="scene-copy scroll-reveal">
            <h2>Policy-aware<br />runtime that<br /><em>enforces intent.</em></h2>
            <p>Every tool call follows a policy path. Decisions are consistent, explainable, and auditable.</p>
            <span className="scene-note">Scroll scene / four decisions resolve in sequence</span>
          </div>
          <div className="runtime-panel-wrap scroll-reveal">
            <PolicyPath activeStep={policyStep} onStepChange={setPolicyStep} />
          </div>
        </div>
      </section>

      <section id="observe" className="story-section observe-scene tone-coral">
        <ChapterLabel number="05" label="Observe" tone="oxblood" />
        <div className="observe-grid">
          <div className="scene-copy scroll-reveal">
            <h2>Observe every call.<br />From request to<br />response.</h2>
            <p>Trace lines show what happened, why, and how long it took across every hop.</p>
            <Link className="button button-outline" to="/security">
              Explore Observe <ArrowRight size={15} />
            </Link>
          </div>
          <div className="scroll-reveal">
            <TracePanel />
          </div>
          <aside className="trace-annotations scroll-reveal">
            <div><span>Agent intent</span><p>What the agent tried to do</p></div>
            <div><span>Policy decision</span><p>Why the call was allowed</p></div>
            <div><span>Tool execution</span><p>What the tool returned</p></div>
            <div><span>Outcome</span><p>What the agent received</p></div>
          </aside>
        </div>
      </section>

      <section id="solutions" className="story-section solutions-scene tone-blue">
        <ChapterLabel number="06" label="Solutions" tone="blue" />
        <div className="solutions-layout">
          <div className="scene-copy scroll-reveal">
            <h2>Built for the<br />teams behind<br /><em>every agent.</em></h2>
          </div>
          <div className="solution-columns">
            {solutionColumns.map((solution) => (
              <article className="solution-column scroll-reveal" key={solution.title}>
                <span>{solution.number}</span>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <ul>
                  {solution.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section proof-scene">
        <ChapterLabel number="07" label="Proof" tone="blue" />
        <div className="proof-layout">
          <div className="proof-personas" role="tablist" aria-label="Platform team perspectives">
            <span className="eyebrow">Composite product-research perspectives</span>
            {testimonials.map((testimonial, index) => (
              <button
                className={activeTestimonial === index ? "proof-persona is-active" : "proof-persona"}
                type="button"
                role="tab"
                aria-selected={activeTestimonial === index}
                aria-controls="proof-quote"
                key={testimonial.role}
                onClick={() => setActiveTestimonial(index)}
              >
                <span>0{index + 1}</span>
                <strong>{testimonial.role}</strong>
                <small>{testimonial.team}</small>
              </button>
            ))}
          </div>
          <blockquote className="proof-quote" id="proof-quote" role="tabpanel">
            <Quote size={26} />
            <p>{testimonials[activeTestimonial].quote}</p>
            <footer>
              <strong>{testimonials[activeTestimonial].role}</strong>
              <span>{testimonials[activeTestimonial].team}</span>
            </footer>
          </blockquote>
        </div>
        <p className="proof-disclaimer">Composite perspectives based on the target buyer problem space. Shown for product demonstration, not as customer endorsements.</p>
      </section>

      <section className="story-section security-scene tone-paper">
        <ChapterLabel number="08" label="Security" tone="oxblood" />
        <div className="security-layout">
          <div className="scene-copy scroll-reveal">
            <h2>Security and trust<br />by <em>architecture.</em></h2>
            <p>Deliberate in depth across identity, policy, runtime, and observability.</p>
            <Link className="text-link" to="/security">
              See security overview <ArrowRight size={14} />
            </Link>
          </div>
          <SecurityLayerGrid />
          <div className="security-principles scroll-reveal">
            <SecurityPrinciple icon={<ShieldCheck size={17} />} title="Least privilege by default" text="Only what is needed, always." />
            <SecurityPrinciple icon={<LockKeyhole size={17} />} title="Continuous verification" text="State stays visible over time." />
            <SecurityPrinciple icon={<Boxes size={17} />} title="Tamper-evident logs" text="Evidence records every call." />
          </div>
        </div>
      </section>

      <section className="story-section home-pricing-scene">
        <ChapterLabel number="09" label="Pricing" />
        <div className="home-pricing-heading">
          <div>
            <span className="eyebrow">Start small / govern seriously</span>
            <h2>Simple pricing.<br />Serious control.</h2>
          </div>
          <div>
            <p>Begin with a verified catalog, then add governed calls, evidence retention, and platform support as your agent footprint grows.</p>
            <Link className="text-link" to="/pricing">Compare every plan <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="home-pricing-ledger">
          {plans.slice(0, 3).map((plan, index) => (
            <article className={plan.featured ? "pricing-preview-column is-featured" : "pricing-preview-column"} key={plan.name}>
              <span>0{index + 1}</span>
              <div>
                <h3>{plan.name}</h3>
                <p>{plan.audience}</p>
              </div>
              <strong>{plan.price}</strong>
              <ul>
                {[plan.tools, plan.calls, plan.retention].map((item) => <li key={item}><CircleCheck size={13} /> {item}</li>)}
              </ul>
              <Link className="text-link" to="/pricing">View plan <ArrowRight size={13} /></Link>
            </article>
          ))}
        </div>
        <div className="home-pricing-note">
          <span>Illustrative demo pricing</span>
          <p>Enterprise limits, deployment options, and commercial terms are validated during evaluation.</p>
          <ActionButton onClick={onDemo}>Talk to the team</ActionButton>
        </div>
      </section>

      <section className="conversion-band" id="about">
        <ChapterLabel number="10" label="Get started" tone="oxblood" />
        <h2>Start governing<br />in days, not months.</h2>
        <p>Join design partners shaping the future of verified tool infrastructure.</p>
        <ActionButton onClick={onDemo} tone="outline">Request demo</ActionButton>
        <Link className="text-link" to="/pricing">
          Become a design partner <ArrowDownRight size={15} />
        </Link>
      </section>

      <section id="docs" className="docs-ribbon">
        <div><Braces size={18} /><span>MCP-compatible tool definitions</span></div>
        <div><Network size={18} /><span>OpenTelemetry-friendly traces</span></div>
        <div><ShieldCheck size={18} /><span>Policy evidence exports</span></div>
      </section>
    </main>
  );
}

function ProductStripItem({ icon, number, title, text, href }) {
  return (
    <Link to={href} className="product-strip-item">
      <span className="product-strip-icon">{icon}</span>
      <span className="eyebrow">{title}</span>
      <strong>{text}</strong>
      <small>{number}</small>
    </Link>
  );
}

function SecurityPrinciple({ icon, title, text }) {
  return (
    <div>
      {icon}
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
