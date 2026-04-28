import React from "react";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

const INDIA_CENTER: [number, number] = [22.9, 79.3];

const BASE_HOTSPOTS = [
  { name: "Mumbai", position: [19.076, 72.8777] as [number, number], severity: "critical", radius: 26000 },
  { name: "Pune", position: [18.5204, 73.8567] as [number, number], severity: "high", radius: 21000 },
  { name: "Nagpur", position: [21.1458, 79.0882] as [number, number], severity: "high", radius: 23000 },
  { name: "Nashik", position: [19.9975, 73.7898] as [number, number], severity: "medium", radius: 18000 },
  { name: "Bengaluru", position: [12.9716, 77.5946] as [number, number], severity: "medium", radius: 17000 },
  { name: "Guwahati", position: [26.1445, 91.7362] as [number, number], severity: "critical", radius: 28000 }
];

const BASE_VOLUNTEERS: [number, number][] = [
  [19.12, 72.88],
  [18.56, 73.86],
  [13.02, 77.62],
  [22.59, 88.36],
  [17.43, 78.38],
  [28.63, 77.21]
];

export default function RoleLiveMap({
  height = 320,
  title = "Live Operations Map"
}: {
  height?: number;
  title?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</p>
      </div>
      <div style={{ height }}>
        <MapContainer center={INDIA_CENTER} zoom={5} minZoom={4} maxZoom={11} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {BASE_HOTSPOTS.map((hotspot) => {
            const color =
              hotspot.severity === "critical" ? "#ef4444" : hotspot.severity === "high" ? "#f59e0b" : "#10b981";
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
                  {hotspot.severity.toUpperCase()} zone
                </Popup>
              </Circle>
            );
          })}
          {BASE_VOLUNTEERS.map((point, index) => (
            <CircleMarker
              key={`${point[0]}-${point[1]}-${index}`}
              center={point}
              radius={5}
              pathOptions={{ color: "#0f766e", fillColor: "#14b8a6", fillOpacity: 0.95 }}
            >
              <Popup>Active volunteer cluster</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
