const s = {
  card: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  title: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: '#1a1a18', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 },
  day: { textAlign: 'center' },
  dayLabel: { fontSize: 10, color: '#9f9f98', marginBottom: 4 },
  barWrap: { height: 70, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
  val: { fontSize: 11, fontWeight: 500, color: '#6b6b65', marginTop: 4 },
}

function barColor(wl) {
  if (wl <= 15) return '#16a34a'
  if (wl <= 30) return '#d97706'
  return '#dc2626'
}

export default function WLTimeline({ history }) {
  const values = history.map(h => h.wl_number)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  return (
    <div style={s.card}>
      <div style={s.title}>Projected WL movement — next 7 days</div>
      <div style={s.grid}>
        {history.map((h, i) => {
          const pct = Math.round(((h.wl_number - min) / range) * 55 + 12)
          return (
            <div key={i} style={s.day}>
              <div style={s.dayLabel}>{h.day}</div>
              <div style={s.barWrap}>
                <div style={{ width: 22, height: pct, borderRadius: '3px 3px 0 0', background: barColor(h.wl_number), transition: 'height 0.5s ease' + i * 0.06 + 's' }} />
              </div>
              <div style={s.val}>{h.wl_number}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}