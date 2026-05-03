import { useState } from 'react'
import { checkPNR } from './api'
import SearchBar from './components/SearchBar'
import TrainCard from './components/TrainCard'
import PredictionCard from './components/PredictionCard'
import ChartPreparedCard from './components/ChartPreparedCard'
import WLTimeline from './components/WLTimeline'

const s = {
  page: { maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' },
  hero: { textAlign: 'center', marginBottom: '2rem' },
  logoRow: { display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  logoIcon: { width: 38, height: 38, background: '#1a3a6e', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: '#1a1a18' },
  error: { background: '#fef2f2', border: '0.5px solid #fecaca', borderRadius: 10, padding: '14px 18px', marginBottom: '1rem', fontSize: 14, color: '#991b1b' },
  skeleton: { background: '#fff', border: '0.5px solid #e5e3dc', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' },
  shimmer: { background: 'linear-gradient(90deg,#f0ede8 25%,#e8e5e0 50%,#f0ede8 75%)', backgroundSize: '200% 100%', borderRadius: 6, animation: 'shimmer 1.2s ease-in-out infinite' },
  disclaimer: { fontSize: 11, color: '#9f9f98', textAlign: 'center', marginTop: '1.5rem', lineHeight: 1.7 },
}

function Skeleton() {
  return (
    <>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      {[120, 80, 40, 100, 60].map((w, i) => (
        <div key={i} style={{ ...s.shimmer, height: 16, width: w + 'px', marginBottom: 12 }} />
      ))}
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSearch(pnr) {
    setLoading(true); setError(null); setResult(null)
    try {
      const data = await checkPNR(pnr)
      if (!data.success) throw new Error(data.error || 'Something went wrong')
      setResult(data)
    } catch (e) {
      setError(e.message || 'Could not reach the server. Make sure the backend is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <div style={s.logoRow}>
          <div style={s.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M4 4h16v2H4V4zm0 4h16v8H4V8zm2 2v4h12v-4H6zm-2 8h16v2H4v-2z"/></svg>
          </div>
          <div style={s.logoText}>PNR<span style={{color:'#f97316'}}>Confirm</span></div>
        </div>
        <div style={{fontSize:13,color:'#9f9f98'}}>AI-powered waitlist confirmation prediction for Indian Railways</div>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <div style={s.error}>⚠️ {error}</div>}
      {loading && <div style={s.skeleton}><Skeleton /></div>}

      {result && !loading && (
        <>
          <TrainCard info={result.train_info} />

          {(result.train_info.chart_prepared || result.train_info.passengers?.[0]?.current_status?.toUpperCase().startsWith('CAN')) ? (
            <ChartPreparedCard passengers={result.train_info.passengers} chartPrepared={result.train_info.chart_prepared} />
          ) : (
            <>
              <PredictionCard prediction={result.prediction} />
              <WLTimeline history={result.prediction.wl_movement_history} />
              <div style={s.disclaimer}>
                Predictions based on historical data &amp; ML models. Actual confirmation depends on IRCTC quota policies.<br/>
                Last checked: {new Date().toLocaleTimeString('en-IN')} · Data from public railway APIs.
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}