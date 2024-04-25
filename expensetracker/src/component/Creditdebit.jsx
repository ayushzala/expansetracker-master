import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios  from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
export default function Creditdebit() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('spend'); // Initialize active form state


  // Add extra input field on button click

  const handleFormChange = (newActiveForm) => {
    setActiveForm(newActiveForm);
  };
 
  const[amount,setamount] = useState("");
  const[category,setcategory] = useState("Food/Dining Out");
  const[category1,setcategory1] = useState('Salary')
  const[description,setdescription] = useState("");
  const[date,setdate]=useState(new Date())
  const user = useSelector((state) => state.username);
  function spend (e){
    e.preventDefault();
    // console.log(amount+" "+category+ " "+ description +" " + date);
    if(amount === ""|| category=== ""){
      alert("Please Fill amount and category field")
    }
    else{
      try {
        const data = {
          date,
          id:user._id,
          amount:parseFloat(amount),
          category,
          description,
          email: user.email
        }
        console.log(data);
        axios.post('/debit',data).then((response)=>{
          // console.log(response);
          setamount("");
          setcategory("Food/Dining Out");
          setdescription("")
          navigate('/activity')
            window.location.reload() ;
        }) 
      } catch (error) {
        console.log(error);
      }
    }
  }

  function receive(e){
    e.preventDefault();
    // console.log(amount+" "+category+ " "+ description );
    if(amount === ""|| category=== ""){
      alert("Please Fill amount and category field")
    }
    else{
      try {
        const data = {
          date,
          id:user._id,
          amount:parseFloat(amount),
          category:category1,
          description,
          email:user.email
        }
        axios.post('/credit',data).then((response)=>{
          // console.log(response);
          setamount("");
          setcategory1("Salary");
          setdescription("")
          navigate('/activity')
          window.location.reload() ;
        }) 
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="m-5 col-md-8">
      <div className="row justify-content-between">
      <div
          className={
            activeForm === 'spend'
              ? 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded active text-white'
              : 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded bg-light hover:bg-danger text-danger'
          }
          style={activeForm === 'spend' ? {background:"darkslateblue"}:{background:"white"}}
          onClick={() => handleFormChange('spend')}
        >
          Spend
        </div>
        <div
          className={
            activeForm === 'receive'
              ? 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded active text-white'
              : 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded bg-light hover:bg-success text-success'
          }
          style={activeForm === 'receive' ? {background:"blueviolet"} : {}}
          onClick={() => handleFormChange('receive')}
        >
          Receive
        </div>
      </div>

      {activeForm === 'spend' && (
        <form className="form-group form-spend mt-3" onSubmit={spend}>
          <h3>Spend</h3>
          {/* Date */}
          <label htmlFor='date'>Date:</label>
          <input type='date' id='date' name='date' className="form-control mb-2" value={date} onChange={(e)=>{setdate(e.target.value)}} required/><br />
          <label htmlFor="amount">Amount: </label>
          <input type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setamount(e.target.value)}}className="form-control mb-2" /><br />
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            id="category"
            className="form-control mb-2"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="food">Food/Dining Out</option>
            <option value="entertainment">Entertainment/Hobbies</option>
            <option value="transportation">
              Transportation/Commuting to Work/School
            </option> 
            <option value="utilities">Utilities/Electricity/Water/Gas/Internet</option>
            <option value="household">Household/Groceries/Cleaning Supplies</option>
            <option value="healthcare">Health Care/Medicine/Prescriptions</option>
            <option value="loan_payment">Loan Payments/Credit Card Billings</option>
            <option value="other">Other Expenses</option>
          </select>
          <small>Select the category of your expense.</small><br />
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            rows="4"
            cols="50"
            className="form-control mb-2"
            placeholder="Explain why you are spending this money."
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea><br />
          <button type="submit" className="btn btn-danger" style={{ width: '100%',background:"darkslateblue" } } >
            Submit Spend
          </button>
        </form>
      )}


{activeForm === 'receive' && (
         <form className="form-group form-spend mt-3" onSubmit={receive}>
         <h3>Spend</h3>
         <label htmlFor='date'>Date:</label>
          <input type='date' id='date' name='date' className="form-control mb-2" value={date} onChange={(e)=>{setdate(e.target.value)}} required/><br />
         <label htmlFor="amount">Amount: </label>
         <input type="number" name="amount" id="amount" required className="form-control mb-2" value={amount}onChange={(e)=>{setamount(e.target.value)}} /><br />
         <label htmlFor="category">Category: </label>
         <select name="category" id="category" className="form-control mb-2" value={category1} onChange={(e)=>{setcategory1(e.target.value)}}>
          {/* TODO: Add options for "cash received", "check deposited", etc. */}
          <option value="salary">Salary</option>
          <option value="Gift">Gift</option> 
          <option value="Cashback">Cashback</option>
          <option value="Deposit">Deposit into Savings Account or Other</option>
         </select>
         <small>Select the category of your expense.</small><br />
         <label htmlFor="description" >Description: </label>
         <textarea
           name="description"
           rows="4"
           cols="50"
           className="form-control mb-2" value={description}
           onChange={(e)=>{setdescription(e.target.value)}}
         ></textarea><br />
         <button type="submit" className="btn btn-success" style={{ width: '100%',background:"blueviolet"}}>
           Submit Receive
         </button>
       </form>
      )}
 
    </div>
  );
}
