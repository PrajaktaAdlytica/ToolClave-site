import { useMemo, useState } from "react";
import { ArrowRight, Check, CircleCheck, Plus } from "lucide-react";
import { tools, traceSteps } from "./data.js";
import { DemoBadge, Status, ToolSearch } from "./components.jsx";

const riskTone = {
  High: "critical",
  Medium: "approval",
  Low: "allowed",
};

const stateTone = {
  Approved: "approved",
  Review: "info",
  Blocked: "critical",
};

export function RegistryTable({ compact = false, onSelect }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return tools;
    return tools.filter((tool) =>
      [tool.name, tool.owner, tool.capability, tool.risk, tool.status]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div className={compact ? "product-panel registry-panel is-compact" : "product-panel registry-panel"}>
      <div className="panel-toolbar">
        <div className="panel-title">
          <strong>Toolclave Registry</strong>
          <DemoBadge />
        </div>
        <div className="panel-actions">
          <ToolSearch value={query} onChange={setQuery} />
          <button className="button button-dark small" type="button">
            <Plus size={14} /> Register tool
          </button>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Owner</th>
              <th>Capabilities</th>
              <th>Risk</th>
              <th>Verification</th>
              <th>Status</th>
              {!compact && <th>Updated</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tool) => (
              <tr
                key={tool.name}
                className={onSelect ? "is-selectable" : undefined}
                role={onSelect ? "button" : undefined}
                tabIndex={onSelect ? 0 : undefined}
                onClick={() => onSelect?.(tool)}
                onKeyDown={(event) => {
                  if (!onSelect || (event.key !== "Enter" && event.key !== " ")) return;
                  event.preventDefault();
                  onSelect(tool);
                }}
              >
                <td>
                  <strong>{tool.name}</strong>
                  {!compact && <small>{tool.id}</small>}
                </td>
                <td>{tool.owner}</td>
                <td>{tool.capability}</td>
                <td>
                  <Status tone={riskTone[tool.risk]}>{tool.risk}</Status>
                </td>
                <td className={tool.evidence === "Verified" ? "positive-cell" : "negative-cell"}>
                  {tool.evidence === "Verified" && <CircleCheck size={13} />} {tool.evidence}
                </td>
                <td>
                  <Status tone={stateTone[tool.status]}>{tool.status}</Status>
                </td>
                {!compact && <td>{tool.updated}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <div className="empty-state">No tools match that search.</div>}
      </div>
      <button className="panel-link" type="button">
        View full registry <ArrowRight size={13} />
      </button>
    </div>
  );
}

export function PolicyPath({ activeStep = 2, onStepChange }) {
  const steps = [
    ["1", "Verify", "Is the tool verified?", "Pass", "allowed"],
    ["2", "Allow", "Does the call match allowed capabilities?", "Pass", "allowed"],
    ["3", "Approval", "Does it require human review?", "Requires approval", "approval"],
    ["4", "Block", "Is the call outside policy?", "Blocked", "critical"],
  ];
  return (
    <div className="product-panel policy-panel">
      <div className="panel-toolbar">
        <strong>Runtime policy path</strong>
        <DemoBadge />
      </div>
      <div className="policy-track">
        <div className="policy-track-line" aria-hidden="true" />
        {steps.map(([number, title, copy, result, tone], index) => (
          <button
            type="button"
            className={index <= activeStep ? `policy-step is-active tone-${tone}` : "policy-step"}
            key={title}
            onMouseEnter={() => onStepChange?.(index)}
            onFocus={() => onStepChange?.(index)}
            onClick={() => onStepChange?.(index)}
          >
            <span className="policy-node">{number}</span>
            <strong>{title}</strong>
            <p>{copy}</p>
            <small>
              <Check size={11} /> {result}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TracePanel({ title = "Invocation trace", compact = false }) {
  return (
    <div className={compact ? "product-panel trace-panel is-compact" : "product-panel trace-panel"}>
      <div className="panel-toolbar">
        <div>
          <strong>{title}</strong>
          <small className="trace-id">Trace ID 9f31a7c2–b14e–4f5c–ae02…</small>
        </div>
        <Status tone="allowed">Completed</Status>
      </div>
      <div className="trace-list">
        {traceSteps.map(([actor, event, kind, duration], index) => (
          <div className="trace-row" key={`${actor}-${event}`}>
            <span className={index === traceSteps.length - 1 ? "trace-dot is-complete" : "trace-dot"} />
            <strong>{actor}</strong>
            <span>{event}</span>
            <small>{kind}</small>
            <em>{duration}</em>
          </div>
        ))}
      </div>
      <button className="panel-link" type="button">
        View full trace <ArrowRight size={13} />
      </button>
    </div>
  );
}

export function SecurityLayerGrid() {
  const layers = [
    ["Identity layer", ["Tool identity", "Ownership", "Verification"], "paper"],
    ["Policy layer", ["Access control", "Guardrails", "Approvals"], "pink"],
    ["Runtime layer", ["Enforcement", "Sandboxing", "Secrets isolation"], "mint"],
    ["Observability layer", ["Traces", "Logs", "Metrics"], "blue"],
  ];
  return (
    <div className="security-layer-grid">
      {layers.map(([title, items, tone]) => (
        <div className="security-layer-row" key={title}>
          <span>{title}</span>
          {items.map((item) => (
            <strong className={`layer-chip layer-chip--${tone}`} key={item}>
              {item}
            </strong>
          ))}
          <ArrowRight size={15} />
        </div>
      ))}
    </div>
  );
}
