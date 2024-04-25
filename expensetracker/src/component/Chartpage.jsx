import React, { useState, useEffect } from 'react';
import { Chart as Chartjs } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import './chart.css'
const monthColors = [
  // Color scheme for categories (adjust as needed)
  "rgba(78, 90, 186 , .8)", // Blue
  "rgba(255, 99, 132, .8)", // Pink
  "rgba(54, 162, 235, .8)", // Light blue
  "rgba(255, 206, 86, .8)", // Yellow
  "rgba(67, 164, 72, .8)"   // Green
];

export default function Chartpage() {
  const userdata = useSelector((state) => state.userdata);
  const [debitcategoryData, setdebitcategoryData] = useState({ labels: [], data: [] });
  const [creditcategoryData, setcreditcategoryData] = useState({ labels: [], data: [] });
  useEffect(() => {
    if (userdata != null) {
      const debitcategoryTotals = {};

      // Loop through each item in userdata
      userdata.forEach(item => {
        const category = item.category;
        if(item.type === "DEBIT"){
        if (!debitcategoryTotals[category]) {
          debitcategoryTotals[category] = 0;
        }

        debitcategoryTotals[category] += item.amount;
      }
    });

      // Extract labels and data from debitcategoryTotals
      const labels = Object.keys(debitcategoryTotals);
      const data = Object.values(debitcategoryTotals);

      // Update debitcategoryData state with processed data
      setdebitcategoryData({ labels, data });
    }
  }, [userdata]);


  useEffect(() => {
    if (userdata != null) {
      const creditcategoryTotals = {};

      // Loop through each item in userdata
      userdata.forEach(item => {
        const category = item.category;
        if(item.type === "CREDIT"){
        if (!creditcategoryTotals[category]) {
          creditcategoryTotals[category] = 0;
        }

        creditcategoryTotals[category] += item.amount;
      }
    });

      // Extract labels and data from debitcategoryTotals
      const labels = Object.keys(creditcategoryTotals);
      const data = Object.values(creditcategoryTotals);

      // Update debitcategoryData state with processed data
      setcreditcategoryData({ labels, data });
    }
  }, [userdata]);



  return (
    <>
    <div>
    <div className='my-4'>
      <h2>Spending chart</h2>
    <div>
      {debitcategoryData.labels.length > 0 && ( // Render chart only when data is available
        <Pie
          data={{
            labels: debitcategoryData.labels,
            datasets: [
              {
                label: 'Category Expenses',
                data: debitcategoryData.data,
                backgroundColor: monthColors.slice(0, debitcategoryData.labels.length), // Slice colors based on labels
                borderColor: monthColors.slice(0, debitcategoryData.labels.length).map(color => color.replace('.8', '1')), // Adjust border colors (optional)
                borderWidth: 1, // Adjust line width as needed
              },
            ],
          }}
          options={{
            maintainAspectRatio: false, // Prevent chart distortion
          }}
        style={{width:"100%",height:"50vh"}} />
      )}
    </div>
    </div>
    <div className='my-4'>
      <h2>Reseving chart</h2>
     <div>
     {creditcategoryData.labels.length > 0 && ( // Render chart only when data is available
       <Pie
         data={{
           labels: creditcategoryData.labels,
           datasets: [
             {
               label: 'Category Expenses',
               data: creditcategoryData.data,
               backgroundColor: monthColors.slice(0, creditcategoryData.labels.length), // Slice colors based on labels
               borderColor: monthColors.slice(0, creditcategoryData.labels.length).map(color => color.replace('.8', '1')), // Adjust border colors (optional)
               borderWidth: 1, // Adjust line width as needed
             },
           ],
         }}
         options={{
           maintainAspectRatio: false, // Prevent chart distortion
         }}
       style={{width:"100%",height:"50vh"}} />
     )}
   </div>
   </div>
   </div>
   </>
  );
}
