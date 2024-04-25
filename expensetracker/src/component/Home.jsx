import React from 'react'
import {Link} from "react-router-dom"
import { useSelector} from 'react-redux';
function Home() {
  const user = useSelector((state) => state.username);
  return (
    <div>
      <Link to="activity">
    <img src="https://hubplanner.com/wp-content/uploads/2018/12/resource-utilization-calculation.png" alt="img"style={{
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '70vh', // Ensure the container fills the viewport height
      width: '100vw', // Ensure the container fills the viewport width
      filter:"brightness(50%)",
    }} />
    </Link>
      {/* Display user email or other content here */}
      <h5 className="top-right" style={{position: "absolute",
  top: "93px",
  left: "16px",
  color:"white"}}>{user.email}</h5>
    <p style={{position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color:"white",
  fontSize:"xxx-large",
  fontStyle:"oblique",
  fontWeight:"bold"
  }}>calculate All Your Expense Here!</p>
      </div>
  )
}

export default Home
