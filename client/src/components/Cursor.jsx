import React,{useState,useEffect,} from "react";
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // crosshair stilius: raudonas apskritimas su kryžiuku
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: pos.y - 20,
        left: pos.x - 20,
        width: 40,
        height: 40,
        pointerEvents: "none", // kad nekliudytų klikams
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid red",
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 26,
          height: 2,
          background: "red",
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 26,
          height: 2,
          background: "red",
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
}