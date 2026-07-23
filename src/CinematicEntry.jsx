import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";

const scenes = [
  {
    label: "Registry bloom",
    source:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
  },
  {
    label: "Runtime current",
    source:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
  },
  {
    label: "Evidence forest",
    source:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
  },
  {
    label: "Governed dawn",
    source:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
  },
];

const foregroundAsset =
  "https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png";

export function CinematicEntry() {
  const navigate = useNavigate();
  const cooldownRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const [locked, setLocked] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(
    () => () => {
      window.clearTimeout(cooldownRef.current);
    },
    [],
  );

  const selectScene = (index) => {
    if (index === activeScene || locked) return;
    setLocked(true);
    setActiveScene(index);
    window.clearTimeout(cooldownRef.current);
    cooldownRef.current = window.setTimeout(() => setLocked(false), 1000);
  };

  const requestDemo = (event) => {
    event.preventDefault();
    const query = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    navigate(`/demo${query}`);
  };

  return (
    <section
      className={activeScene === 2 ? "cinematic-entry is-dark-scene" : "cinematic-entry"}
      aria-labelledby="cinematic-entry-title"
    >
      <div className="cinematic-media" aria-hidden="true">
        {scenes.map((scene, index) => (
          <video
            className={activeScene === index ? "cinematic-video is-active" : "cinematic-video"}
            key={scene.label}
            autoPlay
            muted
            loop
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
          >
            <source src={scene.source} type="video/mp4" />
          </video>
        ))}
        <div className="cinematic-shade" />
        <img className="cinematic-foreground" src={foregroundAsset} alt="" />
      </div>

      <div className="cinematic-content">
        <div className="cinematic-main">
          <span className="cinematic-badge">
            <i aria-hidden="true" />
            Verified tools. Governed calls. Observable outcomes.
          </span>

          <h1 id="cinematic-entry-title">
            The control plane
            <br />
            for agents that <em>act.</em>
          </h1>
          <p>
            Register every external tool, govern every invocation at runtime, and preserve
            evidence from intent to outcome.
          </p>

          <form className="cinematic-demo-form" onSubmit={requestDemo}>
            <label className="sr-only" htmlFor="cinematic-work-email">
              Work email
            </label>
            <input
              id="cinematic-work-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Work email"
              aria-label="Work email"
            />
            <button type="submit">
              Request demo <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="cinematic-switcher" aria-label="Choose entry scene">
          {scenes.map((scene, index) => (
            <button
              className={activeScene === index ? "is-active" : ""}
              type="button"
              key={scene.label}
              onClick={() => selectScene(index)}
              aria-pressed={activeScene === index}
              disabled={locked && activeScene !== index}
            >
              <span>0{index + 1}</span>
              <strong>{scene.label}</strong>
            </button>
          ))}
        </div>

        <div className="cinematic-footer">
          <div className="cinematic-metrics" aria-label="Toolclave platform summary">
            <span><strong>01</strong> verified registry</span>
            <span><strong>02</strong> policy runtime</span>
            <span><strong>03</strong> complete evidence</span>
          </div>
          <a className="cinematic-enter" href="#platform">
            Enter the platform <ArrowDown size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
