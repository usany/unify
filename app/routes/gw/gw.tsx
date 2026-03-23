export default function Place() {
  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.contentWrapper as React.CSSProperties}>
        <h1 style={styles.title as React.CSSProperties}>경희대 광릉캠퍼스</h1>
        <p style={styles.subtitle as React.CSSProperties}>
          어디로 떠나볼까요?
        </p>
        <div style={styles.cardsContainer as React.CSSProperties}>
          <div style={styles.grid as React.CSSProperties}>
            <a
              href="/gw/busN"
              style={{...styles.cardBase, ...styles.cardBlue} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconBlue} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>봉선사입구-내산정 방면</span>
            </a>
            <a
              href="/process?vehicle=busGwangneungTwo"
              style={{...styles.cardBase, ...styles.cardGreen} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconGreen} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>봉선사입구-종점 방면</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  contentWrapper: { textAlign: 'center', width: '100%' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 32, margin: 0 },
  subtitle: { fontSize: 18, color: '#4b5563', marginBottom: 32, margin: 0 },
  cardsContainer: { display: 'flex', flexDirection: 'column', gap: 24 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, maxWidth: 672, margin: '0 auto' },
  cardBase: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, borderRadius: 8, transition: 'background-color 0.2s', textDecoration: 'none', color: 'inherit' },
  cardBlue: { backgroundColor: '#dbeafe' },
  cardGreen: { backgroundColor: '#dcfce7' },
  iconBase: { width: 48, height: 48, marginBottom: 8 },
  iconBlue: { color: '#2563eb' },
  iconGreen: { color: '#16a34a' },
  cardText: { fontWeight: 500 },
};
