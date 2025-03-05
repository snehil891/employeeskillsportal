import React from 'react'
import "../LoginAndSignUp/PageNotFound.css";
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='not-found'>
            <div>
                <h1 className='display-1'>Page Not Found</h1>
            </div>
            <br></br>
            <br></br>
            <NavLink className="navbar-brand text-primary" style={{textDecorationLine:"underline"}} to="/dashboard">
               Move to DashBoard....
            </NavLink>
        </div>
    )
}

export default PageNotFound
