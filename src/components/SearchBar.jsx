import { useState } from 'react'

const SAMPLES = ['4521067832', '2310985641', '6789012345']

const styles = {
  wrap: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'flex-end' },
  label: { fontSize: 11, fontWeight: 500, color: '#9f9f98', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 },
  input: { width: '100%', height: 46, border: '1px solid #e5e3dc', borderRadius: 8, padding: '0 16px', fontSize: 17, fontFamily: "'Syne', sans-serif", fontWeight: 600, letterSpacing: '0.1em', color: '#1a1a18', background: '#f8f7f4', outline: 'none', transition: 'border-color 0.15s' },
  btn: { height: 46, padding: '0 28px', background: '#1a3a6e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.15s' },
  samples: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 },
  sampleLabel: { fontSize: 12, color: '#9f9f98' },
  pill: { fontSize: 12, padding: '4px 12px', border: '0.5px solid #e5e3dc', borderRadius: 20, cursor: 'pointer', color: '#6b6b65', fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em', background: 'transparent', transition: 'border-color 0.15s, color 0.15s' },
}

export default function SearchBar({ onSearch, loading }) {
  const [pnr, setPnr] = useState('')
  const [error, setError] = useState(false)

  function submit(val) {
    const p = val || pnr
    if (p.length !== 10 || !/^\d+$/.test(p)) { setError(true); setTimeout(() => setError(false), 1500); return }
    onSearch(p)
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.row}>
        <div>
          <div style={styles.label}>PNR Number</div>
          <input
            style={{ ...styles.input, borderColor: error ? '#dc2626' : pnr.length === 10 ? '#1a3a6e' : '#e5e3dc' }}
            placeholder="Enter 10-digit PNR"
            value={pnr}
            maxLength={10}
            onChange={e => setPnr(e.target.value.replace(/\D/g, ''))}
            onKeyDown={e => e.key === 'Enter' && submit()}
          />
        </div>
        <button style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }} onClick={() => submit()} disabled={loading}>
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </div>
      <div style={styles.samples}>
        <span style={styles.sampleLabel}>Try sample:</span>
        {SAMPLES.map(s => (
          <button key={s} style={styles.pill} onClick={() => { setPnr(s); submit(s) }}>{s}</button>
        ))}
      </div>
    </div>
  )
}
