// weather.js - API sluoksnis React projektui naudojant Open-Meteo

// Pagalbinė funkcija konvertuoti weather_code į emoji
function getWeatherEmoji(code) {
  const map = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌦️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    80: "🌦️",
    81: "🌦️",
    82: "🌦️",
    95: "⛈️",
    99: "⛈️",
  };
  return map[code] || "❓";
}

// 1️⃣ Ieškoti vietos pagal pavadinimą (Nominatim OpenStreetMap)
export async function searchLocation(location) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    location
  )}&format=json&limit=1`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch location data");

  const data = await response.json();
  if (!data || data.length === 0) throw new Error("Location not found");

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    name: data[0].display_name,
  };
}

// 2️⃣ Gauti orų duomenis pagal koordinatę (Open-Meteo API)
export async function getWeatherData(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch weather data");

  const data = await response.json();

  // Dabartinė prognozė
  const current = {
    temperature: data.current_weather.temperature,
    description: getWeatherEmoji(data.current_weather.weathercode),
    windSpeed: data.current_weather.windspeed,
    icon: getWeatherEmoji(data.current_weather.weathercode),
    city: "",
    country: "",
  };

  // 5 dienų prognozė
  const forecast = data.daily.time.map((date, idx) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    icon: getWeatherEmoji(data.daily.weathercode[idx]),
    maxTemp: data.daily.temperature_2m_max[idx],
    minTemp: data.daily.temperature_2m_min[idx],
    description: getWeatherEmoji(data.daily.weathercode[idx]),
  }));

  return { current, forecast };
}

