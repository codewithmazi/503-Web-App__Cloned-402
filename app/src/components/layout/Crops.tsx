import React from "react";
import { crop } from "../../types/Crop";

interface CropsProps {
  crops: crop[];
}

const Crops: React.FC<CropsProps> = ({ crops }) => {
  return (
    <div className="columns is-multiline is-centered">
      {crops.map((cropItem) => (
        <div key={cropItem.batch_id} className="column is-one-third">
          <div className="card shadow hover-shadow">
            <div className="card-content">
              <h3 className="title is-4">{cropItem.species}</h3>
              <p>Batch ID: {cropItem.batch_id}</p>
              <p>Status: {cropItem.status}</p>
              <p>Planted: {cropItem.planting_date.toString()}</p>
              <p>Nutrient Formula: {cropItem.nutrient_formula}</p>
              <div>
                <strong>Sensor Readings:</strong>
                <ul>
                  <li>Timestamp: {cropItem.sensor_readings.timestamp.toString()}</li>
                  <li>Temperature: {cropItem.sensor_readings.temperature_c}°C</li>
                  <li>Humidity: {cropItem.sensor_readings.humidity_percent}%</li>
                  <li>pH: {cropItem.sensor_readings.ph}</li>
                  <li>CO₂ ppm: {cropItem.sensor_readings.co2_ppm}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Crops;
