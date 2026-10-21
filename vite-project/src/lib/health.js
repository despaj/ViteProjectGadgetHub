export function healthStyles(rating) {
  if (rating >= 70) return { label: 'Good', badge: 'bg-accent/10 text-accent', bar: 'bg-accent' }
  if (rating >= 40) return { label: 'Fair', badge: 'bg-warn/10 text-warn', bar: 'bg-warn' }
  return { label: 'Poor', badge: 'bg-danger/10 text-danger', bar: 'bg-danger' }
}
