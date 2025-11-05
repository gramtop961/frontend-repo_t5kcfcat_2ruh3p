import { useEffect, useMemo, useRef, useState } from "react";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
  "#eab308",
  "#f97316",
];

const CLASSES = ["person", "car", "truck", "bicycle", "motorbike", "bus", "dog", "cat"];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function generateDetections({ width, height, threshold, classes }) {
  const count = Math.floor(random(0, 6));
  const dets = Array.from({ length: count }).map((_, i) => {
    const label = classes[Math.floor(random(0, classes.length))];
    const score = Math.max(0.1, Math.min(0.99, random(threshold, 0.99)));
    const w = random(width * 0.1, width * 0.35);
    const h = random(height * 0.1, height * 0.35);
    const x = random(0, width - w);
    const y = random(0, height - h);
    return { id: `${Date.now()}-${i}`, x, y, w, h, label, score };
  });
  return dets;
}

function CameraTile({ id, analyticsEnabled, threshold, selectedClasses, onDetections }) {
  const containerRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [status] = useState(Math.random() > 0.05 ? "online" : "offline");

  useEffect(() => {
    let timer;
    function tick() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (analyticsEnabled) {
        const dets = generateDetections({ width: rect.width, height: rect.height, threshold, classes: CLASSES });
        const filtered = dets.filter((d) => (selectedClasses.length ? selectedClasses.includes(d.label) : true) && d.score >= threshold);
        setDetections(filtered);
        onDetections(filtered.length);
      } else {
        setDetections([]);
        onDetections(0);
      }
    }
    tick();
    timer = setInterval(tick, 1200);
    return () => clearInterval(timer);
  }, [analyticsEnabled, threshold, selectedClasses, onDetections]);

  return (
    <div className="relative overflow-hidden rounded-lg border bg-black/90">
      <div ref={containerRef} className="aspect-video w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <div className="h-full w-full animate-pulse bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-60" />
        </div>
        <div className="absolute left-2 top-2 z-10 flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${status === "online" ? "bg-emerald-500" : "bg-red-500"}`} />
          <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white ring-1 ring-white/10">
            CAM-{String(id + 1).padStart(2, "0")}
          </span>
        </div>
        {detections.map((d, idx) => (
          <div
            key={d.id}
            className="absolute border-2"
            style={{
              left: d.x,
              top: d.y,
              width: d.w,
              height: d.h,
              borderColor: COLORS[idx % COLORS.length],
              boxShadow: `0 0 0 1px ${COLORS[idx % COLORS.length]} inset`,
            }}
          >
            <div
              className="absolute -top-5 left-0 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white"
              style={{ color: "white" }}
            >
              {d.label} • {(d.score * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CameraGrid({ analyticsEnabled, threshold, selectedClasses, onAggregateDetections }) {
  const ids = useMemo(() => Array.from({ length: 16 }).map((_, i) => i), []);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ids.map((id) => (
          <CameraTile
            key={id}
            id={id}
            analyticsEnabled={analyticsEnabled}
            threshold={threshold}
            selectedClasses={selectedClasses}
            onDetections={(n) => onAggregateDetections(id, n)}
          />
        ))}
      </div>
    </section>
  );
}
