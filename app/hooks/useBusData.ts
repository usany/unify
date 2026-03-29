import request from 'graphql-request';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { busCollection } from '~/components/busCollection';
import { seoulBus } from '~/components/BusTimeline';

export const useBusData = (pathname: string, getProcessSteps: (vehicleType: string) => any[]) => {
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);
  const vehicle = pathname.slice(4, pathname.length);
  const isSeoulBus = seoulBus()
  console.log(vehicle)
  const {data} = useQuery({
    queryKey: ['busData'],
    queryFn: async () => request('http://localhost:3000/graphql', `
      query {
        busData {
          id
          name
        }
      }
    `)
  })
  const fetchStep = async (id: number) => {
    let response;
    if (pathname.includes('se')) {
      response = await fetch(`http://localhost:3000/bus/${id}`);
      const res = await response.json();
      return res;
    }
    response = await fetch(`http://localhost:3000/gyArrival/${id}`);
    const data = await response.json();
    const res = data.response.msgBody.busArrivalList;
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
