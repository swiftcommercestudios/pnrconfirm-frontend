const s = {
  card: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
  trainName: { fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: '#1a1a18' },
  trainNum: { fontSize: 12, color: '#9f9f98', marginTop: 3 },
  badge: { padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500 },
  journey: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8, marginBottom: '1rem' },
  station: { textAlign: 'center' },
  code: { fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: '#1a1a18' },
  stName: { fontSize: 11, color: '#9f9f98', marginTop: 2 },
  time: { fontSize: 13, fontWeight: 500, color: '#6b6b65', marginTop: 4 },
  midLine: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  dur: { fontSize: 11, color: '#9f9f98' },
  line: { height: 1, width: 70, background: '#e5e3dc', position: 'relative' },
  date: { fontSize: 12, color: '#6b6b65' },
  meta: { display: 'flex', gap: '1.5rem', paddingTop: '1rem', borderTop: '0.5px solid #e5e3dc', flexWrap: 'wrap' },
  metaItem: {},
  metaLabel: { fontSize: 11, color: '#9f9f98', display: 'block', marginBottom: 2 },
  metaVal: { fontSize: 13, fontWeight: 500, color: '#1a1a18' },
}

function statusStyle(status) {
  if (status?.startsWith('CNF')) return { background: '#dcfce7', color: '#15803d' }
  if (status?.startsWith('RAC')) return { background: '#dcfce7', color: '#15803d' }  // RAC = boarding guaranteed = green
  if (status?.startsWith('CAN')) return { background: '#fef2f2', color: '#991b1b' }
  return { background: '#fef3c7', color: '#92400e' }
}

export default function TrainCard({ info }) {
  const p = info.passengers?.[0]
  return (
    <div style={s.card}>
      <div style={s.header}>
        <div>
          <div style={s.trainName}>{info.train_name}</div>
          <div style={s.trainNum}>{info.train_number} · {info.class_code}</div>
        </div>
        <div style={{ ...s.badge, ...statusStyle(p?.current_status) }}>{p?.current_status || 'WL'}</div>
      </div>

      <div style={s.journey}>
        <div style={s.station}>
          <div style={s.code}>{info.from_station}</div>
          <div style={s.stName}>{info.from_station_name}</div>
          <div style={s.time}>{info.departure_time}</div>
        </div>
        <div style={s.midLine}>
          <div style={s.dur}>{info.duration}</div>
          <div style={s.line} />
          <div style={s.date}>{info.journey_date}</div>
        </div>
        <div style={s.station}>
          <div style={s.code}>{info.to_station}</div>
          <div style={s.stName}>{info.to_station_name}</div>
          <div style={s.time}>{info.arrival_time}</div>
        </div>
      </div>

      <div style={s.meta}>
        <div style={s.metaItem}><span style={s.metaLabel}>Passenger</span><span style={s.metaVal}>{p?.name || '—'}</span></div>
        <div style={s.metaItem}><span style={s.metaLabel}>Age / Gender</span><span style={s.metaVal}>{p?.age} / {p?.gender}</span></div>
        <div style={s.metaItem}><span style={s.metaLabel}>Quota</span><span style={s.metaVal}>{info.quota}</span></div>
        <div style={s.metaItem}><span style={s.metaLabel}>Booked On</span><span style={s.metaVal}>{info.booked_on}</span></div>
        <div style={s.metaItem}><span style={s.metaLabel}>PNR</span><span style={s.metaVal} style={{fontFamily:"'Syne',sans-serif",letterSpacing:'0.06em'}}>{info.pnr}</span></div>
      </div>
    </div>
  )
}