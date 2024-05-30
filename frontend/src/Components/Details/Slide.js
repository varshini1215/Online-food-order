import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from "react-responsive-carousel"
import chicken from '../../Assets/chicken.jpg'
import biryani from '../../Assets/biryani.jpeg'
import burger from '../../Assets/burger.jpg'

export default function Slide() {
  return (
    <div>
<Carousel showThumbs={false}>
    <div>
        <img src={chicken} alt='no img found' className='detailImage'/>
    </div>
    <div>
        <img src={biryani} alt='no img found' className='detailImage'/>
    </div>
    <div>
        <img src={burger} alt='no img found'style={{width:"100%",height:"580px"}}/>
    </div>
</Carousel>
    </div>
  )
}