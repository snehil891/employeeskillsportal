import React from 'react';
import axios from 'axios';

const AddSkills = () => {
    const [skillName, setSkillName] = React.useState("");
    const [experience, setExperience] = React.useState("");
    const [message, setMessage] = React.useState("");

    const formatExperience = (value) => {
        if (!value) return "";
        return value === "1" ? "1year" : `${value}years`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!skillName || !experience) {
            setMessage("Please fill in all fields.");
            return;
        }

        const newSkill = {
            name: skillName,
            experience: formatExperience(experience),
        };

        try {
            await axios.post("http://localhost:5000/skills", newSkill);
            setMessage("Skill added successfully!");
            setSkillName("");
            setExperience("");
        } catch (error) {
            console.error("Error adding skill:", error);
            setMessage("Failed to add skill.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Skill</h2>
            {message && <p className="text-info">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Skill Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Experience</label>
                    <input
                        type="text"
                        className="form-control"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Add Skill</button>
            </form>
        </div>
    );
}

export default AddSkills
