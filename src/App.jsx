import { useMemo, useState } from "react";
import Header from "./components/Header";
import Controls from "./components/Controls";
import AnalyticsPanel from "./components/AnalyticsPanel";
import CameraGrid from "./components/CameraGrid";

function App() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [threshold, setThreshold] = useState(0.5);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [agg, setAgg] = useState(Array.from({ length: 16 }, () => 0));

  function handleAggregate(id, n) {
    setAgg((prev) => {
      const next = [...prev];
      next[id] = n;
      return next;
    });
  }

  const totalDetections = useMemo(() => agg.reduce((a, b) => a + b, 0), [agg]);

  function toggleClass(c) {
    setSelectedClasses((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenSettings={() => alert("Settings panel can be extended.")} />
      <Controls
        analyticsEnabled={analyticsEnabled}
        onToggleAnalytics={() => setAnalyticsEnabled((v) => !v)}
        threshold={threshold}
        onThresholdChange={setThreshold}
        selectedClasses={selectedClasses}
        onToggleClass={toggleClass}
      />
      <AnalyticsPanel
        totalCameras={16}
        analyticsEnabled={analyticsEnabled}
        threshold={threshold}
        selectedClasses={selectedClasses}
        estimatedDetections={totalDetections}
      />
      <CameraGrid
        analyticsEnabled={analyticsEnabled}
        threshold={threshold}
        selectedClasses={selectedClasses}
        onAggregateDetections={handleAggregate}
      />
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-gray-500">
        Built for real-time CCTV monitoring with simulated YOLO overlays. Integrate live streams and backend analytics when ready.
      </footer>
    </div>
  );
}

export default App;
