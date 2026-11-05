import { X, Terminal, Shield, Wrench, BookOpen, AlertTriangle } from 'lucide-react'

const SEV = {
  critical: 'text-danger',
  high: 'text-warn',
  medium: 'text-accent2',
  low: 'text-ok'
}

export default function VulnDetail({ vuln, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-panel border border-border shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 border-b border-border bg-panel/95 backdrop-blur">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-mono uppercase font-semibold ${SEV[vuln.severity]}`}>
                {vuln.severity}
              </span>
              {vuln.cwe && <span className="text-xs font-mono text-dim">{vuln.cwe}</span>}
              {vuln.owasp && <span className="text-xs font-mono text-accent">{vuln.owasp}</span>}
            </div>
            <h2 className="text-lg font-semibold leading-tight">{vuln.name}</h2>
            <p className="text-xs text-dim mt-1 font-mono">{vuln.category}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/40 text-dim hover:text-text">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <Section icon={AlertTriangle} title="Description">
            <p className="text-sm text-dim leading-relaxed">{vuln.description}</p>
          </Section>

          <Section icon={Terminal} title="Comment ça marche">
            <p className="text-sm text-dim leading-relaxed">{vuln.how}</p>
            {vuln.example && (
              <pre className="mt-3 p-3 rounded-lg bg-black/50 border border-border text-xs font-mono text-accent2 overflow-x-auto whitespace-pre-wrap">
                {vuln.example}
              </pre>
            )}
          </Section>

          <Section icon={Wrench} title="Outils">
            <div className="flex flex-wrap gap-2">
              {(vuln.tools || []).map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/40 border border-border text-text">
                  {t}
                </span>
              ))}
            </div>
          </Section>

          <Section icon={Shield} title="Mitigation">
            <p className="text-sm text-dim leading-relaxed">{vuln.mitigation}</p>
          </Section>

          <Section icon={BookOpen} title="Lab / pratique">
            <p className="text-sm text-dim leading-relaxed">{vuln.lab}</p>
          </Section>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-xs text-muted font-mono self-center">OS :</span>
            {vuln.os.map(o => (
              <span key={o} className="px-2 py-0.5 rounded text-xs font-mono bg-accent/10 text-accent border border-accent/20">
                {o}
              </span>
            ))}
            <span className="text-xs text-muted font-mono self-center ml-2">Cibles :</span>
            {vuln.targets.map(t => (
              <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-accent2/10 text-accent2 border border-accent2/20">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-accent" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}