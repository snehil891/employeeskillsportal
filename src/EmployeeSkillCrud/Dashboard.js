import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../LoginAndSignUp/PageNotFound.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchId, setSearchId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (searchId) => {
    setLoading(true);
    setError(null);
    setEmployee(null);
    setSkill(null);
    try {
      const employeeResponse = await axios.get(`http://localhost:5000/employees/${searchId}`);
      setEmployee(employeeResponse.data);
    } catch (err) {
      try {
        const skillResponse = await axios.get(`http://localhost:5000/skills/${searchId}`);
        setSkill(skillResponse.data);
      } catch (err) {
        setError("No employee or skill found with this ID");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      navigate(`/dashboard/${searchId}`);
    }
  };

  const handleDelete = async () => {
    if (!employee && !skill) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      if (employee) {
        await axios.delete(`http://localhost:5000/employees/${employee.id}`);
        alert("Employee details deleted successfully!");
        setEmployee(null);
      } else if (skill) {
        await axios.delete(`http://localhost:5000/skills/${skill.id}`);
        alert("Skill details deleted successfully!");
        setSkill(null);
      }
      navigate("/dashboard");
    } catch (error) {
      console.log("Error deleting the data", error);
      alert("Failed to delete the data");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter ID (Employee or Skill)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {employee && (
        <ul className="list-group">
          <li className="list-group-item"><strong>ID:</strong> {employee.id}</li>
          <li className="list-group-item"><strong>First Name:</strong> {employee.firstName}</li>
          <li className="list-group-item"><strong>Last Name:</strong> {employee.lastName}</li>
          <li className="list-group-item"><strong>Cell Number:</strong> {employee.cellNumber}</li>
          <li className="list-group-item"><strong>Email:</strong> {employee.emailId}</li>
        </ul>
      )}
      {skill && (
        <ul className="list-group">
          <li className="list-group-item"><strong>Skill Name:</strong> {skill.name}</li>
          <li className="list-group-item"><strong>Experience:</strong> {skill.experience}</li>
        </ul>
      )}
      {(employee || skill) && (
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;