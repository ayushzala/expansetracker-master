import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Navbar() {
   const navigate = useNavigate();
   const item = localStorage.getItem('authToken');
   
  function logout(e){
    e.preventDefault();
    localStorage.removeItem("authToken");
    window.location.reload(true);
  }
  function signup(e){
    e.preventDefault();
    navigate('/signup')
  }
  function login(e){
    e.preventDefault();
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{background:"grey"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">logo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{fontSize:"1.3rem"}}>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/about">about</Link>
        </li>
        {item ? (<>  <li className="nav-item">
          <Link className="nav-link active" to="/activity">Activity</Link>
        </li></>):""}
       
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Contact us</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/chart">Chart</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        {item ? (<button className="btn mx-2" style={{background:"darkgrey"}} onClick={logout}>Logout</button>):( <><button  className="btn m-2" style={{background:"darkgrey"}} onClick={signup}>SignUp</button>
       <button style={{background:"darkgrey"}} className="btn m-2" onClick={login}>Login</button></>) }
      
      </form>
    </div>
  </div>
</nav>
        <div>{item ? "you are login successfully" : "please login for activity"}</div>
    </div>
  )
}

export default Navbar
