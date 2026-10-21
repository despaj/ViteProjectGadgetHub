import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import HealthBadge from './HealthBadge'

const columns = [
  { accessorKey: 'gadgetName', header: 'Gadget Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'manufacturer', header: 'Manufacturer' },
  {
    accessorKey: 'healthRating',
    header: 'Health',
    cell: (info) => <HealthBadge rating={info.getValue()} />,
  },
  { accessorKey: 'brandName', header: 'Brand' },
  { accessorKey: 'userRole', header: 'Role' },
]

const SORT_ICON = { asc: '▲', desc: '▼' }
const ARIA_SORT = { asc: 'ascending', desc: 'descending' }

export default function GadgetTable({ items, selectedId, onSelectRow }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data: items,
    columns,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  function handleKeyDown(event, item) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectRow(item)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface-raised overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-border bg-surface">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      aria-sort={ARIA_SORT[sorted] ?? 'none'}
                      className="text-left px-4 py-2 font-medium text-text-muted whitespace-nowrap"
                    >
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1 hover:text-text"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span aria-hidden="true" className="text-[10px]">
                          {SORT_ICON[sorted] ?? ''}
                        </span>
                      </button>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                tabIndex={0}
                onClick={() => onSelectRow(row.original)}
                onKeyDown={(event) => handleKeyDown(event, row.original)}
                className={`cursor-pointer border-b border-border last:border-b-0 transition-colors hover:bg-surface ${
                  selectedId === row.original.id ? 'bg-accent/10' : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <span className="text-xs text-text-muted">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} · {items.length} gadgets
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium disabled:opacity-40 hover:bg-surface"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md border border-border px-3 py-1 text-xs font-medium disabled:opacity-40 hover:bg-surface"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
