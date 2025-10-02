import React, { useState } from "react";
import { ForecastCard } from "../../components/forecast/ForecastCard";
import { WeatherCard } from "../../components/forecast/WeatherCard";
import { searchLocation, getWeatherData } from "../../api/weather";
import { Search, Wind, Eye } from "react-bootstrap-icons"; 

export function Weather() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError("");

    try {
      const coordinates = await searchLocation(location);
      const data = await getWeatherData(coordinates.lat, coordinates.lon);
      // pridėti miestą į dabartinį orą
      data.current.city = coordinates.name.split(",")[0];
      data.current.country = coordinates.name.split(",").pop().trim();
      setWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Klaida gaunant oro prognozę");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-background">
      <div className="bg-image">
        <img
          src="https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sky background"
        />
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            {/* Heading */}
            <div className="text-center mb-4">
              <h1
                className="display-3 fw-bold text-white mb-2"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
              >
                Oro temperatūra dabar
              </h1>
              <p className="fs-5 text-white opacity-75">
                Realiu laiku oro temperatūra pasaulyje
              </p>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-4 position-relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ieškok miesto..."
                className="form-control pe-5 search-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary position-absolute top-50 end-0 translate-middle-y me-2"
              >
                <Search size={20} />
              </button>
            </form>

            {/* Error */}
            {error && <div className="alert alert-danger rounded-4 shadow">{error}</div>}

            {/* Loading */}
            {loading && (
              <div className="text-center py-5 text-white">
                <div className="spinner-border" style={{ width: "4rem", height: "4rem" }}></div>
                <p className="mt-3 fs-5">Įkraunama orų prognozė...</p>
              </div>
            )}

            {/* Weather Card */}
            {!loading && weather && (
              <>
                <div className="card weather-card mb-4 border-0">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 text-secondary mb-3">
                      <span className="fs-5">{weather.city}, {weather.country}</span>
                    </div>

                    <div className="row align-items-center mb-4">
                      <div className="col-7">
                        <div className="display-1 fw-bold text-dark mb-2">
                          {Math.round(weather.temperature)}°
                        </div>
                        <div className="fs-4 text-secondary">{weather.description}</div>
                      </div>
                      <div className="col-5 text-end" style={{ fontSize: "6rem" }}>
                        {weather.icon}
                      </div>
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-6 col-md-3">
                        <WeatherCard icon={<Wind size={24} />} label="Vėjo greitis" value={`${weather.windSpeed} km/h`} />
                      </div>
                    
                    </div>
                  </div>
                </div>

                {/* Forecast */}
                {forecast.length > 0 && (
                  <div className="card weather-card border-0">
                    <div className="card-body p-4">
                      <h2 className="fs-3 fw-bold text-dark mb-4">5-Dienų Prognozė</h2>
                      <div className="row g-3">
                        {forecast.map((day, index) => (
                          <div className="col-6 col-md-12/5" key={index}>
                            <ForecastCard forecast={day} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Initial State */}
            {!loading && !weather && !error && (
              <div className="initial-state text-center">
                <div style={{ fontSize: "5rem" }} className="mb-3">🌤️</div>
                <h2 className="fs-3 fw-semibold text-dark mb-2">Ieškok vietovės</h2>
                <p className="text-secondary">Įvesk miestą, kad gautum 5-dienų oro prognozę</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
