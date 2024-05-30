import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home/Home';
import Filter from './Filter/Filter';
import Details from './Details/Details';
import '../Styles/Home.css'
import '../Styles/Filter.css'
import '../Styles/Tabs.css'
import '../Styles/Carousel.css'

export default function Router() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Filter" element={<Filter/>}/>
        <Route path="/Details" element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}