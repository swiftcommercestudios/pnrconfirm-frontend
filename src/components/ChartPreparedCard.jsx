const s = {
  card: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  title: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: '#1a1a18' },
  info: { borderRadius: 8, padding: '14px 16px', marginBottom: '1rem' },
  infoText: { fontSize: 13, lineHeight: 1.6 },
  paxRow: { display: 'flex', flexDirection: 'column', gap: 8 },
  pax: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: '#f8f7f4' },
  paxName: { fontSize: 13, fontWeight: 500, color: '#1a1a18' },
  paxStatus: { fontSize: 13, fontWeight: 600 },
}

function getStatusType(status) {
  const s = status?.toUpperCase() || ''
  if (s.startsWith('CNF') || s.includes('CONFIRM')) return 'confirmed'
  if (s.startsWith('RAC')) return 'rac'
  if (s.startsWith('CAN') || s.includes('CAN/MOD')) return 'cancelled'
  return 'not_confirmed'
}

const statusConfig = {
  confirmed:     { badge: { background: '#dcfce7', color: '#15803d' }, info: { background: '#f0fdf4', border: '0.5px solid #bbf7d0' }, text: { color: '#15803d' }, msg: '✅ Great news! Your ticket is confirmed. Your seat is fully assigned.' },
  rac:           { badge: { background: '#dcfce7', color: '#15803d' }, info: { background: '#f0fdf4', border: '0.5px solid #bbf7d0' }, text: { color: '#15803d' }, msg: '✅ Your ticket is on RAC — a shared berth is guaranteed. You will board the train. Full berth confirmation depends on last-minute cancellations.' },
  cancelled:     { badge: { background: '#fef2f2', color: '#991b1b' }, info: { background: '#fef2f2', border: '0.5px solid #fecaca' }, text: { color: '#991b1b' }, msg: '🚫 This ticket has been cancelled or modified. No boarding is applicable.' },
  not_confirmed: { badge: { background: '#fef2f2', color: '#991b1b' }, info: { background: '#fef2f2', border: '0.5px solid #fecaca' }, text: { color: '#991b1b' }, msg: '❌ Your ticket could not be confirmed. The chart has been prepared and your current status is final.' },
}

export default function ChartPreparedCard({ passengers, chartPrepared }) {
  const firstStatus = passengers?.[0]?.current_status || ''
  const type = getStatusType(firstStatus)
  const config = statusConfig[type]
  const isRAC = type === 'rac'

  return (
    <div style={s.card}>
      <div style={s.header}>
        <div style={s.title}>
          {isRAC ? 'RAC Status' : chartPrepared ? 'Final Ticket Status' : 'Ticket Status'}
        </div>
        <div style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, ...config.badge }}>
          {isRAC ? 'RAC — Berth Guaranteed' : chartPrepared ? 'Chart Prepared' : firstStatus}
        </div>
      </div>

      <div style={{ ...s.info, ...config.info }}>
        <div style={{ ...s.infoText, ...config.text }}>{config.msg}</div>
      </div>

      <div style={s.paxRow}>
        {passengers?.map((p, i) => {
          const t = getStatusType(p.current_status)
          const c = statusConfig[t]
          return (
            <div key={i} style={s.pax}>
              <span style={s.paxName}>{p.name}</span>
              <span style={{ ...s.paxStatus, ...c.text }}>{p.current_status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}