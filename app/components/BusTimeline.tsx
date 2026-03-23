import { ChevronDown } from "lucide-react";
import BusDataDisplay from "./BusDataDisplay";
import BusIncomingDisplay from "./BusIncomingDisplay";

interface BusTimelineProps {
  steps: any[];
  busData: { [key: string]: any };
  styles: any;
}

export default function BusTimeline({ steps, busData, styles }: BusTimelineProps) {
  return (
    <div style={styles.timelineContainer as React.CSSProperties}>
      <div style={styles.timelineLine as React.CSSProperties}></div>
      <div style={styles.timelineContentBus as React.CSSProperties}>
        {steps.map((step, index) => {
          // For bus steps, we can access the fetched data from state
          const stepId = typeof step !== 'string' && 'id' in step ? (step as any).id : null;
          const fetchedData = stepId ? busData[stepId] : null;
          return (
            <div key={index} style={styles.busStepContainer as React.CSSProperties}>
              <div style={styles.busIconWrapper as React.CSSProperties}>
                <div style={styles.busIconInner as React.CSSProperties}>
                  {fetchedData && (
                    <BusIncomingDisplay fetchedData={fetchedData} styles={styles} />
                  )}
                  <div style={styles.busStopIcon as React.CSSProperties}>
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div style={styles.stepTextContainer as React.CSSProperties}>
                <p style={styles.stepTitle as React.CSSProperties}>
                  {typeof step === 'string' ? step : 'nameKo' in step ? `${step.nameKo} (${step.nameEn})` : JSON.stringify(step)}
                </p>
                {fetchedData && (
                  <BusDataDisplay 
                    fetchedData={fetchedData} 
                    isLastStep={index === steps.length - 1}
                    styles={styles}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
