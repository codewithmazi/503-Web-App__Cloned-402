import React, { useEffect, useState } from "react";
import cropsService from "../../services/cropsService";
import { Crop } from "../../types/Crop";
import { Link } from "react-router-dom";

export default function Crops() {

    const [crops, setCrops] = useState<Crop[]>([]);

    const getCrops = () => {
        cropsService.getAll()
            .then((response: any) => {
                setCrops(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
                alert(e.message);
            });
    }

    useEffect(() => {
        getCrops();
    }, []);

    return (
        <div className="container is-fluid">
            <section className="section">
                <h1 className="title">Crop Catalogue</h1>
            </section>
            <div className="columns is-multiline">
                {
                    crops.map((crop, index) => (
                        <div className="column" key={index}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-header-title">Batch: {crop.batch_id}</h2>
                                </div>
                                <div className="card-content">
                                    <p className="content"><strong>Species:</strong> {crop.species}</p>
                                    <p className="content"><strong>Status:</strong> {crop.status}</p>
                                    <p className="content"><strong>Planting Date:</strong> {String(crop.planting_date)}</p>
                                    <p className="content"><strong>Nutrient Formula:</strong> {crop.nutrient_formula}</p>
                                    <hr/>
                                    <p className="content" style={{ fontWeight: "bold" }}>Sensor Readings:</p>
                                    <p className="content"><strong>Timestamp:</strong> {String(crop.sensor_readings.timestamp)}</p>
                                    <p className="content"><strong>Temperature (°C):</strong> {crop.sensor_readings.temperature_c}</p>
                                    <p className="content"><strong>Humidity (%):</strong> {crop.sensor_readings.humidity_percent}</p>
                                    <p className="content"><strong>pH:</strong> {crop.sensor_readings.ph}</p>
                                    <p className="content"><strong>CO₂ (ppm):</strong> {crop.sensor_readings.co2_ppm}</p>
                                </div>
                                <div className="card-footer">
                                    <Link className="button is-rounded is-danger" to={`/crops/${crop.batch_id}`}>View Crop</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
