import type { FlowStep } from "@/lib/work"

const W = 360
const BOX_H = 80
const GAP = 28

const kindLabel = { trigger: "TRIGGER", step: "STEP", approval: "HUMAN APPROVAL", output: "OUTPUT" }

// Vertical flow chart rendered as inline SVG so it scales and needs no image request.
export default function FlowDiagram({ id, title, steps }: { id: string; title: string; steps: FlowStep[] }) {
  const height = steps.length * BOX_H + (steps.length - 1) * GAP
  return (
    <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} className="h-auto w-full max-w-md">
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{steps.map((s) => `${kindLabel[s.kind]}: ${s.label}, ${s.detail}`).join(". ")}</desc>
      {steps.map((s, i) => {
        const y = i * (BOX_H + GAP)
        const approval = s.kind === "approval"
        return (
          <g key={s.label}>
            {i > 0 && <line x1={W / 2} y1={y - GAP} x2={W / 2} y2={y - 4} stroke="#111111" strokeOpacity="0.4" strokeWidth="1.5" />}
            <rect
              x="1"
              y={y + 1}
              width={W - 2}
              height={BOX_H - 2}
              rx="14"
              fill={approval ? "rgba(43,59,255,0.07)" : "#FBFAF7"}
              stroke={approval ? "#2B3BFF" : "#111111"}
              strokeOpacity={approval ? 1 : 0.25}
            />
            <text x="20" y={y + 24} fill={approval ? "#2B3BFF" : "#5E5B55"} fontSize="10" fontFamily="monospace" letterSpacing="1.5">
              {kindLabel[s.kind]}
            </text>
            <text x="20" y={y + 46} fill="#111111" fontSize="15" fontWeight="600">
              {s.label}
            </text>
            <text x="20" y={y + 66} fill="#5E5B55" fontSize="12">
              {s.detail}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
