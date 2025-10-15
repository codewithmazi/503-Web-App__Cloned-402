import React, { useEffect, useState } from "react";
import staffService from "../../services/staffService";
import { Staff } from "../../types/Staff";
import { Link } from "react-router-dom";

export default function StaffList() {

    const [staff, setStaff] = useState<Staff[]>([]);

    const getStaff = () => {
        staffService.getAll()
            .then((response: any) => {
                setStaff(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
                alert(e.message);
            });
    }

    useEffect(() => {
        getStaff();
    }, []);

    return (
        <div className="container is-fluid">
            <section className="section">
                <h1 className="title">Staff Directory</h1>
            </section>
            <div className="columns is-multiline">
                {
                    staff.map((member, index) => (
                        <div className="column" key={member.staff_id}>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-header-title">Staff ID: {member.staff_id}</h2>
                                </div>
                                <div className="card-content">
                                    <p className="content"><strong>Name:</strong> {member.name}</p>
                                    <p className="content"><strong>Role:</strong> {member.job_role}</p>
                                    <p className="content"><strong>Contact:</strong> {member.contact}</p>
                                    <hr/>
                                    <p className="content" style={{ fontWeight: "bold" }}>Qualifications:</p>
                                    <ul>
                                        {member.qualifications.map((qual, qualIdx) => (
                                            <li key={qualIdx}>{qual}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <Link className="button is-rounded is-primary" to={`/staff/${member.staff_id}`}>View Profile</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
