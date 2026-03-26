import { Calendar, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { busCollection } from "./busCollection";

// Global flag to prevent multiple fetches across component remounts
// let globalHasFetched = false;

const Schedule = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [busData, setBusData] = useState<any[]>([]);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const hasFetched = useRef(false);
  const campus = pathname.includes('se') ? 'seoul' : pathname.includes('gw') ? 'gwangneung' : 'global';
  const selectedBus = busCollection[campus];
  
  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  const fetchBus = async (id: number) => {
    if (pathname.includes('se')) {
      const response = await fetch(`http://localhost:3000/seArrival/${id}`);
      const data = await response.json();
      const res = data.response.msgBody.itemList[3];
      return res;
    }
    const response = await fetch(`http://localhost:3000/gyRoute/${id}`);
    const data = await response.json();
    const res = data.response.msgBody.busRouteInfoItem;
    return res;
  }

  useEffect(() => {
    // console.log('Schedule useEffect triggered, globalHasFetched:', globalHasFetched);
    // if (globalHasFetched) return;
    
    const fetchAllBuses = async () => {
      console.log('Starting fetch...');
      if (selectedBus) {
        const busRoutes = Object.values(selectedBus);
        const promises = busRoutes.map((routeId: number) => fetchBus(routeId));
        const results = await Promise.all(promises);
        console.log(results)
        const allBusData = results.flat();
        setBusData(allBusData);
        // globalHasFetched = true;
        console.log('Fetch completed, globalHasFetched set to true');
      }
    };
    
    fetchAllBuses();
  }, []);
  
  console.log('Schedule render, busData length:', busData.length);
  const renderContent = (bus: any, index: number) => {
    const routeName = bus.rtNm;
    const upFirstTime = bus.firstTm.slice(8, 10) + ':' + bus.firstTm.slice(10, 12);
    const upLastTime = bus.lastTm.slice(8, 10) + ':' + bus.lastTm.slice(10, 12);
    const peekAlloc = bus.term;
    
    return (
      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
            </div>
            <span className="font-medium text-left">{routeName}</span>
          </div>
          <span className="text-sm text-gray-500">{upFirstTime}~{upLastTime}</span>
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="font-medium">운행시간</span>
              <span className="text-gray-700">{upFirstTime}~{upLastTime}</span>
            </div>

            <div className="flex items-start space-x-2">
              <Calendar className="w-4 h-4 text-gray-600 mt-1" />
              <div>
                <span className="font-medium">배차간격</span>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">기본:</span>
                    <span className="text-gray-800">{peekAlloc}분</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const renderAccordionContent = (bus: any, index: number) => {
    const routeName = bus.routeName;
    const upFirstTime = bus.upFirstTime;
    const upLastTime = bus.upLastTime;
    const peekAlloc = bus.peekAlloc;
    const nPeekAlloc = bus.nPeekAlloc;
    const satPeekAlloc = bus.satPeekAlloc;
    const satNPeekAlloc = bus.satNPeekAlloc;
    const sunPeekAlloc = bus.sunPeekAlloc;
    const sunNPeekAlloc = bus.sunNPeekAlloc;
    const wePeekAlloc = bus.wePeekAlloc;
    const weNPeekAlloc = bus.weNPeekAlloc;
    const isOpen = openAccordions.has(index);
    
    return (
      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleAccordion(index)}
          className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
            </div>
            <span className="font-medium text-left">{routeName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{upFirstTime}~{upLastTime}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        
        {isOpen && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">운행시간</span>
                <span className="text-gray-700">{upFirstTime}~{upLastTime}</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-600 mt-1" />
                <div>
                  <span className="font-medium">배차간격</span>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">평일:</span>
                      <span className="text-gray-800">{peekAlloc}~{nPeekAlloc}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">토요일:</span>
                      <span className="text-gray-800">{satPeekAlloc}~{satNPeekAlloc}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">일요일:</span>
                      <span className="text-gray-800">{sunPeekAlloc}~{sunNPeekAlloc}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">공휴일:</span>
                      <span className="text-gray-800">{wePeekAlloc}~{weNPeekAlloc}분</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col space-y-2'>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="text-left w-full hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">버스 시간표</h2>
          <p className="text-sm text-gray-600">클릭하여 전체 버스 시간표 보기</p>
        </button>
      </div>

      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">버스 시간표</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
              {busData.map((bus: any, index: number) =>
                pathname.includes('se') ? renderContent(bus, index) : renderAccordionContent(bus, index)
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default memo(Schedule);