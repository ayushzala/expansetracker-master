import React, { useEffect,useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';
import Login from './component/Login';
import Signup from './component/Signup'
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Activity from './component/Activity';
import { setUser } from './feature/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { PrivateRoute } from "react-router-dom";
import Chartpage from './component/Chartpage';
import {addData} from './feature/user/userdata'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.username);
  useEffect(()=>{
      const item = localStorage.getItem('authToken');
      axios.post('/userdatail',{},{
        //pass token header through
        headers:{
          "authtoken":item
        }
      }).then((res)=>{
        const userData = res.data;
        dispatch(setUser(userData));
      })
      .catch((err)=>console.log(err))
  },[])

  const [data,setData] = useState([]);
  useEffect(()=>{
    if(!user){ 
      window.location.href="/";
    }else{
      if(user != null){
      getData();
      }
    }
  },[user])
  useEffect(()=>{
    if(data != null){
    dispatch(addData(data));
    }
  },[data]);
  //sort the data array  by date and store it in data variable
  let sortDate= (a,b)=> new Date(b.date)-new Date(a.date)
  const dataSorted = data.sort(sortDate);

  async function getData(){
    try {
      let res = await axios.get(`/expanse/${user._id}`)
      setData(res.data)
      } catch (error) {
        console.log('Error', error);  
        }
  }
  return (
    <>
     <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='login' element={<Login/>} />
      <Route path='activity'  element={<Activity/>} />
      <Route path='signup' element={<Signup/>} />
      <Route path='about' element={<About/>} />
      <Route path="chart" element={<Chartpage/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
