import React from 'react';
import { seoulBus } from './BusTimeline';

interface BusData {
  routeName: string;
  predictTime1: number | null;
  locationNo1: number;
  stationNm1: string;
}

interface BusDataDisplayProps {
  fetchedData: BusData[];
  isLastStep: boolean;
  styles: any;
  index: number;
}

export default function BusDataDisplay({ fetchedData, isLastStep, styles, index }: BusDataDisplayProps) {
  const isSeoulBus = seoulBus()
  if (isSeoulBus) {
    if (!fetchedData[index]) {
      return null;
    }
    console.log(fetchedData[index])
    const arrmsg = fetchedData[index].arrmsg1;
    const routeName = fetchedData[index].rtNm;
    const predictTime1 = arrmsg.indexOf('분') < 0 ? arrmsg : arrmsg.slice(0, arrmsg.indexOf('분')+1);
    const locationNo1 = arrmsg.indexOf('분') < 0 ? 1 : parseInt(arrmsg.slice(arrmsg.indexOf('[')+1, arrmsg.indexOf('번')))+1;
    const stationNm1 = fetchedData[index-locationNo1 < 0 ? 0 : index-locationNo1]?.stNm;
    return (
      <p key={index} style={styles.busSubtitle as React.CSSProperties}>
        Bus data: {routeName}
        <br />
        {predictTime1 !== '출발대기' && predictTime1 !== '운행종료' ? `${predictTime1} (${locationNo1} 정거장) ${stationNm1}` : predictTime1}
        {isLastStep && predictTime1 !== '출발대기' && predictTime1 !== '운행종료' ? `(${stationNm1} ${locationNo1})` : ''}
      </p>
    );
  }
  return (
    <>
      {fetchedData.map((data: any, dataIndex: number) => {
        const routeName = data.routeName;
        const predictTime1 = data.predictTime1;
        const locationNo1 = data.locationNo1;
        const stationNm1 = data.stationNm1;
        
        return (
          <p key={dataIndex} style={styles.busSubtitle as React.CSSProperties}>
            Bus data: {routeName}
            <br />
            {predictTime1 ? `${predictTime1}분 (${locationNo1} 정거장) ${stationNm1}` : '대기'}
            {isLastStep && predictTime1 ? `(${stationNm1} ${locationNo1})` : ''}
          </p>
        );
      })}
    </>
  );
}
