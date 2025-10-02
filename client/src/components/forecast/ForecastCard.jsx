
import PropTypes from 'prop-types';

export function ForecastCard({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="card forecast-card h-100">
      <div className="card-body p-3">
        <div className="fw-medium text-dark mb-2">{forecast.day}</div>
        <div style={{ fontSize: '3rem' }} className="mb-2">{forecast.icon}</div>
        <div className="d-flex justify-content-center gap-2 small">
          <span className="fw-semibold text-dark">{Math.round(forecast.maxTemp)}°</span>
          <span className="text-secondary">{Math.round(forecast.minTemp)}°</span>
        </div>
        <div className="text-secondary small mt-2 text-capitalize">{forecast.description}</div>
      </div>
    </div>
  );
}

ForecastCard.propTypes = {
  forecast: PropTypes.shape({
    day: PropTypes.string.isRequired,
    icon: PropTypes.node,
    maxTemp: PropTypes.number.isRequired,
    minTemp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};