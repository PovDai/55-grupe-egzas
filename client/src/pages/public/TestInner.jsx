
import { Link } from "react-router";
import React, { useState, useEffect } from "react";



// 👇 Pagrindinis komponentas
export function TestInner() {
  const [flies, setFlies] = useState([]);
  const [score, setScore] = useState(0);

  // Sugeneruoti naują musę kas 1.5 sek
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substr(2, 9);
      const x = Math.random() * 90; // atsitiktinė pozicija %
      const y = Math.random() * 80;
      setFlies((prev) => [...prev, { id, x, y }]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Pašalinti musę po 3 sek jei nepataikyta
  useEffect(() => {
    const timeout = setInterval(() => {
      setFlies((prev) => prev.filter((fly) => fly.keep !== false));
    }, 3000);

    return () => clearInterval(timeout);
  }, []);

  const hitFly = (id) => {
    setFlies((prev) => prev.filter((fly) => fly.id !== id));
    setScore(score + 1);
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
        height: "500px",
        border: "4px solid gold",
        overflow: "hidden",
        background: "green",
      }}
    >
      <h2>Rezultatas: {score}</h2>
      {flies.map((fly) => (
  <div
    key={fly.id}
    onClick={() => hitFly(fly.id)}
    style={{
      position: "absolute",
      top: `${fly.y}%`,
      left: `${fly.x}%`,
      fontSize: "2rem",
      cursor: "crosshair",
    }}
  >
    🪰
  </div>


      ))}
    </div>
      
      
      </div>
    
    </div>
  )
}
