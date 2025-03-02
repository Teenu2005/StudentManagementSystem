import React from 'react'
import img from '../assets/images/Bacground.jpg'
import img2 from '../assets/images/MakeEase-01.png'
import NavBar from '../components/NavBar'
import { HomeNav } from './Homenav'
function Home() {
   
  return (
    <>
        <NavBar nav={HomeNav} />
        <main>
            <div className="layout">
                <div className='content-text'>
                This is Student management stystem based on 
                website here you can Make it Easy to Manage students data and staffs data and more 
                <b>That is called as </b>
                </div>
                    <img src={img2} className='imgmakeease'/>
            </div>
        </main>
        <footer>
            <div className="footconntent">
                copyright
            </div>
        </footer>
    </>
  )
}

export default Home