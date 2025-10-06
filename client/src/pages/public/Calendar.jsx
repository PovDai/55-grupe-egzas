
import React, { useEffect, useState } from "react";
export function Calendar(){
  const [today, setToday] = useState(new Date());
  const [flipped, setFlipped] = useState({}); // saugom, kurios dienos apsisukusios

  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  const currentYear = today.getFullYear();
  const startDate = new Date(currentYear, 9, 1); // Spalio 1
  const christmas = new Date(currentYear, 11, 25);

  // Sukuriame visas dienas nuo spalio 1 iki gruodžio 25
  const days = [];
  let date = new Date(startDate);
  while (date <= christmas) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const months = {
    9: "Spalis",
    10: "Lapkritis",
    11: "Gruodis",
  };

  const daysByMonth = {};
  days.forEach((d) => {
    const month = d.getMonth();
    if (!daysByMonth[month]) daysByMonth[month] = [];
    daysByMonth[month].push(d);
  });

  const isPastOrToday = (date) => {
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d1 <= d2;
  };

  const toggleFlip = (key) => {
    setFlipped((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="container py-5 bg-light min-vh-100">
      <h1 className="text-center text-danger fw-bold mb-5">
        🎄 Kalėdų Kalendorius {currentYear} 🎅
      </h1>

      {Object.keys(daysByMonth).map((monthKey) => (
        <div key={monthKey} className="mb-5">
          <h3 className="text-center text-success mb-3">{months[monthKey]}</h3>

          <div className="row justify-content-center g-3">
            {daysByMonth[monthKey].map((date, i) => {
              const dayNum = date.getDate();
              const isOpen = isPastOrToday(date);
              const key = `${monthKey}-${dayNum}`;

              return (
                <div
                  key={key}
                  className="col-2 col-sm-1 d-flex justify-content-center"
                >
                  <div
                    className={`calendar-cube position-relative`}
                    onClick={() => toggleFlip(key)}
                  >
                    <div
                      className={`calendar-inner ${
                        flipped[key] ? "flipped" : ""
                      }`}
                    >
                      {/* Priekinė pusė */}
                      <div
                        className={`calendar-front border rounded d-flex align-items-center justify-content-center shadow-sm ${
                          isOpen
                            ? "bg-secondary text-light"
                            : "bg-success text-white"
                        }`}
                      >
                        <span
                          className={`fw-bold fs-5 ${
                            isOpen
                              ? "text-light text-decoration-line-through"
                              : ""
                          }`}
                        >
                          {dayNum}
                        </span>
                        {isOpen && (
                          <span
                            className="position-absolute top-50 start-50 translate-middle text-danger fw-bold"
                            style={{ fontSize: "2rem", opacity: 0.6 }}
                          >
                            ✖
                          </span>
                        )}
                      </div>

                      {/* Nugarinė pusė su GIF */}
                      <div className="calendar-back border rounded shadow-sm bg-white d-flex align-items-center justify-content-center">
                        <img
                          src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif"
                          alt="Kalėdinis GIF"
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="text-center mt-4 fs-5 text-muted">
        Liko{" "}
        <span className="fw-bold text-success">
          {Math.max(0, Math.ceil((christmas - today) / (1000 * 60 * 60 * 24)))}
        </span>{" "}
        dienų iki Kalėdų 🎁
      </div>
    </div>
  );
}