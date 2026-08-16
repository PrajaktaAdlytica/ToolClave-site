import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  Boxes,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  Eye,
  ExternalLink,
  Layers3,
  LogIn,
  Mail,
  Menu,
  Network,
  Newspaper,
  PackageCheck,
  Search,
  ScanSearch,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

const menuGroups = {
  Product: {
    icon: Boxes,
    items: [
      ["Registry", "/registry", "Verify every external tool", ScanSearch],
      ["Runtime", "/runtime", "Enforce policy on every call", Network],
      ["Observe", "/observe", "Trace requests to outcomes", Eye],
    ],
  },
  Solutions: {
    icon: Users,
    items: [
      ["Developers", "/solutions#developers", "Build with approved capabilities", Code2],
      ["Platform teams", "/solutions#platform-teams", "Standardize agent operations", Layers3],
      ["SaaS vendors", "/solutions#saas-vendors", "Ship tenant-safe actions", PackageCheck],
    ],
  },
};

const companyItems = [
  ["About", "/company", "Meet the team behind Toolclave", Building2],
  ["Trust center", "/security", "Review architecture and evidence", ShieldCheck],
  ["Careers", "/company#careers", "Help build agent infrastructure", Users],
];

function NavMenu({ label, icon: LabelIcon, items, openMenu, setOpenMenu }) {
  return (
    <div
      className="nav-group"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        className="nav-link nav-menu-trigger"
        type="button"
        aria-expanded={openMenu === label}
        onClick={() => setOpenMenu(openMenu === label ? null : label)}
      >
        <LabelIcon size={13} /> {label} <ChevronDown size={12} />
      </button>
      <div className={openMenu === label ? "nav-popover is-open" : "nav-popover"}>
        {items.map(([name, href, description, ItemIcon]) => (
          <Link key={name} to={href} className="nav-popover-link">
            <span className="nav-popover-icon"><ItemIcon size={16} /></span>
            <span className="nav-popover-copy"><strong>{name}</strong><small>{description}</small></span>
            <ArrowRight size={13} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <Link className="brand-lockup" to="/" aria-label="Toolclave home">
        <img src="/brand/toolclave-mark.svg" alt="" />
        <span>Toolclave</span>
      </Link>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((value) => !value)}
      >
        {mobileOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <nav className={mobileOpen ? "main-nav is-open" : "main-nav"}>
        {Object.entries(menuGroups).map(([label, group]) => (
          <NavMenu
            key={label}
            label={label}
            icon={group.icon}
            items={group.items}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        ))}
        <NavLink className="nav-link" to="/security">
          <ShieldCheck size={13} /> Security
        </NavLink>
        <NavLink className="nav-link" to="/docs">
          <BookOpen size={13} /> Docs
        </NavLink>
        <NavLink className="nav-link" to="/pricing">
          <BadgeDollarSign size={13} /> Pricing
        </NavLink>
        <NavLink className="nav-link" to="/news/tiphub-allocation">
          <Newspaper size={13} /> News
        </NavLink>
        <NavMenu
          label="Company"
          icon={Building2}
          items={companyItems}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
        <NavLink className="nav-link" to="/contact">
          <Mail size={13} /> Contact
        </NavLink>
      </nav>

      <div className="nav-actions">
        <Link className="text-button" to="/signin">
          <LogIn size={14} /> Sign in
        </Link>
        <Link className="button button-outline" to="/demo">
          <CalendarDays size={14} /> Request demo <ArrowRight size={15} />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-brand">
        <img src="/brand/toolclave-mark.svg" alt="" />
        <strong>Toolclave</strong>
        <p>Verified tool infrastructure for production AI agents.</p>
        <address className="footer-address">
          Corso Rose, 34<br />
          Milan, LOM 20152<br />
          Italy<br />
          <a href="tel:+390657754755">+39 065 775 4755</a>
        </address>
        <div className="footer-socials" aria-label="Toolclave social links">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="Toolclave on LinkedIn"><FaLinkedinIn size={15} /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Toolclave on GitHub"><FaGithub size={16} /></a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="Toolclave on YouTube"><FaYoutube size={17} /></a>
        </div>
      </div>
      <FooterColumn
        title="Product"
        links={[
          ["Registry", "/registry"],
          ["Runtime", "/runtime"],
          ["Observe", "/observe"],
        ]}
      />
      <FooterColumn
        title="Solutions"
        links={[
          ["Developers", "/solutions#developers"],
          ["Platform teams", "/solutions#platform-teams"],
          ["Security", "/security"],
        ]}
      />
      <FooterColumn
        title="Resources"
        links={[
          ["Docs", "/docs"],
          ["Guides", "/docs#guides"],
          ["API reference", "/docs#api-reference"],
        ]}
      />
      <FooterColumn
        title="Company"
        links={[
          ["About", "/company"],
          ["News", "/news/tiphub-allocation"],
          ["Pricing", "/pricing"],
          ["Contact", "/contact"],
        ]}
      />
      <div className="footer-newsletter">
        <span>Stay informed</span>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.currentTarget.reset();
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input id="newsletter-email" type="email" placeholder="Email address" required />
          <button type="submit" className="icon-button" aria-label="Subscribe">
            <ArrowRight size={16} />
          </button>
        </form>
        <Link className="footer-demo-link" to="/demo">
          Request a product walkthrough <ArrowRight size={13} />
        </Link>
      </div>
      <div className="footer-meta">
        <span>© 2026 Toolclave. Demo-stage company concept.</span>
        <span>Trust center &nbsp; Privacy &nbsp; Terms &nbsp; Accessibility</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <span>{title}</span>
      {links.map(([label, href]) => (
        <Link key={label} to={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}

export function ChapterLabel({ number, label, tone = "forest" }) {
  return (
    <div className={`chapter-label chapter-label--${tone}`} aria-hidden="true">
      <span>{number}</span>
      <i />
      <strong>{label}</strong>
    </div>
  );
}

export function SectionIntro({ eyebrow, title, copy, actions, align = "split" }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      <div className="section-intro-copy">
        {copy && <p>{copy}</p>}
        {actions}
      </div>
    </div>
  );
}

export function Status({ children, tone = "approved" }) {
  return <span className={`status status--${tone}`}>{children}</span>;
}

export function DemoBadge() {
  return <Status tone="approved">Demo environment</Status>;
}

export function ActionButton({ children, onClick, tone = "dark", type = "button" }) {
  return (
    <button type={type} className={`button button-${tone}`} onClick={onClick}>
      {children}
      <ArrowRight size={15} />
    </button>
  );
}

export function VerificationList({ compact = false }) {
  const items = [
    "Identity & ownership",
    "Declared capabilities",
    "Security assessment",
    "Policy compatibility",
    "Operational readiness",
  ];
  return (
    <ul className={compact ? "verification-list compact" : "verification-list"}>
      {items.map((item) => (
        <li key={item}>
          <Check size={13} /> {item}
        </li>
      ))}
    </ul>
  );
}

export function ToolSearch({ value, onChange }) {
  return (
    <label className="search-field">
      <Search size={15} />
      <span className="sr-only">Search tools</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tools…"
      />
    </label>
  );
}

export function Modal({ open, title, children, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => dialogRef.current?.focus());
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", close);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">Toolclave</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function DemoForm({ onComplete }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="form-success">
        <ShieldCheck size={34} />
        <h3>Request received.</h3>
        <p>We’ll follow up with a focused walkthrough for your team.</p>
        <ActionButton onClick={onComplete}>Close</ActionButton>
      </div>
    );
  }
  return (
    <form
      className="modal-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label>
        Work email
        <input name="email" type="email" placeholder="you@company.com" required />
      </label>
      <label>
        Team
        <select name="team" defaultValue="" required>
          <option value="" disabled>
            Choose your team
          </option>
          <option>AI-agent development</option>
          <option>Enterprise platform</option>
          <option>Security</option>
          <option>SaaS product</option>
        </select>
      </label>
      <label>
        What should we focus on?
        <textarea name="focus" rows="4" placeholder="Registry, policy runtime, observability…" />
      </label>
      <ActionButton type="submit">Request demo</ActionButton>
      <small>Synthetic demo form. No customer data is stored.</small>
    </form>
  );
}

export function SignInForm({ onComplete }) {
  return (
    <form
      className="modal-form"
      onSubmit={(event) => {
        event.preventDefault();
        onComplete();
      }}
    >
      <label>
        Email
        <input type="email" placeholder="you@company.com" required />
      </label>
      <label>
        Password
        <input type="password" placeholder="••••••••••••" required />
      </label>
      <ActionButton type="submit">Continue</ActionButton>
      <button className="sso-button" type="button">
        Continue with enterprise SSO <ExternalLink size={14} />
      </button>
      <small>Demo access only. Authentication is not connected.</small>
    </form>
  );
}
