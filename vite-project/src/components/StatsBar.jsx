export default function StatsBar({ items }) {
  const total = items.length
  const average = total ? Math.round(items.reduce((sum, i) => sum + i.healthRating, 0) / total) : '—'
  const attention = items.filter((i) => i.healthRating < 40).length

  const stats = [
    { label: 'Registered', value: total },
    { label: 'Average health', value: average },
    { label: 'Needs attention', value: attention },
  ]

  return (
    <dl className="grid grid-cols-3 gap-3 mb-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-border bg-surface-raised px-4 py-3">
          <dt className="text-xs text-text-muted">{stat.label}</dt>
          <dd className="mt-1 text-xl font-semibold font-mono">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
