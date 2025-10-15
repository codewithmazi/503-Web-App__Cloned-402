import React, { useEffect, useState } from "react";
import opsService from "../../services/opsService";
import { Operation } from "../../types/Operation";
import { Link } from "react-router-dom";

export default function Operations() {
    const [operations, setOperations] = useState<Operation[]>([]);

    const getOperations = () => {
        opsService.getAll()
            .then((response: any) => {
                setOperations(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
                alert(e.message);
            });
    };

    useEffect(() => {
        getOperations();
    }, []);

    return (
        <div className="container is-fluid">
            <section className="section">
                <h1 className="title">Operation Log</h1>
            </section>
            <div className="columns is-multiline">
                {
                    operations.map((operation, index) => (
                        <div className="column" key={index}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-header-title">Log: {operation.log_id}</h2>
                                </div>
                                <div className="card-content">
                                    <p className="content"><strong>System:</strong> {operation.system}</p>
                                    <p className="content"><strong>Event Type:</strong> {operation.event_type}</p>
                                    <p className="content"><strong>Timestamp:</strong> {String(operation.timestamp)}</p>
                                    <hr/>
                                    <p className="content" style={{ fontWeight: "bold" }}>Details</p>
                                    <p className="content"><strong>Zone:</strong> {operation.details.zone}</p>
                                    <p className="content"><strong>Duration (min):</strong> {operation.details.duration_minutes}</p>
                                    <p className="content"><strong>Flow Rate (LPM):</strong> {operation.details.flow_rate_lpm}</p>
                                </div>
                                <div className="card-footer">
                                    <Link className="button is-rounded is-danger" to={`/operations/${operation.log_id}`}>View Operation</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
