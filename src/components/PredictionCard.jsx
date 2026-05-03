import { useEffect, useRef } from 'react'

const s = {
  card: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' },
  title: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: '#1a1a18' },
  subtitle: { fontSize: 12, color: '#9f9f98', marginTop: 3 },
  pct: { fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, lineHeight: 1 },
  label: { fontSize: 11, color: '#9f9f98', marginTop: 4, textAlign: 'right' },
  barWrap: { marginBottom: '1.25rem' },
  barBg: { height: 8, background: '#f8f7f4', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4, transition: 'width 0.9s cubic-bezier(0.34,1.56,0.64,1)' },
  barLabels: { display: 'flex', justifyContent: 'space-between', marginTop: 6 },
  barLabel: { fontSize: 11, color: '#9f9f98' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: '1.25rem' },
  factor: { background: '#f8f7f4', borderRadius: 8, padding: '10px 12px' },
  fLabel: { fontSize: 11, color: '#9f9f98', marginBottom: 4 },
  fVal: { fontSize: 13, fontWeight: 500, color: '#1a1a18' },
  fTrend: { fontSize: 11, marginTop: 3 },
  rec: { background: '#f0fdf4', border: '0.5px solid #bbf7d0', borderRadius: 8, padding: '12px 14px' },
  recText: { fontSize: 13, color: '#15803d', lineHeight: 1.6 },
  recHigh: { background: '#f0fdf4', border: '0.5px solid #bbf7d0' },
  recMed: { background: '#fffbeb', border: '0.5px solid #fde68a' },
  recMedText: { color: '#92400e' },
  recLow: { background: '#fef2f2', border: '0.5px solid #fecaca' },
  recLowText: { color: '#991b1b' },
}

function probColor(p) {
  if (p >= 70) return '#16a34a'
  if (p >= 40) return '#d97706'
  return '#dc2626'
}

function trendStyle(val) {
  if (typeof val === 'string') {
    if (val.startsWith('↑')) return { color: '#16a34a' }
    if (val.startsWith('↓')) return { color: '#dc2626' }
  }
  return { color: '#d97706' }
}

export default function PredictionCard({ prediction, isRAC }) {
  const barRef = useRef(null)
  const prob = prediction.confirmation_probability
  const color = probColor(prob)
  const f = prediction.factors

  useEffect(() => {
    if (barRef.current) {
      setTimeout(() => { barRef.current.style.width = prob + '%' }, 80)
    }
  }, [prob])

  // RAC = boarding guaranteed = always show green recommendation box
  const recStyle = isRAC ? s.recHigh : prob >= 70 ? s.recHigh : prob >= 40 ? s.recMed : s.recLow
  const recTextStyle = isRAC ? { color: '#15803d' } : prob >= 70 ? { color: '#15803d' } : prob >= 40 ? s.recMedText : s.recLowText

  const factors = [
    { label: 'Historical rate', value: f.historical_confirmation_rate + '%', trend: f.historical_confirmation_rate >= 65 ? '↑ Above avg' : '↓ Below avg' },
    { label: 'Days to travel', value: f.days_to_travel + ' days', trend: f.days_to_travel >= 7 ? '↑ Good window' : f.days_to_travel >= 3 ? '→ Moderate' : '↓ Very close' },
    { label: 'WL movement', value: f.wl_movement_7d > 0 ? `-${f.wl_movement_7d} in 7d` : 'No movement', trend: f.wl_movement_7d >= 5 ? '↑ Moving fast' : f.wl_movement_7d >= 2 ? '→ Moving slow' : '↓ Stalled' },
    { label: 'Avg cancellations', value: f.avg_daily_cancellations + '/day', trend: f.avg_daily_cancellations >= 15 ? '↑ High on route' : '→ Normal' },
    { label: isRAC ? 'RAC Position' : 'Current WL', value: '#' + f.current_wl_number, trend: isRAC ? '→ Berth confirmed' : f.current_wl_number <= 10 ? '↑ Very close' : f.current_wl_number <= 25 ? '→ Mid range' : '↓ Deep WL' },
    { label: 'Tatkal boost', value: '+' + f.tatkal_seats_expected + ' seats', trend: f.tatkal_seats_expected >= 5 ? '↑ Good boost' : '→ Small boost' },
  ]

  return (
    <div style={s.card}>
      <div style={s.header}>
        <div>
          <div style={s.title}>{isRAC ? 'Full Berth Probability' : 'Confirmation Probability'}</div>
          <div style={s.subtitle}>{isRAC ? 'RAC berth guaranteed · predicting full berth chances' : `Based on ${prediction.confidence_score * 100 | 0}% model confidence`}</div>
        </div>
        <div>
          <div style={{ ...s.pct, color }}>{prob}%</div>
          <div style={s.label}>{prediction.prediction_label} chance</div>
        </div>
      </div>

      <div style={s.barWrap}>
        <div style={s.barBg}>
          <div ref={barRef} style={{ ...s.barFill, background: color, width: '0%' }} />
        </div>
        <div style={s.barLabels}>
          <span style={s.barLabel}>Unlikely</span>
          <span style={s.barLabel}>Moderate</span>
          <span style={s.barLabel}>Confirmed</span>
        </div>
      </div>

      <div style={s.grid}>
        {factors.map(f => (
          <div key={f.label} style={s.factor}>
            <div style={s.fLabel}>{f.label}</div>
            <div style={s.fVal}>{f.value}</div>
            <div style={{ ...s.fTrend, ...trendStyle(f.trend) }}>{f.trend}</div>
          </div>
        ))}
      </div>

      {prediction.estimated_confirmation_by && (
        <div style={{ fontSize: 12, color: '#6b6b65', marginBottom: 12 }}>
          Estimated confirmation by <strong>{prediction.estimated_confirmation_by}</strong>
        </div>
      )}

      <div style={{ ...s.rec, ...recStyle }}>
        <div style={{ ...s.recText, ...recTextStyle }}>💡 {prediction.recommendation}</div>
      </div>
    </div>
  )
}