import { BusFront } from "lucide-react";
import { seoulBus } from "./BusTimeline";

interface BusData {
  locationNo1: number;
  routeName: string;
}

interface BusIncomingDisplayProps {
  fetchedData: BusData[];
  styles: Record<string, any>;
  index: number;
}

export default function BusIncomingDisplay({ fetchedData, styles, index }: BusIncomingDisplayProps) {
  const isSeoulBus = seoulBus()
  const targetDataList = !isSeoulBus ? fetchedData.filter((data: any) => data.locationNo1 === 1) : fetchedData.filter((data: any, idx: number) => index === idx && (data.arrmsg1 ==='곧 도착' || data.arrmsg1.includes('[0번째 전]')))
  return targetDataList.length > 0 ? (
    <div style={styles.busIncomingContainer as React.CSSProperties}>
      <div style={styles.busIncomingText as React.CSSProperties}>
        {targetDataList.map((data: any, idx: number) => (
          <div key={idx}>{isSeoulBus ? data.rtNm : data.routeName}</div>
        ))}
      </div>
      <BusFront />
    </div>
  ) : null;
}
