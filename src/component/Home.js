import React from 'react'
import img from '../asstes/img2.jpg'
import Navbar from './Navbar'
function Home() {
  return (
    <div>
        <Navbar />
        <img src={img} className='w-full'></img>
    </div>
  )
}

export default Home