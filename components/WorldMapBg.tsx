"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "/countries-110m.json";

export default function WorldMapBg() {
  return (
    <ComposableMap
      projectionConfig={{ scale: 175, center: [0, 10] }}
      width={1400}
      height={600}
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.12,
        pointerEvents: "none",
      }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="white"
              stroke="none"
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
