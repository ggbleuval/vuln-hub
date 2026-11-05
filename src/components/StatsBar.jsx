export default function StatsBar({ total, shown, os }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-dim">
      <span className="px-2.5 py-1 rounded-md bg-panel border border-border">
        <span className="text-text font-medium">{shown}</span> / {total} fails
      </span>
      {os !== 'any' && (
        <span className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent">
          filter: {os}
        </span>
      )}
      <span className="text-muted">· cliquer une carte pour le détail</span>
    </div>
  )
}