import { useMemo, useState } from 'react'
import { Search, Filter, Shield, Terminal, Monitor, Apple, Bug, Server, Layers, X } from 'lucide-react'
import vulns from './data/vulns.json'
import VulnCard from './components/VulnCard'
import VulnDetail from './components/VulnDetail'
import StatsBar from './components/StatsBar'

const OS_OPTIONS = [
  { id: 'any', label: 'Tous OS', icon: Layers },
  { id: 'windows', label: 'Windows', icon: Monitor },
  { id: 'macos', label: 'macOS', icon: Apple },
  { id: 'linux', label: 'Linux', icon: Terminal },
  { id: 'kali', label: 'Kali Linux', icon: Bug }
]

const TARGET_OPTIONS = [
  { id: 'all', label: 'Tout' },
  { id: 'web', label: 'Sites web' },
  { id: 'api', label: 'API' },
  { id: 'app', label: 'Applications' },
  { id: 'os', label: 'OS / PrivEsc' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'ci', label: 'CI / Supply' }
]

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 }

export default function App() {
  const [query, setQuery] = useState('')
  const [os, setOs] = useState('any')
  const [target, setTarget] = useState('all')
  const [severity, setSeverity] = useState('all')
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const categories = useMemo(() => {
    const set = new Set(vulns.map(v => v.category))
    return ['all', ...Array.from(set).sort()]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return vulns
      .filter(v => {
        if (os !== 'any' && !v.os.includes('any') && !v.os.includes(os)) return false
        if (target !== 'all' && !v.targets.includes(target)) return false
        if (severity !== 'all' && v.severity !== severity) return false
        if (category !== 'all' && v.category !== category) return false
        if (!q) return true
        const blob = [
          v.name, v.description, v.category, v.cwe, v.owasp || '',
          v.how, v.example, ...(v.tools || [])
        ].join(' ').toLowerCase()
        return blob.includes(q)
      })
      .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
  }, [query, os, target, severity, category])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center shadow-glow">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">VulnHub</h1>
                <p className="text-xs text-dim font-mono">fail database · os filter · lab ready</p>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(s => !s)}
              className="sm:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-panel border border-border text-sm"
            >
              <Filter className="w-4 h-4" />
              Filtres
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher : SQL, XSS, Potato, SUID, JWT, SSRF..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-panel border border-border focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30 text-sm font-mono placeholder:text-muted"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex gap-6">
        {/* Sidebar filters */}
        <aside className={`
          ${showFilters ? 'fixed inset-0 z-50 bg-void/95 p-6 overflow-y-auto' : 'hidden'}
          sm:block sm:static sm:w-64 sm:shrink-0 sm:p-0 sm:bg-transparent
        `}>
          {showFilters && (
            <div className="flex justify-between items-center mb-4 sm:hidden">
              <span className="font-semibold">Filtres</span>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-panel">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="space-y-6">
            <FilterGroup title="Système">
              <div className="space-y-1">
                {OS_OPTIONS.map(o => {
                  const Icon = o.icon
                  return (
                    <button
                      key={o.id}
                      onClick={() => { setOs(o.id); setShowFilters(false) }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition
                        ${os === o.id ? 'bg-accent/20 text-accent border border-accent/30' : 'hover:bg-panel text-dim border border-transparent'}`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </FilterGroup>

            <FilterGroup title="Cible">
              <div className="flex flex-wrap gap-1.5">
                {TARGET_OPTIONS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTarget(t.id); setShowFilters(false) }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition
                      ${target === t.id ? 'bg-accent2/20 text-accent2 border border-accent2/30' : 'bg-panel text-dim border border-border hover:border-muted'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Sévérité">
              <div className="flex flex-wrap gap-1.5">
                {['all', 'critical', 'high', 'medium', 'low'].map(s => (
                  <button
                    key={s}
                    onClick={() => { setSeverity(s); setShowFilters(false) }}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono uppercase transition
                      ${severity === s
                        ? s === 'critical' ? 'bg-danger/20 text-danger border border-danger/40'
                        : s === 'high' ? 'bg-warn/20 text-warn border border-warn/40'
                        : s === 'medium' ? 'bg-accent2/20 text-accent2 border border-accent2/40'
                        : s === 'low' ? 'bg-ok/20 text-ok border border-ok/40'
                        : 'bg-panel text-text border border-border'
                        : 'bg-panel text-dim border border-border hover:border-muted'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Catégorie">
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setShowFilters(false) }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition truncate
                      ${category === c ? 'bg-panel text-text border border-border' : 'text-dim hover:text-text hover:bg-panel/50'}`}
                  >
                    {c === 'all' ? 'Toutes' : c}
                  </button>
                ))}
              </div>
            </FilterGroup>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <StatsBar total={vulns.length} shown={filtered.length} os={os} />

          {filtered.length === 0 ? (
            <div className="mt-16 text-center text-dim">
              <Server className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-mono text-sm">Aucune fail ne match ces filtres.</p>
              <button
                onClick={() => { setQuery(''); setOs('any'); setTarget('all'); setSeverity('all'); setCategory('all') }}
                className="mt-3 text-accent text-sm hover:underline"
              >
                Reset filtres
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(v => (
                <VulnCard key={v.id} vuln={v} onClick={() => setSelected(v)} />
              ))}
            </div>
          )}
        </main>
      </div>

      {selected && (
        <VulnDetail vuln={selected} onClose={() => setSelected(null)} />
      )}

      <footer className="border-t border-border py-4 text-center text-xs text-muted font-mono">
        VulnHub · données éducatives · lab only · {vulns.length} fails indexées
      </footer>
    </div>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">{title}</h3>
      {children}
    </div>
  )
}