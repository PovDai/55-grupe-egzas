import React, { useMemo, useState, useEffect } from "react";

import { planets } from "../../components/planets/planetsData";

export function SolarSystem() {
  const [secondsPerYear, setSecondsPerYear] = useState(8);
  const [paused, setPaused] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetInfo, setPlanetInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  const scale = 1.8;
  const baseDistance = window.innerWidth < 900 ? 22 : 28;

  const computed = useMemo(() => {
    return planets.map((p, i) => {
      const years = p.orbitDays / 365.25;
      const duration = Math.max(2, years * secondsPerYear);
      const distance = 40 + i * baseDistance;
      const radius = p.radius * scale;
      return { ...p, years, duration, distance, radius };
    });
  }, [secondsPerYear, baseDistance]);

  // Fetch planet info from Express backend
  useEffect(() => {
    if (!selectedPlanet) return;

    const fetchInfo = async () => {
      setLoadingInfo(true);
      setPlanetInfo(null);
      try {
        const res = await fetch(`http://localhost:5000/api/planet/${selectedPlanet}`);
        const data = await res.json();
        setPlanetInfo(data);
      } catch (err) {
        console.error("Klaida gaunant planetos duomenis:", err);
      } finally {
        setLoadingInfo(false);
      }
    };

    fetchInfo();
  }, [selectedPlanet]);

  return (
    <div className="solar-container">
      <h2>Mūsų Saulės sistema 🌞</h2>

      <div className="solar-layout">
        <div className="solar-scene">
          <div className="sun"></div>

          {computed.map((p, i) => (
            <div
              key={p.name}
              className="orbit"
              style={{ width: p.distance * 2, height: p.distance * 2 }}
            >
              <div
                className="planet-wrapper"
                style={{
                  animation: `orbit-${i} ${p.duration}s linear infinite`,
                  animationPlayState: paused ? "paused" : "running",
                  transformOrigin: `50% ${p.distance}px`,
                }}
              >
                <div
                  className="planet-and-label"
                  style={{
                    transform: `translate(-50%, -${p.radius}px)`,
                  }}
                >
                  <div
                    className="planet"
                    style={{
                      width: p.radius * 2,
                      height: p.radius * 2,
                      backgroundColor: p.color,
                    }}
                    onClick={() => setSelectedPlanet(p.name)}
                    title="Spausk, kad sužinotum daugiau!"
                  ></div>
                  <div className="planet-label">{p.name}</div>
                </div>
              </div>
            </div>
          ))}

          <style>
            {computed
              .map(
                (_, i) => `@keyframes orbit-${i} {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }`
              )
              .join("\n")}
          </style>
        </div>

        <div className="controls">
          <label>
            Mastelis (sekundės per 1 metus):
            <input
              type="range"
              min="2"
              max="40"
              value={secondsPerYear}
              onChange={(e) => setSecondsPerYear(Number(e.target.value))}
            />
          </label>
          <p>{secondsPerYear} s per metus</p>

          <button onClick={() => setPaused((p) => !p)}>
            {paused ? "Tęsti" : "Pauzė"}
          </button>
        </div>
      </div>

      {selectedPlanet && (
        <div className="modal-overlay" onClick={() => setSelectedPlanet(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {loadingInfo && <p>Kraunama informacija...</p>}
            {!loadingInfo && planetInfo && (
              <>
                <h3>{planetInfo.englishName || selectedPlanet}</h3>
                {planetInfo.imageUrl && (
                  <img
                    src={planetInfo.imageUrl}
                    alt={selectedPlanet}
                    style={{ width: "100%", borderRadius: 8, marginBottom: 12 }}
                  />
                )}
                <p><strong>Gravitacija:</strong> {planetInfo.gravity} m/s²</p>
                <p><strong>Skersmuo:</strong> {(planetInfo.meanRadius * 2).toFixed(0)} km</p>
                <p><strong>Orbitos periodas:</strong> {planetInfo.sideralOrbit} dienų</p>
                <p><strong>Palydovai:</strong> {planetInfo.moons ? planetInfo.moons.length : 0}</p>
                <button onClick={() => setSelectedPlanet(null)}>Uždaryti</button>
              </>
            )}
            {!loadingInfo && !planetInfo && <p>Informacijos nepavyko gauti 😢</p>}
          </div>
        </div>
      )}
    </div>
  );
}