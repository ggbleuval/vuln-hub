import { ChevronRight } from 'lucide-react'

const SEV = {
  critical: 'bg-danger/15 text-danger border-danger/30',
  high: 'bg-warn/15 text-warn border-warn/30',
  medium: 'bg-accent2/15 text-accent2 border-accent2/30',
  low: 'bg-ok/15 text-ok border-ok/30'
}

const STATUS = {
  'still-works': 'live',
  'version-dependent': 'version',
  'config-dependent': 'config'
}

export default function VulnCard({ vuln, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card-hover text-left w-full p-4 rounded-xl bg-panel border border-border group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className={`badge border ${SEV[vuln.severity]}`}>
              {vuln.severity}
            </span>
            {vuln.owasp && (
              <span className="badge bg-black/30 text-dim border border-border">
                {vuln.owasp}
              </span>
            )}
            <span className="badge bg-black/30 text-dim border border-border">
              {STATUS[vuln.status] || vuln.status}
            </span>
          </div>
          <h3 className="font-medium text-sm leading-snug group-hover:text-accent transition-colors truncate">
            {vuln.name}
          </h3>
          <p className="mt-1 text-xs text-dim line-clamp-2">{vuln.description}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted shrink-0 mt-1 group-hover:text-accent transition" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {vuln.os.map(o => (
          <span key={o} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-muted border border-border">
            {o}
          </span>
        ))}
        {vuln.targets.slice(0, 3).map(t => (
          <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-muted border border-border">
            {t}
          </span>
        ))}
      </div>
    </button>
  )
}