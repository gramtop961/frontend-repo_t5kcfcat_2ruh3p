import { Slider } from "@radix-ui/react-slider";
import { Toggle } from "@radix-ui/react-toggle";
import { Eye, EyeOff } from "lucide-react";
import { useMemo } from "react";

export default function Controls({ analyticsEnabled, onToggleAnalytics, threshold, onThresholdChange, selectedClasses, onToggleClass }) {
  const classes = useMemo(
    () => ["person", "car", "truck", "bicycle", "motorbike", "bus", "dog", "cat"],
    []
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleAnalytics}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium shadow-sm border ${analyticsEnabled ? "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              {analyticsEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {analyticsEnabled ? "Analytics On" : "Analytics Off"}
            </button>
            <div className="hidden md:block h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Confidence</span>
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={threshold}
                onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
                className="w-48 accent-emerald-600"
              />
              <span className="tabular-nums text-sm text-gray-600">{Math.round(threshold * 100)}%</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {classes.map((c) => {
              const active = selectedClasses.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => onToggleClass(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${active ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
