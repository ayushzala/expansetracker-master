import React, { useEffect, useState } from 'react'
import axios from "axios"
import {updateData,deleteData} from '../feature/user/userdata'
import { useSelector,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

export default function Data() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.username);
  const userdata = useSelector((state)=> state.userdata);
  const [data,setData] = useState([]);
  const user = useSelector((state) => state.username);
  useEffect(()=>{
    setData(userdata)
  },[userdata])
  async function handledelete(_id){
    if(window.confirm('Are you sure to delete this item?')){dispatch(deleteData(_id))}
    axios.delete("remove", { data: { email: user.email, id: _id } }).then((res)=>{console.log("Delete Successful")}).catch((err)=> console.error(err));
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const[updatedata,setupdatedata]=useState({});
  async function handleupdate(item){
    setIsOpen(!isOpen);//open modal when click on update button
    setupdatedata({ ...item });
  }
  function close(){
    setIsOpen(!isOpen);
    console.log("close button");
  }
  function update(e){
    e.preventDefault();
    console.log(updatedata);
    dispatch(updateData(updatedata));
    //make axios request0
    axios.put(`/update/${updatedata._id}`, updatedata).then((res)=>
    {console.log(res.data)}).catch((err)=>{console.log(err)})
    close();
  }
  function cancel(e){
    e.preventDefault();
    close();
  }
  return (
    <>
    <div className="modal" tabIndex="-1" style={isOpen === true ? {display:'block'}:{display:'none'}} >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Plese Update data</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
      </div>
      <div className="modal-body">
        <form action="" onSubmit={update} style={{display:'flex',flexDirection:'column'}}>
       <p>Your Previous data</p>
       <div className="my-2">
        <label htmlFor="category">Category</label>
       <select name="category" id="category" className="form-control mb-2 w-50"  value={updatedata.category} onChange={(e) => {
    setupdatedata({ ...updatedata, category: e.target.value });}}>
          {/* TODO: Add options for "cash received", "check deposited", etc. */}
          { updatedata.type === "CREDIT" ?(<> <option value="salary">Salary</option>
          <option value="Gift">Gift</option> 
          <option value="Cashback">Cashback</option>
          <option value="Deposit">Deposit into Savings Account or Other</option></>) :(<><option value="food">Food/Dining Out</option>
            <option value="entertainment">Entertainment/Hobbies</option>
            <option value="transportation">
              Transportation/Commuting to Work/School
            </option>
            <option value="utilities">Utilities/Electricity/Water/Gas/Internet</option>
            <option value="household">Household/Groceries/Cleaning Supplies</option>
            <option value="healthcare">Health Care/Medicine/Prescriptions</option>
            <option value="loan_payment">Loan Payments/Credit Card Billings</option>
            <option value="other">Other Expenses</option>
          </>)}
         
         </select>
       </div>
       <div className='my-2'>
       <label htmlFor='amount'>Amount</label>
       <input className="mx-2"type="text" name='amount' value={updatedata.amount} onChange={(e) => {
    setupdatedata({ ...updatedata, amount: e.target.value });}}/>
    </div>
    <div>
      <label htmlFor="type">Type</label>
    <select value={updatedata.type} className='mx-2' name='type' onChange={(e) => {
    setupdatedata({ ...updatedata, type: e.target.value }) }}>
      <option value="CREDIT">CREDIT</option>
      <option  value="DEBIT">DEBIT</option>
    </select>
    </div>
    <div>
      <label htmlFor="date" className='my-2'>Date</label>
    <input  type='date' className="mx-2"name="date"value={updatedata.date ? format(new Date(updatedata.date), 'yyyy-MM-dd') : ''}
   onChange={(e) => {
    setupdatedata({ ...updatedata, date: e.target.value }) }} />
    </div>
    <div className='my-2'>
      <label htmlFor="textarea">Description</label>
      <input type="textarea" name="textarea" className="mx-2" value={updatedata.description} onChange={(e)=>{setupdatedata({...updatedata,description:e.target.value})}}/>
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" >Update</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>
    <div className='m-5 '>
    <h2>Your Expanse Details</h2>
    <div className='container overflow-auto' style={{ height: '100vh', width:"25rem" }}>
    {data.map((item) => (
      <div className="card my-1  border-danger rounded-5" key={item._id} style={{ backgroundColor: item.type === "CREDIT" ? "blueviolet" : " darkslateblue" ,color:"white"}}>
      <div className="card-body">
        <h5 className="card-title">{item.category}</h5>
        <p className="card-text">Amount : Rs.{item.amount}</p>.<br/>
        <p className="card-text">Type : {item.type}.</p><br/>
        <p className="card-text">Description : {item.description}</p>
        {/* date */}
        <p className="card-text"> Date: {new Date(item.date).toLocaleDateString('en-GB')}</p>
  
        {/* buttons for edit and delete data */}
        <div className='d-flex justify-content-between'>
        <button onClick={()=>handleupdate(item)}><FontAwesomeIcon icon={faPenToSquare} /></button>
        <button onClick={()=>{handledelete(item._id)}}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
        {/* <a href="#" className="btn btn-primary">View More</a> */}
      </div>
      </div>
        
    ))}
    </div>
  </div>
  </>
  )
}
