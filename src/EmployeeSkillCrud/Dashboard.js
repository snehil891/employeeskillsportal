import React from 'react'
import "../LoginAndSignUp/PageNotFound.css";

const Dashboard = () => {
  return (
    <div className='display-1 not-found' style={{fontSize:"3rem"}}>
      Dashboard Page
      <a className='text-primary' style={{textDecorationLine:"underline"}} href='/'>Login And SignUp Page</a>
    </div>
  )
}

export default Dashboard
