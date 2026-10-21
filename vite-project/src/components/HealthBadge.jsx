import { healthStyles } from '../lib/health'

export default function HealthBadge({ rating }) {
  const { label, badge } = healthStyles(rating)

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>
      <span className="font-mono">{rating}</span>
      {label}
    </span>
  )
}
