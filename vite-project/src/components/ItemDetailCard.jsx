import { useEffect, useState } from 'react'

export default function ItemDetailCard({ selectedItem }) {
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    setActiveItem(selectedItem ?? null)
  }, [selectedItem])

  if (!activeItem) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-text-muted">
        Select a row in the table to view its full profile.
      </div>
    )
  }

  const isEngineer = activeItem.userRole === 'Engineer'

  return (
    <div className="rounded-lg border border-border bg-surface-raised p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">{activeItem.gadgetName}</h3>
          <p className="text-sm text-text-muted">{activeItem.category}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isEngineer ? 'bg-accent-dim/10 text-accent' : 'bg-warn/10 text-warn'
          }`}
        >
          {activeItem.userRole}
        </span>
      </div>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-text-muted">Manufacturer</dt>
          <dd>{activeItem.manufacturer}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-muted">Tech brand</dt>
          <dd>{activeItem.brandName}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-muted">Health rating</dt>
          <dd className="font-mono">{activeItem.healthRating}/100</dd>
        </div>
      </dl>

      <div className="mt-4 h-1.5 w-full rounded-full bg-surface overflow-hidden">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${activeItem.healthRating}%` }}
        />
      </div>
    </div>
  )
}