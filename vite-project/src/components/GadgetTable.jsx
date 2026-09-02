import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

const columns = [
  { accessorKey: 'gadgetName', header: 'Gadget Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'manufacturer', header: 'Manufacturer' },
  {
    accessorKey: 'healthRating',
    header: 'Health Rating',
    cell: (info) => <span className="font-mono">{info.getValue()}</span>,
  },
  { accessorKey: 'brandName', header: 'Brand' },
  { accessorKey: 'userRole', header: 'Role' },
]

export default function GadgetTable({ items, selectedId, onSelectRow }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 })

  const table = useReactTable({
    data: items,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (items.length === 0) {
    return (
      <p className="text-sm text-text-muted">
        No gadgets registered yet — add one from the Register tab.
      </p>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-surface-raised overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-border bg-surface">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left px-4 py-2 font-medium text-text-muted">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onSelectRow(row.original)}
              className={`cursor-pointer border-b border-border last:border-b-0 transition-colors hover:bg-surface ${
                selectedId === row.original.id ? 'bg-accent-dim/10' : ''
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <span className="text-xs text-text-muted">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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