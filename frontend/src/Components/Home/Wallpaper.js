import React, { useEffect, useState } from 'react'
import food from '../../Assets/food 2.jpg';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
export default function WallPaper() {
  const navigate=useNavigate();
  const [location,setLocation]=useState([]);
  const[restaurant,setRestaurant]=useState([]);
  const[locationid,setLocationId]=useState([]);
  const[inputtext,setInputText]=useState('');
  const[suggestion,setSuggestion]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8700/getAllLocation')
    .then((res)=>{
      setLocation(res.data);
    })
    .catch(err=>err)
    sessionStorage.clear()
    console.log(location);
  })
 
  const handleLocation=(e)=>{
    var locationId=e.target.value
    sessionStorage.setItem("locationID",Number(locationId))
    axios.get(`http://localhost:8700/getRestaurantByLocationId/${locationId}`)
    .then((res)=>{
      setRestaurant(res.data);
    })
    .catch(err=>err)
    setLocationId(locationid)
    
  }
  const handleSearch=(e)=>{
    let input=e.target.value
    const suggestions=restaurant.filter(e=>e.name.toLowerCase().includes(input.toLowerCase()));
    setInputText(input);
    setSuggestion(suggestions)
  }
  const selectingRest=(restObj)=>{
    navigate(`/Details?restaurant=${restObj._id}`);
  }
  const showSuggestion=()=>{
     if(suggestion.length === 0 && inputtext === undefined){
      return null
     }
     if(suggestion.length > 0 && inputtext === ''){
      return null
     }
     if(suggestion.length === 0 && inputtext){
      return<ul>
        <li style={{backgroundColor:"white"}}>No search results found</li>
      </ul>
     }
     return(
      <ul style={{backgroundColor:"white"}}>
        {suggestion.map((e,i)=>(
          <li key={i} onClick={()=>selectingRest(e)}>{`${e.name}-${e.locality},${e.city}`}</li>
        ))}

      </ul>
     )
  }
 
  return (
    <div>
       <img src={food}  alt="no img" className="images"/>
        <div className="container topc">
          <div className="row dropdown justify-content-center drop"  >
            <h4 className="col-10 mb-9 heading" style={{marginTop:"30px",textAlign:"center" }}> <b>Find the best restaurants, cafes and bars </b></h4>
            <div className="col-10 col-lg-4 mb-3 me-5">
            <select 
            className="form-control place-me-2 search" 
            list="datalistOptions" 
            id="exampleDatalist"
            onChange={handleLocation}>
            <option value="location_id_name_city">Choose city...</option>
              {location.map((loc)=>(
                <option key={loc.location_id} value={loc.location_id}> {loc.locality},{loc.city}</option>
              ))}
            </select>
          </div>
        <div className="col-10 col-lg-4 me-5">
          <input className="form-control me-2 search icon" type="search" placeholder="Search for Restaurants,bars,etc.," onChange={handleSearch} arial-label="Search" style={{width:"100%"}}/>
          {showSuggestion()}
        </div>
      </div>
     </div>
</div>
  )
}