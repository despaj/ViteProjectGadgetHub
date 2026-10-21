import { useState } from 'react'
import HealthBadge from './HealthBadge'
import { healthStyles } from '../lib/health'

export default function ItemDetailCard({ item, onEdit, onDelete }) {
  const [confirming, setConfirming] = useState(false)

  if (!item) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-text-muted">
        Select a row in the table to view its full profile.
      </div>
    )
  }

  const isEngineer = item.userRole === 'Engineer'

  return (
    <div className="rounded-lg border border-border bg-surface-raised p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">{item.gadgetName}</h3>
          <p className="text-sm text-text-muted">{item.category}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isEngineer ? 'bg-accent/10 text-accent' : 'bg-warn/10 text-warn'
          }`}
        >
          {item.userRole}
        </span>
      </div>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-muted">Manufacturer</dt>
          <dd>{item.manufacturer}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-muted">Tech brand</dt>
          <dd>{item.brandName}</dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="text-text-muted">Health rating</dt>
          <dd className="flex items-center gap-2">
            <HealthBadge rating={item.healthRating} />
            <span className="font-mono">{item.healthRating}/100</span>
          </dd>
        </div>
      </dl>

      <div
        role="progressbar"
        aria-label="Health rating"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={item.healthRating}
        className="mt-4 h-1.5 w-full rounded-full bg-surface overflow-hidden"
      >
        <div
          className={`h-full transition-all ${healthStyles(item.healthRating).bar}`}
          style={{ width: `${item.healthRating}%` }}
        />
      </div>

      <div className="mt-5 flex items-center gap-2">
        {confirming ? (
          <>
            <span className="text-sm text-text-muted">Delete this gadget?</span>
            <button
              onClick={() => onDelete(item)}
              className="rounded-md bg-danger px-3 py-1 text-xs font-semibold text-white hover:opacity-90"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-md border border-border px-3 py-1 text-xs font-medium hover:bg-surface"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEdit(item)}
              className="rounded-md border border-border px-3 py-1 text-xs font-medium hover:bg-surface"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="rounded-md border border-danger px-3 py-1 text-xs font-medium text-danger hover:bg-danger/10"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
