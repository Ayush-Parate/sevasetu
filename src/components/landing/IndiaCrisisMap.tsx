import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

const INDIA_CENTER: [number, number] = [22.9, 79.3];

type Hotspot = { name: string; position: [number, number]; severity: string; radius: number };
type Volunteer = [number, number];

const DEFAULT_HOTSPOTS: Hotspot[] = [
  { name: "Mumbai", position: [19.076, 72.8777], severity: "high", radius: 30000 },
  { name: "Pune", position: [18.5204, 73.8567], severity: "medium", radius: 24000 },
  { name: "Nashik", position: [19.9975, 73.7898], severity: "medium", radius: 18000 },
  { name: "Nagpur", position: [21.1458, 79.0882], severity: "high", radius: 22000 },
  { name: "Assam", position: [26.2006, 92.9376], severity: "high", radius: 36000 },
  { name: "Bengaluru", position: [12.9716, 77.5946], severity: "low", radius: 15000 }
];

const DEFAULT_VOLUNTEERS: Volunteer[] = [
  [19.12, 72.88], [18.56, 73.86], [13.02, 77.62],
  [22.59, 88.36], [17.43, 78.38], [28.63, 77.21]
];

class MapErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Map Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[420px] bg-slate-50 flex items-center justify-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">Failed to load the map. Please try refreshing.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function IndiaCrisisMap({ compact = false }: { compact?: boolean }) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API fetch for dynamic data
    const fetchMapData = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call: await fetch('/api/heatmap')
        await new Promise(resolve => setTimeout(resolve, 800));
        setHotspots(DEFAULT_HOTSPOTS);
        setVolunteers(DEFAULT_VOLUNTEERS);
      } catch (error) {
        console.error("Failed to load map data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  if (loading) {
    return (
      <div className={`w-full bg-slate-50 animate-pulse rounded-2xl border border-slate-200 flex items-center justify-center ${compact ? "h-64" : "h-[420px]"}`}>
        <span className="text-sm font-semibold text-slate-400">Loading intelligence data...</span>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 ${compact ? "h-64" : "h-[420px]"}`}>
      <MapErrorBoundary>
        <MapContainer
          center={INDIA_CENTER}
          zoom={5}
          minZoom={4}
          maxZoom={11}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {hotspots.map((hotspot) => {
            const color = hotspot.severity === "high" ? "#ef4444" : hotspot.severity === "medium" ? "#f59e0b" : "#10b981";
            return (
              <Circle
                key={hotspot.name}
                center={hotspot.position}
                radius={hotspot.radius}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.25 }}
              >
                <Popup>
                  <strong>{hotspot.name}</strong>
                  <br />
                  {hotspot.severity.toUpperCase()} priority zone
                </Popup>
              </Circle>
            );
          })}
          {volunteers.map((position, idx) => (
            <CircleMarker
              key={`${position[0]}-${position[1]}-${idx}`}
              center={position}
              radius={6}
              pathOptions={{ color: "#0f766e", fillColor: "#14b8a6", fillOpacity: 0.95 }}
            >
              <Popup>Active volunteer node</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </MapErrorBoundary>
    </div>
  );
}
