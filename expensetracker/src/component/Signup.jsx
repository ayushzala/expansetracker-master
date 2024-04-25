import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
export default function Signup() {
    const[name,setname]=useState("")
    const[email,setemail] = useState("")
    const [password, setPassword] = useState('')
    const[cpassword,setcPassword] = useState('')
    const [submitted, setSubmitted] = useState(false);
    async function handleSubmit(e) { 
        e.preventDefault();    
        if (name === "" || email==="" || password=== ""|| cpassword==="") {
            alert("Please Fill All Fields");
            } else if (password !== cpassword){
                alert("Passwords Do Not Match!");
            }else{
                // console.log(name + " " + email+ " " + password);

                await axios.post('/register',{
                  name,email,password
                })
                .then(function (response) {
                  // console.log(JSON.stringify(response));
                  window.location='/login'
                   // console.log(signup);
                setSubmitted(true);
                setname("");
                setemail("");
                setPassword("");
                setcPassword("");
                }).catch(function (error) {
                  if (error.response.status === 400) {
                    // Request failed with status code 400
                    alert("User already exists.");
                  }})
               
            }
        } 
        const successMessage = () => {
            return (
                <div
                    className="success"
                    style={{
                        display: submitted ? "" : "none",
                    }}
                >
                    <h1>User successfully recdgistered!! Now you can <Link to="/login">Login</Link></h1>
                </div>
            );
        };   
        
  return (
    <div className='container'>
        <div>
            {successMessage()}
        </div>
        <form onSubmit={handleSubmit} method='post'>
      <div className="mb-3">
    <label htmlfor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" value={name} aria-describedby="emailHelp" onChange={(e)=>{setname(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlfor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPasswor1" value={cpassword} onChange={(e)=>{setcPassword(e.target.value)}}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlfor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary"  >Submit</button>
</form>
<div className="mb-3">
    <li className='list-group-item'>Already have an account go on <Link to="/login">login</Link></li>
  </div>
    </div>
  )
}
