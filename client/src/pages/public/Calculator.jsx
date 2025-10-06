import React, { useState } from "react";


export function Calculator() {
  const [input, setInput] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setShowFireworks(false);
  };

  const handleEquals = () => {
    try {
      setInput(eval(input).toString());
      // rodom fejerverkus 1.5 sek.
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 1500);
    } catch (error) {
      setInput("Error");
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <h1 className="text-center text-warning mb-4">🧮Skaičiuotuvas</h1>

      <div className="calculator card p-3 shadow-sm position-relative">
        <input
          type="text"
          className="form-control mb-3 text-end fs-4"
          value={input}
          readOnly
        />

        <div className="row g-2">
          {buttons.flat().map((btn, idx) => (
            <div key={idx} className="col-3">
              <button
                className={`btn btn-outline-primary w-100 fs-4 ${
                  btn === "=" ? "btn-success" : ""
                }`}
                onClick={() =>
                  btn === "="
                    ? handleEquals()
                    : btn === "C"
                    ? handleClear()
                    : handleClick(btn)
                }
              >
                {btn}
              </button>
            </div>
          ))}

          {/* Clear mygtukas */}
          <div className="col-12 mt-2">
            <button
              className="btn btn-danger w-100 fs-5"
              onClick={handleClear}
            >
              C
            </button>
          </div>
        </div>

        {/* Fejerverkai */}
        {showFireworks && <div className="fireworks"></div>}
      </div>
    </div>
  );
}