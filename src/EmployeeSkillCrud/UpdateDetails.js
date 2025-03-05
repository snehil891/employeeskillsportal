import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        cellNumber: "",
        emailId: "",
        password: "",
    });

    // Function to fetch employee details
    const loadEmployeeDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employees/${id}`);
            if (response.status === 200) {
                setEmployee(response.data);
            } else {
                alert("Employee not found");
            }
        } catch (error) {
            console.error("Error fetching employee data:", error);
            alert("Failed to fetch employee details.");
        }

    },[id]);

    useEffect(() => {
        if (id) {
            loadEmployeeDetails();
        }
    }, [id, loadEmployeeDetails]);

    // Handle input change
    const onInputChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    // Handle form submission (Update Employee)
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/employees/${id}`, employee);
            console.log(response.data);
            alert("Update successful!");
            navigate(`/dashboard/${id}`);
        } catch (error) {
            console.error("Update failed:", error);
            alert("Update failed!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Edit Employee</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="Update first name"
                                    required
                                    value={employee.firstName}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Update last name"
                                    required
                                    value={employee.lastName}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Cell Number</label>
                                <input
                                    type="text"
                                    name="cellNumber"
                                    className="form-control"
                                    placeholder="Update cell number"
                                    required
                                    value={employee.cellNumber}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="emailId"
                                    className="form-control"
                                    placeholder="Update email"
                                    required
                                    value={employee.emailId}
                                    onChange={onInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    required
                                    value={employee.password}
                                    onChange={onInputChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Update Details
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateDetails;
