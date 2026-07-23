export const tools = [
  {
    name: "Payments API",
    id: "com.payments.charge",
    owner: "Platform Fintech",
    capability: "payments, customers",
    risk: "High",
    evidence: "Verified",
    status: "Approved",
    updated: "23 Jul 2026",
  },
  {
    name: "CRM Lookup",
    id: "com.crm.lookup",
    owner: "Customer Ops",
    capability: "read customers",
    risk: "Low",
    evidence: "Verified",
    status: "Approved",
    updated: "23 Jul 2026",
  },
  {
    name: "Inventory Check",
    id: "com.inventory.check",
    owner: "Supply Chain",
    capability: "read inventory",
    risk: "Medium",
    evidence: "Verified",
    status: "Approved",
    updated: "22 Jul 2026",
  },
  {
    name: "Email Send",
    id: "com.email.send",
    owner: "Growth Team",
    capability: "send email",
    risk: "Medium",
    evidence: "Pending",
    status: "Review",
    updated: "22 Jul 2026",
  },
  {
    name: "Delete User",
    id: "com.admin.delete",
    owner: "Admin Tools",
    capability: "write users",
    risk: "High",
    evidence: "Not verified",
    status: "Blocked",
    updated: "21 Jul 2026",
  },
];

export const traceSteps = [
  ["Agent", "support-agent.prod", "REQUEST", "54 ms"],
  ["Identity", "tenant_42 / user_17", "RESOLVED", "8 ms"],
  ["Policy", "refund-under-€500", "ALLOWED", "31 ms"],
  ["Runtime", "Payments API 3.2.1", "EXECUTED", "612 ms"],
  ["Outcome", "refund_8421", "RETURNED", "80 ms"],
];

export const problemSignals = [
  {
    title: "Tools appear faster than teams can review them.",
    description: "Every framework, vendor, and internal team introduces another action surface with a different contract and owner.",
    consequence: "Catalog drift",
  },
  {
    title: "Agent intent disappears at the execution boundary.",
    description: "A model requests an action, but the downstream API only sees credentials, parameters, and a call it is expected to trust.",
    consequence: "Context loss",
  },
  {
    title: "Controls fragment across gateways and applications.",
    description: "Permissions, approvals, secrets, and tenant rules are reimplemented wherever a new agent workflow ships.",
    consequence: "Policy gaps",
  },
  {
    title: "Logs show events, not the reason behind them.",
    description: "Traditional telemetry can record latency and errors without explaining who asked, what policy decided, or what outcome returned.",
    consequence: "Evidence gaps",
  },
];

export const testimonials = [
  {
    role: "VP, Enterprise Platform",
    team: "Multi-agent operations",
    quote: "We do not need another agent framework. We need one place to know which tools exist, who owns them, and whether an agent should be allowed to call them.",
  },
  {
    role: "Staff AI Engineer",
    team: "Production agent systems",
    quote: "The hard part begins after the demo works. Tool identity, runtime policy, and a trace we can actually reproduce are what make the workflow operable.",
  },
  {
    role: "Product Security Lead",
    team: "SaaS platform security",
    quote: "A tool call should carry enough evidence to answer who initiated it, what was approved, which version ran, and what came back.",
  },
];

export const plans = [
  {
    name: "Starter",
    audience: "For individual builders",
    price: "Free",
    tools: "10 verified tools",
    calls: "10k calls / month",
    retention: "7-day audit logs",
    support: "Community support",
    cta: "Get started",
  },
  {
    name: "Growth",
    audience: "For growing teams",
    price: "$199 / mo",
    tools: "250 verified tools",
    calls: "250k calls / month",
    retention: "30-day audit logs",
    support: "Email support",
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    audience: "For platform teams",
    price: "Custom",
    tools: "Unlimited tools",
    calls: "Custom call volume",
    retention: "1-year audit logs",
    support: "Priority support",
    cta: "Contact sales",
  },
  {
    name: "Design Partner",
    audience: "Build with us",
    price: "Let’s build",
    tools: "Custom roadmap",
    calls: "Early feature access",
    retention: "Technical enablement",
    support: "Joint go-to-market",
    cta: "Apply now",
    partner: true,
  },
];

export const solutionColumns = [
  {
    number: "01",
    title: "AI-agent developers",
    description: "Ship faster with verified tools and predictable calls.",
    bullets: ["Discover approved tools", "Control policy", "Reproduce failures"],
  },
  {
    number: "02",
    title: "Enterprise platform teams",
    description: "Standardize tool usage across agents and applications.",
    bullets: ["Central catalog", "Consistent controls", "Evidence exports"],
  },
  {
    number: "03",
    title: "Security teams",
    description: "Reduce action risk with visibility and fine-grained controls.",
    bullets: ["Risk scoring", "Human approvals", "Complete audit trails"],
  },
  {
    number: "04",
    title: "SaaS vendors",
    description: "Expose tools safely to customer-facing agents.",
    bullets: ["Publish verified tools", "Rate limits and quotas", "Usage analytics"],
  },
];
