import { Activity, Camera, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header({ onOpenSettings }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-black text-white grid place-items-center shadow-sm">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">CCTV Command Center</h1>
            <p className="text-xs text-gray-500 -mt-0.5">16 streams • YOLO analytics</p>
          </div>
          <span className="ml-3 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
            <Activity className="h-3.5 w-3.5" /> YOLO Active
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="hidden sm:inline">{time.toLocaleDateString()}</span>
          <span className="font-medium tabular-nums">{time.toLocaleTimeString()}</span>
          <button
            onClick={onOpenSettings}
            className="ml-2 inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}
