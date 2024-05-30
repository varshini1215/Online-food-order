import React, { useEffect, useState } from 'react'
import pasta from '../../Assets/pasta.jfif';
import queryString from 'query-string'
import axios from 'axios'
import {useLocation,useNavigate} from "react-router-dom"


export default function Filter(){
    const navigate=useNavigate();
    const location=useLocation().search;
    const restaurantsPerPage=2


    const[locationData,setlocationData]=useState([]);
    // const[restaurants,setRestaurants]=useState([]);
    const[currentPage,setCurrentPage]=useState(1)
    const[restaurantData,setRestaurantData]=useState([]);
    const[sort,setSort]=useState(1)
    const[cuisineid,setCuisineid]=useState([]);
    const[lcost,setLcost]=useState(undefined);
    const[hcost,setHcost]=useState(undefined)
    const qs=queryString.parse(window.location.search)
    const mealtype_id=qs.mealtype;
    const location_id=Number(sessionStorage.getItem('locationID'));

    const fetchLocation=()=>{
        axios.get('http://localhost:8700/getAllLocation')
        .then((res)=>setlocationData(res.data))
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        fetchLocation();

        const filteredObj={
            mealtype_id:Number(mealtype_id),
            location_id:location_id,
            cuisine_id: cuisineid,
            sort:sort,
            lcost:lcost,
            hcost:hcost
        
        }
        axios.get(`http://localhost:8700/getRestaurantByMealTypeid/${mealtype_id}`)
        .then((res)=>setRestaurantData(res.data))
      .catch((err)=>console.log(err))

       axios.get('http://localhost:8700/filter',filteredObj)
      .then((res)=>setRestaurantData(res.data))
      .catch((err)=>console.log(err))
      sessionStorage.clear()

    },[location,sort,cuisineid,lcost,hcost,location_id,mealtype_id])
    
    const searchHandle=(e)=>{
        var locationids=Number(e.target.value);
        const filteredObj={
            mealtype_id:Number(mealtype_id),
            location_id:locationids,
            sort:sort,
            lcost:lcost,
            hcost:hcost
        }
        axios.post('http://localhost:8700/filter',filteredObj)
        .then((res)=>setRestaurantData(res.data))
        .catch((err)=>console.log(err))
    }

    const filters=()=>{
        const filteredObj={
            mealtype_id:Number(mealtype_id),
            location_id:location_id,
            cuisine_id:cuisineid,
            sort:sort,
            lcost:lcost,
            hcost:hcost
        }
        axios.post('http://localhost:8700/filter',filteredObj)
        .then((res)=>setRestaurantData(res.data))
        .catch((err)=>console.log(err))
    }
    const handleCuisine = (id) => { 
        const updatedCuisineIds = [...cuisineid];
        const index = updatedCuisineIds.indexOf(id);
        if (index === -1) { updatedCuisineIds.push(id); }
         else { updatedCuisineIds.splice(index, 1); } 
         setCuisineid(updatedCuisineIds); 
         setTimeout(() => { filters();
         }, 0); };

    const searchSort=(e)=>{
        const sort=e.target.value
        setSort(sort)
        setTimeout(()=>{
            filters();
        },0)
    }
    const handleCost=(lcost,hcost)=>{
        setLcost(lcost)
        setHcost(hcost)
        setTimeout(()=>{
            filters();
        },0)
    }
    const handleDetail = (e) => {
        navigate(`/Details?restaurant=${e._id}`)
    
    };
    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const length = Math.ceil(restaurantData.length / restaurantsPerPage);
    const currentRestaurants = restaurantData.length > 0 ? restaurantData.slice(indexOfFirstRestaurant, indexOfLastRestaurant) : 0;
    
    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber);
    
    }
   

  return (
    <div>
    
    <h2 className="head">Breakfast Places in Mumbai </h2>
    <div className="parent">
    <div className="box">
    <div className="h">
        <h4 className="child aa">Filters</h4>
        {/* <p className="child bb">Select a location</p> */}
        <select className="child cc" onChange={searchHandle} >
            <option>---select city----</option>
            {/* <option>mumbai</option>
            <option>chennai</option>
            <option>banglore</option>
            <option>manglore</option> */}
            {locationData.map((e)=>{
                return <option key={e._id} value={e.location_id}>{`${e.city}- ${e.locality}`}</option>
            })}
        </select>
    </div>
        <div className="i d-none d-md-none d-lg-block">
        <p className="g">Cuisine</p>
        <input type="checkbox" onChange={() => handleCuisine(1)} /> North Indians<br />
                    <input type="checkbox" onChange={() => handleCuisine(2)} /> South Indians <br />
                    <input type="checkbox" onChange={() => handleCuisine(3)} /> Chineses<br />
                    <input type="checkbox" onChange={() => handleCuisine(4)} /> Fast food<br />
                    <input type="checkbox" onChange={() => handleCuisine(5)} /> Street food<br />
                    <br />
        
        </div>
         <div className="g">
            <p>Cost for two</p>
            <input type="radio" name="price" onChange={() => handleCost(0, 500)} /> Less than &#8377;500<br />
                    <input type="radio" name="price" onChange={() => handleCost(500, 1000)} /> &#8377;500 to &#8377;1000<br />
                    <input type="radio" name="price" onChange={() => handleCost(1000, 1500)} /> &#8377;1000 to &#8377;1500<br />
                    <input type="radio" name="price" onChange={() => handleCost(1500, 2000)} /> &#8377;1500 to &#8377;2000<br />
                    <input type="radio" name="price" onChange={() => handleCost(2000, 50000)} /> &#8377;2000+<br />
                    <br />
          
        </div> 
<div className="g">
    <p>Sort</p>
    {/* <input type="radio" name="food"/>Price high to low<br/>
    <input type="radio" name="food"/>Price low to high */}
     <input type="radio" name="Sort" onClick={searchSort} /> Price Low to High<br />
                    <input type="radio" name="Sort" onClick={searchSort} /> Price High to Low<br />
</div>
</div>

<div class="container gt">
                    <div class="row row-cols-1 g-4 my-3">
                        {currentRestaurants.length > 0 ? currentRestaurants.map((item, i) => {
                            return <div class="col g-1 mx-1 my-4 con" key={i} onClick={() => handleDetail(item)}>
                                <img src={pasta} alt="img not found" class="img" />
                                <span class="sub">
                                    <h2>{item.name}</h2>
                                    <br />
                                    <h4>{item.city}</h4>
                                    <h5>{item.locality}</h5>
                                    <hr className='foods' />
                                    <h6 className='foods'>CUISINES: {`  ${item.cuisine.map(e => e.name + " ")}`} </h6>
                                    <h6 className='foods'>COST FOR TWO: &#8377;{item.min_price}</h6>
                                </span>
                            </div>
                        }) : <center><h1 style={{ color: "red" }}>No Result Found...</h1></center>}
                    </div>
                    {restaurantData.length > 0 ?
                        <div className="btn-group px-3 button">
                            {Array.from({ length }).map((_, index) => (
                                <p key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''} btn border-primary btn-light`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    <span className="page-link">{index + 1}</span>
                                </p>
                            ))}
                        </div> : null
                    }
                </div>
      
</div>

  </div>
          )
         }