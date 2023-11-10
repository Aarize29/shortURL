
import React from 'react'
import { StickyNavbar } from '../components/StickyNavbar'
import { SimpleFooter } from '../components/Footer'
import { Button } from "@material-tailwind/react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <div  className='m-5'>
     <StickyNavbar/>

      <div>
        <div className="flex flex-col items-center h-screen justify-center rounded-xl bg-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-gray-700">shortURL</h1>
            <h2 className="mt-2 text-xl text-gray-600">short your urls in seconds...</h2>

            <Link to='/home'> <Button className='mt-2' variant="gradient" >Get Started</Button></Link>
          </div>
        </div>
      </div>
     <SimpleFooter/>
  </div>
  )
}

export default Landing