import React from 'react';
import './LoginAndSignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAndSignUp = () => {
    const [employee, setEmployee] = React.useState({
        firstName: "",
        lastName: "",
        cellNumber: "",
        emailId: "",
        password: ""
    });
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    });
    const { firstName, lastName, cellNumber, emailId, password } = employee;
    const { email, password: loginPassword } = loginData;
    const navigate = useNavigate();
    const onInputChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
    const onLoginInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/employees", employee);
            alert("Signup Successful!");
            console.log("Signup Data", response.data);
            navigate("/dashboard");
        }
        catch (error) {
            alert("SignUp Failed");
            console.log("Error", error);
        }
    }
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending login data:", loginData);

            const response = await axios.get("http://localhost:5000/employees");
            console.log("All users:", response.data);

            const user = response.data.find(
                (emp) => emp.emailId === loginData.email && emp.password === loginData.password
            );

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                alert("Login Successful!");
                console.log("User Data:", user);
                navigate("/dashboard");
            } else {
                alert("User Not Registered or Invalid credentials!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Something went wrong! Please try again.");
        }
    };

    return (
        <div className="body">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={onFormSubmit}>
                        <label className='labelclass' htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className='inputclass' type="text" value={firstName} onChange={(e) => onInputChange(e)} name="firstName" placeholder="Enter First Name" required />
                        <input className='inputclass' type="text" value={lastName} onChange={(e) => onInputChange(e)} name="lastName" placeholder="Enter Last Name" required />
                        <input className='inputclass' type="number" value={cellNumber} onChange={(e) => onInputChange(e)} name="cellNumber" placeholder="Enter Phone Number" required />
                        <input className='inputclass' type='email' value={emailId} onChange={(e) => onInputChange(e)} name='emailId' placeholder='Enter Email' required />
                        <input className='inputclass' type="password" value={password} onChange={(e) => onInputChange(e)} name="password" placeholder="Password" required />
                        <button className='buttonclass' type="submit">Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={onLogin}>
                        <label className='labelclass' htmlFor="chk" aria-hidden="true">Login</label>
                        <input className='inputclass' type="email" value={email} name="email" onChange={onLoginInputChange} placeholder="Email" required />
                        <input className='inputclass' type="password" value={loginPassword} name="password" onChange={onLoginInputChange} placeholder="Password" required />
                        <button className='buttonclass' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginAndSignUp;
