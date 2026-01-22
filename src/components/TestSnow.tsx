'use client';

export default function TestSnow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute top-10 left-10 text-4xl text-white animate-pulse">
        ❄ TEST SNOW ❄
      </div>
      <div className="absolute top-20 left-1/3 text-3xl text-blue-500 animate-bounce">
        ❅ SNOW TEST ❅
      </div>
      <div className="absolute top-32 right-20 text-5xl text-white animate-spin">
        ❆ DEBUG ❆
      </div>
    </div>
  );
}
