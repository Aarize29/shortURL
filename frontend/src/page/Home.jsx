
import React ,{useEffect}from 'react'
import { StickyNavbar } from '../components/StickyNavbar';
import { MainCard } from '../components/Card';
import { Sidebar } from '../components/Sidebar';

const Home = () => {

    useEffect(() => {
        const token=localStorage.getItem("token");
        if(!token){
            window.location.href="/login";
        }
    }, [])
  return (
    <div className='m-5'>
        <StickyNavbar/>
          
         <div className=' flex gap-4 mt-10 '>
          <Sidebar/>
          <div className='flex  justify-center w-full'>
          <MainCard/>
          </div>
         </div>
    </div>
  )
}

export default Home