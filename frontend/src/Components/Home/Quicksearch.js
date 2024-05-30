import React from 'react'
import Quicksearchitem from './Quicksearchitem'


export default function Quicksearch() {
  return (
    <div class="container mt-5">
      <div class="row">
        <h1 class="col-12 my-1" style={{fontWeight: "bold"}}> Quick Searches </h1>
        <h3 class="col-12 pb-4 padd"> Discover restaurants by type of meal </h3>
        <Quicksearchitem/>
        </div>
       
    </div>
  )
}