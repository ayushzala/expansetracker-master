import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from'axios';
// import { set } from '../../backend/routes/user';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
    const [email,setemail]=useState('')
    const[password,setPassword]=useState('');
    async function onSubmit(e){
        e.preventDefault();
        if(email===""|| password===""){
          alert("Please fill all fields");
        }else{
        await axios.post('/login',{
          email,password
        })
        .then((response) => {
          console.log("login succesfully");
          localStorage.setItem("authToken", response.headers.authtoken);
          navigate("/");
          window.location.reload() ;
        })
        .catch((error)=>{
          if(error.response.status === 400){
            alert("email not registered, please register!");
            window.location='/signup'
          }
          if(error.response.status===401){
            alert("wrong password");
          }
        }) 
      }
      }
  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <h2>LoginPage</h2>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" value={email}aria-describedby="emailHelp" onChange={(e)=>{setemail(e.target.value)}}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"value={password} onChange={(e)=>{
        setPassword(e.target.value)
    }} id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
  <div className="mb-3">
    <li className='list-group-item'>Don't have an account? Click here <Link to="/signup">Register Now!</Link></li>
  </div>
</form>
    </div>
  )
}

export default Login
