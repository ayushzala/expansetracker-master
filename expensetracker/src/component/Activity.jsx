import React from 'react'
import Creditdebit from './Creditdebit'
import Data from './Data'
import './activity.css'
import Total from './Total'
export default function Activity() {
  return (
    <div>
      <Total/>     
      <div className='abc'>
      <Creditdebit/>
      <Data/>
    </div>
    </div>
  )
}
