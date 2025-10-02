
import PropTypes from 'prop-types';

export function WeatherCard({ icon, label, value }) {
  return (
    <div className="card detail-card h-100">
      <div className="card-body p-3">
        <div className="weather-icon d-flex justify-content-center mb-2">{icon}</div>
        <div className="text-secondary small mb-1">{label}</div>
        <div className="text-dark fw-semibold fs-5">{value}</div>
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};