

import React, { useEffect, useRef, useState } from "react";
import { CustomCursor } from "../../components/Cursor";


// 👇 Pagrindinis komponentas
export function TestInner() {
   const [flies, setFlies] = useState([]); // { id, x, y }
  const [score, setScore] = useState(0);
  const spawnIntervalRef = useRef(null);
  const timeoutsRef = useRef(new Map()); // maps flyId -> timeoutId

  // Spawn muses kas 1.5s
  useEffect(() => {
    startSpawning();
    return () => {
      stopSpawning();
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSpawning = () => {
    if (spawnIntervalRef.current) return;
    spawnIntervalRef.current = setInterval(() => {
      const id = Math.random().toString(36).substr(2, 9);
      const x = Math.random() * 90; // % from left
      const y = Math.random() * 80; // % from top
      setFlies((prev) => [...prev, { id, x, y }]);

      // automatinis pašalinimas po 3s
      const t = setTimeout(() => {
        setFlies((prev) => prev.filter((f) => f.id !== id));
        timeoutsRef.current.delete(id);
      }, 3000);
      timeoutsRef.current.set(id, t);
    }, 1500);
  };

  const stopSpawning = () => {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
  };

  const clearAllTimeouts = () => {
    for (const t of timeoutsRef.current.values()) {
      clearTimeout(t);
    }
    timeoutsRef.current.clear();
  };

  const hitFly = (id) => {
    // pašalinam musę ir pridedam tašką
    setFlies((prev) => prev.filter((f) => f.id !== id));
    setScore((s) => s + 1);

    // išvalom timeout'ą jei yra
    const t = timeoutsRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timeoutsRef.current.delete(id);
    }
  };

  const handleReset = () => {
    // sustabdom spawn
    stopSpawning();
    // išvalom visus timeout'us
    clearAllTimeouts();
    // išvalom flies ir score
    setFlies([]);
    setScore(0);
    // vėl pradedam spawn
    startSpawning();
  };


  return (
    <div className='container'>
      <div className='row position'>
        

        <h1>
  <span className="raide">F</span>
  <span className="raide">L</span>
  <span className="raide">Y</span>
        </h1>
        <h1>
  <span className="raide">K</span>
  <span className="raide">I</span>
  <span className="raide">L</span>
  <span className="raide">L</span>
  <span className="raide">E</span>
  <span className="raide">R</span>
        </h1>
        
          <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        border: "2px solid #333",
        overflow: "hidden",
        background: "linear-gradient(180deg, #e6f7ff 0%, #d9f2ff 100%)",
        cursor: "none", // paslepiam native kursorių
        userSelect: "none",
      }}
    >
      {/* Viršutinė juosta: Reset + Score */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <button
          onClick={handleReset}
          style={{
            padding: "8px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            background: "#ff5252",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          Reset
        </button>
        <div
          aria-live="polite"
          style={{
            background: "rgba(255,255,255,0.8)",
            padding: "6px 10px",
            borderRadius: 8,
            fontWeight: "600",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          Rezultatas: {score}
        </div>
      </div>

      {/* Play area (flies) */}
      {flies.map((fly) => (
        <div
          key={fly.id}
          onClick={() => hitFly(fly.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") hitFly(fly.id);
          }}
          style={{
            position: "absolute",
            top: `${fly.y}%`,
            left: `${fly.x}%`,
            transform: "translate(-50%, -50%)",
            fontSize: 32,
            lineHeight: 1,
            cursor: "none", // native hidden, but keep explicit
            userSelect: "none",
            zIndex: 10,
          }}
        >
          🪰
        </div>
      ))}

      {/* Custom red crosshair cursor (follows mouse) */}
      <CustomCursor />
        </div>
      </div>
      </div>
  );
}
