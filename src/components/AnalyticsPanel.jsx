import { BarChart3, Boxes, CircleCheck, Cpu } from "lucide-react";

export default function AnalyticsPanel({ totalCameras = 16, analyticsEnabled, threshold, selectedClasses, estimatedDetections }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Boxes className="h-5 w-5" />}
          title="Cameras"
          value={totalCameras}
          subtitle="Active streams"
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5" />}
          title="Detections"
          value={estimatedDetections}
          subtitle="Across all streams"
        />
        <StatCard
          icon={<CircleCheck className="h-5 w-5" />}
          title="Confidence"
          value={`${Math.round(threshold * 100)}%`}
          subtitle="Min score"
        />
        <StatCard
          icon={<Cpu className="h-5 w-5" />}
          title="Analytics"
          value={analyticsEnabled ? "Enabled" : "Disabled"}
          subtitle={selectedClasses.length ? `${selectedClasses.length} classes` : "All classes"}
          highlight={analyticsEnabled}
        />
      </div>
    </section>
  );
}

function StatCard({ icon, title, value, subtitle, highlight }) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${highlight ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`h-10 w-10 rounded-lg grid place-items-center ${highlight ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
