import { useSearchParams, Link } from "react-router";
import { Bus, BusFront, ChevronDown } from "lucide-react";

export default function Process() {
  const [searchParams] = useSearchParams();
  const vehicle = searchParams.get("vehicle") || "busThree";

  const getProcessSteps = (vehicleType: string) => {
    const steps: { [key: string]: { id: number; nameKo: string; nameEn: string }[] } = {
      busThree: [
        {id: 105900050, nameKo: "경희대", nameEn: "Kyunghee University"}
      ],
    };
    return steps[vehicleType] || [];
  };

  const steps = getProcessSteps(vehicle);
  return (
    <div style={styles.mainContainer as React.CSSProperties}>
      <div style={styles.mainContent as React.CSSProperties}>
        <div style={styles.processSection as React.CSSProperties}>
          <h2 style={styles.processTitle as React.CSSProperties}>자율주행 A01번</h2>
          <div style={styles.infoContainer as React.CSSProperties}>
            <div>장한평역-청량리역-경희대</div>
            <div>운행시간: 배차간격: 평일 75분</div>
          </div>
          <div style={styles.timelineContainer as React.CSSProperties}>
            <div style={styles.timelineLine as React.CSSProperties}></div>
            <div style={styles.timelineContentBus as React.CSSProperties}>
              {steps.map((step, index) => {
                return (
                  <div key={index} style={styles.busStepContainer as React.CSSProperties}>
                    <div style={styles.busIconWrapper as React.CSSProperties}>
                      <div style={styles.busIconInner as React.CSSProperties}>
                        <div style={styles.busStopIcon as React.CSSProperties}>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                    <div style={styles.stepTextContainer as React.CSSProperties}>
                      <p style={styles.stepTitle as React.CSSProperties}>
                        {`${step.nameKo} (${step.nameEn})`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div style={styles.navContainer as React.CSSProperties}>
          <div style={styles.navInner as React.CSSProperties}>
            <Link
              to="/se"
              style={styles.navLink as React.CSSProperties}
            >
              ← Back to Seoul Campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  mainContent: { textAlign: 'center', maxWidth: 672, margin: '0 auto', padding: 32 },
  processSection: { display: 'flex', flexDirection: 'column', gap: 24 },
  processTitle: { fontSize: 24, fontWeight: 600, marginBottom: 24, margin: 0 },
  infoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 },
  timelineContainer: { position: 'relative' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32, paddingTop: 20 },
  busStepContainer: { display: 'flex', gap: 24 },
  busIconWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64 },
  busIconInner: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  busStopIcon: { width: 64, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, zIndex: 10 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 500, margin: 0 },
  navContainer: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecoration: 'underline' }
};
