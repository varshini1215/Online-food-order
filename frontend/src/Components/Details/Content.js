import React, { useEffect, useState } from 'react'
import {Tab,Tabs,TabList,TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import queryString from 'query-string'
import axios from 'axios'

export default function Content() {
  const [restaurant,setRestaurant]=useState([]);
  const parsed=queryString.parse(window.location.search);
  const id=parsed.restaurant;
  // console.log(id);

  useEffect(()=>{
axios.get(`http://localhost:8700/getAllRestaurantByid/${id}`)
.then((res)=>{
  setRestaurant(res.data);
})
.catch(err=>err)
console.log(restaurant)
  },[id])
  return (
<div>
<br/>
  {restaurant.map((e)=>{
    return <div> 
      {/* <button className='order'>PlaceOnline Order</button> */}
    <br/>
    <br/>
    <h1 style={{fontSize:"40px"}}><b>{`${e.name}`}</b></h1>
    <br/>
        <Tabs>
         <TabList>
           <Tab style={{color:"maroon", fontSize:"20px"}}><b>Overview</b></Tab>
           <Tab style={{color:"maroon", fontSize:"20px"}}><b>Contacts</b></Tab>
         </TabList>
 
         <TabPanel>
           <h2 className="heading">About this place </h2>
           <br/>
           <h2 className="subheading"><b>Cuisine</b></h2>
           <p className="content" >Bakery,Fast food</p>
           <h2 className="subheading"><b>Average Cost</b></h2>
           <p className="content" >Rs.700 for two people (approx) </p>
         </TabPanel>
         <TabPanel>
           <h1 className="heading">Contact us</h1>
           <br/>
           <h2 className="subheading"><b>Phone number</b></h2>
           <p className="content"></p>
           <h4>{`${e.contact_number}`}</h4>
           {/* <h2 className="subheading"><b>The Big Chill Cakery</b></h2> */}
           <h1>{`${e.name}`}</h1>
           <p className="content" >Shop1, plot D, Samuridi complex, Chennai</p>
         </TabPanel>
       </Tabs>
     
   </div>
  })}
</div>
   )
}