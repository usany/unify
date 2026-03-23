interface RefreshCounterProps {
  timeUntilNextFetch: number;
  onRefresh: () => void;
}

export default function RefreshCounter({ timeUntilNextFetch, onRefresh }: RefreshCounterProps) {
  return (
    <div style={styles.refreshContainer as React.CSSProperties}>
      <p style={styles.refreshText as React.CSSProperties}>
        Next data update in: <span style={styles.refreshCounter as React.CSSProperties}>{timeUntilNextFetch}s</span>
      </p>
      <button
        onClick={onRefresh}
        style={styles.refreshButton as React.CSSProperties}
      >
        Refresh Now
      </button>
    </div>
  );
}

const styles = {
  refreshContainer: { textAlign: 'center', marginBottom: 16 },
  refreshText: { fontSize: 14, color: '#4b5563', marginBottom: 8, margin: 0 },
  refreshCounter: { fontWeight: 600, color: '#2563eb' },
  refreshButton: { padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, transition: 'background-color 0.2s', cursor: 'pointer' }
};
