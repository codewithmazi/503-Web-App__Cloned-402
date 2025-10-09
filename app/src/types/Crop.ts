export type Crop = {
  batch_id: string,
  species: string,
  planting_date: Date,
  status: string,
  sensor_readings: {
    timestamp: Date,
    temperature_c: number,
    humidity_percent: number,
    ph: number,
    co2_ppm: number,
  },
  nutrient_formula: string,
}