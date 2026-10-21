const COLUMNS = [
  ['gadgetName', 'Gadget Name'],
  ['category', 'Category'],
  ['manufacturer', 'Manufacturer'],
  ['healthRating', 'Health Rating'],
  ['brandName', 'Brand'],
  ['userRole', 'Role'],
]

const quote = (value) => `"${String(value).replaceAll('"', '""')}"`

export function exportCsv(items) {
  const lines = [
    COLUMNS.map(([, label]) => quote(label)).join(','),
    ...items.map((item) => COLUMNS.map(([key]) => quote(item[key])).join(',')),
  ]
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'gadget-registry.csv'
  link.click()
  URL.revokeObjectURL(url)
}
