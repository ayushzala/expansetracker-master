import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./total.css"
export default function Total() {
    const userdata = useSelector((state) => state.userdata);
    const [totalDebit, setTotalDebit] = useState(0); // Initialize totalDebit
    const [totalCREDIT, setTotalCREDIT] = useState(0);
    useEffect(() => {
        if (userdata !== null) {
            // Calculate total debit efficiently using reduce
            const total = userdata.reduce((acc, item) => {
                return item.type === 'DEBIT' ? acc + item.amount : acc;
            }, 0);
            setTotalDebit(total);
        }
    }, [userdata]);

    useEffect(() => {
        if (userdata !== null) {
            // Calculate total debit efficiently using reduce
            const total = userdata.reduce((acc, item) => {
                return item.type === 'CREDIT' ? acc + item.amount : acc;
            }, 0);
            setTotalCREDIT(total);
        }
    }, [userdata]);

    return (
        <div style={{
            border: "2px solid black",
            marginInline: "1rem",
            marginTop: "1rem",
            padding: "0.5rem",
            borderRadius: "1rem",
            background: "antiquewhite",
            display: 'flex',
            alignItems:"center",
            justifyContent:"center"
        }}>
            <p className='total'>
                DEBIT : {totalDebit}</p>
            <p className='total'>
                CREDIT:{totalCREDIT}</p>
            <p className='total'>
                Total:{totalCREDIT - totalDebit}</p>
        </div>
    );
}
