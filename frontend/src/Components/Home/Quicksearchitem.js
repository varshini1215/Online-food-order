import React,{ useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Quicksearchitem() {
  const navigate=useNavigate();
  const [mealtype,setMealtype]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:8700/getAllMealTypes")
    .then((res)=>setMealtype(res.data))
    .catch((err)=>err);
  },[])
  const navigateFilter=(mealtypeid)=>{
    var locId=sessionStorage.getItem("locationID")
    if(locId){
      navigate(`/Filter?mealtype=${mealtypeid}&location=${locId}`)
    }else{
      navigate(`/Filter?mealtype=${mealtypeid}`)
    }

  }
  return (
  <div>
  {mealtype.map((meal)=>{
      return <div className="maindiv d-inline-flex bd-highlight col-4" onClick={()=>navigateFilter(meal.meal_type)}>
        {/* <div className="col-sm-6 col-md-3 col-lg-4 d-inline-flex bd-highlight img">  */}
          <img src={meal.image} alt="no img found" className='pic'/>
            <div className="col-sm-6 col-md-3 col-lg-2 shadow-lg p-1 mb-2 bg-body rounded desp">
              <h3> {`${meal.name}`}</h3>
               <h5> {`${meal.content}`}</h5>
         </div>
       {/* </div> */}
    </div>
})}
    </div>

  )
}