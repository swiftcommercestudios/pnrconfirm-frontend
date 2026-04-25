const s = {
  card: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  title: { fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: '#1a1a18' },
  badge: { padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600 },
  confirmed: { background: '#dcfce7', color: '#15803d' },
  notConfirmed: { background: '#fef2f2', color: '#991b1b' },
  rac: { background: '#fef9c3', color: '#854d0e' },
  info: { background: '#f8f7f4', borderRadius: 8, padding: '14px 16px', marginBottom: '1rem' },
  infoText: { fontSize: 13, color: '#6b6b65', lineHeight: 1.6 },
  paxRow: { display: 'flex', flexDirection: 'column', gap: 8 },
  pax: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: '#f8f7f4' },
  paxName: { fontSize: 13, fontWeight: 500, color: '#1a1a18' },
  paxStatus: { fontSize: 13, fontWeight: 600 },
}

function statusColor(status) {
  const s = status?.toUpperCase() || ''
  if (s.startsWith('CNF') || s.includes('CONFIRM')) return { color: '#15803d' }
  if (s.startsWith('RAC')) return { color: '#854d0e' }
  return { color: '#991b1b' }
}

function statusBadge(status) {
  const s = status?.toUpperCase() || ''
  if (s.startsWith('CNF') || s.includes('CONFIRM')) return { ...styles.badge, ...styles.confirmed }
  if (s.startsWith('RAC')) return { ...styles.badge, ...styles.rac }
  return { ...styles.badge, ...styles.notConfirmed }
}

const styles = s

export default function ChartPreparedCard({ passengers }) {
  const firstStatus = passengers?.[0]?.current_status?.toUpperCase() || ''
  const isConfirmed = firstStatus.startsWith('CNF') || firstStatus.includes('CONFIRM')
  const isRAC = firstStatus.startsWith('RAC')

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.title}>Final Ticket Status</div>
        <div style={{
          padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
          background: isConfirmed ? '#dcfce7' : isRAC ? '#fef9c3' : '#fef2f2',
          color: isConfirmed ? '#15803d' : isRAC ? '#854d0e' : '#991b1b'
        }}>
          Chart Prepared
        </div>
      </div>

      <div style={styles.info}>
        <div style={styles.infoText}>
          {isConfirmed
            ? '✅ Great news! Your ticket is confirmed. Chart has been prepared — your seat is assigned.'
            : isRAC
            ? '⚠️ Your ticket is on RAC. You will get a shared berth. Full confirmation depends on last-minute cancellations.'
            : '❌ Your ticket could not be confirmed. The chart has been prepared and your current status is final.'}
        </div>
      </div>

      <div style={styles.paxRow}>
        {passengers?.map((p, i) => (
          <div key={i} style={styles.pax}>
            <span style={styles.paxName}>{p.name}</span>
            <span style={{ ...styles.paxStatus, ...statusColor(p.current_status) }}>
              {p.current_status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
