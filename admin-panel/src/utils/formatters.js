export const formatMoney = v =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v)

export const formatDate = d =>
  d ? new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

export const initials = (nombre, apellidos) =>
  `${nombre?.[0] ?? ''}${apellidos?.[0] ?? ''}`.toUpperCase()

export const monthName = m => ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][m - 1] || m
