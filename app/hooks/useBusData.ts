import { useState, useCallback, useEffect } from 'react';
import { busCollection } from '~/components/busCollection';
import { seoulBus } from '~/components/BusTimeline';

const buildSeoulBusQuery = (id: number) => `
  query {
    seoulBusArrival(routeId: ${id}) {
      response {
        msgBody {
          itemList {
            arrmsg1
            rtNm
            vehId1
            firstTm
            lastTm
            term
            stId
          }
        }
      }
    }
  }
`;
const buildGyeonggiBusQuery = (id: number) => `
  query {
    gyeonggiBusArrival(stationId: ${id}) {
      response {
        msgBody {
          busArrivalList {
            routeName
            predictTime1
            locationNo1
            stationNm1
          }
        }
      }
    }
  }
`;

export const useBusData = (pathname: string, getProcessSteps: (vehicleType: string) => any[]) => {
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);
  const vehicle = pathname.slice(4, pathname.length);
  const isSeoulBus = seoulBus()
  console.log(vehicle)
  const fetchStep = async (id: number) => {
    let response;
    if (pathname.includes('se')) {
      response = await fetch(`http://localhost:3000/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: buildSeoulBusQuery(id),
        }),
      });
      // response = await fetch(`http://localhost:3000/seArrival/${id}`);

      const responseText = await response.json();
      // const res = responseText.msgBody.busArrivalList;␍
      const res = responseText.data.seoulBusArrival;
      return res;
    }
    response = await fetch(`http://localhost:3000/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: buildGyeonggiBusQuery(id),
      }),
    });
    // response = await fetch(`http://localhost:3000/gyArrival/${id}`);
    const data = await response.json();
    console.log(data)
    const res = data.data.gyeonggiBusArrival.response.msgBody.busArrivalList
    // const res = data.response.msgBody.busArrivalList
    console.log(res)
    
    return res;
  };

  const fetchBusData = useCallback(async () => {
    const steps = getProcessSteps(vehicle);
    if (isSeoulBus) {
      const busNum = pathname.includes('busOne') ? '01' : pathname.includes('busTwo') ? '02' : 'A01';
      const busId = busCollection.seoul[busNum];
      const data = await fetchStep(busId);
      setBusData(data);
    } else {
      steps.forEach(async (step) => {
        if (typeof step !== 'string' && 'id' in step) {
          const data = await fetchStep((step as any).id);
          setBusData(prev => ({ ...prev, [(step as any).id]: data }));
        }
      });
    }
    setTimeUntilNextFetch(60);
  }, [vehicle, getProcessSteps]);

  useEffect(() => {
    if (vehicle?.includes('bus')) {
      fetchBusData();
      const interval = setInterval(fetchBusData, 60000);
      const countdownInterval = setInterval(() => {
        setTimeUntilNextFetch(prev => {
          if (prev <= 1) return 60;
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [vehicle, fetchBusData]);

  return { busData, timeUntilNextFetch, fetchBusData };
};
